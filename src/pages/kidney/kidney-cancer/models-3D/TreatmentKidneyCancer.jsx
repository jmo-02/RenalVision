import React, { useEffect, useRef, useState } from 'react';
import { Html, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const TreatmentKidneyCancer = (props) => {
  const treatmentKidneyCancerRef = useRef();
  const [animate, setAnimate] = useState(true);
  const [reverse, setReverse] = useState(false); // inversión
  const [showInfo, setShowInfo] = useState(true); // por defecto visible

  // Animación de rotación y movimiento
  useFrame((state) => {
    if (animate && treatmentKidneyCancerRef.current) {
      const t = state.clock.elapsedTime;
      const factor = reverse ? -1 : 1;
      treatmentKidneyCancerRef.current.position.x = factor * Math.sin(t) * 0.1;
      treatmentKidneyCancerRef.current.position.z = factor * Math.cos(t) * 0.1;
      treatmentKidneyCancerRef.current.rotation.y += factor * 0.01;
    }
  });

  // Rotación inicial
  useEffect(() => {
    if (treatmentKidneyCancerRef.current) {
      treatmentKidneyCancerRef.current.rotation.y = Math.PI / 3;
    }
  }, []);

  // Tecla espacio para invertir
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ') {
        setReverse((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const { nodes, materials } = useGLTF('/models-3d/treatment-kidney-cancer.glb');

  return (
    <group {...props} dispose={null}>
      <group
        ref={treatmentKidneyCancerRef}
        onDoubleClick={() => setAnimate((prev) => !prev)} // clic izquierdo: pausa/reanuda
        onClick={() => setShowInfo((prev) => !prev)} // doble clic: ocultar/mostrar texto
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Medicament.geometry}
          material={materials.MedicamentMaterial}
        />
        {showInfo && (
          <Html position={[-0.3, 0.3, 0]} center distanceFactor={10}>
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
              Clic para ocultar o mostrar este texto.<br />
              <br />
              Con doble clic pausas la animación o con la tecla Espacio puedes invertirla.
            </div>
          </Html>
        )}
      </group>
    </group>
  );
};

export default TreatmentKidneyCancer;
useGLTF.preload('/models-3d/treatment-kidney-cancer.glb');
