
const confidenceStyles = {
  High: "bg-green-500/10 text-green-400 border-green-500/30",
  Medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  Low: "bg-red-500/10 text-red-400 border-red-500/30",
};

const ConfidenceBadge = ({ confidence }) => {
  if (!confidence) return null;

  return (
    <span
      className={`px-3 py-1 text-sm rounded-full border font-medium ${confidenceStyles[confidence]}`}
    >
      Confidence: {confidence}
    </span>
  );
};

export default ConfidenceBadge;
