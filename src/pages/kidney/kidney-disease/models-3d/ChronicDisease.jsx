import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

const ChronicDisease = (props) => { // Corregido el nombre del componente
  const ChronicDiseaseRef = useRef();

 useFrame((state, delta) => {
  ChronicDiseaseRef.current.rotation.y -= 0.5 * delta;
  });


  const { nodes, materials } = useGLTF('/models-3d/Chr-Kidney-Disease.glb');

  return (
    <group {...props} dispose={null}>
        <group ref={ChronicDiseaseRef}>
        <mesh
        castShadow
        receiveShadow
        geometry={nodes.ChrKidneyDisease.geometry}
        material={materials.ChrKidneyDiseaseMaterial}
      />
    </group>
    </group>
  );
};

export default ChronicDisease; // Corregido el nombre de exportación

useGLTF.preload('/models-3d/Chr-Kidney-Disease.glb');
