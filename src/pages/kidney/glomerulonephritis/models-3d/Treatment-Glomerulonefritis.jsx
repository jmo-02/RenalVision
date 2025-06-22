import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { OrbitControls } from '@react-three/drei';

const TreatmentModel = ({ onModelHover, onModelOut, isPaused, ...props }) => {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF('/models-3d/glomerulonephritis/treatment-bottle-glomerulonefritis.glb');

  // Detener rotación si está pausado
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
        minPolarAngle={0}
      />
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.5} />
      </mesh>

      <group
        ref={groupRef}
        scale={[12, 12, 12]}
        position={[0, -2, 0]}
        onPointerOver={onModelHover}
        onPointerOut={onModelOut}
        {...props}
      >
        {Object.entries(nodes).map(([name, node]) => {
          if (!node.isMesh) return null;
          return (
            <mesh
              key={name}
              geometry={node.geometry}
              material={node.material || materials[node.material?.name]}
              castShadow
              receiveShadow
            />
          );
        })}

        {/* Aureola si está pausado */}
        {isPaused && (
          <mesh position={[0, 4, 0]}>
            <torusGeometry args={[1.5, 0.1, 16, 100]} />
            <meshStandardMaterial color="gold" emissive="gold" emissiveIntensity={1.2} />
          </mesh>
        )}
      </group>
    </>
  );
};

useGLTF.preload('/models-3d/glomerulonephritis/treatment-bottle-glomerulonefritis.glb');

export default TreatmentModel;
