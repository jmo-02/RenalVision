import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, useBox, usePlane } from "@react-three/cannon";
import { OrbitControls, Html } from "@react-three/drei";
import Model3D from "./Model3D";
import questions from "./Questions";
import useQuizStore from "../../stores/use-quiz-store";
import useAuthStore from "../../stores/use-auth-store";
import * as THREE from "three";
import ChestBox from "./ChestBox";

const API_URL = import.meta.env.VITE_API_BASE_URL;

// Caja de respuesta
function AnswerBox({ position, text, idx, isOver, isCorrect, answered }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={[2.2, 1.2, 2.2]} />
      <meshStandardMaterial
        color={
          answered
            ? isOver
              ? isCorrect
                ? "#43a047"
                : "#e53935"
              : "#2196f3"
            : "#2196f3"
        }
        opacity={isOver ? 0.8 : 1}
        transparent
      />
      <Html position={[0, 0.7, 0]} center transform>
        <div
          style={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            width: 120,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {text}
        </div>
      </Html>
    </mesh>
  );
}

// Modelo arrastrable
function DraggableModel({ url, onDrop, dropZones, answered, setIsDragging, setNoBoxFeedback }) {
  const [ref, api] = useBox(() => ({
    mass: 0,
    position: [0, 2.5, 0],
    args: [0.7, 0.7, 0.7],
    type: "Dynamic",
  }));
  const dragging = useRef(false);
  const dropped = useRef(false);

  const dragY = 2.5;

  // Drag: sigue el mouse solo si está siendo arrastrado
  useFrame(({ mouse, camera }) => {
    if (dragging.current && !answered) {
      const ndc = new THREE.Vector2(mouse.x, mouse.y);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(ndc, camera);
      const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -dragY);
      const intersection = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, intersection);

      api.position.set(intersection.x, dragY, intersection.z);
      api.velocity.set(0, 0, 0);
      api.angularVelocity.set(0, 0, 0);
    }
  });

  // Detectar drop (cuando el modelo está quieto sobre una caja)
  useFrame(() => {
    if (!answered && ref.current && !dragging.current && !dropped.current) {
      const pos = ref.current.position;
      let insideAnyBox = false;
      dropZones.forEach((zone, idx) => {
        const [zx, zy, zz] = zone.position;
        // Áreas de detección más permisivas
        const EXTRA = 1.2; // antes 0.6
        const HOLE_X = 2.2 - 0.2 * 2 + EXTRA;
        const HOLE_Z = 2.2 - 0.2 * 2 + EXTRA;
        const HOLE_Y = 1.2 + 1.0; // antes 0.5
        if (
          pos.x > zx - HOLE_X / 2 &&
          pos.x < zx + HOLE_X / 2 &&
          pos.z > zz - HOLE_Z / 2 &&
          pos.z < zz + HOLE_Z / 2 &&
          pos.y < zy + HOLE_Y / 2
        ) {
          dropped.current = true;
          insideAnyBox = true;
          onDrop(idx);
        }
      });
      if (!insideAnyBox && !dragging.current && !answered) {
        setTimeout(() => {
          if (!answered && !dropped.current) setNoBoxFeedback(true);
        }, 700);
      }
    }
    if (answered && dropped.current) {
      dropped.current = false;
    }
  });

  return (
    <mesh
      ref={ref}
      onPointerDown={(e) => {
        e.stopPropagation();
        if (!answered) {
          dragging.current = true;
          setIsDragging(true);
          setNoBoxFeedback(false);
          api.mass.set(0);
          api.velocity.set(0, 0, 0);
          api.angularVelocity.set(0, 0, 0);
        }
      }}
      onPointerUp={(e) => {
        e.stopPropagation();
        if (dragging.current) {
          dragging.current = false;
          setIsDragging(false);

          // Ahora sí, activa la física para que caiga
          api.mass.set(1.5);
          api.applyImpulse(
            [
              (Math.random() - 0.5) * 2,
              0,
              (Math.random() - 0.5) * 2,
            ],
            [0, 0, 0]
          );
          api.applyTorque([
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
          ]);
        }
      }}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[0.7, 0.7, 0.7]} />
      <meshStandardMaterial color="orange" opacity={0.0} transparent />
      <Model3D url={url} scale={0.5} position={[0, 0, 0]} />
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

