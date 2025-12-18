import ScoreRing from "./ScoreRing";
import ReasonItem from "./ReasonItem";

const AnalysisDashboard = ({ result }) => {
  const { score, status, confidence, reasons, details } = result;

  const isSafe = status === "Safe";
  const isDangerous = status === "Dangerous";

  const statusColor = isSafe ? "text-primary" : isDangerous ? "text-danger" : "text-warning";
  const borderColor = isSafe ? "border-primary/30" : isDangerous ? "border-danger/30" : "border-warning/30";

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up">

      {/* LEFT COLUMN: Score & Core Status */}
      <div className={`col-span-1 lg:col-span-1 glass rounded-2xl p-6 flex flex-col items-center justify-center text-center border ${borderColor} relative overflow-hidden group`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${isSafe ? "from-primary/5" : "from-danger/5"} to-transparent opacity-50`}></div>

        <ScoreRing score={score} status={status} />

        <div className="mt-6 z-10">
          <h2 className={`text-3xl font-bold tracking-tight ${statusColor} mb-2`}>{status}</h2>
          <div className="flex items-center justify-center gap-2">
            <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-mono text-slate-400 border border-white/10">
              CONFIDENCE: <span className="text-white">{confidence.toUpperCase()}</span>
            </span>
          </div>
        </div>
      </div>

      {/* MIDDLE & RIGHT: Details Grid */}
      <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Domain Identity Card */}
        <div className="glass rounded-xl p-5 border border-white/10 hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-3 mb-4 text-slate-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <h3 className="text-sm font-bold tracking-wider uppercase">Domain Identity</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-sm text-slate-500">Domain</span>
              <span className="text-sm font-mono text-white">{details.domain}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-sm text-slate-500">Age</span>
              <span className="text-sm font-mono text-white max-w-[150px] truncate" title={details.domainAge}>{details.domainAge}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-sm text-slate-500">Registrar</span>
              <span className="text-sm font-mono text-white max-w-[150px] truncate" title={details.registrar}>{details.registrar}</span>
            </div>
          </div>
        </div>

        {/* Security / Infrastructure Card */}
        <div className="glass rounded-xl p-5 border border-white/10 hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-3 mb-4 text-slate-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            <h3 className="text-sm font-bold tracking-wider uppercase">Security & Tech</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-sm text-slate-500">SSL Issuer</span>
              <span className="text-sm font-mono text-white max-w-[150px] truncate" title={details.sslIssuer}>{details.sslIssuer || "N/A"}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-sm text-slate-500">Safe Browsing</span>
              <span className={`text-sm font-mono font-bold ${details.safeBrowsing === "Clean" ? "text-success" : "text-danger"}`}>
                {details.safeBrowsing}
              </span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-sm text-slate-500">Server</span>
              <span className="text-sm font-mono text-white">{details.serverLocation}</span>
            </div>
          </div>
        </div>

        {/* Key Findings (Full Width) */}
        <div className="col-span-1 md:col-span-2 glass rounded-xl p-5 border border-white/10">
          <div className="flex items-center gap-3 mb-4 text-slate-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
            <h3 className="text-sm font-bold tracking-wider uppercase">Analysis Report</h3>
          </div>

          {reasons && reasons.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {reasons.map((reason, index) => (
                <ReasonItem key={index} type={reason.type} message={reason.message} />
              ))}
            </ul>
          ) : (
            <p className="text-slate-500 italic">No significant anomalies detected.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default AnalysisDashboard;
