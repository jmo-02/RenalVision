import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GlomerulonephritisTreatment.css';

const GlomerulonephritisTreatment = () => {
  const navigate = useNavigate();

  return (
    <div className="section-container">
      <h3>Tratamientos de la Glomerulonefritis</h3>
      <ul>
        <li><strong>Medicamentos:</strong>
          <ul>
            <li>Antibióticos (si la causa es una infección).</li>
            <li>Corticoides o inmunosupresores (para controlar la inflamación).</li>
            <li>Antihipertensivos (para bajar la presión y proteger el riñón).</li>
            <li>Diuréticos (para eliminar el exceso de líquidos).</li>
          </ul>
        </li>
        <li><strong>Cambios en la alimentación:</strong>
          <ul>
            <li>Reducir el consumo de sal.</li>
            <li>Controlar las proteínas o el potasio según el caso.</li>
            <li>Limitar líquidos si hay retención.</li>
          </ul>
        </li>
        <li><strong>Diálisis:</strong> en casos graves o crónicos.</li>
          <ul>
            <li>Si el riñón pierde casi toda su función, puede ser necesaria la diálisis
              para eliminar toxinas de la sangre.</li>
          </ul>
        <li><strong>Trasplante renal:</strong> si el riñón deja de funcionar completamente.</li>
      </ul>
      <button className="back-button" onClick={() => navigate(-1)}>
        Volver
      </button>
    </div>
  );
};

export default GlomerulonephritisTreatment;