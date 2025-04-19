import { useGLTF } from '@react-three/drei'


const KidneyWithCancer = (props) => {
  const { nodes, materials } = useGLTF('/models-3d/kidney-cancer.glb')

  return (
    <group {...props} dispose={null}>
          <mesh
             castShadow
             receiveShadow
             geometry={nodes.KidneyCancer.geometry}
             material={materials.KidneyCancerModel}
            />
      </group>
    )
  }

export default KidneyWithCancer

useGLTF.preload('/models-3d/kidney-cancer.glb')