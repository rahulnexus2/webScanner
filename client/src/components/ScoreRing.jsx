import React from "react";

const getColor = (status) => {
  switch (status) {
    case "Safe":
      return "text-primary";
    case "Suspicious":
      return "text-warning";
    case "Dangerous":
      return "text-danger";
    default:
      return "text-slate-500";
  }
};

const ScoreRing = ({ score, status }) => {
  const radius = 60;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
        <circle
          stroke="currentColor"
          className="text-white/5"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="currentColor"
          className={`${getColor(status)} transition-all duration-1000 ease-out`}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-black text-white tracking-tighter">
          {score}
        </span>
      </div>
    </div>
  );
};

export default ScoreRing;
