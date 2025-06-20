import { useHelper } from '@react-three/drei';
import React, { useRef } from 'react';
import { DirectionalLightHelper, PointLightHelper } from 'three';

const LightsModelBox = () => {
  const directionalLightRef = useRef();
  const targetRef = useRef();
  const backLightRef = useRef();

  // Helpers para ver cómo están posicionadas las luces
  // useHelper(directionalLightRef, DirectionalLightHelper, 1, 'red');
  // useHelper(backLightRef, PointLightHelper, 1, 'blue');

  return (
    <>
      <ambientLight color={"#F5F5DC"} intensity={0.5} />
      {/* Luz principal apuntando de frente */}
      <directionalLight
        ref={directionalLightRef}
        color={"white"}
        position={[0, 7, 10]}
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
        position={[0, 0, -3.5]}
        intensity={15}
        distance={100}
        decay={1}
      />
      <pointLight
        ref={backLightRef}
        color={"white"}
        position={[3, 3, -3.5]}
        intensity={15}
        distance={100}
        decay={1}
      />
      <pointLight
        ref={backLightRef}
        color={"white"}
        position={[-3, 3, -3.5]}
        intensity={15}
        distance={100}
        decay={1}
      />
    </>
  );
};

export default LightsModelBox;
