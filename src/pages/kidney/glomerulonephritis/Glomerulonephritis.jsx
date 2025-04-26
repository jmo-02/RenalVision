import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import GlomeruloModel from './models-3d/Glomerulo';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './Glomerulonephritis.css';

const Glomerulonephritis = () => {
  const sectionRefs = [useRef(null), useRef(null), useRef(null)];

  const scrollToSection = (index) => {
    sectionRefs[index]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="glomerulo-scroll-container">
      {/* Sección 1 */}
      <section ref={sectionRefs[0]} className="glomerulo-section section-1">
        <div className="content">
          <h2>Glomerulonefritis</h2>
          <p>
            La glomerulonefritis es la inflamación de los glomérulos,
            las unidades de filtración del riñón. Puede ser de aparición
            aguda o crónica y está asociada a diversas causas, como procesos
            infecciosos, trastornos inmunológicos y enfermedades sistémicas.
          </p>
        </div>
        <div className="model-3d">
          <Canvas shadows camera={{ position: [7, 2, 5], fov: 50 }}>
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
        <div className="content full-width">
          <h3>Síntomas de la Glomerulonefritis</h3>
          <ul>
              <li>Orina de color oscuro (como té o cola).</li>
              <li>Disminución de la cantidad de orina.</li>
              <li>Hinchazón en cara, manos, abdomen o piernas (edema).</li>
              <li>Presión arterial alta.</li>
              <li>Cansancio o fatiga.</li>
              <li>Náuseas o pérdida del apetito.</li>
            </ul>
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
            <ul>
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
