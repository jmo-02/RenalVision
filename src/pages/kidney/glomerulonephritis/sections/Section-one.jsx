import React from 'react';
import { Canvas } from '@react-three/fiber';
import GlomeruloModel from '../models-3d/Glomerulo';
import TitlesPage from '../components-html-3d/Title-Kidney';
import LightsTitles from '../../kidney-cancer/lightsmodel/LightsTitles';
import TitleGlomerulo from '../components-html-3d/Title-glomerulo2d';
import { ChevronDown } from 'lucide-react';

const Section1 = React.forwardRef(({ scrollToSection }, ref) => {
  return (
    <section ref={ref} className="gl-section gl-section-1">
      <div className="gl-top-title">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <TitlesPage />
          <LightsTitles />
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
          <Canvas shadows camera={{ position: [4, 2, -11], fov: 80 }}>
            <GlomeruloModel />
            <TitleGlomerulo />
          </Canvas>
        </div>
      </div>
      <button className="gl-scroll-button1" onClick={() => scrollToSection(1)}>
        <ChevronDown size={40} />
      </button>
    </section>
  );
});

export default Section1;