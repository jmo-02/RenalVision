import React, { useRef, useState, useEffect } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const SymptomsKidneyStone = (props) => {
  const symptomsRef = useRef();
  const [animate, setAnimate] = useState(true); // para animar o no
  const [showInfo, setShowInfo] = useState(true); // por defecto visible

  // animación de flotación
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (animate && symptomsRef.current) {
      symptomsRef.current.position.y = Math.sin(t) * 0.2;
    }
  });

  // evento de teclado (Enter)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        setAnimate((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const { nodes, materials } = useGLTF("/models-3d/symptoms-kidney-stone.glb");

  return (
    <group {...props} dispose={null}>
      <group
        ref={symptomsRef}
        onDoubleClick={() => setAnimate((prev) => !prev)}
        onClick={() => setShowInfo((prev) => !prev)}
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
                background: "rgba(6,86,110,0.6)", // azul translúcido
                color: "white",
                padding: "8px 56px",
                width: "100%",
                borderRadius: "10px",
                fontSize: "17px",
                whiteSpace: "normal",
                textAlign: "center",
              }}
            >
              Clic para ocultar o mostrar este texto.<br />
              <br />
              Con doble clic o con la tecla Enter puedes pausar la animación.
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
