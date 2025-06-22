import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import Model3D from "./Model3D";
import questions from "./Questions";
import useQuizStore from "../../stores/use-quiz-store";
import useAuthStore from "../../stores/use-auth-store";


const API_URL = import.meta.env.VITE_API_BASE_URL;

// NUEVO: Opciones de Falso/Verdadero
const TRUE_FALSE_OPTIONS = [
  { text: "Verdadero", value: true },
  { text: "Falso", value: false },
];

const Quiz3D = ({ onBack }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [noBoxFeedback, setNoBoxFeedback] = useState(false);

  // Zustand store
  const {
    quiz,
    answerQuestion,
    clearQuiz,
  } = useQuizStore();

  const step = quiz.step;
  const showResult = quiz.showResult;
  const answered = quiz.answered;
  const overIdx = quiz.overIdx;
  const lastCorrect = quiz.lastCorrect;

  // Auth
  const { userLooged } = useAuthStore();
  const [userId, setUserId] = useState(null);

  // Limpiar quiz al montar
  useEffect(() => {
    clearQuiz();
  }, []);

  // Obtener userId igual que en Quiz.jsx
  useEffect(() => {
    const fetchUserId = async () => {
      if (!userLooged?.email) return;
      try {
        const res = await fetch(
          `${API_URL}users/email/${encodeURIComponent(userLooged.email)}`
        );
        if (!res.ok) throw new Error("No se pudo obtener el usuario");
        const user = await res.json();
        setUserId(user._id);
      } catch (err) {
        console.error("Error obteniendo userID:", err);
      }
    };
    fetchUserId();
  }, [userLooged]);

  // Enviar resultados al terminar
  useEffect(() => {
    if (showResult && userId) {
      sendResults();
    }
    // eslint-disable-next-line
  }, [showResult, userId]);

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

  // NUEVO: Handler para Falso/Verdadero
  const handleAnswer = (value) => {
    // Busca la opción correcta en la pregunta actual
    const correctOption = questions[step].options.find(opt => opt.correct);
    // Si el texto de la opción correcta es "Verdadero", entonces value debe ser true, etc.
    // Pero para esto, las preguntas deben estar adaptadas a F/V (ver abajo)
    // Aquí asumimos que la opción correcta es "Verdadero" si su texto es "Verdadero"
    // Mejor: la pregunta debe tener un campo "answer: true/false"
    // Pero para compatibilidad, usamos el primer "correct"
    answerQuestion(value === correctOption.correct ? 0 : 1, questions, 100);
  };

  // Barra de progreso
  const progress = Math.round(((step + 1) / questions.length) * 100);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        {/* Fondo */}
        <color attach="background" args={["#e0f7fa"]} />
        {/* UI con Html */}
        <Html position={[0, 6, 0]} center transform>
          <div
            style={{
              color: "#222",
              fontSize: 18,
              background: "rgba(255,255,255,0.7)",
              padding: 8,
              borderRadius: 8,
              pointerEvents: "none",
            }}
          >
            Pregunta {step + 1} de {questions.length} | Progreso: {progress}%
          </div>
        </Html>
        {!showResult && (
          <>
            {/* Pregunta */}
            <Html position={[0, 4, 0]} center transform>
              <div
                style={{
                  color: "#222",
                  fontSize: 24,
                  background: "rgba(255,255,255,0.8)",
                  padding: 16,
                  borderRadius: 8,
                  pointerEvents: "none",
                  maxWidth: 400,
                  textAlign: "center",
                }}
              >
                {questions[step].question}
              </div>
            </Html>
            {/* Modelo debajo */}
            <group position={[0, 1.2, 0]}>
              <Model3D url={questions[step].model} scale={0.8} position={[0, 0, 0]} />
            </group>
            {/* Botones Falso/Verdadero */}
            <Html position={[0, -1.5, 0]} center transform>
              <div style={{ display: "flex", gap: 32, justifyContent: "center" }}>
                {TRUE_FALSE_OPTIONS.map((opt, idx) => (
                  <button
                    key={opt.text}
                    onClick={() => handleAnswer(opt.value)}
                    disabled={answered}
                    style={{
                      padding: "18px 36px",
                      fontSize: "1.7rem",
                      borderRadius: 10,
                      border: "none",
                      background: answered
                        ? (
                            (opt.value === questions[step].options.find(o => o.correct).correct)
                              ? "#43a047"
                              : "#e53935"
                          )
                        : "#2196f3",
                      color: "white",
                      fontWeight: "bold",
                      cursor: answered ? "default" : "pointer",
                      opacity: answered ? 0.7 : 1,
                      transition: "background 0.2s",
                    }}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </Html>
            {/* Feedback de respuesta */}
            {answered && (
              <Html position={[0, -3.2, 0]} center transform>
                <div
                  style={{
                    color: lastCorrect ? "#43a047" : "#e53935",
                    fontSize: 28,
                    fontWeight: "bold",
                    background: "rgba(255,255,255,0.95)",
                    borderRadius: 12,
                    padding: "12px 32px",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.12)",
                    marginTop: 16,
                  }}
                >
                  {lastCorrect
                    ? "¡Respuesta correcta!"
                    : "Respuesta incorrecta"}
                </div>
              </Html>
            )}
          </>
        )}
        {showResult && (
          <Html position={[0, 2, 0]} center transform>
            <div
              style={{
                color: "#222",
                fontSize: 32,
                background: "rgba(255,255,255,0.9)",
                padding: 24,
                borderRadius: 12,
              }}
            >
              ¡Quiz terminado!
              <br />
              Correctas: {quiz.correctAnswers}
              <br />
              Incorrectas: {quiz.incorrectAnswers}
              <br />
              Puntos: {quiz.points}
              <br />
              <button
                onClick={() => {
                  clearQuiz();
                  window.location.reload();
                }}
              >
                Reiniciar
              </button>
              <button onClick={() => (window.location.href = "/ranking")}>
                Ver ranking
              </button>
              {onBack && <button onClick={onBack}>Volver</button>}
            </div>
          </Html>
        )}
        <OrbitControls enablePan={false} enableZoom={true} />
      </Canvas>
    </div>
  );
};

export default Quiz3D;
  
