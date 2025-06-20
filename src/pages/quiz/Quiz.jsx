import { useEffect, useState } from "react";
import useQuizStore from "../../stores/use-quiz-store";
import useAuthStore from "../../stores/use-auth-store";
import "./Quiz.css";
import { useNavigate } from "react-router";

const QUESTIONS = [
  {
    id: 1,
    question: "¿Cuál es el órgano principal del sistema renal?",
    options: ["Corazón", "Riñón", "Pulmón", "Hígado"],
    answer: 1,
  },
  {
    id: 2,
    question: "¿Qué función principal tiene el riñón?",
    options: [
      "Filtrar la sangre",
      "Bombear sangre",
      "Producir insulina",
      "Regular la temperatura",
    ],
    answer: 0,
  },
  {
    id: 3,
    question: "¿Cuántos riñones tiene normalmente una persona?",
    options: ["Uno", "Dos", "Tres", "Cuatro"],
    answer: 1,
  },
  {
    id: 4,
    question: "¿Qué desecho elimina el riñón?",
    options: ["Dióxido de carbono", "Urea", "Glucosa", "Ácido clorhídrico"],
    answer: 1,
  },
];

const API_URL = import.meta.env.VITE_API_BASE_URL;

const Quiz = () => {
  const { quiz, incrementQuizProgress, incrementCorrectAnswers, incrementIncorrectAnswers, addPoints, clearQuiz } = useQuizStore();
  const { userLooged } = useAuthStore();
  const [current, setCurrent] = useState(0);
  const [finished, setFinished] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // Limpiar el estado del quiz al montar el componente
  useEffect(() => {
    clearQuiz();
    setCurrent(0);
    setFinished(false);
    // eslint-disable-next-line
  }, []);

  // Obtener el _id del usuario desde el backend usando el email
  useEffect(() => {
    const fetchUserId = async () => {
      if (!userLooged?.email) return;
      try {
        const res = await fetch(`${API_URL}users/email/${encodeURIComponent(userLooged.email)}`);
        if (!res.ok) throw new Error("No se pudo obtener el usuario");
        const user = await res.json();
        setUserId(user._id);
      } catch (err) {
        console.error("Error obteniendo userID:", err);
      }
    };
    fetchUserId();
  }, [userLooged]);

  // Enviar resultados SOLO cuando finished sea true y userId esté disponible
  useEffect(() => {
    if (finished && userId) {
      sendResults();
    }
    // eslint-disable-next-line
  }, [finished, userId]);

  const sendResults = async () => {
    try {
      await fetch(`${API_URL}quizzes/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          points: quiz.points,
          correctAnswers: quiz.correctAnswers,
          incorrectAnswers: quiz.incorrectAnswers,
          userID: userId,
        }),
      });
    } catch (error) {
      console.error("Error enviando resultados:", error);
    }
  };

  const handleAnswer = (idx) => {
    if (idx === QUESTIONS[current].answer) {
      incrementCorrectAnswers();
      addPoints(100);
    } else {
      incrementIncorrectAnswers();
    }
    incrementQuizProgress();
    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1);
    } else {
      setFinished(true); // Solo marcas como terminado aquí
    }
  };

  if (finished) {
    return (
      <div>
        <h1>¡Quiz terminado!</h1>
        <p>Correctas: {quiz.correctAnswers}</p>
        <p>Incorrectas: {quiz.incorrectAnswers}</p>
        <p>Puntos: {quiz.points}</p>
        <button
          onClick={() => {
            clearQuiz();
            setCurrent(0);
            setFinished(false);
          }}
        >
          Reiniciar
        </button>
        <button onClick={() => navigate("/ranking")}>Ver ranking</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Quiz</h1>
      <span>Progreso del quiz: {quiz.percentageQuizCompleted} % </span>
      <h2>{QUESTIONS[current].question}</h2>
      {QUESTIONS[current].options.map((opt, idx) => (
        <button key={idx} onClick={() => handleAnswer(idx)}>
          {opt}
        </button>
      ))}
    </div>
  );
};

export default Quiz;