function MovableModel({ url, onCollide, answered, answerPositions }) {
  const [position, setPosition] = useState([0, 1, 0]); // Y=1 para que flote sobre el suelo
  const ref = useRef();

  // Movimiento con flechas
  useEffect(() => {
    if (answered) return;
    const handleKeyDown = (e) => {
      setPosition((prev) => {
        let [x, y, z] = prev;
        if (e.key === "ArrowLeft" || e.key === "a") x -= 0.5;
        if (e.key === "ArrowRight" || e.key === "d") x += 0.5;
        if (e.key === "ArrowUp" || e.key === "w") z -= 0.5;
        if (e.key === "ArrowDown" || e.key === "s") z += 0.5;
        return [x, y, z];
      });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [answered]);

  // Detección de colisión con cualquiera de las cajas de respuesta
  useFrame(() => {
    if (!ref.current || answered) return;
    const [x, y, z] = position;
    answerPositions.forEach((boxPos, idx) => {
      const dist = Math.sqrt(
        (x - boxPos[0]) ** 2 +
        (y - boxPos[1]) ** 2 +
        (z - boxPos[2]) ** 2
      );
      if (dist < 1.5) {
        onCollide(idx);
      }
    });
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[0.7, 0.7, 0.7]} />
      <meshStandardMaterial color="orange" opacity={0.0} transparent />
      <Model3D url={url} scale={0.5} position={[0, 0, 0]} />
    </mesh>
  );
}

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

  // Posiciones de las cajas de respuesta
  const answerPositions = [
    [-5, -0.4, 0], // izquierda
    [0, -0.4, 0],  // centro
    [5, -0.4, 0],  // derecha
  ];

  // Handler de drop
  const handleDrop = (idx) => {
    answerQuestion(idx, questions, 100);
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
              <Html position={[2.5, 7, 0]} center transform>
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
              <Html position={[0, 6, 0]} center transform>
                <div
                  style={{
                    color: "#222",
                    fontSize: 24,
                    background: "rgba(255,255,255,0.8)",
                    padding: 16,
                    borderRadius: 8,
                    pointerEvents: "none",
                  }}
                >
                  {questions[step].question}
                </div>
              </Html>
              <DraggableModel
                url={questions[step].model}
                onDrop={handleDrop}
                dropZones={answerPositions.map((pos, idx) => ({
                  position: pos,
                  idx,
                }))}
                answered={answered}
                setIsDragging={setIsDragging}
                setNoBoxFeedback={setNoBoxFeedback}
              />
              {questions[step].options.map((opt, i) => (
                <React.Fragment key={i}>
                  <ChestBox
                    position={answerPositions[i]}
                    scale={1}
                    color={
                      answered
                        ? (overIdx === i
                            ? (opt.correct ? "#43a047" : "#e53935")
                            : "#8d5524")
                        : "#8d5524"
                    }
                  />
                  <Html
                    position={[
                      ...answerPositions[i].slice(0, 2),
                      answerPositions[i][2] + 1,
                    ]}
                    center
                    transform
                  >
                    <div
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                        width: 120,
                        pointerEvents: "none",
                        userSelect: "none",
                        textShadow: "0 0 6px #000",
                      }}
                    >
                      {opt.text}
                    </div>
                  </Html>
                </React.Fragment>
              ))}
              {/* Mensaje de feedback */}
              {answered && (
                <Html position={[0, 1.8, 0]} center transform>
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
              {/* Feedback si no se soltó en ninguna caja */}
              {noBoxFeedback && (
                <Html position={[0, 4, 0]} center transform>
                  <div
                    style={{
                      color: "#e53935",
                      fontSize: 22,
                      fontWeight: "bold",
                      background: "rgba(255,255,255,0.95)",
                      borderRadius: 12,
                      padding: "10px 24px",
                      boxShadow: "0 2px 16px rgba(0,0,0,0.12)",
                      marginTop: 16,
                    }}
                  >
                    ¡Debes soltar el modelo sobre una caja!
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
                    // Reinicia el quiz correctamente
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
        </Physics>
        <OrbitControls enabled={!isDragging} />
      </Canvas>
    </div>
  );
};

export default Quiz3D;
