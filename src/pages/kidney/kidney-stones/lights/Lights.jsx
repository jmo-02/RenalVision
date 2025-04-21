import { useHelper } from '@react-three/drei';
import React from 'react'
import { useRef } from 'react'
import { DirectionalLightHelper, HemisphereLightHelper, PointLightHelper, SpotLightHelper } from 'three';

const Lights = () => {
  
  const directionalLightRef = useRef();
  // useHelper(directionalLightRef, DirectionalLightHelper);

  return (
      <>
    <ambientLight color={"#F5F5DC"} intensity={2} castShadow={true}/>
    <directionalLight
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
    />
    <directionalLight
      ref={directionalLightRef}
      color={"white"}
      position={[0, 5, 5]}
      intensity={7}
      castShadow={true}
      shadow-mapSize={[2048, 2048]}
      shadow-camera-left={-10}
      shadow-camera-right={10}
      shadow-camera-top={10}
      shadow-camera-bottom={-10}
      shadow-camera-near={1}
      shadow-camera-far={20}
    />
    </>
  )
}

export default Lights