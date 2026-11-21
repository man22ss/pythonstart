export function renderTheory(topic) {
    return `
        <div class="theory-card">
            <div class="theory-header">
                <span class="badge">Теоретичний конспект</span>
                <button id="btn-theory-back" class="btn btn-secondary btn-sm">← До каталогу</button>
            </div>
            <h2>${topic.title}</h2>
            <p class="theory-summary">${topic.theory.summary}</p>
            <div class="code-container">
                <div class="code-header">
                    <span>Python 3</span>
                    <span class="copy-badge">Синтаксис</span>
                </div>
                <pre class="code-block"><code>${topic.theory.codeExample}</code></pre>
            </div>
            <div class="theory-actions">
                <button id="btn-theory-back-bottom" class="btn btn-secondary">← До каталогу тем</button>
                <button id="start-quiz-btn" class="btn btn-primary">Почати тестування →</button>
            </div>
        </div>
    `;
}
