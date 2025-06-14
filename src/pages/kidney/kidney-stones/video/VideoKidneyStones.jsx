import { useVideoTexture } from '@react-three/drei';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const VideoKidneyStones = () => {
  const texture = useVideoTexture("/videos/calculo-renal.mp4", {
    muted: true,
    loop: true,
    autoplay: false,
    crossOrigin: "anonymous",
  });

  const videoRef = useRef(null);
  const [paused, setPaused] = useState(true);

  // Asignamos el video a la referencia cuando se carga
  useEffect(() => {
    if (texture?.image instanceof HTMLVideoElement) {
      videoRef.current = texture.image;
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [texture]);

  // ⛔ Se pausa y reinicia el video cuando el componente se desmonta (por cambio de ruta)
  useEffect(() => {
    return () => {
      const video = videoRef.current;
      if (video) {
        video.pause();
        video.currentTime = 0;
        video.muted = true;
      }
    };
  }, []);

  // 🔁 Manejo de click para reproducir o pausar el video
  const handleClick = useCallback((e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (paused) {
      video.muted = false;
      video.volume = 1;
      video.play();
    } else {
      video.pause();
    }
    setPaused(!paused);
  }, [paused]);

  return (
    <mesh onClick={handleClick} position={[0, 0, 8]}>
      <planeGeometry args={[3.7, 5.5]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
};

export default VideoKidneyStones;
