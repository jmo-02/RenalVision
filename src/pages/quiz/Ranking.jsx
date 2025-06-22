import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, Environment } from "@react-three/drei";
import { useNavigate } from "react-router";
import "./Ranking.css";

const API_URL = import.meta.env.VITE_API_BASE_URL;

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
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <Environment files="/staging/sky.hdr" background />
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <OrbitControls />

        <Html center position={[0, 0.2, 0]}>
          <div
            style={{
              background: "rgba(255,255,255,0.95)",
              borderRadius: 16,
              padding: 48,
              minWidth: 520,
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