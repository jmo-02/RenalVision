import { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations, OrbitControls} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import useStudentStore from "../../../../stores/use-symptomsmodel-store";

const SymptomsModel = ({onModelClick, ...props}) => {
  const groupRef = useRef();
  const { nodes, materials, animations } = useGLTF("/models-3d/symptoms-glomerulonefritis.glb");
  const { actions } = useAnimations(animations, groupRef);
  const { currentAnimation } = useStudentStore();

  const [direction, setDirection] = useState(1);
  const rotationLimit = 0.3;

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001 * direction;
      if (
        groupRef.current.rotation.y > rotationLimit ||
        groupRef.current.rotation.y < -rotationLimit
      ) {
        setDirection((d) => -d);
      }
    }
  });

  useEffect(() => {
    if (actions[currentAnimation]) {
      actions[currentAnimation].fadeIn(0.5).play();
    }
    return () => {
      if (actions[currentAnimation]) {
        actions[currentAnimation].fadeOut(0.5).stop();
      }
    };
  }, [actions, currentAnimation]);

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <OrbitControls
        enableZoom
        minDistance={8.5}
        maxDistance={10}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        maxAzimuthAngle={Math.PI / 4}
        minAzimuthAngle={-Math.PI / 4}
      />
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.5} />
      </mesh>

      <group ref={groupRef} {...props} dispose={null} scale={3} position={[0, -1.5, 0]} onClick={onModelClick}>
        <group name="Scene">
          <group name="Armature">
            <skinnedMesh
              name="EyeLeft"
              geometry={nodes.EyeLeft.geometry}
              material={materials.Wolf3D_Eye}
              skeleton={nodes.EyeLeft.skeleton}
              morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
              morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
              castShadow
            />
            <skinnedMesh
              name="EyeRight"
              geometry={nodes.EyeRight.geometry}
              material={materials.Wolf3D_Eye}
              skeleton={nodes.EyeRight.skeleton}
              morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
              morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
              castShadow
            />
            <skinnedMesh
              name="Wolf3D_Body"
              geometry={nodes.Wolf3D_Body.geometry}
              material={materials.Wolf3D_Body}
              skeleton={nodes.Wolf3D_Body.skeleton}
              castShadow
            />
            <skinnedMesh
              name="Wolf3D_Hair"
              geometry={nodes.Wolf3D_Hair.geometry}
              material={materials.Wolf3D_Hair}
              skeleton={nodes.Wolf3D_Hair.skeleton}
              castShadow
            />
            <skinnedMesh
              name="Wolf3D_Head"
              geometry={nodes.Wolf3D_Head.geometry}
              material={materials.Wolf3D_Skin}
              skeleton={nodes.Wolf3D_Head.skeleton}
              morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
              morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
              castShadow
            />
            <skinnedMesh
              name="Wolf3D_Outfit_Bottom"
              geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
              material={materials.Wolf3D_Outfit_Bottom}
              skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
              castShadow
            />
            <skinnedMesh
              name="Wolf3D_Outfit_Footwear"
              geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
              material={materials.Wolf3D_Outfit_Footwear}
              skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
              castShadow
            />
            <skinnedMesh
              name="Wolf3D_Outfit_Top"
              geometry={nodes.Wolf3D_Outfit_Top.geometry}
              material={materials.Wolf3D_Outfit_Top}
              skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
              castShadow
            />
            <skinnedMesh
              name="Wolf3D_Teeth"
              geometry={nodes.Wolf3D_Teeth.geometry}
              material={materials.Wolf3D_Teeth}
              skeleton={nodes.Wolf3D_Teeth.skeleton}
              morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
              morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
              castShadow
            />
            <primitive object={nodes.Hips} />
          </group>
        </group>
      </group>
    </>
  );
};

useGLTF.preload("/models-3d/symptoms-glomerulonefritis.glb");

export default SymptomsModel;
