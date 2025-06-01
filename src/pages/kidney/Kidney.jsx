import  { useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router';
import './Kidney.css'; 
import { Canvas } from '@react-three/fiber';
import HealthyKidney from './models-3d/HealthyKidney';

const Kidney = () => {
  const navigate = useNavigate();

  const handleCalculos = useCallback(() => {
    navigate('/riñon/calculos-renales');
  }, [navigate]);

  const handleGlomerulonefritis = useCallback(() => {
    navigate('/riñon/glomerulonefritis');
  }, [navigate]);

  const handleClickCancer = useCallback(() => {
      navigate("/riñon/cancer-de-riñon", {
      });
      }, [navigate]);

      const handleClickChronic = useCallback(() => {
    navigate("/riñon/E-R-C", {});
  }, [navigate]);



  return (
    <div className="kidney-container">
      <h2 className="kidney-title">
        Aquí encontrarás algunas de las enfermedades renales más comunes
      </h2>

      <div className="button-group">
        <button onClick={handleCalculos} className="button kidney-button">
          Cálculos Renales
        </button>

        <div className="button-with-image">
          <img src="/images/glomerulonefritis.png" alt="Ícono de Glomerulonefritis" />
          <button onClick={handleGlomerulonefritis} className="button kidney-button">
            Glomerulonefritis
          </button>
        </div>

        <div className="button-team">
          <button onClick={handleClickCancer} className="button boton2">
            Cáncer de Riñón
          </button>
        </div>

        <div className="button-team2">
          <button onClick={handleClickChronic} className="button boton3">
            Enfermedad Renal Cronica
          </button>
        </div>
      </div>

      {/* Modelo 3D a la derecha */}
      <div className="model-3d-home">
        <Canvas camera={{ position: [0, 0, 25], fov: 45 }} style={{ width: '350px', height: '350px', background: 'transparent' }} shadows>
          <ambientLight intensity={2} />
          <directionalLight
            position={[0, 0, 40]}
            intensity={38}
            color="rgb(255, 255, 255)"
            target-position={[0, -2, 0]} // apunta directamente al modelo
            castShadow
          />
          <pointLight position={[0, 10, 10]} intensity={3.5} color="#fff" />
          <pointLight position={[-10, 10, 10]} intensity={2.5} color="#fff" />
          <HealthyKidney scale={6} position={[0, -2, 0]} />
        </Canvas>
      </div>

      <Outlet />
    </div>
  );
};

export default Kidney;
