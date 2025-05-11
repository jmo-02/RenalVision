import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import GlomeruloModel from './models-3d/Glomerulo';
import SymptomsModel from './models-3d/Symptoms-Glumerulonefritis';
import StagingSymptoms from "../kidney-stones/staging/StagingSymptoms";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { OrbitControls } from '@react-three/drei';
import SymptomsTitle3D from './components-html-3d/Title-Section2';
import Causes3D from './components-html-3d/Botton-Section2';
import './Glomerulonephritis.css';

const Glomerulonephritis = () => {
  const sectionRefs = [useRef(null), useRef(null), useRef(null)];
  const [showCauses, setShowCauses] = useState(false);
  const [showHint, setShowHint] = useState(true); // Control del mensaje emergente

  useEffect(() => {
    // Este temporizador hará desaparecer el mensaje después de 5 segundos
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 5000);

    // Limpiar el temporizador cuando el componente se desmonte
    return () => clearTimeout(timer);
  }, []);

  const handleModelClick = () => {
    setShowCauses(prev => !prev);
    setShowHint(false); // Ocultar el mensaje cuando el modelo es clickeado
  };

  const scrollToSection = (index) => {
    sectionRefs[index]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="glomerulo-scroll-container">
      {/* Sección 1 */}
      <section ref={sectionRefs[0]} className="glomerulo-section section-1">
        <div className="top-title">
          <h1>Glomerulonefritis</h1>
        </div>
        <div className="content">
          <h2>¿Qué es?</h2>
          <p>
            La glomerulonefritis es la inflamación de los glomérulos,
            las unidades de filtración del riñón. Puede ser de aparición
            aguda o crónica y está asociada a diversas causas, como procesos
            infecciosos, trastornos inmunológicos y enfermedades sistémicas.
          </p>
        </div>
        <div className="model-3d">
          <Canvas shadows camera={{ position: [4, 2, -11], fov: 50 }}>
            <GlomeruloModel />
          </Canvas>
          <p className="label-model">Glomérulo</p>
        </div>
        <button className="scroll-button1" onClick={() => scrollToSection(1)}>
          <ChevronDown size={40} />
        </button>
      </section>

      {/* Sección 2 */}
      <section ref={sectionRefs[1]} className="glomerulo-section section-2">
        <div className="symptoms-layout">
          <div className="model-3d-sesion2">
            {/* Aquí está el Canvas con el modelo 3D */}
            <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
              <StagingSymptoms />
              <SymptomsModel onModelClick={handleModelClick} />
              <Causes3D showCauses={showCauses} />
            </Canvas>
            {showHint && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <p className="modal-text">👉 Presiona el modelo para ver las causas</p>
                </div>
              </div>
            )}
          </div>
          <div className="content">
            <div className="title-symptoms">
              <Canvas>
                <OrbitControls
                  enableZoom={false}
                    minDistance={5}
                    maxDistance={20}
                  maxPolarAngle={Math.PI / 2}
                  minPolarAngle={Math.PI / 2}
                />
                <SymptomsTitle3D title={"Síntomas de la Glomerulonefritis"} />
              </Canvas>
            </div>
            <ul className="large-text">
              <li>Orina de color oscuro (como té o cola).</li>
              <li>Disminución de la cantidad de orina.</li>
              <li>Hinchazón en cara, manos, abdomen o piernas (edema).</li>
              <li>Presión arterial alta.</li>
              <li>Cansancio o fatiga.</li>
              <li>Náuseas o pérdida del apetito.</li>
            </ul>
          </div>
        </div>

        <button className="scroll-button-up1" onClick={() => scrollToSection(0)}>
          <ChevronUp size={40} />
        </button>
        <button className="scroll-button2" onClick={() => scrollToSection(2)}>
          <ChevronDown size={40} />
        </button>
      </section>

      {/* Sección 3 */}
      <section ref={sectionRefs[2]} className="glomerulo-section section-3">
        <div className="content full-width">
          <h3>Tratamientos</h3>
          <ul className="large-text">
            <li><strong>Medicamentos:</strong>
              <ul>
                <li>Antibióticos (si la causa es una infección).</li>
                <li>Corticoides o inmunosupresores (para controlar la inflamación).</li>
                <li>Antihipertensivos (para bajar la presión y proteger el riñón).</li>
                <li>Diuréticos (para eliminar el exceso de líquidos).</li>
              </ul>
            </li>
            <li><strong>Cambios en la alimentación:</strong>
              <ul>
                <li>Reducir el consumo de sal.</li>
                <li>Controlar las proteínas o el potasio según el caso.</li>
                <li>Limitar líquidos si hay retención.</li>
              </ul>
            </li>
            <li><strong>Diálisis:</strong> en casos graves o crónicos.</li>
            <li><strong>Trasplante renal:</strong> si el riñón deja de funcionar completamente.</li>
          </ul>
        </div>
        <button className="scroll-button-up2" onClick={() => scrollToSection(1)}>
          <ChevronUp size={40} />
        </button>
      </section>
    </div>
  );
};

export default Glomerulonephritis;
