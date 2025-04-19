import React, { useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router';
import './Kidney.css'; 

const Kidney = () => {
  const navigate = useNavigate();

  const handleCalculos = useCallback(() => {
    navigate('/riñon/calculos-renales');
  }, [navigate]);

  const handleGlomerulonefritis = useCallback(() => {
    navigate('/riñon/glomerulonefritis');
  }, [navigate]);

  return (
    <div className="kidney-container">
      <h2 className="kidney-title">
        Aquí encontrarás algunas de las enfermedades renales más comunes
      </h2>

      <div className="button-group">
        <button onClick={handleCalculos} className="kidney-button">
          Cálculos Renales
        </button>
        <button onClick={handleGlomerulonefritis} className="kidney-button">
          Glomerulonefritis
        </button>
      </div>

      <Outlet />
    </div>
  );
};

export default Kidney;
