import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const RecipientBox = ({ position }) => {
  const shadowRef = useRef();

  // Si necesitas animar la sombra, puedes hacerlo aquí
  // useFrame(() => { ... });

  return (
    <mesh
      ref={shadowRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={position}
      receiveShadow={true}
    >
      <circleGeometry args={[2.5, 48]} />
      <meshPhysicalMaterial
        color="black"
        opacity={0.25}
        transparent
        roughness={1}
        metalness={0}
        clearcoat={1}
        clearcoatRoughness={1}
      />
    </mesh>
  );
};

export default RecipientBox;
