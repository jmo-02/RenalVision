import React, { useEffect, useRef, useState } from 'react';
import { Html, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const TreatmentKidneyStone = (props) => {
  const treatmentKidneyStonesRef = useRef();
  const [animate, setAnimate] = useState(true);
  const [reverse, setReverse] = useState(false);
  const [showInfo, setShowInfo] = useState(false); // por defecto oculto

  // Animación de rotación y movimiento
  useFrame((state) => {
    if (animate && treatmentKidneyStonesRef.current) {
      const t = state.clock.elapsedTime;
      const factor = reverse ? -1 : 1;
      treatmentKidneyStonesRef.current.position.x = factor * Math.sin(t) * 0.1;
      treatmentKidneyStonesRef.current.position.z = factor * Math.cos(t) * 0.1;
      treatmentKidneyStonesRef.current.rotation.y += factor * 0.01;
    }
  });

  // Rotación inicial
  useEffect(() => {
    if (treatmentKidneyStonesRef.current) {
      treatmentKidneyStonesRef.current.rotation.y = Math.PI / 3;
    }
  }, []);

  // Tecla Enter para invertir
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        setReverse((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const { nodes, materials } = useGLTF('/models-3d/treatment-kidney-stone.glb');

  return (
    <group {...props} dispose={null}>
      <group
        ref={treatmentKidneyStonesRef}
        onDoubleClick={() => setAnimate((prev) => !prev)}
        onPointerOver={() => setShowInfo(true)}  // 👈 Hover: mostrar texto
        onPointerOut={() => setShowInfo(false)}  // 👈 Salir: ocultar texto
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Treatment.geometry}
          material={materials.TreatmentMaterial}
        />
        {showInfo && (
          <Html position={[-0.3, -0.2, 0]} center distanceFactor={10}>
            <div
              style={{
                background: "rgba(6,86,110,0.6)",
                color: "white",
                padding: "8px 56px",
                width: "100%",
                borderRadius: "10px",
                fontSize: "18px",
                whiteSpace: "normal",
                textAlign: "center",
              }}
            >
              Doble clic para pausar o con la tecla Espacio invierte la animación.
            </div>
          </Html>
        )}
      </group>
    </group>
  );
};

export default TreatmentKidneyStone;
useGLTF.preload('/models-3d/treatment-kidney-stone.glb');
