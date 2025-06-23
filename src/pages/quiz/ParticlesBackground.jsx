import * as THREE from "three";

function ParticlesBackground({ count = 80 }) {
  const mesh = useRef();
  // Genera posiciones aleatorias solo una vez
  const positions = useRef(
    Array.from({ length: count }, () => [
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 40,
    ])
  );

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <group ref={mesh}>
      {positions.current.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.18, 8, 8]} />
          <meshStandardMaterial color="#38A3A5" transparent opacity={0.35} />
        </mesh>
      ))}
    </group>
  );
}

export default ParticlesBackground;