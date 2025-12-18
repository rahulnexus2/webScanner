import axios from "axios";

const API_KEY = process.env.GOOGLE_SAFE_KEY;

export async function checkSafeBrowsing(url) {
  try {
    const res = await axios.post(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`,
      {
        client: { clientId: "trustlens", clientVersion: "1.0" },
        threatInfo: {
          threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
          platformTypes: ["ANY_PLATFORM"],
          threatEntryTypes: ["URL"],
          threatEntries: [{ url }],
        },
      }
    );

    return res.data.matches ? false : true;
  } catch {
    return null;
  }
}
