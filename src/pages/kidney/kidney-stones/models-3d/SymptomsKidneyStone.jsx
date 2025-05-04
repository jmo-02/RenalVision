import React, { useRef, useState, useEffect } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const SymptomsKidneyStone = (props) => {
  const symptomsRef = useRef();
  const [showInfo, setShowInfo] = useState(false);
  const [animate, setAnimate] = useState(true); // estado para animar o no

  // animación de flotación
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (animate && symptomsRef.current) {
      symptomsRef.current.position.y = Math.sin(t) * 0.2;
    }
  });

  // evento de teclado para pausar/reanudar la animación
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        setAnimate((prev) => !prev); // alterna la animación
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const { nodes, materials } = useGLTF("/models-3d/symptoms-kidney-stone.glb");

  return (
    <group {...props} dispose={null}>
      <group
        ref={symptomsRef}
        onClick={() => setShowInfo(true)}
        onDoubleClick={() => setShowInfo(false)}
      >
        <mesh
          receiveShadow
          geometry={nodes.Symptoms.geometry}
          material={materials.SymptomsMaterial}
          skeleton={nodes.Symptoms.skeleton}
          castShadow
        />
        {showInfo && (
          <Html position={[-0.2, 0.8, 0]} center distanceFactor={10}>
            <div
              style={{
                background: "rgba(6,86,110,0.6)",
                color: "white",
                padding: "12px 56px",
                borderRadius: "50px",
                width: "100%",
                whiteSpace: "normal",
                textAlign: "justify",
                fontSize: "24px",
                lineHeight: "1.2",
              }}
            >
              Los cálculos renales pueden deberse a deshidratación, exceso de
              sodio o proteínas.
            </div>
          </Html>
        )}
      </group>

      <primitive object={nodes.Hips} />
    </group>
  );
};

export default SymptomsKidneyStone;

useGLTF.preload("/models-3d/symptoms-kidney-stone.glb");
