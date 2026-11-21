import { state } from "./state.js";
import { loadTopics } from "./topics.js";
import { showScreen } from "./ui.js";
import { renderTheory } from "./theory.js";
import { validateAnswer, calculateScorePercentage } from "./quiz.js";
import { fetchDailyTip } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
    state.initProgress();
    await loadTopics();
    initDailyTip();
    renderCatalog();
    showScreen("catalog-screen");

    // Загальні слухачі
    const backBtn = document.getElementById("back-to-catalog-btn");
    if (backBtn) {
        backBtn.addEventListener("click", () => {
            renderCatalog();
            showScreen("catalog-screen");
        });
    }

    const retryBtn = document.getElementById("retry-topic-btn");
    if (retryBtn) {
        retryBtn.addEventListener("click", () => {
            if (state.currentTopicId) {
                openTopic(state.currentTopicId);
            }
        });
    }
});

/**
 * Отримує щоденну пораду через REST API та відображає її
 */
async function initDailyTip() {
    const tipBanner = document.getElementById("daily-tip-banner");
    if (!tipBanner) return;
    try {
        const tip = await fetchDailyTip();
        tipBanner.innerHTML = `
            <div class="tip-content">
                <span class="tip-badge">${tip.isFallback ? "Офлайн-порада" : "REST API"}</span>
                <strong>${tip.setup}</strong> ${tip.punchline}
            </div>
        `;
        tipBanner.classList.remove("hidden");
    } catch (e) {
        console.warn("Could not render daily tip", e);
    }
}

/**
 * Рендерить картки каталогу тем з актуальним прогресом
 */
function renderCatalog() {
    const grid = document.getElementById("topics-grid");
    if (!grid) return;

    grid.innerHTML = "";
    state.topicsData.forEach((topic, idx) => {
        const card = document.createElement("div");
        card.className = "topic-card";

        const prog = state.progress ? state.progress[topic.id] : null;
        let progressBadge = "";
        if (prog) {
            progressBadge = `<span class="badge badge-success">Пройдено: ${prog.score}/${prog.total} (${prog.percentage}%)</span>`;
        } else {
            progressBadge = `<span class="badge">Тема ${idx + 1}</span>`;
        }

        card.innerHTML = `
            <div class="card-header">
                ${progressBadge}
            </div>
            <h3>${topic.title}</h3>
            <p>${topic.desc}</p>
            <button class="btn btn-primary" data-topic="${topic.id}">
                ${prog ? "Пройти знову" : "Вивчати тему"}
            </button>
        `;

        const btn = card.querySelector("button");
        btn.addEventListener("click", () => openTopic(topic.id));
        grid.appendChild(card);
    });
}

/**
 * Відкриває екран теорії для обраної теми
 */
function openTopic(topicId) {
    const topic = state.topicsData.find(t => t.id === topicId) || state.topicsData[0];
    if (!topic) return;

    state.currentTopicId = topic.id;
    state.currentQuestionIndex = 0;
    state.score = 0;

    const theoryContainer = document.getElementById("theory-content");
    if (theoryContainer) {
        theoryContainer.innerHTML = renderTheory(topic);

        // Кнопки повернення
        const backBtnTop = document.getElementById("btn-theory-back");
        if (backBtnTop) {
            backBtnTop.addEventListener("click", () => {
                renderCatalog();
                showScreen("catalog-screen");
            });
        }
        const backBtnBottom = document.getElementById("btn-theory-back-bottom");
        if (backBtnBottom) {
            backBtnBottom.addEventListener("click", () => {
                renderCatalog();
                showScreen("catalog-screen");
            });
        }

        // Кнопка початку квізу
        const startBtn = document.getElementById("start-quiz-btn");
        if (startBtn) {
            startBtn.addEventListener("click", () => startQuiz(topic));
        }
    }

    showScreen("theory-screen");
}

/**
 * Запускає процес проходження квізу
 */
function startQuiz(topic) {
    state.currentQuestionIndex = 0;
    state.score = 0;
    showScreen("quiz-screen");
    renderQuestion(topic);
}

/**
 * Відображає поточне питання
 */
