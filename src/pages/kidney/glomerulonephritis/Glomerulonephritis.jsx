import React from 'react';
import { useNavigate, Outlet } from 'react-router';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import GlomeruloModel from './models-3d/Glomerulo';
import './Glomerulonephritis.css';

const Glomerulonephritis = () => {
  const navigate = useNavigate();

  return (
    <div className="glomerulo-page">
      <div className="glomerulo-content">
        <div className="glomerulo-model">
          <Canvas
            style={{ height: '300px' }}
            shadows
            camera={{ position: [7, 2, 5], fov: 50 }}>
            <ambientLight intensity={1} />
            <directionalLight 
              position={[1, 6, 6]} 
              intensity={2.5} 
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <mesh receiveShadow rotation={[-Math.PI/2, 0, 0]} position={[0, -2, 0]}>
              <planeGeometry args={[20, 20]} />
              <shadowMaterial opacity={0.5} />
            </mesh>
            <GlomeruloModel 
              rotation={[0, Math.PI*1.32, 0]} 
              scale={0.8}
            />
            <OrbitControls enableZoom />
          </Canvas>
          <p className="label">Glomérulo</p>
        </div>

        <div className="glomerulo-card">
          <h2> Glomerulonefritis</h2>
          <button onClick={() => navigate('/riñon/glomerulonefritis/info')}>¿Qué es?</button>
          <button onClick={() => navigate('/riñon/glomerulonefritis/sintomas')}>Síntomas</button>
          <button onClick={() => navigate('/riñon/glomerulonefritis/tratamientos')}>Tratamientos</button>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default Glomerulonephritis;
