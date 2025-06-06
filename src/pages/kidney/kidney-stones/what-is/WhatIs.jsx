import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import KidneyWithStones from "../models-3d/KidneyWithStones";
import "./WhatIs.css";
import Lights from "../lights/Lights";
import Recipient from "../models-3d/Recipient";


const WhatIs = () => {
  return (
    <section className="whatis" id="whatis">
      <div className="model-3d">
        <Canvas shadows camera={{ position: [0, 0, 20],fov:45 }}>
          <OrbitControls />
          <Lights/>
          
          {/* <ambientLight intensity={1.5} />
          <directionalLight position={[5, 2, 10]} intensity={2} /> */}
          <KidneyWithStones scale={9} />
          <Recipient/>
        </Canvas>
      </div>
      <div className="content">
        <h3>¿QUE SON LOS CALCULOS RENALES?</h3>
        <p>
          Los cálculos renales, también conocidos como piedras en los riñones,
          son pequeñas masas sólidas formadas por minerales y sales que se
          acumulan en los riñones. Se producen cuando la orina contiene altas
          concentraciones de ciertas sustancias, como calcio, oxalato y ácido
          úrico, que se cristalizan y se agrupan. Estos cálculos pueden variar
          en tamaño y causar dolor intenso al desplazarse por las vías
          urinarias.
        </p>
      </div>
    </section>
  );
};

export default WhatIs;
