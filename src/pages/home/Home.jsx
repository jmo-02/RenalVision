import { useNavigate } from "react-router";
import "./Home.css";
import { useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStaffSnake, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Canvas } from '@react-three/fiber';
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';
import LightsModelBox from "./lightsmodelbox";
import RecipientBox from "./RecipientBox";


const HealthyKidneyGLB = (props) => {
  const { scene } = useGLTF("/models-3d/healthy-kidney.glb");
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      // Pulso suave: escala varía suavemente entre 620 y 680 (ajusta según tu escala base)
      const base = 630;
      const amplitude = 30;
      const pulse = base + Math.sin(clock.getElapsedTime() * 2) * amplitude;
      ref.current.scale.set(pulse, pulse, pulse);
    }
  });
  return <primitive ref={ref} object={scene} {...props} />;
};

// Componente para el modelo 3D con animaciones habilitadas, rotación y sombra sincronizada
const ImportanceKidneyGLB = (props) => {
  const gltf = useGLTF("/models-3d/importance-kidney.glb");
  const ref = useRef();
  const shadowRef = useRef();
  const { actions } = useAnimations(gltf.animations, ref);

  useFrame(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = actions[Object.keys(actions)[0]];
      if (firstAction && !firstAction.isRunning()) {
        firstAction.play();
      }
    }
    if (ref.current && shadowRef.current) {
      ref.current.rotation.y += 0.01;
      // Sincroniza la posición del plano con el modelo
      shadowRef.current.position.x = ref.current.position.x;
      shadowRef.current.position.z = ref.current.position.z;
    }
  });

  return (
    <>
      <primitive ref={ref} object={gltf.scene} {...props} castShadow />
      <mesh
        ref={shadowRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[props.position ? props.position[0] : 0, -6, props.position ? props.position[2] : 0]}
        receiveShadow={true}
      >
        {/* Modifica el primer argumento (radio) para círculo, o los dos primeros (ancho, alto) para plano */}
        {/* Ejemplo para círculo más pequeño: */}
        <circleGeometry args={[2.5, 48]} />
        {/* Ejemplo para plano rectangular: */}
        {/* <planeGeometry args={[6, 4]} /> */}
        <meshPhysicalMaterial
          color="black"
          opacity={0.25}
          transparent
          roughness={1}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={1}
        />
      </mesh>
    </>
  );
};

function LuzSincronizadaConCamara() {
  const lightRef = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (lightRef.current) {
      // La luz sigue la posición de la cámara
      lightRef.current.position.copy(camera.position);
    }
  });

  return (
    <directionalLight
      ref={lightRef}
      intensity={25}
      color="rgb(255, 255, 255)"
      castShadow
    />
  );
}

const Home = () => {
  const navigate = useNavigate();
  const descubreSectionRef = useRef(null);
  const inicioSectionRef = useRef(null);

  const handleClick = useCallback(() => {
    navigate("/riñon", {
      state: { userData: { displayName: "Juan Moreno" } },
    });
  }, [navigate]);

  const handleDescubreClick = useCallback(() => {
    if (descubreSectionRef.current) {
      descubreSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleSubirClick = useCallback(() => {
    if (inicioSectionRef.current) {
      inicioSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <section className="home" ref={inicioSectionRef}>
        <div className="home-content">
          <div className="logo2 fade-in">
            <span className="logo-text">
              <FontAwesomeIcon icon={faStaffSnake} className="imagen1" />
              ¡Bienvenido a RenalVision!
            </span>
          </div>
          <p className="fade-in home-intro-text">
            RenalVision es una plataforma interactiva para aprender sobre la salud renal. Aquí encontrarás información clara, modelos 3D, recursos multimedia y consejos prácticos para cuidar tus riñones y entender su importancia.
          </p>
          <p className="fade-in home-bienvenida-texto">
            Adentrate a descubrir más sobre tus riñones
          </p>
          <div onClick={handleDescubreClick} className="flecha-abajo fade-in">
            <span className="flecha-abajo-texto">Descúbrelo</span>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="24" className="flecha-abajo-circulo" />
              <path d="M24 16V32" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              <path d="M16 24L24 32L32 24" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className="home-model-3d">
          <Canvas
            camera={{ position: [0, 0, 25], fov: 45 }}
            style={{ width: '100%', height: '100%', background: 'transparent' }}
            shadows
          >
            <ambientLight intensity={2} />
            <LuzSincronizadaConCamara />
            <directionalLight
              position={[5, 10, 10]}
              intensity={40}
              color="rgb(255, 255, 255)"
              target-position={[0, -2, 0]}
              castShadow
            />
            <pointLight position={[0, 10, 10]} intensity={3.5} color="#fff" />
            <pointLight position={[-10, 10, 10]} intensity={2.5} color="#fff" />
            <HealthyKidneyGLB scale={640} position={[5, 0, 0]} />
            <OrbitControls />
          </Canvas>
        </div>
      </section>

      {/* Nueva sección */}
      <section ref={descubreSectionRef} className="descubre-section">
        {/* Botón flecha arriba */}
        <button className="flecha-arriba-btn" onClick={handleSubirClick}>
          <FontAwesomeIcon icon={faChevronUp} size="2x" />
        </button>
        <div className="content">
          <h3 style={{ color: "rgb(49, 138, 172)" }}>¿Por qué son importantes los riñones?</h3>
          <p>
            Los riñones son órganos vitales que filtran los desechos y el exceso de agua de la sangre, regulan la presión arterial y mantienen el equilibrio de minerales esenciales. Descubre cómo cuidarlos y por qué su salud es fundamental para tu bienestar general.
          </p>
        </div>
        <div
          className="model-3d-descubre"
          style={{
            width: '400px',
            height: '400px',
            marginTop: '40px'
          }}
        >
          <Canvas
            camera={{ position: [0, 0, 20], fov: 45 }}
            style={{ width: '100%', height: '100%', background: 'transparent' }}
            shadows
          >
            <LightsModelBox />
            <ImportanceKidneyGLB scale={8} position={[4, 0, 0]} />
            <RecipientBox position={[4, -6, 0]} />
            <OrbitControls />
          </Canvas>
        </div>
      </section>
    </>
  );
};

export default Home;



