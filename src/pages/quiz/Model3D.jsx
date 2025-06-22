import React from "react";
import { useGLTF } from "@react-three/drei";

const Model3D = ({ url, ...props }) => {
  try {
    const { scene } = useGLTF(url);
    return <primitive object={scene} {...props} />;
  } catch (e) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
        {/* Mensaje de error opcional */}
      </mesh>
    );
  }
};

export default Model3D;
