# PyLearn - Консольний прототип навчального тренажера
# Розробник: Мансур Мухаммад (Команда CodeCrafters)

def welcome_screen():
    print("=" * 50)
    print("  Ласкаво просимо до тренажера PyLearn!  ")
    print("  Опануйте основи Python за 10 хвилин на день ")
    print("=" * 50)

def run_quiz():
    questions = [
        {
            "q": "Яка функція використовується для виведення даних на екран у Python?",
            "options": ["1. input()", "2. print()", "3. display()", "4. echo()"],
            "correct": 2
        },
        {
            "q": "Який тип даних має значення x = 25.5?",
            "options": ["1. int", "2. str", "3. float", "4. bool"],
            "correct": 3
        }
    ]
    
    score = 0
    for i, item in enumerate(questions, 1):
        print(f"\nПитання {i}: {item['q']}")
        for opt in item['options']:
            print(f"  {opt}")
        ans = input("Ваша відповідь (номер): ").strip()
        if ans == str(item['correct']):
            print("Правильно! Чудова робота.")
            score += 1
        else:
            print("Неправильно. Зверніть увагу на теорію!")
            
    print(f"\nПідсумок: {score} з {len(questions)} правильних відповідей!")

if __name__ == "__main__":
    welcome_screen()
    run_quiz()
