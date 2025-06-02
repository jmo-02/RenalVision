import { useHelper } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react'
import { DirectionalLightHelper } from 'three';

const LightsTreatment = () => {

    const directionalLightRef = useRef();
    const ambientLightRef = useRef();
    const targetRef = useRef();
    // useHelper(directionalLightRef, DirectionalLightHelper);
    const { scene } = useThree();

    useEffect(() => {
        if (directionalLightRef.current && targetRef.current) {
            directionalLightRef.current.target = targetRef.current;
            scene.add(targetRef.current); // Muy importante: agregar el target al scene
        }
    }, [scene]);

    return (
        <>
            <pointLight
                position={[0, -1, 0]} // colócala entre los objetos
                intensity={10}
                distance={10}
                decay={2}
            />
            <pointLight
                position={[-5, 0, 0]} // colócala entre los objetos
                intensity={25}
                distance={10}
                decay={2}
            />

            <pointLight
                position={[-1, -1, 4]} // colócala entre los objetos
                intensity={50}
                distance={10}
                decay={2}
            />
            <pointLight
                position={[-1, -1, 3]} // colócala entre los objetos
                intensity={50}
                distance={40}
                decay={0}
            />

            <pointLight
                position={[4, -1, 4]} // colócala entre los objetos
                intensity={50}
                distance={10}
                decay={0}
            />

            <pointLight
                position={[0, -1, -3]} // colócala entre los objetos
                intensity={50}
                distance={10}
                decay={0}
            />
            <pointLight
                position={[5, -1, -3]} // colócala entre los objetos
                intensity={50}
                distance={10}
                decay={0}
            />
            <pointLight
                position={[0, -1, -10]} // colócala entre los objetos
                intensity={25}
                distance={10}
                decay={0}
            />
            <directionalLight
                ref={directionalLightRef}
                color={"white"}
                position={[0, 20, 20]} // Luz de frente, menos intensa
                intensity={0.7} // intensidad baja solo para la luz frontal
                castShadow={true}
                shadow-mapSize={[2048, 2048]}
                shadow-camera-left={-15}
                shadow-camera-right={15}
                shadow-camera-top={15}
                shadow-camera-bottom={-20}
                shadow-camera-near={5}
                shadow-camera-far={60}
                target-position={[0, 0, 0 ]} // Apunta la sombra más abajo
            />
            <directionalLight
                color={"white"}
                position={[10, 15, -10]} // Luz superior/trasera
                intensity={2.5} // intensidad normal para el resto
                castShadow={false}
            />
            <mesh ref={targetRef} position={[0, 0, 0]} visible={false} />
        </>
    )
}

export default LightsTreatment
