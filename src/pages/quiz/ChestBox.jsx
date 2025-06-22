import React from "react";
import { useBox } from "@react-three/cannon";
import * as THREE from "three";

// Tamaños
const OUTER = [2.2, 1.2, 2.2]; // [ancho, alto, profundo]
const WALL = 0.2; // grosor de las paredes

const ChestBox = ({ position = [0, 0, 0], scale = 1, color = "#8d5524" }) => {
  // Física: base y 4 paredes
  // Base
  useBox(() => ({
    type: "Static",
    position: [
      position[0],
      position[1] - (OUTER[1] / 2 - WALL / 2) * scale,
      position[2],
    ],
    args: [
      OUTER[0] * scale - WALL * 2,
      WALL * scale,
      OUTER[2] * scale - WALL * 2,
    ],
  }));
  // Pared izquierda
  useBox(() => ({
    type: "Static",
    position: [
      position[0] - (OUTER[0] / 2 - WALL / 2) * scale,
      position[1],
      position[2],
    ],
    args: [WALL * scale, OUTER[1] * scale, OUTER[2] * scale],
  }));
  // Pared derecha
  useBox(() => ({
    type: "Static",
    position: [
      position[0] + (OUTER[0] / 2 - WALL / 2) * scale,
      position[1],
      position[2],
    ],
    args: [WALL * scale, OUTER[1] * scale, OUTER[2] * scale],
  }));
  // Pared trasera
  useBox(() => ({
    type: "Static",
    position: [
      position[0],
      position[1],
      position[2] - (OUTER[2] / 2 - WALL / 2) * scale,
    ],
    args: [
      OUTER[0] * scale - WALL * 2,
      OUTER[1] * scale,
      WALL * scale,
    ],
  }));
  // Pared delantera
  useBox(() => ({
    type: "Static",
    position: [
      position[0],
      position[1],
      position[2] + (OUTER[2] / 2 - WALL / 2) * scale,
    ],
    args: [
      OUTER[0] * scale - WALL * 2,
      OUTER[1] * scale,
      WALL * scale,
    ],
  }));

  // Visual: base y 4 paredes
  return (
    <group position={position} scale={scale}>
      {/* Base */}
      <mesh
        position={[0, -(OUTER[1] / 2 - WALL / 2), 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[OUTER[0] - WALL * 2, WALL, OUTER[2] - WALL * 2]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} />
      </mesh>
      {/* Pared izquierda */}
      <mesh position={[-(OUTER[0] / 2 - WALL / 2), 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[WALL, OUTER[1], OUTER[2]]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} />
      </mesh>
      {/* Pared derecha */}
      <mesh position={[(OUTER[0] / 2 - WALL / 2), 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[WALL, OUTER[1], OUTER[2]]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} />
      </mesh>
      {/* Pared trasera */}
      <mesh position={[0, 0, -(OUTER[2] / 2 - WALL / 2)]} castShadow receiveShadow>
        <boxGeometry args={[OUTER[0] - WALL * 2, OUTER[1], WALL]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} />
      </mesh>
      {/* Pared delantera */}
      <mesh position={[0, 0, (OUTER[2] / 2 - WALL / 2)]} castShadow receiveShadow>
        <boxGeometry args={[OUTER[0] - WALL * 2, OUTER[1], WALL]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export default ChestBox;