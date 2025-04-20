import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

const GlomeruloModel = (props) => {
  const { scene } = useGLTF('/models-3d/glomerulus.glb');

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true; // opcional
      }
    });
  }, [scene]);

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
