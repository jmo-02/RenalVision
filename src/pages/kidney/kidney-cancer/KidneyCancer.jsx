import React, { useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import KidneyWithCancer from "./models-3D/KidneyWithCancer";
import LightsModel from "./lightsmodel/LightsModel";
import { ChevronDown, ChevronUp } from "lucide-react";
import "./KidneyCancer.css"
import SymptomsKidneyCancer from "./models-3D/SymptomsKidneyCancer";
import StaggingSymptoms from "./stagging/StaggingSymptoms";
import RecipientSymptoms from "./models-3D/RecipientSymptoms";
import LightsSymptoms from "./lightsmodel/LightsSymptoms";
import TitleSymptoms from "./textss/TitleSymptoms";
import TreatmentKidneyCancer from "./models-3D/TreatmentKidneyCancer";
import RecipientTreatment from "./models-3D/RecipientTreatment";
import LightsTreatment from "./lightsmodel/LightsTreatment";
import StaggingTreatment from "./stagging/StaggingTreatment";
import TitlesPage from "./textss/TitlesPage";
import Title2 from "./textss/Title2";
import LightsTitles from "./lightsmodel/LightsTitles";
import LightsPrevention from "./lightsmodel/LightsPrevention";
import StaggingPrevention from "./stagging/StaggingPrevention";
import Title3D from "./textss/Title3D";
import PreventionKidneyCancer from "./models-3D/PreventionKidneyCancer";
import RecipientPrevention from "./models-3D/RecipientPrevention";
// import Title1 from "./textss/Title1";

const KidneyCancer = () => {
  const sectionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const scrollToSection = (index) => {
    sectionRefs[index]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  
  return (
    <div className="kidney-cancer-container">
      {/* Section 1 */}
      <section ref={sectionRefs[0]} className="section1">
        <div className="div-title">
          <Canvas shadows>
            <TitlesPage title={"CÁNCER DE RIÑÓN"} />
            <LightsTitles />
          </Canvas>
        </div>
          <div className="content">

          <h3>¿QUÉ ES?</h3>
          <p>
            El cáncer de riñón, también conocido como cáncer renal,
            es una enfermedad en la que las células del tejido renal comienzan a crecer de manera anormal y descontrolada,
            dando lugar a la formación de un tumor maligno. Este crecimiento desregulado ocurre como consecuencia de mutaciones genéticas en el ADN de las células renales,
            las cuales interfieren con sus funciones normales, como la división controlada,
            la reparación del daño celular y la muerte programada.
          </p>
        </div>
        <div className="model-3d">
          <Canvas shadows camera={{ position: [0, 0, 15], fov: 45 }}>
            <OrbitControls />
            <LightsModel />
            <KidneyWithCancer scale={6.7} />
            <Title2 title={"RIÑÓN ENFERMO"} />
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
           camera={{ position: [0, 10, 12], fov: 45 }}>
             <ZoomControl />
            <color attach="background" args={["#f0f0f0"]} />
            <OrbitControls  target={[0, 4, 0]} />
            <LightsSymptoms />
            <StaggingSymptoms />
            <RecipientSymptoms />  
            <SymptomsKidneyCancer scale={5} position={[0, 0, 0]} />
          </Canvas>
        </div>

        <div className="content">
        <Canvas>
            {/* <OrbitControls /> */}
            <TitleSymptoms title={"CAUSAS Y SÍNTOMAS"} position={[0, -1, 2]} />
          </Canvas>
          <p className="p_2">
            El cáncer de riñón puede ser causado por varios factores de riesgo,
            aunque a menudo no se identifican causas específicas. Algunas de las causas y factores de riesgo comunes incluyen el tabaquismo,
            obesidad, presión arterial alta, exposición a productos químicos, etc. Algunos síntomas serían sangre en la orina, pérdida de peso inexplicable,
            fatiga extrema, hinchazón en el abdomen, etc.
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
          <Canvas>
            {/* <OrbitControls /> */}
            <TitleSymptoms title={"PREVENCIÓN Y \n TRATAMIENTO"} />
          </Canvas>
          <p>
           No fumar, mantener un peso saludable, controlar la presion arterial,
           evitar la exposicion a sustancias toxicas y controlar enfermedades
           renales son algunas de las prevenciones para evitar el cancer renal.
           El tratamiento puede incluir
           medicamentos,cirugía, terapias dirigidas, inmunoterapia, entre otras.
          </p>
          <button
            className="scroll-button-up2"
            onClick={() => scrollToSection(1)}
          >
            <ChevronUp size={40} />
          </button>
        </div>
        <div className="model-3d">
          <Canvas className= "canvas3" shadows camera={{ position: [0, 10, 12], fov: 45 }}>
           <OrbitControls />
            <LightsTreatment />
            <StaggingTreatment />
            <TreatmentKidneyCancer scale={4} position={[0, 0, 0]} />
            <RecipientTreatment />
            </Canvas>
        </div>
     </section>

     {/* Sección 4 */}
      <section ref={sectionRefs[3]} className="section4">
        <button
          className="scroll-button-up2"
          onClick={() => scrollToSection(2)}
        >
          <ChevronUp size={40} />
        </button>
        <div className="content">
          <Canvas>
            <TitleSymptoms title={" PREVENCIONES  "} position={[0, -0.5, 2]} />

          </Canvas>
          {/* <h3>PREVENCIÓN Y TRATAMIENTO</h3> */}
          <p className="p4">
           Para prevenir el cáncer de riñón, es importante no fumar, mantener un peso saludable,
           controlar la presión arterial y evitar el uso excesivo de analgésicos.
           También ayuda beber suficiente agua, llevar una dieta balanceada y hacerse chequeos médicos,
           especialmente si hay antecedentes familiares.
          </p>

        </div>
        <div className="model-3d">
          <Canvas className="canvas3" shadows camera={{ position: [0, 0, 15], fov: 45 }}>
            <OrbitControls />
            <LightsPrevention />
            <StaggingPrevention />
            <Title3D title={"CUIDA TUS RIÑONES"} />
            {/* <Title4 title={"RIÑONES"} /> */}
            <PreventionKidneyCancer scale={3} position={[1, 0, 0]} />
            <RecipientPrevention />
          </Canvas>
        </div>
        <button className="scroll-button2" onClick={() => scrollToSection(4)}>
          <ChevronDown size={40} />
        </button>
      </section>
    </div>
  );
};

// Componente para manejar el zoom
const ZoomControl = () => {
  const { camera } = useThree();

  useEffect(() => {
    const handleZoom = (e) => {
      if (e.key === "+" || e.key === "=") {
        camera.position.z -= 1; // Acercar
      } else if (e.key === "-") {
        camera.position.z += 1; // Alejar
      }
    };

    window.addEventListener("keydown", handleZoom);

    return () => {
      window.removeEventListener("keydown", handleZoom);
    };
  }, [camera]);

  return null; // Este componente no necesita renderizar nada
};
export default KidneyCancer;