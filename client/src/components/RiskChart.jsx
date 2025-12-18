import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

const RiskChart = ({ score, details }) => {
    // Normalize data for the chart
    // In a real app, these specific category scores would come from the backend.
    // For now, we simulate them based on the total score and available details.

    const safeScore = score;
    const techScore = details?.ssl?.valid ? 100 : 20;
    // Age > 1 year roughly 100, else lower
    const trustScore = (details?.age && !details.age.includes("Unknown")) ? 90 : 40;
    const contentScore = score > 60 ? 90 : 50; // Approximated
    const reputationScore = score > 80 ? 95 : (score > 40 ? 60 : 20);

    const data = [
        { subject: "Technical", A: techScore, fullMark: 100 },
        { subject: "Domain Trust", A: trustScore, fullMark: 100 },
        { subject: "Content", A: contentScore, fullMark: 100 },
        { subject: "Reputation", A: reputationScore, fullMark: 100 },
        { subject: "Safety", A: safeScore, fullMark: 100 },
    ];

    return (
        <div className="w-full h-[300px] flex flex-col items-center justify-center">
            <h4 className="text-sm uppercase tracking-widest text-slate-400 font-semibold mb-2">
                Security Vector Analysis
            </h4>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                        name="Score"
                        dataKey="A"
                        stroke="#00f0ff"
                        strokeWidth={2}
                        fill="#00f0ff"
                        fillOpacity={0.3}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff' }}
                        itemStyle={{ color: '#00f0ff' }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RiskChart;
