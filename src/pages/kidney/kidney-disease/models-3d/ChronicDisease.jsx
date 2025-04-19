import { useGLTF } from "@react-three/drei";

const ChronicDisease = (props) => { // Corregido el nombre del componente
  const { nodes, materials } = useGLTF('/models-3d/Chr-Kidney-Disease.glb');

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ChrKidneyDisease.geometry}
        material={materials.ChrKidneyDiseaseMaterial}
      />
    </group>
  );
};

export default ChronicDisease; // Corregido el nombre de exportación

useGLTF.preload('/models-3d/Chr-Kidney-Disease.glb');
