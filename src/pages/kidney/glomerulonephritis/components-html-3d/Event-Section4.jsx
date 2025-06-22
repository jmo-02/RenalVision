import React from "react";
import { Html } from '@react-three/drei';
import "./Event-Section4.css"; // Asumiendo que este es el CSS

const Prevention3D = ({ showPrevention }) => {
  if (!showPrevention) return null;

  return (
    <Html center>
      <div className="causes-box">
        <h3>Prevenciones de la Glomerulonefritis</h3>
        <ul>
          <li>Prevenir infecciones por estreptococos</li>
          <li>Evitar automedicarse</li>
          <li>Acudir al médico regularmente</li>
          <li>Mantener un estilo de vida saludable</li>
        </ul>
      </div>
    </Html>
  );
};

export default Prevention3D;
