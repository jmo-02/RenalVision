import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics, useBox, usePlane } from "@react-three/cannon";
import { OrbitControls, Html } from "@react-three/drei";
import Model3D from "./Model3D";
import questions from "./Questions";
import useQuizStore from "../../stores/use-quiz-store";
import useAuthStore from "../../stores/use-auth-store";

const API_URL = import.meta.env.VITE_API_BASE_URL;

function AnswerShape({
  position,
  text,
  onSelect,
  correct,
  answered,
  selected,
}) {
  const [ref] = useBox(() => ({
    mass: 1,
    position,
    args: [1.6, 1.6, 1.6],
  }));

	const [hovered, setHovered] = useState(false);

  let color = "#2196f3";
  if (answered) {
    if (selected) color = correct ? "#43a047" : "#e53935";
    else if (correct) color = "#43a047";
    else color = "#2196f3";
  } else if (hovered) {
    color = "#29b6f6";
  }

  return (
    <mesh
      ref={ref}
      onClick={() => {
        if (!answered) onSelect();
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
      scale={hovered && !answered ? 1.15 : 1}
    >
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={color} roughness={0.4} metalness={0.2} />
      <Html position={[0, 0, 1.2]} center>
        <div
          style={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            width: 120,
            cursor: answered ? "default" : "pointer",
            userSelect: "none",
            pointerEvents: "auto",
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
            if (!answered) onSelect();
          }}
        >
          {text}
        </div>
      </Html>
    </mesh>
  );
}

function Ground() {
	usePlane(() => ({
		position: [0, -2, 0],
		rotation: [-Math.PI / 2, 0, 0],
	}));
	return (
		<mesh
			receiveShadow
			position={[0, -2, 0]}
			rotation={[-Math.PI / 2, 0, 0]}
		>
			<planeGeometry args={[20, 20]} />
			<meshStandardMaterial color="#e0f7fa" transparent opacity={0.2} />
		</mesh>
	);
}

const Quiz3D = ({ onBack }) => {
  // Estado local solo para feedback visual
  const [step, setStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [lastCorrect, setLastCorrect] = useState(null);

  // Zustand store
  const {
    quiz,
    incrementQuizProgress,
    incrementCorrectAnswers,
    incrementIncorrectAnswers,
    addPoints,
    clearQuiz,
  } = useQuizStore();

  // Auth
  const { userLooged } = useAuthStore();
  const [userId, setUserId] = useState(null);

  // Limpiar quiz al montar
  useEffect(() => {
    clearQuiz();
    setStep(0);
    setShowResult(false);
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

  // Handler de respuesta
  const handleSelect = (isCorrect, idx) => {
    setAnswered(true);
    setSelectedIdx(idx);
    setLastCorrect(isCorrect);

    // Lógica global
    if (isCorrect) {
      incrementCorrectAnswers();
      addPoints(100);
    } else {
      incrementIncorrectAnswers();
    }
    incrementQuizProgress();

    setTimeout(() => {
      setAnswered(false);
      setSelectedIdx(null);
      if (step < questions.length - 1) {
        setStep(step + 1);
      } else {
        setShowResult(true);
      }
    }, 1200);
  };

  // Barra de progreso
  const progress = Math.round(((step + 1) / questions.length) * 100);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <Physics>
          <Ground />
          {!showResult && (
            <>
              {/* Progreso */}
              <Html position={[2.5, 3.8, 0]} center>
                <div
                  style={{
                    color: "#222",
                    fontSize: 18,
                    background: "rgba(255,255,255,0.7)",
                    padding: 8,
                    borderRadius: 8,
                  }}
                >
                  Pregunta {step + 1} de {questions.length} | Progreso:{" "}
                  {progress}%
                </div>
              </Html>
              <Html position={[0, 3, 0]} center>
                <div
                  style={{
                    color: "#222",
                    fontSize: 24,
                    background: "rgba(255,255,255,0.8)",
                    padding: 16,
                    borderRadius: 8,
                  }}
                >
                  {questions[step].question}
                </div>
              </Html>
              <Model3D
                url={questions[step].model}
                scale={1.2}
                position={[0, 0.5, -3]}
              />
              {questions[step].options.map((opt, i) => (
                <AnswerShape
                  key={i}
                  position={[-3 + i * 3, 0, 0]}
                  text={opt.text}
                  correct={opt.correct}
                  answered={answered}
                  selected={selectedIdx === i}
                  onSelect={() => handleSelect(opt.correct, i)}
                />
              ))}
              {/* Mensaje de feedback */}
              {answered && (
                <Html position={[0, 1.8, 0]} center>
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
            <Html position={[0, 2, 0]} center>
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
                    setStep(0);
                    setShowResult(false);
                    setAnswered(false);
                    setSelectedIdx(null);
                    setLastCorrect(null);
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
        </Physics>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Quiz3D;
