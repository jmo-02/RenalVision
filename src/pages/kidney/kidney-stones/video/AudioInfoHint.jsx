// components/texts/AudioInfoHint.jsx
import { Html } from "@react-three/drei";

const AudioInfoHint = () => {
  return (
    <Html position={[4, 2.5, -2]} center distanceFactor={10}>
      <div
        style={{
          background: "rgba(6,86,110,0.6)",
          color: "white",
          padding: "8px 16px",
          borderRadius: "10px",
          fontSize: "18px",
          whiteSpace: "normal",
          textAlign: "center",
          width: "260px",
          overflowWrap: "break-word",
          wordBreak: "break-word",
        }}
      >
        Clic en el botón verde para escuchar información sobre la enfermedad
      </div>
    </Html>
  );
};

export default AudioInfoHint;
