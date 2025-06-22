import { create } from "zustand";

const useQuizStore = create((set, get) => ({
  quiz: {
    correctAnswers: 0,
    incorrectAnswers: 0,
    percentageQuizCompleted: 0,
    points: 0,
    step: 0,
    showResult: false,
    lastCorrect: null,
    overIdx: null,
    answered: false,
  },
  answerQuestion: (idx, questions, addPoints = 100) => {
    const state = get();
    if (state.quiz.answered) return;
    const step = state.quiz.step;
    const isCorrect = questions[step].options[idx].correct;
    set({
      quiz: {
        ...state.quiz,
        overIdx: idx,
        answered: true,
        lastCorrect: isCorrect,
        correctAnswers: isCorrect
          ? state.quiz.correctAnswers + 1
          : state.quiz.correctAnswers,
        incorrectAnswers: !isCorrect
          ? state.quiz.incorrectAnswers + 1
          : state.quiz.incorrectAnswers,
        points: isCorrect ? state.quiz.points + addPoints : state.quiz.points,
        percentageQuizCompleted: Math.min(
          state.quiz.percentageQuizCompleted + 25,
          100
        ),
      },
    });

    setTimeout(() => {
      const nextStep = step + 1;
      if (nextStep < questions.length) {
        set({
          quiz: {
            ...get().quiz,
            step: nextStep,
            answered: false,
            overIdx: null,
            lastCorrect: null,
          },
        });
      } else {
        set({
          quiz: {
            ...get().quiz,
            showResult: true,
            answered: false,
            overIdx: null,
            lastCorrect: null,
          },
        });
      }
    }, 1200);
  },
  clearQuiz: () =>
    set({
      quiz: {
        correctAnswers: 0,
        incorrectAnswers: 0,
        percentageQuizCompleted: 0,
        points: 0,
        step: 0,
        showResult: false,
        lastCorrect: null,
        overIdx: null,
        answered: false,
      },
    }),
}));

export default useQuizStore;