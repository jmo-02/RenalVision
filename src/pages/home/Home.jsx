import { useNavigate } from "react-router";
import "./Home.css";
import { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStaffSnake } from "@fortawesome/free-solid-svg-icons";
import { Canvas } from '@react-three/fiber';
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const HealthyKidneyGLB = (props) => {
  const { scene } = useGLTF("/models-3d/healthy-kidney.glb");
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      // Pulso suave: escala varía suavemente entre 620 y 680 (ajusta según tu escala base)
      const base = 650;
      const amplitude = 30;
      const pulse = base + Math.sin(clock.getElapsedTime() * 2) * amplitude;
      ref.current.scale.set(pulse, pulse, pulse);

    }
  });
  return <primitive ref={ref} object={scene} {...props} />;
};


const Home = () => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate("/riñon", {
      state: { userData: { displayName: "Juan Moreno" } },
    });
  }, [navigate]);

  return (
    <section className="home">
      <div className="content">
        <div className="logo2 fade-in">
          <span className="logo-text">
            <FontAwesomeIcon icon={faStaffSnake} className="imagen1" />
            ¡Bienvenido a RenalVision!
          </span>
        </div >
        <p className="fade-in">Adentrate a descubrir más sobre tus riñones</p>
        <button onClick={handleClick} className="boton fade-in">
          Descúbrelo
        </button>
      </div>

      {/* Model 3D for the right */}
            <div className="model-3d-home">
              <Canvas camera={{ position: [0, 0, 25], fov: 45 }} style={{ width: '350px', height: '350px', background: 'transparent' }} shadows>
                <ambientLight intensity={2} />
                <directionalLight
                  position={[5, 10, 10]}
                  intensity={40}
                  color="rgb(255, 255, 255)"
                  target-position={[0, -2, 0]} // apunta directamente al modelo
                  castShadow
                />
                <pointLight position={[0, 10, 10]} intensity={3.5} color="#fff" />
                <pointLight position={[-10, 10, 10]} intensity={2.5} color="#fff" />
                <HealthyKidneyGLB scale={650} position={[0, 0, 0]} />
              </Canvas>
            </div>
    </section>
  );
};

export default Home;
