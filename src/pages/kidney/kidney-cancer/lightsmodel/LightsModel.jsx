import { useHelper } from '@react-three/drei';
import React from 'react'
import { useRef } from 'react'
import { DirectionalLightHelper, HemisphereLightHelper, PointLightHelper, SpotLightHelper } from 'three';


const LightsModel = () => {

  return (
      <>
    <ambientLight intensity={15} />
  
    <directionalLight
      castShadow
      position={[5, 10, 5]}
      intensity={1.5}
      shadow-mapSize-width={1024}
      shadow-mapSize-Height={1024}
      shadow-bias={-0.0001}
    />

<mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -3.5, 0]}
      >
        <planeGeometry args={[50, 50]} />
        <shadowMaterial transparent opacity={0.4} />
      </mesh>

    </>
  );
};

export default LightsModel;