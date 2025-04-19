import { useGLTF } from '@react-three/drei'

const KidneyWithStones = (props) => {
  const { nodes, materials } = useGLTF('/models-3d/kidney-with-stone.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.KidneyStone.geometry}
        material={materials.KidneyStoneMaterial}
      />
    </group>
  )
}

export default KidneyWithStones;

useGLTF.preload('/models-3d/kidney-with-stone.glb')