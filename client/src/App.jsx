import { useState } from "react";
import { analyzeUrl } from "./utils/api";
import AnalysisDashboard from "./components/AnalysisDashboard";
import Background from "./components/Background";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isValidUrl = (value) => {
    try {
      new URL(value.startsWith("http") ? value : `https://${value}`);
      return true;
    } catch {
      return false;
    }
  };

  const handleAnalyze = async () => {
    if (!url) return;

    if (!isValidUrl(url)) {
      setError("Please enter a valid website URL");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      // ⏳ Scanning Simulation for UX
      await new Promise((res) => setTimeout(res, 1200));

      const analysis = await analyzeUrl(url);
      setResult(analysis);
    } catch (err) {
      console.error(err);
      setError("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center p-4 sm:p-8 font-sans overflow-hidden">
      <Background />

      {/* Hero Section */}
      <div
        className={`w-full max-w-4xl flex flex-col items-center transition-all duration-700 ease-in-out ${result || loading ? "mt-4 scale-95" : "mt-[15vh]"
          }`}
      >
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-primary/20 blur-[40px] rounded-full animate-pulse-slow"></div>
          <h1 className="relative text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 text-center">
            TrustLens
          </h1>
        </div>

        <p className="text-slate-400 text-lg md:text-xl font-light tracking-wide text-center max-w-lg mb-10">
          Professional Grade Website Legitimacy Analysis
        </p>

        {/* Input Bar */}
        <div className={`w-full max-w-xl relative group z-20 ${loading ? 'pointer-events-none' : ''}`}>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-50 blur group-hover:opacity-75 transition duration-500"></div>
          <div className="relative flex items-center bg-surfaceHighlight rounded-xl p-2 shadow-2xl border border-white/10">
            <div className="pl-4 text-slate-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <input
              type="text"
              placeholder="Enter website URL (e.g. apple.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
              className="flex-1 bg-transparent border-none outline-none text-white text-base md:text-lg px-4 py-3 placeholder:text-slate-600 font-mono"
            />

            <button
              onClick={handleAnalyze}
              disabled={loading || !url}
              className="px-6 py-3 rounded-lg bg-primary hover:bg-primaryHover text-slate-950 font-bold tracking-wide transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] disabled:opacity-50 disabled:shadow-none"
            >
              {loading ? "SCANNING" : "ANALYZE"}
            </button>
          </div>
        </div>

        {/* Demo Scenarios */}
        <div className={`mt-6 flex flex-wrap justify-center gap-3 transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}>
          <button onClick={() => setUrl("https://google.com")} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-slate-400 hover:text-primary hover:border-primary/50 transition-colors">
            🛡️ Safe Site
          </button>
          <button onClick={() => setUrl("http://testsafebrowsing.appspot.com/s/phishing.html")} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-slate-400 hover:text-danger hover:border-danger/50 transition-colors">
            ⛔ Phishing Test
          </button>
          <button onClick={() => setUrl("https://expired.badssl.com/")} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-slate-400 hover:text-warning hover:border-warning/50 transition-colors">
            ⚠️ Expired SSL
          </button>
          <button onClick={() => setUrl("http://secure-login-update-bank-verify.com")} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-slate-400 hover:text-secondary hover:border-secondary/50 transition-colors">
            🔍 Suspicious URL
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm flex items-center animate-fade-in-up">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            {error}
          </div>
        )}
      </div>

      {/* Scanning Overlay */}
      {loading && (
        <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-1 bg-primary/20 absolute top-1/2 -translate-y-1/2 animate-scan-line shadow-[0_0_20px_#06b6d4]"></div>
          <div className="text-primary font-mono tracking-[0.3em] text-xs absolute bottom-10 animate-pulse">
            ESTABLISHING SECURE CONNECTION...
          </div>
        </div>
      )}

      {/* Dashboard Result */}
      {result && !loading && (
        <div className="w-full max-w-5xl mt-10 animate-fade-in-up z-10 pb-20">
          <AnalysisDashboard result={result} />
        </div>
      )}

      {/* Footer */}
      <div className="fixed bottom-4 left-0 w-full text-center pointer-events-none opacity-30">
        <p className="text-[10px] font-mono text-slate-500">TRUSTLENS SYSTEM v3.0 // SECURE</p>
      </div>
    </div>
  );
}

export default App;
