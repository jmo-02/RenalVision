import { Center, Text3D } from '@react-three/drei';
import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

const TitleSection2 = ({ title }) => {
  const textRef = useRef();
  const [animate, setAnimate] = useState(true); // controlar la animación

  // Animación de flotación
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (animate && textRef.current) {
      textRef.current.position.y = Math.sin(t * 2) * 0.2; // velocidad y altura de la animación
    }
  });

  // Activar/desactivar animación con tecla Enter
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        setAnimate((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
          size={2.5}
          castShadow
          receiveShadow
        >
          {title}
          <meshStandardMaterial
            color="#BBF3F2"
          />
        </Text3D>
      </group>
    </Center>
  );
};

export default TitleSection2;
