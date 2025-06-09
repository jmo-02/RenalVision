import { Center, Text3D } from '@react-three/drei';
import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

const TitlesPage = ({ title }) => {
  const textRef = useRef();
  const [animate, setAnimate] = useState(true);

  // Animación de flotación
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (animate && textRef.current) {
      textRef.current.position.y = Math.sin(t * 2) * 0.2; 
    }
  });

  return (
    <Center position={[0, 0, 0]}>
      <group
        ref={textRef}
        onDoubleClick={() => setAnimate((prev) => !prev)}
      >
        <Text3D
          font="/fonts/poppins-regular.json"
          bevelEnabled
          bevelSize={0.1}
          bevelThickness={0.02}
          height={0.2}
          lineHeight={0.8}
          letterSpacing={0.2}
          size={1.2}
          castShadow
          receiveShadow
        >
          {title = "GLOMERULONEFRITIS"}
          <meshStandardMaterial
            color="#0DBBB5"
            
          />
        </Text3D>
      </group>
    </Center>
  );
};

export default TitlesPage;