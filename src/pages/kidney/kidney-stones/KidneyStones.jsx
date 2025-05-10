import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import KidneyWithStones from "./models-3d/KidneyWithStones";
import Recipient from "./models-3d/Recipient";
import Lights from "./lights/Lights";
import { ChevronDown, ChevronUp } from "lucide-react";
import "./KidneyStones.css";
import SymptomsKidneyStone from "./models-3d/SymptomsKidneyStone";
import RecipientSymptoms from "./models-3d/RecipientSymptoms";
import LightsSymptoms from "./lights/LightsSymptoms";
import StagingSymptoms from "./staging/StagingSymptoms";
import TitleSymptoms from "./texts/TitleSymptoms";

const KidneyStones = () => {
  const sectionRefs = [useRef(null), useRef(null), useRef(null)];

  const scrollToSection = (index) => {
    sectionRefs[index]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="kidney-stones-container">
      {/* Sección 1 */}
      <section ref={sectionRefs[0]} className="section1">
        <div className="div-title">
          <h1 className="title-page">CÁLCULOS RENALES</h1>
        </div>
        <div className="content">
          
          <h3>¿QUÉ SON?</h3>
          <p className="p1">
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
          <Canvas
            className="canvas2"
            shadows
            camera={{ position: [0, 10, 15], fov: 45 }}
          >
            <OrbitControls target={[0, 4, 0]} />
            <LightsSymptoms />
            <StagingSymptoms />
            <SymptomsKidneyStone scale={5} position={[0, 0, 0]} />
            {/* <TitleSymptoms title={"CAUSAS Y SÍNTOMAS"}/> */}
            <RecipientSymptoms />
          </Canvas>
        </div>

        <div className="content">
          <Canvas>
            <OrbitControls />
            <TitleSymptoms title={"CAUSAS Y SÍNTOMAS"} />
          </Canvas>
          <p className="p_2">
            Los cálculos renales pueden formarse debido a múltiples factores
            como la deshidratación, una dieta rica en sodio, oxalatos o
            proteínas animales, así como predisposición genética o enfermedades
            metabólicas. Entre los síntomas más comunes se encuentran el dolor
            intenso en la parte baja de la espalda o costado, presencia de
            sangre en la orina, necesidad frecuente de orinar, náuseas, vómito
            y, en algunos casos, fiebre si hay infección asociada.
          </p>
        </div>
        <button
          className="scroll-button-up1"
          onClick={() => scrollToSection(0)}
        >
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
          <p className="p3">
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
