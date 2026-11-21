export const FALLBACK_TIP = {
    setup: "Порада від PyLearn:",
    punchline: "Завжди використовуйте 4 пробіли для відступів у Python замість табуляції!"
};

export async function fetchDailyTip() {
    try {
        const response = await fetch("https://official-joke-api.appspot.com/jokes/programming/random", { cache: "no-store" });
        if (!response.ok) throw new Error("HTTP error " + response.status);
        const data = await response.json();
        return {
            setup: data.setup,
            punchline: data.punchline,
            isFallback: false
        };
    } catch (e) {
        console.warn("API unavailable, loading offline fallback", e);
        return { ...FALLBACK_TIP, isFallback: true };
    }
}
