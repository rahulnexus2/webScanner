export const getGrade = (score) => {
    if (score >= 97) return "A+";
    if (score >= 93) return "A";
    if (score >= 90) return "A-";
    if (score >= 87) return "B+";
    if (score >= 83) return "B";
    if (score >= 80) return "B-";
    if (score >= 77) return "C+";
    if (score >= 73) return "C";
    if (score >= 70) return "C-";
    if (score >= 60) return "D";
    return "F";
};

export const getGradeColor = (grade) => {
    if (grade.startsWith("A")) return "text-success border-success/30 bg-success/10";
    if (grade.startsWith("B")) return "text-primary border-primary/30 bg-primary/10";
    if (grade.startsWith("C")) return "text-warning border-warning/30 bg-warning/10";
    if (grade.startsWith("D")) return "text-orange-500 border-orange-500/30 bg-orange-500/10";
    return "text-danger border-danger/30 bg-danger/10";
};

export const getGradeSummary = (grade) => {
    if (grade.startsWith("A")) return "Excellent Trustworthiness. This site has strong security indicators.";
    if (grade.startsWith("B")) return "Good Trustworthiness. Generally safe but minor issues found.";
    if (grade.startsWith("C")) return "Moderate Risk. Proceed with caution.";
    if (grade.startsWith("D")) return "High Risk. Significant security gaps detected.";
    return "Critical Risk. Do not trust this website.";
};
