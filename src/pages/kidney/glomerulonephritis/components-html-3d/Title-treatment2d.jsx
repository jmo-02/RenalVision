import { Text } from '@react-three/drei'

const Title2dPrevention = ({ titleprevention2d }) => {
    return (
        <Text
            position={[0, 3.2, 1]}
            color={"#075F73"}
            anchorX={"center"}
            anchorY={"middle"}
            fontSize={0.8}
            lineHeight={0.8}
            
        >
            {titleprevention2d="Decisiones saludables\n protegen tus riñones "}
        </Text>
    )
}

export default Title2dPrevention;