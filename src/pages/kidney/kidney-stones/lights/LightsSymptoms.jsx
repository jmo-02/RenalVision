import { useHelper } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react'
import { DirectionalLightHelper } from 'three';

const LightsSymptoms = () => {
  
  const directionalLightRef = useRef();
  const targetRef = useRef();
//   useHelper(directionalLightRef, DirectionalLightHelper);
  const { scene } = useThree();
  
  useEffect(() => {
    if (directionalLightRef.current && targetRef.current) {
      directionalLightRef.current.target = targetRef.current;
      scene.add(targetRef.current); // Muy importante: agregar el target al scene
    }
  }, [scene]);

  return (
      <>
    <ambientLight color={"#F5F5DC"} intensity={2} castShadow={true}/>
    {/* <directionalLight
      ref={directionalLightRef}
      color={"white"}
      position={[0, 5, -5]}
      intensity={3}
      castShadow={true}
      //shadow-mapSize={[2048, 2048]}
      //shadow-camera-left={-1}
      //shadow-camera-right={1}
      //shadow-camera-top={1}
      //shadow-camera-bottom={-1}
      //shadow-camera-near={1}
      //shadow-camera-far={7.5}
    /> */}
    <directionalLight
      ref={directionalLightRef}
      color={"white"}
      position={[3.5, 8, 5]}
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
    <mesh ref={targetRef} position={[0, 3, 0]} visible={false} />
    </>
  )
}

export default LightsSymptoms