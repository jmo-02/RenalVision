import React, { useEffect, useRef, useState } from 'react';
import { Html, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const PreventionKidneyStone = (props) => {
  const { nodes, materials } = useGLTF('/models-3d/prevention-kidney-stone.glb');
  const meshRef = useRef();

  const [showInfo, setShowInfo] = useState(false);
  const [zoom, setZoom] = useState(1); // nivel de zoom

  // Animación de palpitar (leve)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const scale = zoom * (1 + Math.sin(t * 2) * 0.05); // ajusta la amplitud
    if (meshRef.current) {
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  // Eventos de teclado para zoom + y -
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '+') {
        setZoom((prev) => Math.min(prev + 0.1, 3)); // máximo 3x
      } else if (e.key === '-') {
        setZoom((prev) => Math.max(prev - 0.1, 0.3)); // mínimo 0.3x
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <group {...props} dispose={null}>
      <group
        ref={meshRef}
        onPointerOver={() => setShowInfo(true)}
        onPointerOut={() => setShowInfo(false)}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Kidney.geometry}
          material={materials.KidneyMaterial}
        />
        {showInfo && (
          <Html position={[0, -0.2, 0]} center distanceFactor={10}>
            <div
              style={{
                background: "rgba(6,86,110,0.6)",
                color: "white",
                padding: "8px 16px",
                borderRadius: "10px",
                fontSize: "18px",
                whiteSpace: "normal",
                textAlign: "center",
                width: "250px", // 👈 ancho explícito
                overflowWrap: "break-word",
                wordBreak: "break-word",

              }}
            >
              Usa las teclas + y - para acercar o alejar el modelo.
            </div>
          </Html>
        )}
      </group>
    </group>
  );
};

useGLTF.preload('/models-3d/prevention-kidney-stone.glb');

export default PreventionKidneyStone;
