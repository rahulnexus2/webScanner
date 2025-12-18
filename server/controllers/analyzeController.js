import { checkSSL } from "../services/ssl.service.js";
import { getWhoisData } from "../services/whois.service.js";
import { checkSafeBrowsing } from "../services/safeBrowsing.service.js";
import { analyzeUrl } from "../services/urlAnalysis.service.js";
import axios from "axios";
import * as cheerio from "cheerio";

export const analyzeWebsite = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(url.startsWith("http") ? url : `https://${url}`);
  } catch {
    return res.status(400).json({ error: "Invalid URL format" });
  }

  const domain = parsedUrl.hostname.replace("www.", "");
  const fullUrl = parsedUrl.href;

  /* ==============================
     RUN CHECKS PARALLEL
     ============================== */
  // Accessibility check helper
  const checkAccessibility = async (targetUrl) => {
    try {
      const response = await axios.get(targetUrl, { timeout: 5000, validateStatus: () => true });
      return {
        accessible: response.status === 200,
        status: response.status,
        data: response.data
      };
    } catch {
      return { accessible: false, status: 0, data: null };
    }
  };

  const [ssl, whois, isSafe, accessibility] = await Promise.all([
    checkSSL(domain),
    getWhoisData(domain),
    checkSafeBrowsing(fullUrl),
    checkAccessibility(fullUrl)
  ]);

  const urlStats = analyzeUrl(fullUrl);

  /* ==============================
     SCORING LOGIC
     ============================== */
  let score = 60; // Baseline
  const reasons = [];
  let uncertaintyCount = 0;

  // 1. SSL Check
  if (ssl.valid) {
    score += 15;
    reasons.push({ type: "info", message: "Valid HTTPS connection detected" });
  } else {
    score -= 20;
    reasons.push({ type: "severe", message: "Missing or invalid SSL certificate" });
  }

  // 2. Domain Age (WHOIS)
  if (whois && whois.ageYears !== null) {
    if (whois.ageYears > 5) {
      score += 25;
      reasons.push({ type: "info", message: `Domain is established (${whois.ageYears} years old)` });
    } else if (whois.ageYears > 1) {
      score += 15;
      reasons.push({ type: "info", message: "Domain age is moderate" });
    } else if (whois.ageYears > 0.25) {
      score += 5;
    } else {
      score -= 20;
      reasons.push({ type: "severe", message: "Domain is extremely new (< 3 months)" });
    }
  } else {
    score -= 5;
    uncertaintyCount++;
    reasons.push({ type: "risk", message: "Domain age could not be verified" });
  }

  // 3. Safe Browsing (Historical Reputation)
  if (isSafe === false) {
    score -= 50; // Major penalty
    reasons.push({ type: "severe", message: "Flagged by Google Safe Browsing as dangerous" });
  } else if (isSafe === true) {
    score += 10;
    reasons.push({ type: "info", message: "Not found on immediate blocklists" });
  } else {
    // Check skipped or failed (API key missing etc)
    uncertaintyCount++;
  }

  // 4. Accessibility & Content
  if (accessibility.accessible) {
    score += 10;
    // Simple content check
    if (accessibility.data) {
      const $ = cheerio.load(accessibility.data);
      const text = $("body").text().toLowerCase();
      const suspiciousWords = ["login", "verify", "account", "update", "banking", "secure"];
      const foundSuspicious = suspiciousWords.filter(w => text.includes(w));

      if (foundSuspicious.length > 2) {
        score -= 5;
        reasons.push({ type: "risk", message: "Contains keywords often used in phishing" });
      }
    }
  } else {
    score -= 20;
    reasons.push({ type: "severe", message: "Website is not reachable" });
  }

  // 5. URL Structure
  if (urlStats.hasSuspicious) {
    score -= 15;
    reasons.push({ type: "risk", message: "URL contains suspicious pattern words" });
  }
  if (urlStats.length > 70) {
    score -= 5;
    reasons.push({ type: "risk", message: "URL is suspiciously long" });
  }
  if (urlStats.dots > 4) {
    score -= 10;
    reasons.push({ type: "risk", message: "Complex URL structure suspected" });
  }

  /* ==============================
     FINALIZE
     ============================== */
  score = Math.max(0, Math.min(score, 100));

  let status = "Safe";
  if (score < 50) status = "Dangerous";
  else if (score < 75) status = "Suspicious";

  let confidence = "High";
  if (uncertaintyCount >= 1) confidence = "Medium";
  if (uncertaintyCount >= 3) confidence = "Low";

  // Construct Details Object for Dashboard
  const details = {
    domain,
    sslIssuer: ssl.issuer,
    domainAge: whois?.ageYears ? `${whois.ageYears} years` : "Unknown",
    registrar: whois?.registrar || "Unknown",
    nameServers: whois?.nameServers || [],
    safeBrowsing: isSafe === false ? "Detected" : (isSafe === true ? "Clean" : "Unchecked"),
    serverLocation: "Hidden" // Placeholder or need IP lookup
  };

  res.json({
    score,
    status,
    confidence,
    reasons,
    details
  });
};
