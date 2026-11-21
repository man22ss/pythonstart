import { loadTopics } from "./topics.js";
import { showScreen } from "./ui.js";

document.addEventListener("DOMContentLoaded", async () => {
    await loadTopics();
    showScreen("catalog-screen");
});
