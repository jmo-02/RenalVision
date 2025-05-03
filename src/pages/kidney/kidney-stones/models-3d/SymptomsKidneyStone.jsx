import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const SymptomsKidneyStone = (props) => {
  const symptomsRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (symptomsRef.current) {
      symptomsRef.current.position.y = Math.sin(t) * 0.2; // animación de flotación
    }
  });

  const { nodes, materials } = useGLTF("/models-3d/symptoms-kidney-stone.glb");
  return (
    <group {...props} dispose={null}>
      <group ref={symptomsRef}>
        <mesh
          receiveShadow
          geometry={nodes.Symptoms.geometry}
          material={materials.SymptomsMaterial}
          skeleton={nodes.Symptoms.skeleton}
          castShadow
        />
      </group>
      <primitive object={nodes.Hips} />
    </group>
  );
};

export default SymptomsKidneyStone;

useGLTF.preload("/models-3d/symptoms-kidney-stone.glb");
