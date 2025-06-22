import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { OrbitControls} from '@react-three/drei';
 /*modelo*/
const PreventionModel = ({ onModelClick, onModelHover, onModelOut,isPaused, ...props }) => {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF('/models-3d/glomerulonephritis/prevention-glomerulonefritis.glb');

  useFrame(() => {
    if (groupRef.current && !isPaused) {
      groupRef.current.rotation.y += 0.004;
    }
  });
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight
        position={[1, 6, 6]}
        intensity={2.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <OrbitControls 
        enableZoom={true}
        minDistance={8}
        maxDistance={20}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
      />
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.5} />
      </mesh>

      <group ref={groupRef} scale={[1.8, 1.5, 1.6]} onClick={onModelClick} onPointerOver={onModelHover}
        onPointerOut={onModelOut} {...props}>
        {Object.entries(nodes).map(([name, node]) => {
          if (!node.isMesh) return null;
          return (
            <mesh
              key={name}
              geometry={node.geometry}
              material={node.material || materials[node.material.name]}
              castShadow
              receiveShadow
            />
          );
        })}
      </group>
    </>
  );
};

useGLTF.preload('/models-3d/glomerulonephritis/prevention-glomerulonefritis.glb');

export default PreventionModel;
