import ScoreRing from "./ScoreRing";

const ResultCard = ({ result }) => {
  const statusBadge = {
    Safe: "bg-success/10 text-success border-success/20",
    Suspicious: "bg-warning/10 text-warning border-warning/20",
    Dangerous: "bg-danger/10 text-danger border-danger/20",
  };

  return (
    <div className="glass mt-8 p-6 rounded-2xl w-full max-w-lg mx-auto animate-fade-in">
      <div className="flex flex-col items-center">
        {/* Score Ring */}
        <div className="mb-6 relative">
          <ScoreRing score={result.score} />
        </div>

        {/* Status Pill */}
        <div
          className={`px-4 py-1.5 rounded-full border text-sm font-bold tracking-wide uppercase mb-6 ${statusBadge[result.status] || "bg-slate-700 text-slate-300 border-slate-600"
            }`}
        >
          {result.status}
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-white/90">
            {result.details?.title || "Analysis Report"}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Trust score generated based on multi-factor analysis.
          </p>
        </div>

        {/* Technical Details Grid */}
        <div className="w-full grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-center">
            <p className="text-[10px] text-slate-500 uppercase font-bold">Domain Age</p>
            <p className="text-sm font-mono text-white mt-1">
              {result.details?.age || "Unknown"}
            </p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-center">
            <p className="text-[10px] text-slate-500 uppercase font-bold">SSL Status</p>
            <p className={`text-sm font-mono mt-1 ${result.details?.ssl?.valid ? 'text-success' : 'text-danger'}`}>
              {result.details?.ssl?.valid ? "Valid" : "Invalid/Missing"}
            </p>
          </div>
        </div>

        {/* Reasons List */}
        <div className="w-full space-y-3">
          {result.reasons.map((reason, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-white/5 p-3 rounded-lg border border-white/5 hover:border-white/10 transition-colors animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-slate-300 w-3/4 truncate">
                  {reason}
                </span>
                {/* <span className="text-[10px] text-slate-500 font-mono">
                  DETECTED
                </span> */}
              </div>

              {/* Progress Bar (Visual Indicator) */}
              <div className="w-full bg-slate-800/50 rounded-full h-1 overflow-hidden">
                <div
                  className={`h-full rounded-full ${reason.includes("not") || reason.includes("uncommon") || reason.includes("fail") || reason.includes("invalid")
                      ? "bg-danger w-full"
                      : "bg-success w-full"
                    }`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-[10px] text-slate-500">
            *This score is an estimate and does not guarantee safety.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
