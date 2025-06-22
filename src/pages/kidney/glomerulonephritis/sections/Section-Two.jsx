import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import SymptomsModel from '../models-3d/Symptoms-Glumerulonefritis';
import StagingSymptoms from "../../kidney-stones/staging/StagingSymptoms";
import Causes3D from '../components-html-3d/Event-Section2';
import SymptomsTitle3D from '../components-html-3d/TitleSymptoms';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Section2 = React.forwardRef(({ scrollToSection }, ref) => {
  const [showCauses, setShowCauses] = useState(false);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() === 'r') {
        setShowCauses(false);
        setShowHint(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  //evento de mouse
  const handleModelClick = () => {
    setShowCauses(prev => !prev);
    setShowHint(false);
  };
  const handleModelHover = () => {
    setShowCauses(true);
    setShowHint(false);
  };

  const handleModelOut = () => {
    setShowCauses(false); 
  };

  return (
    <section ref={ref} className="gl-section gl-section-2">
      <div className="gl-symptoms-layout">
        <div className="gl-model-3d-sesion2">
          <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
            <StagingSymptoms />
            <SymptomsModel 
              onModelClick={handleModelClick} 
              onModelHover={handleModelHover}
              onModelOut={handleModelOut}
            />
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
  );
});

export default Section2;