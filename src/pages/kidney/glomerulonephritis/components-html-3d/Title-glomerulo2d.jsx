import { Text } from '@react-three/drei'

const TitleGlomerulo = ({ title }) => {
    return (
        <Text
            position={[1, 6.4, 0]}
            color={"#075F73"}
            anchorX={"center"}
            anchorY={"middle"}
            fontSize={2}
        >
            {title="Glomerulo"}
        </Text>
    )
}

export default TitleGlomerulo;