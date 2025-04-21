import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GlomerulonephritisWhatIs.css';

const GlomerulonephritisWhatIs = () => {
  const navigate = useNavigate();

  return (
    <div className="section-container">
      <h3>¿Qué es la Glomerulonefritis?</h3>
      <p>
        La glomerulonefritis es la inflamación de los glomérulos,
        las unidades de filtración del riñón. Puede ser de aparición
        aguda o crónica y está asociada a diversas causas, como procesos
        infecciosos, trastornos inmunológicos y enfermedades sistémicas.
      </p>
      <button className="back-button" onClick={() => navigate(-1)}>
        Volver
      </button>
    </div>
  );
};

export default GlomerulonephritisWhatIs;
