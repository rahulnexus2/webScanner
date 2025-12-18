const ScoreRing = ({ score }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score >= 80) return "#00ff9d"; // Success Neon
    if (score >= 50) return "#ffbe0b"; // Warning Neon
    return "#ff0055"; // Danger Neon
  };

  const color = getColor();

  return (
    <div className="relative flex items-center justify-center">
      {/* Glow Effect */}
      <div
        className="absolute inset-0 rounded-full blur-xl opacity-20"
        style={{ backgroundColor: color }}
      ></div>

      <svg width="120" height="120" className="relative transform -rotate-90">
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#1e293b"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0 0 6px ${color})`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span
          className="text-3xl font-bold"
          style={{ color: color, textShadow: `0 0 10px ${color}40` }}
        >
          {score}
        </span>
        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
          Score
        </span>
      </div>
    </div>
  );
};

export default ScoreRing;
