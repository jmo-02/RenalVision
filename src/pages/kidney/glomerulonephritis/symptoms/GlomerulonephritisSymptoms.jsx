import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GlomerulonephritisSymptoms.css';

const GlomerulonephritisSymptoms = () => {
  const navigate = useNavigate();

  return (
    <div className="section-container">
      <h3>Síntomas de la Glomerulonefritis</h3>
      <ul>
        <li>Orina de color oscuro (como té o cola).</li>
        <li>Disminución de la cantidad de orina.</li>
        <li>Hinchazón en cara, manos, abdomen o piernas (edema).</li>
        <li>Presión arterial alta.</li>
        <li>Cansancio o fatiga.</li>
        <li>Náuseas o pérdida del apetito.</li>
      </ul>
      <button className="back-button" onClick={() => navigate(-1)}>
        Volver
      </button>
    </div>
  );
};

export default GlomerulonephritisSymptoms;
