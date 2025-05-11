import { Html } from "@react-three/drei";
import React, { useRef } from "react";
import "./TitleSymptoms.css";
import { useFrame } from "@react-three/fiber";

const SymptomsTitle3D = ({ title }) => {
  const htmlRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (htmlRef.current) {
      
      htmlRef.current.position.y = Math.sin(t * 1.5) * 0.05 - 1; 
    }
  });

  return (
    <group ref={htmlRef} position={[0, -0.5, 0.5]}>
      <Html
        center
        transform
        distanceFactor={14}
        wrapperClass="title"
      >
        <h1 className="titulo1">{title}</h1>
      </Html>
    </group>
  );
};

export default SymptomsTitle3D;
