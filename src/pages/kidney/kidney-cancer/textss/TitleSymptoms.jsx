import { Html } from "@react-three/drei";
import React, { useRef } from "react";
import "./TitleSymptoms.css";
import { useFrame } from "@react-three/fiber";

const TitleSymptoms = ({ title }) => {
  const htmlRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (htmlRef.current) {
      // Oscila en el eje Y (vertical), puedes ajustar amplitud y velocidad
      htmlRef.current.position.y = Math.sin(t * 1.5) * 0.05 - 1; // -1 es la posición base
    }
  });

  return (
    <group ref={htmlRef} position={[0, -1, 2]}>
      <Html
        center
        transform
        distanceFactor={15}
        wrapperClass="title"
      >
        {/* Permitir salto de línea con '\n' en el título */}
        <h1 className="titulo1">
          {title.split(/\n|<br\s*\/?>/).map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              {idx !== title.split(/\n|<br\s*\/?>/).length - 1 && <br />}
            </React.Fragment>
          ))}
        </h1>
      </Html>
    </group>
  );
};

export default TitleSymptoms;
