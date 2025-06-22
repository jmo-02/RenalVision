import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";
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
import TreatmentKidneyStone from "./models-3d/TreatmentKidneyStone";
import RecipientTreatment from "./models-3d/RecipientTreatment";
import LightsTreatment from "./lights/LightsTreatment";
import StagingTreatment from "./staging/StagingTreatment";
import TitlePage from "./texts/TitlePage";
import LightsTitle from "./lights/LightsTitle";
import Title1 from "./texts/Title1";
import PreventionKidneyStone from "./models-3d/PreventionKidneyStone";
import LightsPrevention from "./lights/LightsPrevention";
import StagingPrevention from "./staging/StagingPrevention";
import Title2 from "./texts/Title2";
import Title3D from "./texts/Title3D";
import Title4 from "./texts/Title4";
import RecipientPrevention from "./models-3d/RecipientPrevention";
import Button from "./texts/Button";
import VideoKidneyStones from "./video/VideoKidneyStones";


const KidneyStones = () => {
  const sectionRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  const scrollToSection = (index) => {
    sectionRefs[index]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="kidney-stones-container">
      {/* Sección 1 */}
      <section ref={sectionRefs[0]} className="section1">
        <div className="div-title">
          <Canvas shadows>
            <TitlePage title={"CALCULOS RENALES"} />
            <LightsTitle />
          </Canvas>
        </div>
        <div className="content">


          <h3 className="h3-1">¿QUÉ SON?</h3>
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
            <Button />
            <KidneyWithStones scale={7} />
            <Title2 title={"RIÑON AFECTADO"} />
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
        <div className="model-3d"
          onPointerEnter={() => setShowInfo(true)}
          onPointerLeave={() => setShowInfo(false)}

        >
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
            <TitleSymptoms title={"CAUSAS Y SÍNTOMAS"} position={[0, -1, 2]} />
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
          <Canvas>
            <TitleSymptoms title={" TRATAMIENTOS  "} position={[0, -0.5, 2]} />

          </Canvas>
          {/* <h3>PREVENCIÓN Y TRATAMIENTO</h3> */}
          <p className="p3">
            El tratamiento de los cálculos renales depende del tamaño,
            la localización y la composición de los mismos. Para cálculos pequeños,
            suele recomendarse beber abundante agua para facilitar su eliminación
            natural a través de la orina. En casos más complejos o dolorosos,
            se pueden utilizar analgésicos para aliviar los síntomas y, si es necesario,
            medicamentos que ayuden a disolver ciertos tipos de cálculos o a
            relajarlos para que puedan pasar más fácilmente.
          </p>
          <button
            className="scroll-button-up2"
            onClick={() => scrollToSection(1)}
          >
            <ChevronUp size={40} />
          </button>
        </div>
        <div className="model-3d">
          <Canvas className="canvas3" shadows camera={{ position: [0, 0, 15], fov: 45 }}>
            <OrbitControls />
            <LightsTreatment />
            <Title1 title={"KIT MEDICO"} />
            <StagingTreatment />
            <TreatmentKidneyStone scale={7} position={[0, 0, 0]} />
            <RecipientTreatment />
          </Canvas>
        </div>
        <button className="scroll-button2" onClick={() => scrollToSection(3)}>
          <ChevronDown size={40} />
        </button>
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
            Para prevenir la formación de cálculos renales,
            es clave adoptar hábitos de vida saludables. Beber suficiente agua a lo
            largo del día es fundamental, ya que ayuda a diluir las sustancias en la orina que
            pueden formar cálculos. Además, se recomienda moderar el consumo de sal y proteínas animales,
            y mantener una dieta equilibrada rica en frutas y verduras. Algunas personas pueden requerir
            restricciones adicionales en alimentos ricos en oxalato, como las espinacas o los frutos secos.
          </p>

        </div>
        <div className="model-3d">
          <Canvas className="canvas3" shadows camera={{ position: [0, 0, 15], fov: 45 }}>
            <OrbitControls />
            <LightsPrevention />
            <StagingPrevention />
            <Title3D title={"CUIDA TUS"} />
            <Title4 title={"RIÑONES"} />
            <PreventionKidneyStone scale={6} position={[0, -1, 0]} />
            <RecipientPrevention />
          </Canvas>
        </div>
        {/* <button className="scroll-button2" onClick={() => scrollToSection(4)}>
          <ChevronDown size={40} />
        </button> */}
      </section>

      {/* Sección 5 */}
      {/* <section ref={sectionRefs[4]} className="section5">
        <button
          className="scroll-button-up2"
          onClick={() => scrollToSection(3)}
        >
          <ChevronUp size={40} />
        </button>
        <div className="content">
          <Canvas>
            <TitleSymptoms title={" VIDEO INFORMATIVO  "} position={[0, -2, 2]} />

          </Canvas> */}
          {/* <h3>PREVENCIÓN Y TRATAMIENTO</h3> */}
          {/* <p className="p4">
              En esta sección se presenta un video sobre los 
              cálculos renales.El contenido muestra visualmente cómo se forman y afectan 
              al sistema urinario. Este recurso busca complementar la información general sobre el tema.
              <br></br><br></br>
              Haz clic sobre el video para reproducirlo o pausarlo.
          </p>
          
          

        </div>
        <div className="model-3d">
          <Canvas className="canvas3" shadows camera={{ position: [0, 0, 15], fov: 45 }}>
            <OrbitControls />
            
            <VideoKidneyStones/>
          </Canvas>
        </div>
      </section> */}
    </div>
  );
};

export default KidneyStones;
