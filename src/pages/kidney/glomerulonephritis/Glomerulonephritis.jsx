import React, { useRef } from 'react';
import Section1 from './sections/Section-one';
import Section2 from './sections/Section-Two';
import Section3 from './sections/Section-Three';
import Section4 from './sections/Section-Four';
import './Glomerulonephritis.css'; 

const Glomerulonephritis = () => {
  const sectionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const scrollToSection = (index) => {
    sectionRefs[index]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="gl-scroll-container">
      <Section1 ref={sectionRefs[0]} scrollToSection={scrollToSection} />
      <Section2 ref={sectionRefs[1]} scrollToSection={scrollToSection} />
      <Section3 ref={sectionRefs[2]} scrollToSection={scrollToSection} />
      <Section4 ref={sectionRefs[3]} scrollToSection={scrollToSection} />
    </div>
  );
};

export default Glomerulonephritis;