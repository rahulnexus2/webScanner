import ScoreRing from "./ScoreRing";
import RiskChart from "./RiskChart";
import { getGrade, getGradeColor, getGradeSummary } from "../utils/grading";
import { Shield, Lock, Globe, AlertTriangle, CheckCircle, XCircle, Search, Award } from "lucide-react";

const AnalysisDashboard = ({ result }) => {
    const grade = getGrade(result.score);
    const gradeColor = getGradeColor(grade);

    const statusColors = {
        Safe: "text-success border-success/30 bg-success/10",
        Suspicious: "text-warning border-warning/30 bg-warning/10",
        Dangerous: "text-danger border-danger/30 bg-danger/10",
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "Safe": return <CheckCircle className="w-5 h-5" />;
            case "Suspicious": return <AlertTriangle className="w-5 h-5" />;
            case "Dangerous": return <XCircle className="w-5 h-5" />;
            default: return <Search className="w-5 h-5" />;
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto mt-8 animate-slide-up pb-10 px-2 lg:px-0">

            {/* Dashboard Header */}
            <div className="glass rounded-xl p-6 mb-6 flex flex-col items-center justify-between gap-6 md:flex-row">

                {/* Left: Identity */}
                <div className="flex items-center gap-5 w-full md:w-auto">
                    <div className={`p-4 rounded-2xl ${gradeColor} border backdrop-blur-3xl shadow-[0_0_30px_rgba(0,0,0,0.3)]`}>
                        <div className="text-center">
                            <p className="text-[10px] uppercase font-bold tracking-widest opacity-70">Grade</p>
                            <h1 className="text-4xl font-black tracking-tighter leading-none mt-1">{grade}</h1>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight truncate max-w-[200px] md:max-w-md">
                            {result.details?.title || "Target Analyzed"}
                        </h2>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                            <span className="text-slate-400 text-xs font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5">
                                {new URL(result.details?.ssl?.fingerprint ? 'https://example.com' : 'http://unknown').protocol === 'https:' ? 'HTTPS Secured' : 'Target URL'}
                            </span>
                            <span className={`text-[10px] font-bold uppercase tracking-wider border px-2 py-0.5 rounded-full ${statusColors[result.status]}`}>
                                {result.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right: Score */}
                <div className="flex items-center gap-6 border-l pl-6 border-white/5">
                    <div className="text-right hidden md:block">
                        <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Trust Score</p>
                        <p className="text-xs text-slate-500 max-w-[150px] leading-tight text-right">
                            {getGradeSummary(grade)}
                        </p>
                    </div>
                    <div className="transform scale-110">
                        <ScoreRing score={result.score} />
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* Left Column: Key Metrics */}
                <div className="md:col-span-4 space-y-6">
                    {/* Technical Card */}
                    <div className="glass rounded-xl p-5 border-l-4 border-l-primary/50 hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-2 mb-4">
                            <Lock className="w-4 h-4 text-primary" />
                            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Technical Security</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-black/20 rounded-lg border border-white/5">
                                <span className="text-sm text-slate-400">SSL Certificate</span>
                                {result.details?.ssl?.valid ? (
                                    <span className="text-xs font-bold text-success bg-success/10 px-2 py-1 rounded flex items-center gap-1">
                                        <CheckCircle className="w-3 h-3" /> VALID
                                    </span>
                                ) : (
                                    <span className="text-xs font-bold text-danger bg-danger/10 px-2 py-1 rounded">INVALID</span>
                                )}
                            </div>
                            <div className="flex justify-between items-center p-3 bg-black/20 rounded-lg border border-white/5">
                                <span className="text-sm text-slate-400">Issuer</span>
                                <span className="text-xs text-white max-w-[120px] truncate" title={result.details?.ssl?.issuer?.O || "Unknown"}>
                                    {result.details?.ssl?.issuer?.O || "Unknown"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Domain Card */}
                    <div className="glass rounded-xl p-5 border-l-4 border-l-secondary/50 hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-2 mb-4">
                            <Globe className="w-4 h-4 text-secondary" />
                            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Domain Intelligence</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-black/20 rounded-lg border border-white/5">
                                <span className="text-sm text-slate-400">Domain Age</span>
                                <span className="text-xs font-mono text-white">
                                    {result.details?.age || "Unknown"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-black/20 rounded-lg border border-white/5">
                                <span className="text-sm text-slate-400">Registrar</span>
                                <span className="text-xs text-white max-w-[120px] truncate" title="To be implemented">
                                    Hidden (Privacy)
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Recommendation Card (New) */}
                    <div className="glass rounded-xl p-5 border-l-4 border-l-slate-500/50">
                        <div className="flex items-center gap-2 mb-2">
                            <Award className="w-4 h-4 text-slate-400" />
                            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Verdict</h3>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            {getGradeSummary(grade)}
                        </p>
                    </div>
                </div>

                {/* Center/Right Column: Visualization & Content */}
                <div className="md:col-span-8 space-y-6">

                    {/* Risk Chart Section */}
                    <div className="glass rounded-xl p-1 relative overflow-hidden min-h-[340px] flex items-center justify-center">
                        <div className="absolute top-0 right-0 p-4 opacity-50">
                            <Shield className="w-24 h-24 text-slate-700/20" />
                        </div>
                        <RiskChart score={result.score} details={result.details} />
                    </div>

                    {/* Detailed Log Findings */}
                    <div className="glass rounded-xl p-6">
                        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Search className="w-4 h-4" />
                            Analysis Log
                        </h3>
                        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {result.reasons.map((reason, index) => (
                                <div key={index} className="flex items-start gap-3 p-3 bg-black/20 rounded-lg hover:bg-white/5 transition-colors border border-white/5">
                                    <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ${reason.toLowerCase().includes('valid') || reason.toLowerCase().includes('old') || reason.toLowerCase().includes('accessible') || reason.toLowerCase().includes('high trust')
                                            ? 'bg-success shadow-[0_0_8px_rgba(0,255,157,0.5)]'
                                            : 'bg-danger shadow-[0_0_8px_rgba(255,0,85,0.5)]'
                                        }`}></div>
                                    <div>
                                        <p className="text-sm text-slate-300 font-light">{reason}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default AnalysisDashboard;
