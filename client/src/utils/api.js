import axios from "axios";

const API_URL = "http://localhost:5001/api";

export const analyzeUrl = async (url) => {
    try {
        const response = await axios.post(`${API_URL}/analyze`, { url });
        return response.data;
    } catch (error) {
        console.error("Analysis error:", error);
        // Fallback/Error state
        return {
            score: 0,
            status: "Dangerous",
            reasons: [
                "Server Connection Failed",
                error.response?.data?.error || "Could not reach analysis server",
            ],
            details: {},
        };
    }
};
