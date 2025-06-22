import React, { useRef, useState, useEffect } from "react";
import './Button.css';
import { Html, PositionalAudio } from "@react-three/drei";
import { FaPlay, FaStop } from "react-icons/fa";

const Button = ({ position = [2.5, 4.4, 0] }) => {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = async () => {
    const audio = audioRef.current;
    if (!audio || !audio.buffer) return;

    if (!audio.isPlaying) {
      // Siempre reinicia el audio desde el principio al hacer click si ya terminó
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
    };

    audio.onEnded = handleEnded;
    return () => {
      audio.onEnded = null;
    };
  }, []);

  return (
    <group position={position}>
      <Html center transform distanceFactor={5} wrapperClass="music">
        <div className="btn-music">
          <button
            onClick={handleClick}
            className={`btn ${isPlaying ? "stop" : "play"}`}
          >
            {isPlaying ? <FaStop /> : <FaPlay />}
          </button>
        </div>
      </Html>

      <PositionalAudio
        ref={audioRef}
        url="/sounds/audio_ERC.mp3"
        loop={false}
        distance={10}
        rolloffFactor={1}
        refDistance={1}
      />
    </group>
  );
};

export default Button;
