import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import StagingTreatment from "../../kidney-stones/staging/StagingTreatment";
import TreatmentModel from '../models-3d/Treatment-Glomerulonefritis';
import TreatmentTitle3D from '../components-html-3d/TitleTreatment';
import Title2dPrevention from '../components-html-3d/Title-treatment2d';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Section3 = React.forwardRef(({ scrollToSection }, ref) => {
  const [showTreatmentInfo, setShowTreatmentInfo] = useState(false);
  const [showTreatmentHint, setShowTreatmentHint] = useState(true);
  const [isAnimationPaused, setIsAnimationPaused] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === 't') {
        e.preventDefault();
        setIsAnimationPaused(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section ref={ref} className="gl-section gl-section-3">
      <div className="gl-treatment-layout">
        <div className="gl-content gl-full-width">
          <div className="gl-title-treatment">
            <Canvas >
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
        <div className="gl-model-3d-sesion3">
          <Canvas shadows camera={{ position: [4, 2, 12], fov: 40 }}>
            <StagingTreatment />
            <TreatmentModel 
            isPaused={isAnimationPaused}
            onClick={() => {
              setShowTreatmentInfo(true)
              setShowTreatmentHint(false);
            }} 
            onModelHover={() => {
              setShowTreatmentInfo(true);
              setShowTreatmentHint(false);
            }}
            onModelOut={() => {
              setShowTreatmentInfo(false);
              setShowTreatmentHint(true);
            }}
            />
            <Title2dPrevention />
          </Canvas>
          {showTreatmentHint && (
            <div className="gl-modal-overlay">
              <div className="gl-modal-content">
                <p className="gl-modal-text">💡 Pon el mouse sobre el modelo para ver una recomendación</p>
              </div>
            </div>
          )}
          {showTreatmentInfo && (
            <p className="gl-info-treatment">
              Recuerda seguir las indicaciones<br /> del médico durante el tratamiento.
              <br />Presiona "T" para detener la animacion.
            </p>
          )}
        </div>
      </div>
      <button className="gl-scroll-button-up2" onClick={() => scrollToSection(1)}>
        <ChevronUp size={40} />
      </button>
      <button className="gl-scroll-button2" onClick={() => scrollToSection(3)}>
        <ChevronDown size={40} />
      </button>
    </section>
  );
});

export default Section3;