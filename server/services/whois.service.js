import whois from "whois-json";

export async function getWhoisData(domain) {
  try {
    const data = await whois(domain);

    // Extract creation date
    const createdDate = data.creationDate || data.creation_date || data.created;
    let ageYears = null;

    if (createdDate) {
      const created = new Date(createdDate);
      if (!isNaN(created.getTime())) {
        ageYears = (Date.now() - created.getTime()) / (1000 * 60 * 60 * 24 * 365);
      }
    }

    return {
      ageYears: ageYears ? parseFloat(ageYears.toFixed(2)) : null,
      registrar: data.registrar || data.registrant_organization || "Unknown",
      nameServers: data.nameServer || data.name_servers || [],
      createdDate: createdDate || null
    };
  } catch (error) {
    console.error("WHOIS Error:", error.message);
    return null;
  }
}
