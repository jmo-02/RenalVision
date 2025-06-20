import React from "react";
import { useGLTF } from "@react-three/drei";

const Model3D = ({ url, ...props }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} {...props} />;
};

export default Model3D;
