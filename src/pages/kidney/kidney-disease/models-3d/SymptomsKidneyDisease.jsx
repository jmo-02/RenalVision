import React, { useRef, useState, useEffect } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const SymptomsKidneyDisease = (props) => {
  const symptomsRef = useRef();
  const [showInfo, setShowInfo] = useState(true);
  const [animate, setAnimate] = useState(true);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (animate && symptomsRef.current) {
      symptomsRef.current.position.y = 0.7 + Math.sin(t) * 0.2;
    }
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Enter") {
        setAnimate((prev) => !prev);
        setShowInfo(false);
      }
      if (e.code === "Space") {
        setShowInfo(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const { nodes, materials } = useGLTF("/models-3d/symptoms-kidney-disease.glb");

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <group {...props} dispose={null} position={[0, 0, 0]} scale={[6, 6, 6]}>
        <group
          ref={symptomsRef}
          onClick={() => setShowInfo(true)}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.geometry_0.geometry}
            material={nodes.geometry_0.material}
            skeleton={nodes.geometry_0.skeleton}
          />
          {showInfo && (
            <Html position={[-0.2, 0.8, 0]} center distanceFactor={10}>
              <div
                style={{
                  background: "rgba(6,86,110,0.85)",
                  color: "white",
                  padding: "16px 32px",
                  borderRadius: "24px",
                  fontSize: "20px",
                  textAlign: "center",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
                  maxWidth: "350px",
                  lineHeight: "1.4",
                }}
              >
                <b>Interacción con el modelo:</b><br />
                <ul style={{textAlign: "left", margin: "12px 0 0 0", paddingLeft: 20}}>
                  <li><b>Click</b>: Mostrar instrucciones</li>
                  <li><b>Barra espaciadora</b>: Ocultar instrucciones</li>
                  <li><b>Enter</b>: Pausar/continuar animación y ocultar instrucciones</li>
                </ul>
                <div style={{marginTop: 8, fontSize: 15, opacity: 0.8}}>
                  (Este mensaje desaparecerá al interactuar con el teclado)
                </div>
              </div>
            </Html>
          )}
        </group>
      </group>
    </>
  );
};

export default SymptomsKidneyDisease;

useGLTF.preload("/models-3d/symptoms-kidney-disease.glb");