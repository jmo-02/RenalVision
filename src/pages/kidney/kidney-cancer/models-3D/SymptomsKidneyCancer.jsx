import React, { useRef, useState, useEffect } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const SymptomsKidneyCancer = (props) => {
  const symptomsRef = useRef();
  const [showInfo, setShowInfo] = useState(false);
  const [animate, setAnimate] = useState(true); // estado para animar o no

  // animación de flotación
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (animate && symptomsRef.current) {
      symptomsRef.current.position.y = 0.7 + Math.sin(t) * 0.2;
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

  const { nodes, materials } = useGLTF("/models-3d/symptoms-kidney-cancer.glb");

  return (
    <group {...props} dispose={null}>
      <group
        ref={symptomsRef}
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
          <Html position={[-0.2, 0.8, 0]} center distanceFactor={10}>
            <div
              style={{
                background: "rgba(6,86,110,0.6)",
                color: "white",
                padding: "20px 40px", // Aumenta el padding
                borderRadius: "50px",
                width: "420px", // Fija un ancho mayor
                minWidth: "320px", // Asegura un ancho mínimo
                maxWidth: "90vw", // Limita el ancho máximo en pantallas pequeñas
                whiteSpace: "normal",
                textAlign: "justify",
                fontSize: "24px",
                lineHeight: "1.2",
              }}
            >
              Pasa el cursor sobre el modelo para mostrar
              este texto.
              <br/> 
              <br/> 
              Con la tecla Enter puedes pausar 
              o reanudar la animacion y con
              las teclas + y - puedes acercar 
              el modelo.
            
            </div>
          </Html>
        )}
      </group>
{/* 
      <primitive object={nodes.Hips} /> */}
    </group>
  );
};

export default SymptomsKidneyCancer;

useGLTF.preload("/models-3d/symptoms-kidney-cancer.glb");
