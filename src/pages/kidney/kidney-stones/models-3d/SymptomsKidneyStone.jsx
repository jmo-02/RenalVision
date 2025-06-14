// SymptomsKidneyStone.jsx
import React, { useRef, useState, useEffect } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const SymptomsKidneyStone = (props) => {
  const symptomsRef = useRef();
  const [animate, setAnimate] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  const { nodes, materials } = useGLTF("/models-3d/symptoms-kidney-stone.glb");

  // Animación flotante
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (animate && symptomsRef.current) {
      symptomsRef.current.position.y = Math.sin(t) * 0.2;
    }
  });

  // Tecla Enter para pausar animación
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        setAnimate((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <group {...props} dispose={null}>
      <group
        ref={symptomsRef}
        onDoubleClick={() => setAnimate((prev) => !prev)}
        // 👇 Hover sobre el modelo: muestra info
        onPointerOver={() => setShowInfo(true)}
        onPointerOut={() => setShowInfo(false)}
      >
        <mesh
          receiveShadow
          geometry={nodes.Symptoms.geometry}
          material={materials.SymptomsMaterial}
          skeleton={nodes.Symptoms.skeleton}
          castShadow
        />
        {showInfo && (
          <Html position={[-0.3, 0.7, 0]} center distanceFactor={15}>
            <div
              style={{
                background: "rgba(6,86,110,0.6)",
                color: "white",
                padding: "8px 56px",
                width: "100%",
                borderRadius: "10px",
                fontSize: "17px",
                whiteSpace: "normal",
                textAlign: "center",
              }}
            >
              Doble clic o Enter para pausar la animación.
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
