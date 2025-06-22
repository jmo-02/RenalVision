import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import Model3D from "./Model3D";
import questions from "./Questions";
import useQuizStore from "../../stores/use-quiz-store";
import useAuthStore from "../../stores/use-auth-store";
import { useNavigate } from "react-router-dom";


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
  const navigate = useNavigate();

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

  function AnimatedButtons({ onAnswer, answered, correctValue }) {
    const btnRefs = [useRef(), useRef()];
    // Estado para posición y velocidad de cada botón
    const [states, setStates] = React.useState([
      { pos: [-2.5, 0, 0], vel: [0.012, 0.009] },
      { pos: [2.5, 0, 0], vel: [-0.009, 0.012] },
    ]);

    // Animación y rebote suave con colisión que evita superposición
    useFrame(() => {
      setStates((prev) => {
        // Copia profunda para manipulación
        let next = prev.map((s) => ({
          pos: [...s.pos],
          vel: [...s.vel],
        }));

        // Límites de movimiento
        const minX = -3.2, maxX = 3.2, minY = -1.2, maxY = 1.2;
        const minDist = 1.7; // distancia mínima entre centros para no superponerse

        // Movimiento y rebote contra límites
        for (let i = 0; i < 2; i++) {
          let [x, y, z] = next[i].pos;
          let [vx, vy] = next[i].vel;

          if (x < minX || x > maxX) vx *= -1;
          if (y < minY || y > maxY) vy *= -1;

          next[i].pos = [x + vx, y + vy, 0];
          next[i].vel = [vx, vy];
        }

        // Colisión entre botones: si se acercan demasiado, los separa y rebota
        const dx = next[0].pos[0] - next[1].pos[0];
        const dy = next[0].pos[1] - next[1].pos[1];
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < minDist) {
          // Calcula el vector de separación
          const overlap = minDist - dist;
          const nx = dx / (dist || 1);
          const ny = dy / (dist || 1);

          // Separa ambos botones a partes iguales
          next[0].pos[0] += (overlap / 2) * nx;
          next[0].pos[1] += (overlap / 2) * ny;
          next[1].pos[0] -= (overlap / 2) * nx;
          next[1].pos[1] -= (overlap / 2) * ny;

          // Rebota las velocidades en la dirección de colisión
          next[0].vel[0] = -next[0].vel[0];
          next[0].vel[1] = -next[0].vel[1];
          next[1].vel[0] = -next[1].vel[0];
          next[1].vel[1] = -next[1].vel[1];
        }

        return next;
      });
    });

    return (
      <>
        {TRUE_FALSE_OPTIONS.map((opt, idx) => (
          <Html
            key={opt.text}
            position={states[idx].pos}
            center
            transform
            zIndexRange={[10, 0]}
          >
            <button
              ref={btnRefs[idx]}
              onClick={() => onAnswer(opt.value)}
              disabled={answered}
              style={{
                padding: "18px 36px",
                fontSize: "1.7rem",
                borderRadius: 10,
                border: "none",
                background: answered
                  ? (
                      (opt.value === correctValue)
                        ? "#43a047"
                        : "#e53935"
                    )
                  : "#2196f3",
                color: "white",
                fontWeight: "bold",
                cursor: answered ? "default" : "pointer",
                opacity: answered ? 0.7 : 1,
                transition: "background 0.2s",
                boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
                minWidth: 120,
              }}
            >
              {opt.text}
            </button>
          </Html>
        ))}
      </>
    );
  }

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas shadows camera={{ position: [0, 2, 18], fov: 50 }}>
        <ambientLight intensity={2.2} /> {/* Aumenta la luz ambiental (antes 1.2) */}
        <directionalLight position={[10, 10, 5]} intensity={2.2} castShadow /> {/* Aumenta la luz direccional (antes 1.2) */}
        {/* Luz extra para aclarar el modelo */}
        <pointLight position={[0, 3, 4]} intensity={3.5} color="#ffffff" /> {/* Aumenta la intensidad (antes 2.2) */}
        <pointLight position={[-4, 6, 6]} intensity={2.5} color="#ffffff" /> {/* Aumenta la intensidad (antes 1.5) */}
        {/* Fondo */}
        <color attach="background" args={["#e0f7fa"]} />
        {/* UI con Html */}
        <Html position={[0, 6, 0]} center transform>
          {/* Solo muestra el progreso si no se está mostrando el resultado */}
          {!showResult && (
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
          )}
        </Html>
        {!showResult && (
          <>
            {/* Pregunta en cuadro de texto */}
            <Html position={[0, 3.8, 0]} center transform>
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
            {/* Modelo 3D a la derecha del texto, fuera del cuadro */}
            <group position={[
              questions[step].model === "/models-3d/kidney-cancer.glb"
                ? 9
                : questions[step].model === "/models-3d/symptoms-kidney-stone.glb"
                  ? 9.5
                  : 8,
              questions[step].model === "/models-3d/symptoms-kidney-stone.glb"
                ? 0.5 // antes 1.2, ahora más abajo
                : questions[step].model === "/models-3d/glomerulonephritis/symptoms-glomerulonefritis.glb"
                  ? 0.5 // antes 1.2, ahora más abajo
                  : questions[step].model === "/models-3d/kidney-cancer.glb"
                    ? 3.2
                    : 4.7,
              0
            ]}>
              <Model3D url={questions[step].model} scale={4} position={[0, 0, 0]} />
              {/* Luz extra para modelos específicos */}
              {questions[step].model === "/models-3d/kidney-cancer.glb" && (
                <pointLight position={[0, 3, 4]} intensity={6} color="#fffbe6" />
              )}
              {questions[step].model === "/models-3d/Chr-Kidney-Disease.glb" && (
                <pointLight position={[0, 3, 4]} intensity={6} color="#fff" />
              )}
            </group>
            {/* Botones Falso/Verdadero */}
            <AnimatedButtons
              onAnswer={handleAnswer}
              answered={answered}
              correctValue={questions[step].options.find(o => o.correct).correct}
            />
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
                  navigate("/quiz"); // Redirige al inicio de la sección quiz
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

