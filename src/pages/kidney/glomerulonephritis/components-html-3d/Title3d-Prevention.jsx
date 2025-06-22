import { Center, Text3D } from '@react-three/drei';

const Titles3dPrevention = ({ title3dprevention }) => {
  return (
    <Center position={[-0.3, 2.4, 0]}>
        <Text3D
          font="/fonts/poppins-regular.json"
          bevelEnabled
          bevelSize={0.1}
          bevelThickness={0.2}
          height={0.2}
          lineHeight={0.8}
          letterSpacing={0.2}
          size={0.4 }
          castShadow
          receiveShadow
        >
          {title3dprevention = "¡Cuida tus riñones,\ncuida tu vida!"}
          <meshStandardMaterial
            color="#075F73"
            
          />
        </Text3D>
    </Center>
  );
};

export default Titles3dPrevention;