function renderQuestion(topic) {
    const questions = topic.questions || [];
    if (state.currentQuestionIndex >= questions.length) {
        showResults(topic);
        return;
    }

    const q = questions[state.currentQuestionIndex];

    // Заголовок та прогрес
    const header = document.getElementById("question-header");
    const progressPercent = Math.round(((state.currentQuestionIndex + 1) / questions.length) * 100);
    if (header) {
        header.innerHTML = `
            <div class="quiz-info">
                <span class="topic-tag">${topic.title}</span>
                <span class="question-counter">Питання ${state.currentQuestionIndex + 1} з ${questions.length}</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progressPercent}%"></div>
            </div>
        `;
    }

    // Текст питання
    const textEl = document.getElementById("question-text");
    if (textEl) textEl.textContent = q.question;

    // Блок коду питання
    const codeContainer = document.getElementById("question-code");
    const codeEl = codeContainer ? codeContainer.querySelector("code") : null;
    if (codeContainer && codeEl) {
        if (q.code) {
            codeEl.textContent = q.code;
            codeContainer.classList.remove("hidden");
        } else {
            codeContainer.classList.add("hidden");
        }
    }

    // Скидання зворотного зв'язку та кнопки "Далі"
    const feedback = document.getElementById("feedback");
    if (feedback) {
        feedback.classList.add("hidden");
        feedback.className = "feedback hidden";
        feedback.innerHTML = "";
    }

    const nextBtn = document.getElementById("next-btn");
    if (nextBtn) {
        nextBtn.classList.add("hidden");
    }

    // Рендеринг варіантів відповідей
    const optionsContainer = document.getElementById("options-container");
    if (optionsContainer) {
        optionsContainer.innerHTML = "";
        q.options.forEach(optText => {
            const btn = document.createElement("button");
            btn.className = "option-btn";
            btn.textContent = optText;

            btn.addEventListener("click", () => {
                // Блокуємо повторні кліки
                optionsContainer.querySelectorAll(".option-btn").forEach(b => {
                    b.disabled = true;
                });

                const isCorrect = validateAnswer(optText, q.correctAnswer);
                if (isCorrect) {
                    state.score++;
                    btn.classList.add("correct");
                    feedback.className = "feedback feedback-correct";
                    feedback.innerHTML = "<strong>✅ Чудово!</strong> Правильна відповідь.";
                } else {
                    btn.classList.add("wrong");
                    // Підсвічуємо правильну відповідь
                    optionsContainer.querySelectorAll(".option-btn").forEach(b => {
                        if (validateAnswer(b.textContent, q.correctAnswer)) {
                            b.classList.add("correct");
                        }
                    });
                    feedback.className = "feedback feedback-wrong";
                    feedback.innerHTML = `<strong>❌ Неправильно.</strong> ${q.explanation || ""}`;
                }

                feedback.classList.remove("hidden");

                if (nextBtn) {
                    nextBtn.classList.remove("hidden");
                    const isLast = state.currentQuestionIndex + 1 === questions.length;
                    nextBtn.textContent = isLast ? "Подивитися результат 🎉" : "Наступне завдання →";
                    nextBtn.onclick = () => {
                        state.currentQuestionIndex++;
                        if (state.currentQuestionIndex < questions.length) {
                            renderQuestion(topic);
                        } else {
                            showResults(topic);
                        }
                    };
                }
            });

            optionsContainer.appendChild(btn);
        });
    }
}

/**
 * Відображає екран підсумків
 */
function showResults(topic) {
    const total = topic.questions.length;
    const percent = calculateScorePercentage(state.score, total);

    state.saveProgress(topic.id, state.score, total);

    const scoreEl = document.getElementById("result-score");
    if (scoreEl) {
        let comment = "";
        if (percent === 100) {
            comment = "Ідеальний результат! Ви бездоганно засвоїли всі нюанси теми.";
        } else if (percent >= 60) {
            comment = "Гарний результат! Базові концепції засвоєно успішно.";
        } else {
            comment = "Варто ще раз переглянути теоретичний конспект та пройти тест повторно.";
        }

        scoreEl.innerHTML = `
            <div class="result-score-circle">
                <span class="score-main">${state.score} / ${total}</span>
                <span class="score-sub">${percent}% успішності</span>
            </div>
            <p class="result-comment">${comment}</p>
        `;
    }

    showScreen("result-screen");
}
