import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import ChronicDisease from "../models-3D/ChronicDisease";
import "./WhatIsChronic.css";


const WhatIsChronic = () => {
  return (
    <section className="whatischronic" id="whatischronic">
      <div className="model-3d">
        <Canvas camera={{ position: [0, 0, 7] }}>
          <OrbitControls />
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 2, 10]} intensity={2} />
          <ChronicDisease scale={9} />
        </Canvas>
      </div>
      <div className="content">
        <h3>¿QUE ES LA ENFERMEDAD RENAL CRONICA?</h3>
        <p>
        La enfermedad renal crónica (ERC) es una afección que se produce cuando los riñones se dañan lentamente y pierden su capacidad de filtrar la sangre. 
        Esto puede llevar a la acumulación de desechos y líquidos en el cuerpo, lo que puede causar una serie de problemas de salud.

        </p>
      </div>
    </section>
  );
};

export default WhatIsChronic;
