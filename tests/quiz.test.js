import { describe, it, expect } from "vitest";
import { validateAnswer, calculateScorePercentage } from "../src/js/quiz.js";

describe("Тестування бізнес-логіки тренажера PyLearn (Lab 11)", () => {
    it("Коректно перевіряє правильну текстову відповідь", () => {
        expect(validateAnswer("float", "float")).toBe(true);
        expect(validateAnswer("4", "4")).toBe(true);
    });

    it("Ігнорує регістр літер та випадкові пробіли", () => {
        expect(validateAnswer(" FLOAT ", "float")).toBe(true);
        expect(validateAnswer("int", "INT")).toBe(true);
    });

    it("Повертає false для неправильної відповіді або null", () => {
        expect(validateAnswer("str", "int")).toBe(false);
        expect(validateAnswer(null, "float")).toBe(false);
        expect(validateAnswer("", "int")).toBe(false);
    });

    it("Точно розраховує відсоток успішності", () => {
        expect(calculateScorePercentage(2, 2)).toBe(100);
        expect(calculateScorePercentage(1, 2)).toBe(50);
        expect(calculateScorePercentage(0, 5)).toBe(0);
    });

    it("Захищає від ділення на нуль при відсутності питань", () => {
        expect(calculateScorePercentage(0, 0)).toBe(0);
    });
});
