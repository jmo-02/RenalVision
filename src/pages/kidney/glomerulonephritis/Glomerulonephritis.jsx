import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import GlomeruloModel from './models-3d/Glomerulo';
import SymptomsModel from './models-3d/Symptoms-Glumerulonefritis';
import StagingSymptoms from "../kidney-stones/staging/StagingSymptoms";
import TreatmentModel from './models-3d/Treatment-Glomerulonefritis';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SymptomsTitle3D from './components-html-3d/TitleSymptoms';
import TreatmentTitle3D from './components-html-3d/TitleTreatment';
import Causes3D from './components-html-3d/Event-Section2';
import TitlesPage from './components-html-3d/Title-Kidney';
import LightsTitles from "../kidney-cancer/lightsmodel/LightsTitles";
import './Glomerulonephritis.css';

const Glomerulonephritis = () => {
  const sectionRefs = [useRef(null), useRef(null), useRef(null)];
  /*Evento de sesion 2 */
  const [showCauses, setShowCauses] = useState(false);
  const [showHint, setShowHint] = useState(true);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() === 'r') {
        setShowCauses(false);}};
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);};
  }, []);

  useEffect(() => {
    if (!showCauses) {
      setShowHint(true);
    }}, [showCauses])

  const handleModelClick = () => {
    setShowCauses(prev => !prev);
    setShowHint(false);
  };
  /*Evento de sesion 3 */
  const [showTreatmentInfo, setShowTreatmentInfo] = useState(false);
  const [showTreatmentHint, setShowTreatmentHint] = useState(true);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === 't') {
        setShowTreatmentInfo(false);
        setShowTreatmentHint(true); 
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);


  const scrollToSection = (index) => {
    sectionRefs[index]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="gl-scroll-container">
      {/* Sección 1 */}
      <section ref={sectionRefs[0]} className="gl-section gl-section-1">
        <div className="gl-top-title">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <TitlesPage />
            <LightsTitles/>
          </Canvas>
        </div>
        <div className="gl-layout">
          <div className="gl-content">
            <h2 className='title-w'>¿QUÉ ES?</h2>
            <p className='gl-p1-glomerulo'>
              La glomerulonefritis es la inflamación de los glomérulos,
              las unidades de filtración del riñón. Puede ser de aparición
              aguda o crónica y está asociada a diversas causas, como procesos
              infecciosos, trastornos inmunológicos y enfermedades sistémicas.
            </p>
          </div>
          <div className="gl-model-3d">
            <Canvas shadows camera={{ position: [4, 2, -11], fov: 50 }}>
              <GlomeruloModel />
            </Canvas>
            <p className="gl-label-model">Glomérulo</p>
          </div>
        </div>  
        <button className="gl-scroll-button1" onClick={() => scrollToSection(1)}>
          <ChevronDown size={40} />
        </button>
      </section>

      {/* Sección 2 */}
      <section ref={sectionRefs[1]} className="gl-section gl-section-2">
        <div className="gl-symptoms-layout">
          <div className="gl-model-3d-sesion2">
            <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
              <StagingSymptoms />
              <SymptomsModel onModelClick={handleModelClick} />
              <Causes3D showCauses={showCauses} />
            </Canvas>
            {showHint && (
              <div className="gl-modal-overlay">
                <div className="gl-modal-content">
                  <p className="gl-modal-text">👉 Presiona el modelo para ver las causas</p>
                </div>
              </div>
            )}
          </div>
          <div className="gl-content">
            <div className="gl-title-symptoms">
              <Canvas>
                <SymptomsTitle3D title={"SÍNTOMAS DE LA GLOMERULONEFRITIS"} />
              </Canvas>
            </div>
            <ul className="gl-symptoms-list">
              <li>Orina de color oscuro (como té o cola).</li>
              <li>Disminución de la cantidad de orina.</li>
              <li>Hinchazón en cara, manos, abdomen o piernas (edema).</li>
              <li>Presión arterial alta.</li>
              <li>Cansancio o fatiga.</li>
              <li>Náuseas o pérdida del apetito.</li>
              <li>Migraña</li>
            </ul>
          </div>
        </div>

        <button className="gl-scroll-button-up1" onClick={() => scrollToSection(0)}>
          <ChevronUp size={40} />
        </button>
        <button className="gl-scroll-button2" onClick={() => scrollToSection(2)}>
          <ChevronDown size={40} />
        </button>
      </section>

      {/* Sección 3 */}
      <section ref={sectionRefs[2]} className="gl-section gl-section-3">
        <div className="gl-treatment-layout">              
          <div className="gl-content gl-full-width">
            <div className="gl-title-treatment">
              <Canvas>
                <TreatmentTitle3D title={"TRATAMIENTO DE LA GLOMERULONEFRITIS"} />
              </Canvas>
            </div>

            <ul className="gl-treatment-list">
              <li><strong>Medicamentos:</strong>
                <ul>
                  <li>Antibióticos (si la causa es una infección).</li>
                  <li>Corticoides o inmunosupresores<br />(para controlar la inflamación).</li>
                  <li>Antihipertensivos (para bajar la presión<br />y proteger el riñón).</li>
                  <li>Diuréticos (para eliminar exceso de líquidos).</li>
                </ul>
              </li>
              <li><strong>Cambios en la alimentación:</strong>
                <ul>
                  <li>Reducir el consumo de sal.</li>
                  <li>Controlar las proteínas o el potasio<br />según el caso.</li>
                  <li>Limitar líquidos si hay retención.</li>
                </ul>
              </li>
              <li><strong>Diálisis:</strong> en casos graves o crónicos.</li>
              <li><strong>Trasplante renal:</strong> si el riñón deja de funcionar completamente.</li>
            </ul>
          </div>
          <div className="gl-model-3d">
            <Canvas shadows camera={{ position: [4, 2, -11], fov: 40 }}>
              <TreatmentModel onClick={() => {
                setShowTreatmentInfo(true)
                setShowTreatmentHint(false);
              }}/>
            </Canvas>
            {showTreatmentHint && (
              <div className="gl-modal-overlay">
                <div className="gl-modal-content">
                  <p className="gl-modal-text">💡 Haz clic sobre el modelo para ver una recomendación</p>
                </div>
              </div>
            )}
            {showTreatmentInfo && (
              <p className="gl-info-treatment">
                Recuerda seguir las indicaciones<br/> del médico durante el tratamiento.
                <br/>Presiona "T" para ocultar este mensaje.
              </p>
            )}

          </div>
        </div>
        <button className="gl-scroll-button-up2" onClick={() => scrollToSection(1)}>
          <ChevronUp size={40} />
        </button>
      </section>
    </div>
  );
};

export default Glomerulonephritis;