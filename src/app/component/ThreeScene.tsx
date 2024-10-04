'use client';

import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

interface ThreeSceneProps {
    carId: number;
}

const Model: React.FC<{ carId: number }> = ({ carId }) => {
    const { scene } = useGLTF(`/${carId}/scene.gltf`);

    // Centering the model and adjusting the rotation
    scene.position.set(0, 0, 0);
    scene.scale.set(1, 1, 1);
    scene.rotation.set(0, Math.PI / 2, 0); // Rotate 90 degrees around the Y-axis

    return <primitive object={scene} />;
};

const ThreeScene: React.FC<ThreeSceneProps> = ({ carId }) => {
    const [loading, setLoading] = useState(true);

    const { scene } = useGLTF(`/${carId}/scene.gltf`, true);

    useEffect(() => {
        setLoading(true);
        const model = scene;
        if (model) {
            setLoading(false);
        }
    }, [carId, scene]);

    const renderDes = (carId: number) => {
        switch (carId) {
            case 1:
                return 'City Car';
            case 2:
                return 'Police Car';
            case 3:
                return 'Race Car';
            case 4:
                return 'Subaru BRZ';
            case 5:
                return 'Ford Focus';
            default:
                return 'Unknown car.';
        }
    }

    return (
        <Canvas camera={{ position: [0, 2, 6], fov: 75 }}>
            <ambientLight intensity={0.4} /> 
            <directionalLight position={[10, 25, 10]} intensity={1.2} /> 
            <directionalLight position={[-10, 25, 10]} intensity={1.0} /> 
            <directionalLight position={[10, 25, -10]} intensity={1.0} /> 
            <directionalLight position={[0, 10, -10]} intensity={0.8} /> 
            <directionalLight position={[0, 0, 10]} intensity={0.8} /> 

            {loading ? (
                <mesh>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="gray" />
                </mesh>
            ) : (
                <Model key={carId} carId={carId} /> 
            )}

            <OrbitControls />
        </Canvas>
    );
};

export default ThreeScene;