import React, { useRef, useState, useEffect } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const SymptomsKidneyDisease = (props) => {
  const symptomsRef = useRef();
  const [showInfo, setShowInfo] = useState(false);
  const [animate, setAnimate] = useState(true);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (animate && symptomsRef.current) {
      // Movimiento más sutil: menor amplitud y velocidad
      symptomsRef.current.position.y = 0.7 + Math.sin(t * 0.4) * 0.08;
    }
  });

  // Oculta el cuadro con teclado
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
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const { nodes, materials } = useGLTF("/models-3d/symptoms-kidney-disease.glb");

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <group {...props} dispose={null} position={[0, 0, 0]} scale={[6, 6, 6]}>
        <group
          ref={symptomsRef}
          onPointerOver={() => setShowInfo(true)}
          onPointerOut={() => setShowInfo(false)}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.geometry_0.geometry}
            material={nodes.geometry_0.material}
            skeleton={nodes.geometry_0.skeleton}
          />
          {showInfo && (
            <Html position={[-0.2, 0.6, 0]} center distanceFactor={10}>
              <div
                style={{
                  background: "rgba(6,86,110,0.85)",
                  color: "white",
                  padding: "14px 28px",
                  borderRadius: "20px",
                  fontSize: "17px",
                  textAlign: "center",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
                  maxWidth: "320px",
                  lineHeight: "1.4",
                }}
              >
                <b>Modelo síntomas</b>
                <ul style={{ textAlign: "left", margin: "10px 0 0 0", paddingLeft: 18 }}>
                  <li><b>Mouse</b>: Ver info</li>
                  <li><b>Espacio/Enter</b>: Ocultar/Pausar animación</li>
                </ul>
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