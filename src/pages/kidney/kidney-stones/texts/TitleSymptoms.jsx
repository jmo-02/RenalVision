import { Html } from "@react-three/drei";
import React, { useRef } from "react";
import "./TitleSymptoms.css";
import { useFrame } from "@react-three/fiber";

const TitleSymptoms = ({ title, position = [0, -1, 2] }) => { 
  const htmlRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (htmlRef.current) {
      htmlRef.current.position.y = Math.sin(t * 1.5) * 0.05 + position[1];
    }
  });

  return (
    <group ref={htmlRef} position={position}>
      <Html
        center
        transform
        distanceFactor={15}
        wrapperClass="title"
      >
        <h1 className="titulo1">{title}</h1>
      </Html>
    </group>
  );
};

export default TitleSymptoms;
