import { Html } from "@react-three/drei";
import { useRef } from "react";
import "./TitleTreatment.css";
import { useFrame } from "@react-three/fiber";

const TreatmentTitle3D = ({ title }) => {
  const htmlRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (htmlRef.current) {
      htmlRef.current.position.y = Math.sin(t * 2) * 0.05 - 1; 
    }
  });

  return (
    <group ref={htmlRef} position={[0, -0.5, 0.5]}>
      <Html
        center
        transform
        distanceFactor={14}
      >
        <h1 className="title-treatment">{title}</h1>
      </Html>
    </group>
  );
};

export default TreatmentTitle3D;
