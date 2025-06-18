import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics, useBox } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";

const questions = [
  {
    question: "¿Qué síntomas corresponden a la Enfermedad Renal Crónica?",
    options: [
      { text: "Fatiga, hinchazón, presión alta", correct: true },
      { text: "Dolor agudo lumbar, sangre en orina", correct: false },
      { text: "Dolor al orinar, fiebre", correct: false },
    ],
  },
  {
    question: "¿Qué síntomas corresponden a los Cálculos Renales?",
    options: [
      { text: "Dolor agudo lumbar, sangre en orina", correct: true },
      { text: "Fatiga, hinchazón, presión alta", correct: false },
      { text: "Orina espumosa, picazón", correct: false },
    ],
  },
];

function AnswerBox({ position, text, onSelect, correct }) {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position,
    args: [2, 1, 1],
  }));

  const [clicked, setClicked] = useState(false);

  return (
    <mesh
      ref={ref}
      onClick={() => {
        setClicked(true);
        onSelect(correct);
        // Efecto físico: impulso hacia arriba si es correcta, hacia abajo si no
        api.applyImpulse([0, correct ? 5 : -5, 0], [0, 0, 0]);
      }}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[2, 1, 1]} />
      <meshStandardMaterial color={clicked ? (correct ? "green" : "red") : "#2196f3"} />
      <Html position={[0, 0, 0.6]} center>
        <div style={{ color: "white", fontWeight: "bold", textAlign: "center", width: 150 }}>
          {text}
        </div>
      </Html>
    </mesh>
  );
}

import { Html } from "@react-three/drei";

const Quiz3D = () => {
  const [step, setStep] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (isCorrect) => {
    setTimeout(() => {
      if (step < questions.length - 1) {
        setStep(step + 1);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <Physics>
          <mesh receiveShadow position={[0, -2, 0]}>
            <boxGeometry args={[10, 1, 10]} />
            <meshStandardMaterial color="#888" />
          </mesh>
          {!showResult && (
            <>
              <Html position={[0, 3, 0]} center>
                <div style={{ color: "#222", fontSize: 24, background: "rgba(255,255,255,0.8)", padding: 16, borderRadius: 8 }}>
                  {questions[step].question}
                </div>
              </Html>
              {questions[step].options.map((opt, i) => (
                <AnswerBox
                  key={i}
                  position={[-3 + i * 3, 0, 0]}
                  text={opt.text}
                  correct={opt.correct}
                  onSelect={handleSelect}
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