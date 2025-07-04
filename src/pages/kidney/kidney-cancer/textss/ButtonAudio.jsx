import React, { useRef, useState, useEffect } from "react";
import './ButtonAudio.css';
import { Html, PositionalAudio } from "@react-three/drei";
import { FaPlay, FaStop } from "react-icons/fa";

const ButtonAudio = ({ position = [2.5, 4.4, 0] }) => {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = async () => {
    const audio = audioRef.current;
    if (!audio || !audio.buffer) return;

    if (!isPlaying) {
      // Si ya terminó una vez, puede necesitar recargar el buffer
      if (!audio.isPlaying && audio.source === null) {
        audio.setBuffer(audio.buffer);
      }

      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.error("Error al reproducir el audio:", err);
      }
    } else {
      audio.stop();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);
      // Al terminar, limpia el source para que pueda reiniciarse
      audio.source = null;
    };

    audio.onEnded = handleEnded;
    return () => {
      audio.onEnded = null;
    };
  }, []);

  return (
    <group position={position}>
      <Html center transform distanceFactor={5} wrapperClass="music">
        <div className="btn-music-audio">
          <button
            onClick={handleClick}
            className={`btn-audio ${isPlaying ? "stop" : "play"}`}
          >
            {isPlaying ? <FaStop /> : <FaPlay />}
          </button>
        </div>
      </Html>

      <PositionalAudio
        ref={audioRef}
        url="/sounds/kidney-cancer-definition.mp3"
        loop={false}
        distance={10}
        rolloffFactor={1}
        refDistance={1}
      />
    </group>
  );
};

export default ButtonAudio;
