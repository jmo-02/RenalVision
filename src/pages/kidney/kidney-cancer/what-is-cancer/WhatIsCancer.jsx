import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import KidneyWithCancer from "../models-3D/KidneyWithCancer";
import "./WhatIsCancer.css";
import LightsModel from "../lightsmodel/LightsModel";


const WhatIsCancer = () => {
  return (
    <section className="whatiscancer" id="whatiscancer">
      <div className="model-3d">
        <Canvas shadows camera={{ position: [10, 0, 20],fov:40 }}>
        <OrbitControls />
          <LightsModel/>
          
          {/* <ambientLight intensity={1.5} />
          <directionalLight position={[5, 2, 10]} intensity={2} /> */}
          <KidneyWithCancer scale={7} />
        </Canvas>
      </div>
      <div className="content">
        <h3>¿QUE ES EL CANCER DE RIÑON?</h3>
        <p>
        El cáncer de riñón, también conocido como cáncer renal,
        es una enfermedad en la que las células del tejido renal comienzan a crecer de manera anormal y descontrolada,
        dando lugar a la formación de un tumor maligno.
        Este crecimiento desregulado ocurre como consecuencia de mutaciones genéticas en el ADN de las células renales,
        las cuales interfieren con sus funciones normales, como la división controlada,
        la reparación del daño celular y la muerte programada (apoptosis).
        A medida que estas células alteradas se multiplican, 
        pueden invadir tejidos cercanos e incluso diseminarse a otras partes del cuerpo si no se detectan y tratan a tiempo.
        </p>
      </div>
    </section>
  );
};

export default WhatIsCancer;
