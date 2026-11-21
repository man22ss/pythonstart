export function renderTheory(topic) {
    return `
        <div class="theory-card">
            <h2>${topic.title}</h2>
            <p>${topic.theory.summary}</p>
            <pre><code>${topic.theory.codeExample}</code></pre>
            <button id="start-quiz-btn" class="btn btn-primary">Почати вправу</button>
        </div>
    `;
}
