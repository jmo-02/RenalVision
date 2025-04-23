import { useGLTF } from '@react-three/drei'


const KidneyWithCancer = (props) => {
  const { nodes, materials } = useGLTF('/models-3d/kidney-cancer.glb')

  return (
    <group {...props} dispose={null}>
          <mesh
             geometry={nodes.KidneyCancer.geometry}
             material={materials.KidneyCancerModel}
             castShadow
             receiveShadow
            />
      </group>
    )
  }

export default KidneyWithCancer

useGLTF.preload('/models-3d/kidney-cancer.glb')