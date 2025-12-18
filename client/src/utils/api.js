const BASE_URL = import.meta.env.VITE_API_URL || "/api";

export const analyzeUrl = async (url) => {
  const response = await fetch(`${BASE_URL}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error("Backend request failed");
  }

  return response.json();
};
