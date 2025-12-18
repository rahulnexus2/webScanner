import axios from "axios";

const API_KEY = process.env.GOOGLE_SAFE_KEY;

export async function checkSafeBrowsing(url) {
  if (!API_KEY) {
    console.warn("Google Safe Browsing API Key is missing.");
    return null; // treat as unknown
  }

  try {
    const res = await axios.post(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`,
      {
        client: { clientId: "trustlens", clientVersion: "1.0" },
        threatInfo: {
          threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
          platformTypes: ["ANY_PLATFORM"],
          threatEntryTypes: ["URL"],
          threatEntries: [{ url }],
        },
      }
    );

    // If "matches" exists and is not empty, it's unsafe.
    const isSafe = !res.data.matches || Object.keys(res.data.matches).length === 0;
    return isSafe;
  } catch (error) {
    console.error("Safe Browsing Error:", error.message);
    return null;
  }
}
