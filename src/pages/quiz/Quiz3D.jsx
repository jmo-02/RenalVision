import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics, useBox, usePlane } from "@react-three/cannon";
import { OrbitControls, Html } from "@react-three/drei";
import Model3D from "./Model3D";

const questions = [
  {
    question: "¿Qué síntomas corresponden a la Enfermedad Renal Crónica?",
    model: "/models-3d/Chr-Kidney-Disease.glb",
    options: [
      { text: "Fatiga, hinchazón, presión alta", correct: true },
      { text: "Dolor agudo lumbar, sangre en orina", correct: false },
      { text: "Dolor al orinar, fiebre", correct: false },
    ],
  },
  {
    question: "¿Qué síntomas corresponden a los Cálculos Renales?",
    model: "/models-3d/prevention-kidney-stone.glb",
    options: [
      { text: "Dolor agudo lumbar, sangre en orina", correct: true },
      { text: "Fatiga, hinchazón, presión alta", correct: false },
      { text: "Orina espumosa, picazón", correct: false },
    ],
  },
  {
    question: "¿Qué síntomas corresponden a la Glomerulonefritis?",
    model: "/models-3d/symptoms-glomerulonefritis.glb",
    options: [
      { text: "Orina oscura, hinchazón facial, presión alta", correct: true },
      { text: "Dolor lumbar, fiebre", correct: false },
      { text: "Náuseas, vómitos, dolor abdominal", correct: false },
    ],
  },
];

function AnswerShape({ position, text, onSelect, correct, answered, selected }) {
  const [ref] = useBox(() => ({
    mass: 1,
    position,
    args: [1.6, 1.6, 1.6], // hitbox más grande
  }));

  const [hovered, setHovered] = useState(false);

  // Color según estado global
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
        if (!answered) onSelect(correct);
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
      scale={hovered && !answered ? 1.15 : 1}
    >
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        roughness={0.4}
        metalness={0.2}
      />
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
            if (!answered) onSelect(correct);
          }}
        >
          {text}
        </div>
      </Html>
    </mesh>
  );
}

// Plano invisible para que las cajas no caigan al vacío
function Ground() {
  usePlane(() => ({
    position: [0, -2, 0],
    rotation: [-Math.PI / 2, 0, 0],
  }));
  return (
    <mesh receiveShadow position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#e0f7fa" transparent opacity={0.2} />
    </mesh>
  );
}

const Quiz3D = () => {
  const [step, setStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(null);

  const handleSelect = (isCorrect, idx) => {
    setAnswered(true);
    setSelectedIdx(idx);
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

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <Physics>
          <Ground />
          {!showResult && (
            <>
              <Html position={[0, 3, 0]} center>
                <div style={{ color: "#222", fontSize: 24, background: "rgba(255,255,255,0.8)", padding: 16, borderRadius: 8 }}>
                  {questions[step].question}
                </div>
              </Html>
              <Model3D url={questions[step].model} scale={1.2} position={[0, 0.5, -3]} />
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
            </>
          )}
          {showResult && (
            <Html position={[0, 2, 0]} center>
              <div style={{ color: "#222", fontSize: 32, background: "rgba(255,255,255,0.9)", padding: 24, borderRadius: 12 }}>
                ¡Quiz terminado!
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