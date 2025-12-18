import ScoreRing from "./ScoreRing";

const ResultCard = ({ result }) => {
  if (!result) return null;

  const { score, technical, urlAnalysis } = result;

  const status =
    score >= 75 ? "Safe" : score >= 40 ? "Suspicious" : "Dangerous";

  const statusBadge = {
    Safe: "bg-success/10 text-success border-success/20",
    Suspicious: "bg-warning/10 text-warning border-warning/20",
    Dangerous: "bg-danger/10 text-danger border-danger/20",
  };

  // 🔑 Derived reasons from backend data
  const reasons = [
    {
      text: technical?.ssl?.valid
        ? "Valid SSL certificate detected"
        : "Invalid or missing SSL certificate",
      good: technical?.ssl?.valid,
    },
    {
      text: technical?.age
        ? `Domain age is ${technical.age} years`
        : "Domain age information unavailable",
      good: technical?.age >= 1,
    },
    {
      text: urlAnalysis?.hasSuspicious
        ? "Suspicious keywords detected in URL"
        : "No suspicious keywords found",
      good: !urlAnalysis?.hasSuspicious,
    },
    {
      text:
        urlAnalysis?.dots <= 2
          ? "Clean domain structure"
          : "Too many subdomains detected",
      good: urlAnalysis?.dots <= 2,
    },
    {
      text:
        urlAnalysis?.length < 75
          ? "URL length appears normal"
          : "URL length is unusually long",
      good: urlAnalysis?.length < 75,
    },
  ];

  return (
    <div className="glass mt-8 p-6 rounded-2xl w-full max-w-lg mx-auto animate-fade-in">
      <div className="flex flex-col items-center">

        {/* Score Ring */}
        <div className="mb-6 relative">
          <ScoreRing score={score} />
        </div>

        {/* Status Pill */}
        <div
          className={`px-4 py-1.5 rounded-full border text-sm font-bold tracking-wide uppercase mb-6 ${statusBadge[status]}`}
        >
          {status}
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-white/90">
            Analysis Report
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Trust score generated using backend security analysis.
          </p>
        </div>

        {/* Reasons List */}
        <div className="w-full space-y-3">
          {reasons.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-white/5 p-3 rounded-lg border border-white/5 hover:border-white/10 transition-colors animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-slate-300 w-3/4 truncate">
                  {item.text}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {item.good ? "PASS" : "FLAG"}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-800/50 rounded-full h-1 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    item.good ? "bg-success w-full" : "bg-danger w-1/3"
                  }`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-[10px] text-slate-500">
            *This score is an estimate based on technical security indicators.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
