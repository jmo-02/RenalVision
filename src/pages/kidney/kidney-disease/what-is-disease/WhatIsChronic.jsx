import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import ChronicDisease from "../models-3D/ChronicDisease";
import "./WhatIsChronic.css";
import LightsModel from "../lightsmodels/LightsModels";

const WhatIsChronic = () => {
  return (
    <section className="whatischronic" id="whatischronic">
      <div className="model-3d">
        <Canvas shadows camera={{ position: [10, 0, 20], fov: 40 }}>
          <OrbitControls />
          <LightsModel />
          <ChronicDisease scale={7} />
        </Canvas>
      </div>
      <div className="content">
        <h3>¿QUÉ ES LA ENFERMEDAD RENAL CRÓNICA?</h3>
        <p>
          La enfermedad renal crónica (ERC) es una afección progresiva en la que
          los riñones pierden gradualmente su capacidad para filtrar desechos y
          líquidos del cuerpo. Esto puede llevar a una acumulación de toxinas
          en el organismo y afectar otras funciones vitales. La ERC ocurre como
          resultado de daños prolongados en los riñones, que pueden ser
          causados por condiciones como diabetes, hipertensión, infecciones
          recurrentes o enfermedades hereditarias.
        </p>
        <p>
          A medida que la enfermedad avanza, los síntomas pueden incluir
          fatiga, hinchazón en las extremidades, cambios en la micción y
          presión arterial alta. Si no se detecta y trata a tiempo, la ERC
          puede progresar a insuficiencia renal, lo que requiere tratamientos
          como diálisis o trasplante de riñón.
        </p>
      </div>
    </section>
  );
};

export default WhatIsChronic;
