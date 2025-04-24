import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import KidneyWithStones from "./models-3d/KidneyWithStones";
import Recipient from "./models-3d/Recipient";
import Lights from "./lights/Lights";
import { ChevronDown, ChevronUp } from "lucide-react";
import "./KidneyStones.css";

const KidneyStones = () => {
  const sectionRefs = [useRef(null), useRef(null), useRef(null)];

  const scrollToSection = (index) => {
    sectionRefs[index]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="kidney-stones-container">
      {/* Sección 1 */}
      <section ref={sectionRefs[0]} className="section1">
        <div className="content">
          <h3>¿QUÉ SON LOS CÁLCULOS RENALES?</h3>
          <p>
            Los cálculos renales son masas sólidas formadas por minerales que se
            acumulan en los riñones. Se forman cuando la orina está muy
            concentrada, lo que permite que los minerales se cristalicen y se
            agrupen.
          </p>
        </div>
        <div className="model-3d">
          <Canvas shadows camera={{ position: [0, 0, 15], fov: 45 }}>
            <OrbitControls />
            <Lights />
            <KidneyWithStones scale={7} />
            <Recipient />
          </Canvas>
        </div>
        <div className="button1">
          <button className="scroll-button1" onClick={() => scrollToSection(1)}>
            <ChevronDown size={40} />
          </button>
        </div>
      </section>

      {/* Sección 2 */}
      <section ref={sectionRefs[1]} className="section2">
        <div className="model-3d">
          <Canvas shadows camera={{ position: [0, 0, 15], fov: 45 }}>
            <OrbitControls />
            <Lights />
            {/* <KidneyWithStones scale={7} /> */}
            <Recipient />
          </Canvas>
        </div>
        <div className="content">
          <h3 className="h3_2">CAUSAS Y SÍNTOMAS</h3>
          <p className="p_2">
            Pueden originarse por deshidratación, dieta alta en sodio o
            proteínas, e incluso factores genéticos. Los síntomas incluyen dolor
            lumbar intenso, sangre en la orina y náuseas.
          </p>
        </div>
        <button className="scroll-button-up1" onClick={() => scrollToSection(0)}>
          <ChevronUp size={40} />
        </button>
        <button className="scroll-button2" onClick={() => scrollToSection(2)}>
          <ChevronDown size={40} />
        </button>
      </section>

      {/* Sección 3 */}
      <section ref={sectionRefs[2]} className="section3">
        <div className="content">
          <h3>PREVENCIÓN Y TRATAMIENTO</h3>
          <p>
            Beber suficiente agua es clave. El tratamiento puede incluir
            medicamentos, litotricia o cirugía. Evitar alimentos ricos en
            oxalato también ayuda.
          </p>
          <button
            className="scroll-button-up2"
            onClick={() => scrollToSection(1)}
          >
            <ChevronUp size={40} />
          </button>
        </div>
        <div className="model-3d">
          <Canvas shadows camera={{ position: [0, 0, 15], fov: 45 }}>
            <OrbitControls />
            <Lights />
            {/* <KidneyWithStones scale={7} /> */}
            <Recipient />
          </Canvas>
        </div>
      </section>
    </div>
  );
};

export default KidneyStones;
