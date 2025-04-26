import { useGLTF } from '@react-three/drei'
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";

const KidneyWithCancer = (props) => {
  const kidneyWithCancerRef = useRef();
  
  useFrame((state, delta) => {
    kidneyWithCancerRef.current.rotation.y -= 0.5 * delta;
  });

  const { nodes, materials } = useGLTF('/models-3d/kidney-cancer.glb')

  return (
    <group {...props} dispose={null}>
        <group ref={kidneyWithCancerRef}>
          <mesh
             geometry={nodes.KidneyCancer.geometry}
             material={materials.KidneyCancerModel}
             castShadow
             receiveShadow
            />
      </group>
      </group>
  );  
};

export default KidneyWithCancer

useGLTF.preload('/models-3d/kidney-cancer.glb')