import { Text } from '@react-three/drei'
import React from 'react'

const Title1 = ({ title }) => {
    return (
        <Text
            position={[0, 3.5, 0]}
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

export default Title1