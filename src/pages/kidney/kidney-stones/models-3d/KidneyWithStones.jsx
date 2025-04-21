import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const KidneyWithStones = (props) => {
  const kidneyWithStoneRef = useRef();

  useFrame((state, delta) => {
    kidneyWithStoneRef.current.rotation.y += 1 * delta;
  });

  const { nodes, materials } = useGLTF("/models-3d/kidney-with-stone.glb");
  return (
    <group {...props} dispose={null}>
      <group ref={kidneyWithStoneRef} >
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
