import { useHelper } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { DirectionalLightHelper, PointLightHelper } from 'three';

const LightsPrevention = () => {
  const directionalLightRef = useRef();
  const targetRef = useRef();
  const backLightRef = useRef();
  const { scene } = useThree();

  // Helpers para ver cómo están posicionadas las luces
//   useHelper(directionalLightRef, DirectionalLightHelper, 1, 'red');
//   useHelper(backLightRef, PointLightHelper, 1, 'blue');

  useEffect(() => {
    if (directionalLightRef.current && targetRef.current) {
      directionalLightRef.current.target = targetRef.current;
      scene.add(targetRef.current);
    }
  }, [scene]);

  return (
    <>
      <ambientLight color={"#F5F5DC"} intensity={0.5} />
      
      {/* Luz principal apuntando de frente */}
      <directionalLight
        ref={directionalLightRef}
        color={"white"}
        position={[0, 5, 10]} // Cambié el z a positivo para que ilumine de frente
        intensity={6}
        castShadow={true}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-camera-near={1}
        shadow-camera-far={40}
      />
      
      {/* Target en el centro de la escena */}
      <mesh ref={targetRef} position={[0, 0, 0]} visible={false} />

      {/* Luz trasera tipo "point light" para suavizar las sombras */}
      <pointLight
        ref={backLightRef}
        color={"white"}
        position={[0, 0, -3.5]} // Detrás del modelo
        intensity={15}
        distance={100}
        decay={1}
      />
      <pointLight
        ref={backLightRef}
        color={"white"}
        position={[3, 3, -3.5]} // Detrás del modelo
        intensity={15}
        distance={100}
        decay={1}
      />
      <pointLight
        ref={backLightRef}
        color={"white"}
        position={[-3, 3, -3.5]} // Detrás del modelo
        intensity={15}
        distance={100}
        decay={1}
      />
    </>
  );
};

export default LightsPrevention;
