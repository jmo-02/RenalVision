// src/pages/kidney/glomerulonephritis/models-3d/Glomerulo.jsx
import React from 'react';
import { useGLTF } from '@react-three/drei';

const GlomeruloModel = (props) => {
  const { scene } = useGLTF('/models-3d/glomerulus.glb');

  return (
    <primitive 
      object={scene} 
      {...props} 
      dispose={null} 
    />
  );
};

useGLTF.preload('/models-3d/glomerulus.glb');

export default GlomeruloModel;
