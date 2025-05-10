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
      symptomsRef.current.position.y = 0.7 + Math.sin(t) * 0.2;
    }
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        setAnimate((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const { nodes, materials } = useGLTF("/models-3d/symptoms-kidney-disease.glb");
  console.log("NODES:", nodes);
  console.log("MATERIALS:", materials);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <group {...props} dispose={null} position={[0, 0, 0]} scale={[6, 6, 6]}>
        {/* <axesHelper args={[5]} /> */}
        <group
          ref={symptomsRef}
          onClick={() => setShowInfo(true)}
          onDoubleClick={() => setShowInfo(false)}
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
                Esta enfermedad progresa gradualmente y puede ser causada por
                condiciones como la diabetes y la hipertensión arterial.
              </div>
            </Html>
          )}
        </group>
      </group>
    </>
  );
};

export default SymptomsKidneyDisease;

useGLTF.preload("/models-3d/symptoms-kidney-disease");