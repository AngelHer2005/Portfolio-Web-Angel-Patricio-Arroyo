import React, { useRef, useMemo, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Instances, Instance, Stars, Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import Skills3D from './Skills3D'; 

const Building = ({ random, ...props }) => {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.position.y = props.position[1] + Math.sin(t * 0.5 + random * 100) * 0.5;
  });
  return <Instance ref={ref} {...props} />;
};

const City = ({ count = 500 }) => {
  const data = useMemo(() => {
    return new Array(count).fill().map(() => ({
      position: [
        (Math.random() - 0.5) * 200,
        Math.random() * 20 - 10,
        // La ciudad llega hasta -110 aprox.
        50 - Math.random() * 160 
      ],
      scale: [
        2 + Math.random() * 3,
        5 + Math.random() * 20,
        2 + Math.random() * 3
      ],
      random: Math.random(),
    }));
  }, [count]);

  return (
    <Instances range={count}>
      <boxGeometry />
      <meshStandardMaterial 
        color="#000" 
        emissive="#00ff88" 
        emissiveIntensity={0.2} 
        roughness={0.1}
        metalness={0.9}
        wireframe={true} 
      />
      {data.map((props, i) => (
        <Building key={i} {...props} />
      ))}
    </Instances>
  );
};

const CityScene = () => {
  return (
    <group rotation={[0, 0, 0]}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#00f0ff" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <fog attach="fog" args={['#000000', 10, 150]} />

      <City />
      
      <Float speed={2}>
        <mesh position={[0, 0, -20]}>
            <icosahedronGeometry args={[5, 1]} />
            <meshBasicMaterial color="#00f0ff" wireframe />
        </mesh>
      </Float>

      {/* --- GRUPO DE SKILLS (ARSENAL) --- */}
      {/* CAMBIO 1: Posición ajustada a -85 como pediste */}
      <group position={[0, 2, -110]}>
         {/* CAMBIO 2: Subí la posición Y del texto de 5.5 a 8.5 para despejar las figuras */}
         <Text 
            position={[0, 8.5, -2]} 
            fontSize={3} 
            color="#00ff88" 
            fillOpacity={0.1}
            strokeWidth={0.02}
            strokeColor="#00ff88"
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
          >
            ARSENAL
         </Text>

         <Suspense fallback={
            <Text position={[0,0,0]} fontSize={1} color="white">CARGANDO...</Text>
         }>
            <Skills3D />
         </Suspense>
      </group>

    </group>
  );
};

export default CityScene;