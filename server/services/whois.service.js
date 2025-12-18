import whois from "whois-json";

export async function getDomainAge(domain) {
  try {
    const data = await whois(domain);
    if (!data.creationDate) return null;

    const created = new Date(data.creationDate);
    const ageYears =
      (Date.now() - created.getTime()) / (1000 * 60 * 60 * 24 * 365);

    return Math.floor(ageYears);
  } catch {
    return null;
  }
}
