export function validateAnswer(selected, correct) {
    if (!selected) return false;
    return String(selected).trim().toLowerCase() === String(correct).trim().toLowerCase();
}

export function calculateScorePercentage(score, total) {
    if (!total || total <= 0) return 0;
    return Math.round((score / total) * 100);
}
