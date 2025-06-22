import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";
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
import Title2 from "./text-staging/Title2";
import Title3D from "./text-staging/Title3D";
import Title4 from "./text-staging/Title4";
import Button from "./text-staging/Button";
import MedicalKit from "./models-3d/MedicalKit";

const KidneyDisease = () => {
  const sectionRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

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
            (ERC) es una afección progresiva en la que los riñones pierden gradualmente su capacidad para filtrar desechos y líquidos del cuerpo. Esto puede llevar a una acumulación de toxinas en el organismo y afectar otras funciones vitales.
          </p>
        </div>
        <div className="model-3d">
          <Canvas shadows camera={{ position: [0, 0, 15], fov: 45 }}>
            <OrbitControls />
            <LightsModel />
            <Button />
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
            <pointLight position={[-5, -5, 5]} intensity={0.8} />
            <Title2 title={"RIÑON AFECTADO"} />
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
            shadows
            camera={{ position: [0, 10, 12], fov: 45 }}
          >
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
            Las causas comunes de la enfermedad renal crónica incluyen diabetes, hipertensión, infecciones recurrentes y enfermedades hereditarias. Los síntomas pueden incluir fatiga, hinchazón en las extremidades, cambios en la micción y presión arterial alta.
          </p>
        </div>
        <button className="scroll-button-up1" onClick={() => scrollToSection(0)}>
          <ChevronUp size={40} />
        </button>
        <button className="scroll-button2" onClick={() => scrollToSection(2)}>
          <ChevronDown size={40} />
        </button>
      </section>

      {/* Section 3: Prevención */}
      <section ref={sectionRefs[2]} className="section3">
        <div className="content">
          <Canvas>
            <TitleSymptoms title={"PREVENCIÓN"} />
          </Canvas>
          <p>
            Mantener un estilo de vida saludable, controlar la presión arterial y los niveles de azúcar en sangre, y realizar chequeos médicos regulares son claves para prevenir la ERC. Es importante evitar el consumo excesivo de sal, llevar una dieta equilibrada, realizar actividad física y evitar el consumo de tabaco y alcohol. La prevención también incluye el control de enfermedades crónicas como la diabetes y la hipertensión.
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
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} intensity={0.7} castShadow />
            <pointLight position={[-5, -5, 5]} intensity={0.5} />
            <StagingTreatment />
            <RecipientTreatment />
            <Model3dTemporary scale={4} />
          </Canvas>
        </div>
        <button className="scroll-button2" onClick={() => scrollToSection(3)}>
          <ChevronDown size={40} />
        </button>
      </section>

      {/* Section 4: Tratamientos */}
      <section ref={sectionRefs[3]} className="section4">
        <button
          className="scroll-button-up2"
          onClick={() => scrollToSection(2)}
        >
          <ChevronUp size={40} />
        </button>
        <div className="content">
          <Canvas>
            <TitleSymptoms title={"TRATAMIENTOS"} position={[0, -1, 2]} />
          </Canvas>
          <p className="p4">
            El tratamiento de la enfermedad renal crónica depende del estadio y la causa subyacente. Puede incluir medicamentos para controlar la presión arterial, el azúcar en sangre y el colesterol, así como cambios en la dieta y el estilo de vida. En etapas avanzadas, puede ser necesaria la diálisis o un trasplante de riñón. Es fundamental el seguimiento médico regular para ajustar el tratamiento y prevenir complicaciones.
          </p>
        </div>
        <div className="model-3d">
          <Canvas shadows camera={{ position: [0, 0, 15], fov: 45 }}>
            <Sky sunPosition={[100, 20, 100]} turbidity={8} />
            <OrbitControls />
            <LightsModel />
            <ambientLight intensity={0.2} /> {/* Reducido de 0.5 a 0.2 */}
            <directionalLight position={[5, 5, 5]} intensity={0.15} castShadow /> {/* Reducido de 0.3 a 0.15 */}
            <pointLight position={[-5, -5, 5]} intensity={0.5} /> {/* Reducido de 0.8 a 0.5 */}
            <Title3D title={"CALIDAD DE VIDA"} position={[-3, 3, 0]} />
            <Title4 title={"Y APOYO"} position={[3, 2, 0]} />
            <MedicalKit scale={6} />
          </Canvas>
        </div>
      </section>
    </div>
  );
};


export default KidneyDisease;