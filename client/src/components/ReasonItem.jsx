const severityStyles = {
  info: {
    color: "text-blue-400",
    icon: (
      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
  },
  risk: {
    color: "text-warning",
    icon: (
      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    ),
  },
  severe: {
    color: "text-danger",
    icon: (
      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
  },
};

const ReasonItem = ({ type, message }) => {
  const style = severityStyles[type] || severityStyles.info;

  return (
    <li className={`flex items-start gap-3 p-3 rounded-lg bg-surfaceHighlight/50 border border-white/5 ${style.color}`}>
      {style.icon}
      <span className="text-sm font-medium text-slate-300 leading-tight">{message}</span>
    </li>
  );
};

export default ReasonItem;
