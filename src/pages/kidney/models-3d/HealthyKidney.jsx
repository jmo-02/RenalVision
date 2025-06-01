import { useGLTF, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const HealthyKidney = (props) => {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF('/models-3d/healthy-kidney.glb');

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.009;
    }
  });

  return (
    <group ref={groupRef} {...props} dispose={null}>
      {/* Renderiza todos los meshes del modelo */}
      {Object.entries(nodes).map(([name, node]) => {
        if (!node.isMesh) return null;
        return (
          <mesh
            key={name}
            geometry={node.geometry}
            material={node.material || materials[node.material?.name]}
            castShadow
            receiveShadow
          />
        );
      })}
      <OrbitControls enableZoom={true} />
    </group>
  );
};

useGLTF.preload('/models-3d/healthy-kidney.glb');

export default HealthyKidney;
