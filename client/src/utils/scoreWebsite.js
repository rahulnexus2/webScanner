export function scoreWebsite(url) {
  let score = 0;
  let reasons = [];

  // 1️⃣ HTTPS Check
  if (url.startsWith("https://")) {
    score += 25;
    reasons.push("Uses secure HTTPS connection");
  } else {
    reasons.push("Does not use HTTPS");
  }

  // 2️⃣ URL Length Check
  if (url.length < 60) {
    score += 15;
    reasons.push("URL length looks normal");
  } else {
    score += 5;
    reasons.push("URL is unusually long");
  }

  // 3️⃣ Suspicious Keyword Check
  const suspiciousWords = ["free", "win", "bonus", "urgent", "lottery"];
  const hasSuspicious = suspiciousWords.some(word =>
    url.toLowerCase().includes(word)
  );

  if (!hasSuspicious) {
    score += 25;
    reasons.push("No suspicious keywords found");
  } else {
    reasons.push("Suspicious keywords detected in URL");
  }

  // 4️⃣ Subdomain Check
  const dotCount = url.split(".").length - 1;
  if (dotCount <= 2) {
    score += 15;
    reasons.push("Domain structure looks normal");
  } else {
    score += 5;
    reasons.push("Too many subdomains detected");
  }

  // 5️⃣ Trusted TLD Check
  if (/\.(com|org|edu|gov|in)$/.test(url)) {
    score += 20;
    reasons.push("Uses a trusted domain extension");
  } else {
    reasons.push("Uses an uncommon domain extension");
  }

  // Final status
  let status = "Dangerous";
  if (score >= 75) status = "Safe";
  else if (score >= 40) status = "Suspicious";

  return { score, status, reasons };
}
