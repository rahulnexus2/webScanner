import ScoreRing from "./ScoreRing";
import ConfidenceBadge from "./ConfidenceBadge";
import ReasonItem from "./ReasonItem";

const statusStyles = {
  Safe: "bg-green-500/10 text-green-400 border-green-500/30",
  Suspicious: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  Dangerous: "bg-red-500/10 text-red-400 border-red-500/30",
};

const ResultCard = ({ result }) => {
  if (!result) return null;

  const { score, status, confidence, reasons } = result;

  return (
    <div className="glass mt-8 p-6 rounded-2xl w-full max-w-lg mx-auto animate-fade-in">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">
          Website Trust Analysis
        </h2>

        <span
          className={`px-3 py-1 text-sm rounded-full border font-medium ${statusStyles[status]}`}
        >
          {status}
        </span>
      </div>

      {/* Score + Confidence */}
      <div className="flex flex-col items-center gap-3 my-6">
        <ScoreRing score={score} status={status} />
        <ConfidenceBadge confidence={confidence} />
      </div>

      {/* Reasons */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-white mb-3">
          Key Findings
        </h3>

        {reasons && reasons.length > 0 ? (
          <ul className="space-y-2">
            {reasons.map((reason, index) => (
              <ReasonItem
                key={index}
                type={reason.type}
                message={reason.message}
              />
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-300">
            No significant risk factors detected.
          </p>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
