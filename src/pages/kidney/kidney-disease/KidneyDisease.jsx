import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ChronicDisease from "./models-3d/ChronicDisease";
import LightsModel from "./lightsmodels/LightsModels";
import { ChevronDown, ChevronUp } from "lucide-react";
import "./KidneyDisease.css";
import SymptomsKidneyDisease from "./models-3d/SymptomsKidneyDisease";
import TitleSymptoms from "./text-staging/TitleSymptoms";
import RecipientSymptoms from "./models-3d/RecipientSymptoms";
import LightsSymptoms from "./lightsmodels/LightsSymptoms";
import StagingSymptoms from "./staging-erc/StagingSymptoms";
import Model3dTemporary from "./models-3d/Model3dTemporary"; 
import LightsTreatment from "./lightsmodels/LightsTreatment";
import StagingTreatment from "./staging-erc/StagingTreatment";
import RecipientTreatment from "./models-3d/RecipientTreatment";
import TitlePage from "./text-staging/TitlePage";
import LightsTitle from "./lightsmodels/LightsTitle";
import Title1 from "./text-staging/Title1";

const KidneyDisease = () => {
  const sectionRefs = [useRef(null), useRef(null), useRef(null)];

  const scrollToSection = (index) => {
    sectionRefs[index]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="kidney-disease-container">
      {/* Section 1 */}
      <section ref={sectionRefs[0]} className="section1">
        <div className="div-title">
          <Canvas shadows>
            <TitlePage title={"ENFERMEDAD RENAL CRÓNICA"} />
            <LightsTitle />
          </Canvas>
        </div>
        <div className="content">
          <h3>¿QUÉ ES?</h3>
          <p>
            (ERC) es una afección progresiva en la
            que los riñones pierden gradualmente su capacidad para filtrar
            desechos y líquidos del cuerpo. Esto puede llevar a una acumulación
            de toxinas en el organismo y afectar otras funciones vitales.
          </p>
        </div>
        <div className="model-3d">
          <Canvas shadows camera={{ position: [0, 0, 15], fov: 45 }}>
            <OrbitControls />
            <LightsModel />
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
            <pointLight position={[-5, -5, 5]} intensity={0.8} />
            <ChronicDisease scale={7} />
          </Canvas>
        </div>
        <div className="button1">
          <button className="scroll-button1" onClick={() => scrollToSection(1)}>
            <ChevronDown size={40} />
          </button>
        </div>
      </section>

      {/* Section 2 */}
      <section ref={sectionRefs[1]} className="section2">
        <div className="model-3d">
          <Canvas 
          className="canvas2"
          shadows camera={{ position: [0, 10, 12], fov: 45 }}>
            <OrbitControls target={[0, 4, 0]} />
            <TitleSymptoms />
            <LightsSymptoms />
            <StagingSymptoms />
            <RecipientSymptoms /> 
            <SymptomsKidneyDisease scale={10} position={[0, 0, 0]} />  
          </Canvas>
        </div>
        <div className="content">
        <Canvas>
          {/* <OrbitControls /> */}
          <TitleSymptoms title={"CAUSAS Y SÍNTOMAS"} />
        </Canvas>
          <p className="p_2">
            Las causas comunes de la enfermedad renal crónica incluyen diabetes,
            hipertensión, infecciones recurrentes y enfermedades hereditarias.
            Los síntomas pueden incluir fatiga, hinchazón en las extremidades,
            cambios en la micción y presión arterial alta.
          </p>
        </div>
        <button className="scroll-button-up1" onClick={() => scrollToSection(0)}>
          <ChevronUp size={40} />
        </button>
        <button className="scroll-button2" onClick={() => scrollToSection(2)}>
          <ChevronDown size={40} />
        </button>
      </section>

        {/* Section 3 */}
      <section ref={sectionRefs[2]} className="section3">
        <div className="content">
          <Canvas>
            {/* <OrbitControls /> */}
            <TitleSymptoms title={"PREVENCIÓN\nY TRATAMIENTOS"} />
          </Canvas>
          <p>
            Mantener un estilo de vida saludable, controlar la presión arterial
            y los niveles de azúcar en sangre, y realizar chequeos médicos
            regulares son claves para prevenir la ERC. El tratamiento puede
            incluir medicamentos, cambios en la dieta, diálisis o trasplante de
            riñón en casos avanzados.
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
            {/* Elimina uno de los sets de luces personalizados */}
            {/* <LightsTreatment /> */}
            {/* <LightsModel /> */}
            <ambientLight intensity={0.3} /> {/* Baja la intensidad */}
            <directionalLight position={[5, 5, 5]} intensity={0.7} castShadow />
            <pointLight position={[-5, -5, 5]} intensity={0.5} />
            <StagingTreatment />
            <RecipientTreatment />
            <Model3dTemporary scale={4} />
          </Canvas>
        </div>
      </section>
    </div>   
  );
};

export default KidneyDisease;