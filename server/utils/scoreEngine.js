export function calculateScore({ age, ssl, urlData, safe }) {
  let score = 100;
  const reasons = [];

  // SSL check
  if (!ssl?.valid) {
    score -= 25;
    reasons.push("Website does not have a valid SSL certificate");
  }

  // Domain age check
  if (age < 1) {
    score -= 20;
    reasons.push("Domain is very new (less than 1 year old)");
  } else if (age < 3) {
    score -= 10;
    reasons.push("Domain age is relatively low");
  }

  // Suspicious URL patterns
  if (urlData.hasSuspicious) {
    score -= 20;
    reasons.push("URL contains suspicious keywords or patterns");
  }

  // URL length
  if (urlData.length >= 75) {
    score -= 15;
    reasons.push("URL is unusually long");
  }

  // Too many dots (subdomains)
  if (urlData.dots > 2) {
    score -= 10;
    reasons.push("URL contains multiple subdomains");
  }

  // Reputation flag
  if (safe === false) {
    score -= 10;
    reasons.push("Website has poor or unknown reputation");
  }

  // Clamp score
  score = Math.max(0, Math.min(score, 100));

  // Status
  let status = "Safe";
  if (score < 40) status = "Dangerous";
  else if (score < 70) status = "Suspicious";

  return {
    score,
    status,
    reasons
  };
}
