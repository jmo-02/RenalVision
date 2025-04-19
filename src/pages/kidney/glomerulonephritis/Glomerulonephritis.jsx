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
          <Canvas style={{ height: '300px'}} camera={{ position: [7, 3, 4], fov: 50 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[0, 5, 5]} intensity={6} />
            <GlomeruloModel />
            <OrbitControls enableZoom />
          </Canvas>
          <p className="label">Glomérulo</p>
        </div>

        <div className="glomerulo-card">
          <h2> Glomerulonefritis</h2>
          <button onClick={() => navigate('info')}>¿Que es?</button>
          <button onClick={() => navigate('sintomas')}>Sintomas</button>
          <button onClick={() => navigate('tratamientos')}>Tratamientos</button>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default Glomerulonephritis;
