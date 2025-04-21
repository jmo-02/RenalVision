import React from 'react';
import { useGLTF } from '@react-three/drei';

const GlomeruloModel = (props) => {
  const { nodes, materials } = useGLTF('/models-3d/glomerulus.glb');

  return (
    <group {...props}>
      {Object.entries(nodes).map(([name, node]) => {
        if (!node.isMesh) return null;
        return (
          <mesh
            geometry={node.geometry}
            material={node.material || materials[node.material.name]}
            castShadow
            receiveShadow
          />
        );
      })}
    </group>
  );
};

useGLTF.preload('/models-3d/glomerulus.glb');

export default GlomeruloModel;
