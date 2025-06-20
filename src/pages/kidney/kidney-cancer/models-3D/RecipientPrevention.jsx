import React from 'react'
import { ShadowMaterial } from 'three'

const RecipientPrevention = () => {
  return (
    <mesh rotation-x={-Math.PI/2} receiveShadow={true} position={[0,-4,0]}>
        <circleGeometry args={[13,32]}/>
        <shadowMaterial opacity={0.3}/>
        {/* <meshStandardMaterial transparent={true} roughness={0.8} metalness={1}/> */}
    </mesh>
  )
}

export default RecipientPrevention;