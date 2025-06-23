import { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, Environment, useFrame, Sparkles } from "@react-three/drei";
import { useNavigate } from "react-router";
import "./Ranking.css";
import ParticlesBackground from "./ParticlesBackground";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const MovingLight = () => {
  const lightRef = useRef();
  useFrame(({ clock }) => {
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(clock.getElapsedTime()) * 10;
      lightRef.current.position.z = Math.cos(clock.getElapsedTime()) * 10;
    }
  });
  return <directionalLight ref={lightRef} intensity={1} />;
};

// Componente para rotar el fondo
function AnimatedEnvironment() {
  const group = useRef();
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += 0.05 * delta * 60; // antes era 0.01
  });
  return (
    <group ref={group}>
      <Environment files="/staging/sky.hdr" background />
    </group>
  );
}

const Ranking = () => {
  const [ranking, setRanking] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRanking = async () => {
      const res = await fetch(`${API_URL}quizzes/ranking`);
      const data = await res.json();
      setRanking(data);
    };
    fetchRanking();
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 150 }}>
        <AnimatedEnvironment />
        <ParticlesBackground />
        <ambientLight intensity={0.7} />
        <MovingLight />
        <Sparkles
          count={120}
          scale={[20, 10, 20]}
          size={6}
          color="#fffbe6"
          speed={0.7}
          opacity={0.7}
        />
        <OrbitControls enablePan={true} />
        <Html center position={[0, 0.2, 0]}>
          <div
            className="ranking-table-container"
            style={{
              background: "rgba(255,255,255,0.95)",
              borderRadius: 16,
              padding: 48,
              minWidth: 520,
              maxHeight: 500,
              overflowY: "auto",
              boxShadow: "0 2px 16px rgba(0,0,0,0.12)",
            }}
          >
            <h1 className="ranking-title" style={{ textAlign: "center", marginBottom: 32 }}>
              MEDALLERO
            </h1>
            <table className="ranking-table" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Puntos</th>
                </tr>
              </thead>
              <tbody>
                {ranking.map((user, idx) => (
                  <tr key={user.userID}>
                    <td>{idx + 1}</td>
                    <td className="ranking-username">{user.displayName}</td>
                    <td>{user.totalPoints}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Html>
      </Canvas>
    </div>
  );
};

export default Ranking;