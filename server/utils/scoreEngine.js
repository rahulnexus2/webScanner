export function calculateScore({ age, ssl, urlData, safe }) {
  let score = 0;

  if (ssl?.valid) score += 25;

  if (age >= 3) score += 20;
  else if (age >= 1) score += 10;

  if (!urlData.hasSuspicious) score += 20;
  if (urlData.length < 75) score += 15;
  if (urlData.dots <= 2) score += 10;

  if (safe === true) score += 10;

  return score;
}
