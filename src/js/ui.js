import { state } from "./state.js";

export function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
    const target = document.getElementById(screenId);
    if (target) target.classList.remove("hidden");
}
