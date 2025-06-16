import { Text } from '@react-three/drei'
import React from 'react'

const Title2 = ({ title }) => {
    return (
        <Text
            position={[0.10, 3.81, 5.2]}
            color={"#075F73"}
            anchorX={"center"}
            anchorY={"middle"}
            fontSize={0.35}
            font="/fonts/poppins-bold.ttf"
        >
            {title}
        </Text>
    )
}

export default Title2