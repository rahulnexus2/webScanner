import { useState } from "react";
import ResultCard from "./components/ResultCard";
import Background from "./components/Background";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const isValidUrl = (value) =>
    value.startsWith("http://") || value.startsWith("https://");

  const handleAnalyze = async () => {
    if (!url) return;

    if (!isValidUrl(url)) {
      alert("Please enter a valid URL starting with http:// or https://");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      // ⏳ Simulated scan delay for UX consistency
      await new Promise((res) => setTimeout(res, 1200));

      // 🔗 Call backend analysis engine
      const response = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Backend analysis failed");
      }

      const data = await response.json();

      /**
       * Expected backend response shape:
       * {
       *   score: number,
       *   technical: { age, ssl },
       *   urlAnalysis: { length, dots, hasSuspicious }
       * }
       */

      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Error analyzing website. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
      <Background />

      {/* Header Section */}
      <div
        className={`text-center transition-all duration-500 ${
          result ? "mt-8" : "mb-8"
        }`}
      >
        <h1 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-secondary tracking-tight mb-2">
          TrustLens
        </h1>
        <p className="text-slate-400 text-sm md:text-base font-light tracking-wide">
          Advanced Website Security Analysis
        </p>
      </div>

      {/* Main Input Section */}
      <div className="w-full max-w-lg z-10 transition-all duration-500">
        <div
          className={`glass p-1.5 rounded-2xl flex items-center transition-all duration-300 ${
            loading ? "opacity-80 pointer-events-none" : ""
          }`}
        >
          <div className="pl-4 pr-2 text-slate-500">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </div>

          <input
            type="text"
            placeholder="Search or enter website URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
            disabled={loading}
            className="flex-1 bg-transparent border-none outline-none text-white text-sm md:text-base placeholder-slate-500 py-3"
          />

          <button
            onClick={handleAnalyze}
            disabled={loading || !url}
            className="ml-2 bg-gradient-to-r from-primary to-primaryHover hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] text-black font-bold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                <span>Scan</span>
              </div>
            ) : (
              "Analyze"
            )}
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="mt-8 text-center animate-fade-in">
            <div className="inline-block relative">
              <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="w-full h-full bg-primary animate-scan rounded-full origin-left"></div>
              </div>
              <p className="text-primary text-xs font-mono mt-4 animate-pulse">
                SCANNING TARGET...
              </p>
            </div>
          </div>
        )}

        {/* Result Card */}
        {result && !loading && <ResultCard result={result} />}
      </div>

      {/* Footer */}
      <footer className="fixed bottom-4 text-center w-full z-0 pointer-events-none">
        <p className="text-[10px] text-slate-600 font-mono uppercase tracking-[0.2em]">
          System Secure • Ver 2.0
        </p>
      </footer>
    </div>
  );
}

export default App;
