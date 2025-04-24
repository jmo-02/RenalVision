import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const KidneyWithStones = (props) => {
  const kidneyWithStonesRef = useRef();

  useFrame((state, delta) => {
    kidneyWithStonesRef.current.rotation.y -= 0.5 * delta;
  });

  const { nodes, materials } = useGLTF("/models-3d/kidney-with-stone.glb");
  return (
    <group {...props} dispose={null}>
      <group ref={kidneyWithStonesRef}>
        <mesh
          receiveShadow
          geometry={nodes.KidneyStone.geometry}
          material={materials.KidneyStoneMaterial}
          castShadow
        />
      </group>
    </group>
  );
};

export default KidneyWithStones;

useGLTF.preload("/models-3d/kidney-with-stone.glb");
