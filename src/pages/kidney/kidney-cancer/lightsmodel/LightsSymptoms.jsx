import { useHelper } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { DirectionalLightHelper } from 'three';


const LightsSymptoms = () => {
  const directionalLightRef = useRef();
  const targetRef = useRef();
  const { scene } = useThree();


  useEffect(() => {
    if (directionalLightRef.current && targetRef.current) {
      directionalLightRef.current.target = targetRef.current;
      scene.add(targetRef.current); // Muy importante: agregar el target al scene
    }
  }, [scene]);

  return (
    <>
      <ambientLight color={"#F5F5DC"} intensity={7}  />
   
      <directionalLight
        ref={directionalLightRef}
        color={"white"}
        position={[3.5, 10, 10]}
        intensity={7}
        castShadow={true}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-near={1}
        shadow-camera-far={30}
      />
      <mesh ref={targetRef} position={[0, 0, 0]} visible={false} />
    </>
  );
};

export default LightsSymptoms;
