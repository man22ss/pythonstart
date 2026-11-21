import { state } from "./state.js";

export const FALLBACK_TOPICS = [
  {
    "id": "variables",
    "title": "Змінні та базові типи",
    "desc": "Цілі числа int, дробові float, рядки str та логічні bool.",
    "theory": {
      "summary": "У Python змінні створюються автоматично під час присвоєння значення за допомогою оператора =. Тип даних визначається інтерпретатором автоматично (динамічна типізація).",
      "codeExample": "age = 15          # int (ціле число)\npi = 3.14         # float (дійсне число)\nname = 'Python'   # str (текстовий рядок)\nis_active = True  # bool (логічний тип)"
    },
    "questions": [
      {
        "id": "q1",
        "question": "Який тип даних отримає змінна price = 49.99?",
        "code": "price = 49.99",
        "options": ["int", "float", "str", "bool"],
        "correctAnswer": "float",
        "explanation": "Числа з десятковою крапкою в мові Python завжди належать до типу float."
      },
      {
        "id": "q2",
        "question": "Який результат виведе функція print(type('Hello'))?",
        "code": "print(type('Hello'))",
        "options": ["<class 'str'>", "<class 'int'>", "<class 'char'>", "<class 'text'>"],
        "correctAnswer": "<class 'str'>",
        "explanation": "Текстові значення, взяті в лапки, мають тип str (рядок)."
      },
      {
        "id": "q3",
        "question": "Чому дорівнює результат виконання bool(0)?",
        "code": "res = bool(0)",
        "options": ["True", "False", "None", "0"],
        "correctAnswer": "False",
        "explanation": "Число 0, порожні рядки та порожні колекції у логічному контексті дорівнюють False."
      }
    ]
  },
  {
    "id": "operators",
    "title": "Арифметичні операції",
    "desc": "Пріоритет операторів, цілочисельне ділення // та остача %.",
    "theory": {
      "summary": "Python підтримує стандартні математичні оператори: +, -, *, /, а також // (цілочисельне ділення), % (остача) та ** (піднесення до степеня).",
      "codeExample": "res1 = 17 // 5   # Результат: 3 (ціла частина)\nres2 = 17 % 5    # Результат: 2 (остача)\nres3 = 2 ** 3    # Результат: 8 (степінь)"
    },
    "questions": [
      {
        "id": "q4",
        "question": "Чому дорівнює вираз 19 // 4 у Python?",
        "code": "print(19 // 4)",
        "options": ["4.75", "4", "3", "5"],
        "correctAnswer": "4",
        "explanation": "Оператор // виконує цілочисельне ділення з відкиданням дробової частини."
      },
      {
        "id": "q5",
        "question": "Який результат поверне вираз 14 % 4?",
        "code": "print(14 % 4)",
        "options": ["2", "3", "3.5", "1"],
        "correctAnswer": "2",
        "explanation": "Оператор % повертає остачу від ділення: 14 = 3 * 4 + 2."
      },
      {
        "id": "q6",
        "question": "Чому дорівнює результат виразу: 2 + 3 * 4?",
        "code": "print(2 + 3 * 4)",
        "options": ["20", "14", "24", "18"],
        "correctAnswer": "14",
        "explanation": "Множення має вищий пріоритет за додавання: 3 * 4 = 12, далі 2 + 12 = 14."
      }
    ]
  },
  {
    "id": "conditions",
    "title": "Умовні оператори (if/else)",
    "desc": "Розгалуження в програмах, логічні умови and, or, not.",
    "theory": {
      "summary": "Конструкція if...elif...else дозволяє виконувати різні блоки команд залежно від істинності умови. Відступи в 4 пробіли є обов'язковими для виділення блоків коду.",
      "codeExample": "score = 85\nif score >= 90:\n    print('Відмінно')\nelif score >= 60:\n    print('Добре')\nelse:\n    print('Повторіть тему')"
    },
    "questions": [
      {
        "id": "q7",
        "question": "Яке ключове слово використовується в Python для перевірки додаткової умови?",
        "code": "if x > 0: ...\n[???] x == 0: ...",
        "options": ["else if", "elif", "elseif", "then"],
        "correctAnswer": "elif",
        "explanation": "В Python скорочення 'elif' використовується замість 'else if'."
      },
      {
        "id": "q8",
        "question": "Який результат виведе вираз: 5 > 3 and 2 > 4?",
        "code": "print(5 > 3 and 2 > 4)",
        "options": ["True", "False", "None", "Error"],
        "correctAnswer": "False",
        "explanation": "Оператор and вимагає істинності обох умов. Оскільки 2 > 4 є False, весь вираз дорівнює False."
      },
      {
        "id": "q9",
        "question": "Який оператор використовується для перевірки рівності двох значень?",
        "code": "x = 5\ny = 5\nres = (x [???] y)",
        "options": ["==", "=", "===", "is equal"],
        "correctAnswer": "==",
        "explanation": "Подвійний знак '==' використовується для перевірки рівності, а '=' — для присвоєння."
      }
    ]
  },
  {
    "id": "loops",
    "title": "Цикли for та while",
    "desc": "Повторення дій, функція range() та обхід послідовностей.",
    "theory": {
      "summary": "Цикл for використовується для обходу послідовностей (наприклад, range(n)), а цикл while виконується доти, доки задана умова залишається істинною.",
      "codeExample": "# Цикл for від 0 до 2\nfor i in range(3):\n    print(i)\n\n# Цикл while\ncount = 3\nwhile count > 0:\n    count -= 1"
    },
    "questions": [
      {
        "id": "q10",
        "question": "Скільки разів виконається цикл: for i in range(5)?",
        "code": "for i in range(5):\n    print(i)",
        "options": ["5", "4", "6", "Нескінченно"],
        "correctAnswer": "5",
        "explanation": "range(5) генерує послідовність чисел 0, 1, 2, 3, 4 — тобто рівно 5 ітерацій."
      },
      {
        "id": "q11",
        "question": "Яка команда негайно перериває виконання поточного циклу?",
        "code": "while True:\n    [???]",
        "options": ["break", "continue", "exit", "stop"],
        "correctAnswer": "break",
        "explanation": "Оператор break негайно припиняє виконання циклу."
      },
      {
        "id": "q12",
        "question": "Що робить оператор continue в тілі циклу?",
        "code": "for x in items:\n    if condition: continue",
        "options": [
          "Пропускає поточну ітерацію та переходить до наступної",
          "Повністю зупиняє цикл",
          "Перезапускає весь цикл спочатку",
          "Викликає помилку"
        ],
        "correctAnswer": "Пропускає поточну ітерацію та переходить до наступної",
        "explanation": "Оператор continue завершує поточний крок і переходить до наступної ітерації."
      }
    ]
  }
];

export async function loadTopics() {
    try {
        const res = await fetch("./data/topics.json");
        if (!res.ok) throw new Error("HTTP error " + res.status);
        state.topicsData = await res.json();
    } catch (e) {
        console.warn("Using offline fallback topics data", e);
        state.topicsData = FALLBACK_TOPICS;
    }
    return state.topicsData;
}
