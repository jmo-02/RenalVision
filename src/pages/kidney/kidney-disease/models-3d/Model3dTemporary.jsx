import React, { useRef, useState, useEffect } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Model3dTemporary = (props) => {
  const ref = useRef();
  const [paused, setPaused] = useState(false);
<<<<<<< HEAD
  const [direction, setDirection] = useState(-1);
  const [showInfo, setShowInfo] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [infoPos, setInfoPos] = useState([0, 2, 0]); // posición dinámica

  // Animación y posición del cuadro de texto
=======
  const [direction, setDirection] = useState(-1); // -1: normal, 1: invertido
  const [showInfo, setShowInfo] = useState(false);

  // Animación de rotación
>>>>>>> master
  useFrame((state, delta) => {
    if (ref.current && !paused) ref.current.rotation.y += direction * 0.5 * delta;
    if (ref.current) ref.current.scale.set(zoom, zoom, zoom);

    // El cuadro de texto sigue la animación de rotación y flotación del modelo
    if (showInfo && ref.current) {
      const angle = ref.current.rotation.y;
      const floatY = 2 + Math.sin(state.clock.getElapsedTime()) * 0.08; // Flotación suave
      setInfoPos([
        Math.sin(angle) * 1.2, // X
        floatY,                // Y (flotando)
        Math.cos(angle) * 1.2  // Z
      ]);
    }
  });

  const { nodes, materials } = useGLTF("/models-3d/test_tube_mutations.glb");

  // Eventos de teclado para zoom + y -, pausar y dirección
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "+") {
        setZoom((prev) => Math.min(prev + 0.1, 3));
      } else if (e.key === "-") {
        setZoom((prev) => Math.max(prev - 0.1, 0.3));
      } else if (e.code === "Space") {
        setPaused((prev) => !prev);
      } else if (e.code === "Enter") {
        setDirection((prev) => prev * -1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

<<<<<<< HEAD
=======
  // Mostrar info solo al posar el mouse
  const handlePointerOver = () => setShowInfo(true);
  const handlePointerOut = () => setShowInfo(false);

>>>>>>> master
  return (
    <group {...props} dispose={null}>
      <group
        ref={ref}
<<<<<<< HEAD
        scale={0.0065} // Más pequeño
        position={[0, -0.2, 0]} // Un poco más abajo
=======
        scale={0.01}
        position={[0, -0.7, 0]} // Baja el modelo un poco
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
>>>>>>> master
        tabIndex={0}
        onPointerOver={() => setShowInfo(true)}
        onPointerOut={() => setShowInfo(false)}
      >
<<<<<<< HEAD
        {/* Cuadro de instrucciones sigue el movimiento y flotación */}
        {showInfo && (
          <Html position={infoPos} center distanceFactor={20}>
=======
        {/* Ventana de información resumida y animada */}
        {showInfo && (
          <Html position={[0, 2.8, 0]} center distanceFactor={20}>
>>>>>>> master
            <div
              style={{
                background: "rgba(6,86,110,0.85)",
                color: "white",
<<<<<<< HEAD
                padding: "10px 18px",
                borderRadius: "18px",
                fontSize: "15px",
                textAlign: "center",
                boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
                maxWidth: "220px",
                lineHeight: "1.3",
              }}
            >
              <b>Interacción con el modelo:</b><br />
              <ul style={{ textAlign: "left", margin: "10px 0 0 0", paddingLeft: 18 }}>
                <li><b>Mouse sobre el modelo</b>: Mostrar instrucciones</li>
                <li><b>Teclas + y -</b>: Acercar o alejar el modelo</li>
                <li><b>Barra espaciadora</b>: Pausar/continuar rotación</li>
                <li><b>Enter</b>: Invertir dirección de rotación</li>
=======
                padding: "12px 24px",
                borderRadius: "18px",
                fontSize: "16px",
                textAlign: "center",
                boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
                maxWidth: "260px",
                lineHeight: "1.4",
              }}
            >
              <b>Modelo de tubos de ensayo</b>
              <ul style={{ textAlign: "left", margin: "8px 0 0 0", paddingLeft: 16 }}>
                <li><b>Mouse</b>: Ver info</li>
                <li><b>Espacio</b>: Pausa</li>
                <li><b>Enter</b>: Invierte giro</li>
>>>>>>> master
              </ul>
            </div>
          </Html>
        )}
        {/* ...modelo 3D... */}
        <group position={[11.087, 65.209, 11.234]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Phials_Racked_Phials_Named_0.geometry}
            material={materials.Phials_Named}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Phials_Racked_Phials_Blank_0.geometry}
            material={materials.Phials_Blank}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Phial_Marsupial_Phials_Named_0.geometry}
          material={materials.Phials_Named}
          position={[0.009, 7.789, 119.55]}
          rotation={[-3.103, 1.042, 1.526]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Phial_Telekinesis_Phials_Named_0.geometry}
          material={materials.Phials_Named}
          position={[-62.374, 14.532, 119.55]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Phial_Telepathy_Phials_Named_0.geometry}
          material={materials.Phials_Named}
          position={[59.538, 14.532, 119.565]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Phial_Blank_2_Phials_Blank_0.geometry}
          material={materials.Phials_Blank}
          position={[0, 14.549, 56.301]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Phial_Blank_1_Phials_Blank_0.geometry}
          material={materials.Phials_Blank}
          position={[-36.428, 14.532, 82.342]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Phial_Blank_3_Phials_Blank_0.geometry}
          material={materials.Phials_Blank}
          position={[36.319, 14.532, 82.333]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Phial_Cap_Phials_Blank_0.geometry}
          material={materials.Phials_Blank}
          position={[0, 25.361, 56.301]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Rack_Rack_0.geometry}
          material={materials.Rack}
          position={[0, 50.496, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
      </group>
    </group>
  );
};

export default Model3dTemporary;

useGLTF.preload("/models-3d/test_tube_mutations.glb");