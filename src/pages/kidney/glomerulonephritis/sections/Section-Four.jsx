import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import PreventionModel from '../models-3d/Prevention-Glomerulonefritis';
import PreventionTitle3D from '../components-html-3d/TitlePrevention';
import StagingSymptoms from '../../kidney-stones/staging/StagingSymptoms';
import Titles3dPrevention from '../components-html-3d/Title3d-Prevention';
import Prevention3D from '../components-html-3d/Event-Section4';
import { ChevronUp } from 'lucide-react';
import './Section-Four.css';

const Section4 = React.forwardRef(({ scrollToSection }, ref) => {
  const [showPreventionModal, setShowPreventionModal] = useState(false);
  const [showPrevention, setShowPrevention] = useState(false);
  const [isAnimationPaused, setIsAnimationPaused] = useState(false);

  const togglePreventionModal = () => {
    setShowPreventionModal(prev => !prev);
  };

  // Efecto para manejar el evento de teclado
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === ' ') {
        event.preventDefault();
        setIsAnimationPaused(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  const handleModelHover = () => {
    setShowPrevention(true);
  };

  const handleModelOut = () => {
    setShowPrevention(false);
  };

  return (
    <>
      <section ref={ref} className="gl-section gl-section-4">
        <div className="gl-content gl-full-width">
          <div className='gl-title-prevention'>
            <Canvas>
              <PreventionTitle3D  titleprevention={"PREVENCIONES DE GLOMERULONEFRITIS"}/>
            </Canvas>
          </div>
          <p className='gl-p1-prevention'>La glomerulonefritis no siempre se puede prevenir, pero hay medidas que ayudan a reducir su aparición o complicaciones.</p>
          <div className="gl-animation-hint">
            <p>Pasa el mouse por el modelo 3d para ver mas informacion</p>
          </div>
        </div>
        <div className="gl-model-3d-sesion4">
          <Canvas shadows camera={{ position: [4, 2, 12], fov: 30 }}>
            <StagingSymptoms />
            <Titles3dPrevention />
            <Prevention3D showPrevention={showPrevention} />
            {!showPreventionModal && (
              <PreventionModel
                //onClick={() => {setShowPreventionModal(true)}}
                onModelHover={handleModelHover}
                onModelOut={handleModelOut}
                isPaused={isAnimationPaused}
              />)}
          </Canvas>
          <div className="gl-hint">
            <p>💡 Presiona <strong>ESPACIO</strong> para {isAnimationPaused ? 'reanudar' : 'pausar'} la animación del modelo.</p>
          </div>
        </div>
        <button className="gl-scroll-button-up2" onClick={() => scrollToSection(2)}>
          <ChevronUp size={40} />
        </button>
      </section>

      {showPreventionModal && (
        <div className="general-prevention-modal-overlay">
          <div className="general-prevention-modal-content">
            <button className="close-modal-button" onClick={togglePreventionModal}>
              &times;
            </button>
            <h3>Medidas de Prevención para la Glomerulonefritis</h3>
            <p>Aunque no todas las formas de glomerulonefritis son prevenibles, adoptar hábitos saludables y manejar ciertas condiciones médicas puede reducir el riesgo y la progresión. Aquí te presentamos las principales medidas:</p>
            <ul>
              <li>
                <strong>Controlar infecciones:</strong>
                <ul>
                  <li>Tratar de inmediato infecciones estreptocócicas (como la faringitis) con antibióticos, especialmente en niños.</li>
                  <li>Mantener una buena higiene personal para prevenir otras infecciones.</li>
                </ul>
              </li>
              <li>
                <strong>Manejar enfermedades crónicas:</strong>
                <ul>
                  <li>Controlar estrictamente la presión arterial alta a través de medicación y estilo de vida.</li>
                  <li>Manejar la diabetes con una dieta adecuada, ejercicio y medicamentos según lo indicado.</li>
                  <li>Si tienes enfermedades autoinmunes (como lupus), sigue el plan de tratamiento para mantenerlas bajo control.</li>
                </ul>
              </li>
              <li>
                <strong>Estilo de vida saludable:</strong>
                <ul>
                  <li>Mantener una dieta equilibrada y baja en sodio.</li>
                  <li>Realizar actividad física regular.</li>
                  <li>Evitar el tabaco y el consumo excesivo de alcohol.</li>
                  <li>Mantener un peso saludable.</li>
                </ul>
              </li>
              <li>
                <strong>Evitar nefrotoxinas:</strong>
                <ul>
                  <li>Ser precavido con el uso de medicamentos que puedan dañar los riñones, como algunos AINEs (antiinflamatorios no esteroideos), especialmente si ya tienes riesgo renal.</li>
                  <li>Evitar la exposición a toxinas ambientales o laborales conocidas por dañar los riñones.</li>
                </ul>
              </li>
              <li>
                <strong>Revisiones médicas regulares:</strong>
                <ul>
                  <li>Realizar chequeos médicos periódicos, especialmente si tienes antecedentes familiares de enfermedades renales o factores de riesgo.</li>
                  <li>Prestar atención a cualquier síntoma relacionado con los riñones y consultar a un médico rápidamente.</li>
                </ul>
              </li>
            </ul>
            <p><strong>La prevención es clave para la salud renal a largo plazo.</strong> Consulta siempre a un profesional de la salud para un consejo personalizado y seguimiento.</p>
          </div>
        </div>
      )}
    </>
  );
});

export default Section4;