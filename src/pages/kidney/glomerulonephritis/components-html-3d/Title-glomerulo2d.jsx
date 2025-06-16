import { Text } from '@react-three/drei'

const TitleGlomerulo = ({ title }) => {
    return (
        <Text
            position={[0, 3.2, 0]}
            color={"#075F73"}
            anchorX={"center"}
            anchorY={"middle"}
            fontSize={0.6}
        >
            {title="Glomerulo"}
        </Text>
    )
}

export default TitleGlomerulo;