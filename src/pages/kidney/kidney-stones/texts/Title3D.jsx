import { Center, Text3D } from '@react-three/drei';
import React, { useRef } from 'react';

const Title3D = ({ title }) => {
  return (
    <Center position={[0, 4.5, 0]}>
      <group>
        <Text3D
          font="/fonts/roboto-black.json"
          bevelEnabled
          bevelSize={0.1}
          bevelThickness={0.2}
          height={0.2}
          lineHeight={0.8}
          letterSpacing={0.2}
          size={0.5}
          castShadow
          receiveShadow
        >
          {title}
          <meshStandardMaterial color="#075F73" />
        </Text3D>
      </group>
    </Center>
  );
};

export default Title3D;
