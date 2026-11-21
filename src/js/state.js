export const state = {
    currentTopicId: null,
    currentQuestionIndex: 0,
    score: 0,
    topicsData: [],
    progress: {},

    initProgress() {
        try {
            const raw = localStorage.getItem("pylearn_progress");
            this.progress = raw ? JSON.parse(raw) : {};
        } catch (e) {
            this.progress = {};
        }
    },

    saveProgress(topicId, score, total) {
        if (!this.progress) this.progress = {};
        this.progress[topicId] = {
            score,
            total,
            percentage: Math.round((score / total) * 100),
            updatedAt: new Date().toISOString()
        };
        try {
            localStorage.setItem("pylearn_progress", JSON.stringify(this.progress));
        } catch (e) {
            console.warn("Could not save to localStorage", e);
        }
    }
};
