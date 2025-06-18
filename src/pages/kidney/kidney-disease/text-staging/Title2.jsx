import { Text } from '@react-three/drei'
import React from 'react'

const Title2 = ({ title }) => {
    return (
        <Text
            position={[-1, 3.8, 1]}
            color={"#075F73"}
            anchorX={"center"}
            anchorY={"middle"}
            fontSize={0.5}
            font="/fonts/poppins-bold.ttf"
        >
            {title}
        </Text>
    )
}

export default Title2