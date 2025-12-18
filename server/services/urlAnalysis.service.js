export function analyzeUrl(url) {
  const length = url.length;
  const dots = url.split(".").length - 1;
  const suspiciousWords = ["free", "win", "bonus", "login", "verify"];

  const hasSuspicious = suspiciousWords.some(w =>
    url.toLowerCase().includes(w)
  );

  return {
    length,
    dots,
    hasSuspicious,
  };
}
