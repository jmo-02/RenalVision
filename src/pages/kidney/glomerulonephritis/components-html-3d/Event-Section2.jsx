import React from "react";
import { Html } from '@react-three/drei';
import "./Event-Section2.css"; // Asumiendo que este es el CSS

const Causes3D = ({ showCauses }) => {
  if (!showCauses) return null;

  return (
    <Html center>
      <div className="causes-box">
        <h3>Causas de la Glomerulonefritis</h3>
        <ul>
          <li>Infecciones bacterianas o virales</li>
          <li>Trastornos autoinmunes como el lupus</li>
          <li>Enfermedades vasculares</li>
          <li>Diabetes mellitus</li>
        </ul>
        <p className="hint">
          Presiona R
          <br /> 
          para cerrar el texto</p>
      </div>
    </Html>
  );
};

export default Causes3D;
