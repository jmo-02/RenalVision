import React from 'react';

const LightsTile = () => {
  return (
    <>
      <ambientLight color={"#BBF3F2"} intensity={1} />

      <directionalLight
        color={"#BBF3F2"}
        position={[0, 10, 10]} // De frente
        intensity={2}
        castShadow
      />

      <directionalLight
        color={"#BBF3F2"}
        position={[-10, 10, 10]} // Un poco lateral para que ilumine bordes
        intensity={1.5}
      />

      <pointLight
        color={"#BBF3F2"}
        position={[5, 5, 5]}
        intensity={1}
      />
    </>
  );
};

export default LightsTile;

