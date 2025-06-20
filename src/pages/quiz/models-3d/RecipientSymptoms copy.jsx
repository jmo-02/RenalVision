import React from 'react'

const RecipientSymptoms = () => {
    return (
        <mesh rotation-x={-Math.PI/2} receiveShadow={true} position={[-5,-0.1,0]}>
            <circleGeometry args={[14,35]}/>
            <shadowMaterial opacity={0.5}/>
            {/* <meshStandardMaterial transparent={true} roughness={0.8} metalness={1}/> */}
        </mesh>
      )
}

export default RecipientSymptoms