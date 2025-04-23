import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import KidneyWithCancer from "../models-3D/KidneyWithCancer";
import "./WhatIsCancer.css";


const WhatIsCancer = () => {
  return (
    <section className="whatiscancer" id="whatiscancer">
      <div className="model-3d">
        <Canvas shadows camera={{ position: [0, 0, 7] }}>
        <ambientLight 
          intensity={1.5} />
          <directionalLight
          position={[5, 5, 5]}
          intensity={2} 
          castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={1}
            shadow-camera-far={22}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />

           {/* Plano que recibe sombra */}
           <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
            <planeGeometry args={[30, 30]} />
            <shadowMaterial opacity={0.3} />
          </mesh>

          <KidneyWithCancer scale={5} />
          <OrbitControls />
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
