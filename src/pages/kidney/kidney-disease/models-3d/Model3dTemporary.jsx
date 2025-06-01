import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Model3dTemporary = (props) => {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y -= 0.5 * delta;
  });

  // CORRIGE AQUÍ LA RUTA
  const { nodes, materials } = useGLTF("/models-3d/test_tube_mutations.glb");

  return (
    <group {...props} dispose={null}>
      <group ref={ref} scale={0.01}>
        <group position={[11.087, 65.209, 11.234]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Phials_Racked_Phials_Named_0.geometry}
            material={materials.Phials_Named}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Phials_Racked_Phials_Blank_0.geometry}
            material={materials.Phials_Blank}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Phial_Marsupial_Phials_Named_0.geometry}
          material={materials.Phials_Named}
          position={[0.009, 7.789, 119.55]}
          rotation={[-3.103, 1.042, 1.526]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Phial_Telekinesis_Phials_Named_0.geometry}
          material={materials.Phials_Named}
          position={[-62.374, 14.532, 119.55]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Phial_Telepathy_Phials_Named_0.geometry}
          material={materials.Phials_Named}
          position={[59.538, 14.532, 119.565]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Phial_Blank_2_Phials_Blank_0.geometry}
          material={materials.Phials_Blank}
          position={[0, 14.549, 56.301]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Phial_Blank_1_Phials_Blank_0.geometry}
          material={materials.Phials_Blank}
          position={[-36.428, 14.532, 82.342]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Phial_Blank_3_Phials_Blank_0.geometry}
          material={materials.Phials_Blank}
          position={[36.319, 14.532, 82.333]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Phial_Cap_Phials_Blank_0.geometry}
          material={materials.Phials_Blank}
          position={[0, 25.361, 56.301]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Rack_Rack_0.geometry}
          material={materials.Rack}
          position={[0, 50.496, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
      </group>
    </group>
  );
};

export default Model3dTemporary;

useGLTF.preload("/models-3d/test_tube_mutations.glb");