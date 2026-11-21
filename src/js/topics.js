import { state } from "./state.js";

export async function loadTopics() {
    try {
        const res = await fetch("./data/topics.json");
        state.topicsData = await res.json();
    } catch (e) {
        console.warn("Using fallback local data", e);
    }
}
