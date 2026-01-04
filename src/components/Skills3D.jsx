import React, { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Float, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { easing } from 'maath';

// --- DATOS DE SKILLS ---
const skillsData = [
  // --- FILA SUPERIOR (Indices 0, 1, 2) ---
  { 
    name: 'PYTHON', 
    level: 80, 
    originalPos: [-5, 4.0, 0], 
    color: '#FFD43B', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    desc: 'Django & IA Logic'
  },
  { 
    name: 'JAVA', 
    level: 85, 
    originalPos: [0, 4.0, 0], 
    color: '#f89820', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    desc: 'Enterprise Backend'
  },
  { 
    name: 'MYSQL', 
    level: 90, 
    originalPos: [5, 4.0, 0], 
    color: '#00758f', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    desc: 'Complex Queries' 
  },

  // --- FILA MEDIO ---
  { 
    name: 'REACT', 
    level: 75, 
    originalPos: [-5, 0, 0], 
    color: '#61dafb', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    desc: 'Modern UI/UX' 
  },
  { 
    name: 'NODE.JS', 
    level: 70, 
    originalPos: [0, 0, 0], 
    color: '#68a063', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    desc: 'Scalable APIs' 
  },
  { 
    name: 'TYPESCRIPT', 
    level: 70, 
    originalPos: [5, 0, 0], 
    color: '#3178c6', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    desc: 'Type Safety' 
  },

  // --- FILA INFERIOR ---
  { 
    name: 'AWS', 
    level: 55, 
    originalPos: [-5, -4.0, 0], 
    color: '#ff9900', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    desc: 'Cloud Infra' 
  },
  { 
    name: 'AZURE', 
    level: 40, 
    originalPos: [0, -4.0, 0], 
    color: '#0078d4', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
    desc: 'MS Cloud Services' 
  },
  { 
    name: 'JS / ES6', 
    level: 75, 
    originalPos: [5, -4.0, 0], 
    color: '#f7df1e', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    desc: 'Web Standard' 
  },
];

const textureUrls = skillsData.map(s => s.logo);

const SkillNode = ({ index, data, texture, isMobile, isActive, onClick }) => {
  const groupRef = useRef();
  const meshRef = useRef(); 
  const ringRef1 = useRef();
  const ringRef2 = useRef();
  const [hovered, setHovered] = useState(false);

  // --- CÁLCULO DE POSICIÓN ---
  const targetPosition = useMemo(() => {
    if (isMobile) {
      // Grid ZigZag para móvil
      const xOffset = 2.2;
      const col = index % 2 === 0 ? -xOffset : xOffset;
      const row = Math.floor(index / 2);
      
      // --- CAMBIO AQUÍ: Aumentado el multiplicador de 3.0 a 3.8 para más espacio vertical ---
      const y = 5 - (row * 3.8); 

      // Centrar el último elemento si es impar
      if (index === skillsData.length - 1 && skillsData.length % 2 !== 0) {
        return [0, y, 0];
      }
      return [col, y, 0];
    }
    // Posición PC intacta
    return data.originalPos;
  }, [isMobile, index, data.originalPos]);

  // --- LÓGICA DE POSICIÓN DE LA TARJETA ---
  const cardYOffset = useMemo(() => {
    if (isMobile) {
        // SI son los primeros 2 (Indices 0 y 1), la tarjeta va ABAJO (-3.4)
        if (index < 2) return -3.4;
        // El resto va ARRIBA (+3.2)
        return 3.2;
    }
    // Lógica Desktop normal
    return index >= 6 ? 2.8 : -2.4;
  }, [isMobile, index]);

  useFrame((state, delta) => {
    easing.damp3(groupRef.current.position, targetPosition, 0.5, delta);

    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t * 0.5 + index) * 0.3; 
    meshRef.current.rotation.y = Math.sin(t * 0.3 + index) * 0.3;
    meshRef.current.rotation.z += delta * 0.1;

    ringRef1.current.rotation.x += delta * 0.5;
    ringRef1.current.rotation.y += delta * 0.5;
    ringRef2.current.rotation.x -= delta * 0.3;
    ringRef2.current.rotation.z += delta * 0.2;

    const targetScale = isActive ? 1.3 : (hovered ? 1.15 : 1);
    easing.damp3(groupRef.current.scale, targetScale, 0.2, delta);
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
        <group 
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={(e) => { e.stopPropagation(); onClick(); }}
          cursor="pointer"
        >
          {/* NÚCLEO */}
          <group ref={meshRef}>
            <mesh castShadow receiveShadow>
              <icosahedronGeometry args={[0.95, 0]} /> 
              <meshStandardMaterial 
                color={data.color}
                roughness={0.2}       
                metalness={0.8}       
                emissive={data.color} 
                emissiveIntensity={hovered ? 1.5 : 0.4}
                toneMapped={false}    
              />
            </mesh>
            <mesh position={[0, 0, 1.0]}>
               <circleGeometry args={[0.65, 32]} />
               <meshBasicMaterial 
                  map={texture} 
                  transparent={true}
                  toneMapped={false} 
                  opacity={1}
               />
            </mesh>
          </group>

          {/* ANILLOS */}
          <mesh ref={ringRef1} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.3, 0.02, 16, 64]} />
            <meshStandardMaterial color={data.color} emissive={data.color} emissiveIntensity={1} toneMapped={false} />
          </mesh>
          <mesh ref={ringRef2} rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[1.6, 0.015, 16, 64]} />
            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.5} toneMapped={false} />
          </mesh>
        </group>
      </Float>

      {/* TEXTO NOMBRE */}
      <Text
        position={[0, -2.0, 0]}
        fontSize={isMobile ? 0.6 : 0.4} 
        color={isActive ? "#00ff88" : "white"}
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
        outlineWidth={0.02}
        outlineColor="black"
      >
        {data.name}
      </Text>

      {/* PANEL INFO */}
      {isActive && (
        <group position={[0, cardYOffset, 3]} renderOrder={100}>
           <mesh position={[0, 0, 0]}>
              <planeGeometry args={[4, 1.4]} />
              <meshBasicMaterial 
                color="#000000" 
                transparent 
                opacity={0.9} 
                depthTest={false} 
                depthWrite={false}
              />
              <lineSegments>
                <edgesGeometry args={[new THREE.PlaneGeometry(4, 1.4)]} />
                <lineBasicMaterial color={data.color} depthTest={false} />
              </lineSegments>
           </mesh>
           
           <Text 
             fontSize={0.25} 
             color="white" 
             maxWidth={3.8} 
             textAlign="center" 
             position={[0, 0.2, 0.01]}
             material-depthTest={false} 
             renderOrder={101}
           >
              {data.desc.toUpperCase()}
           </Text>
           
           <Text 
             position={[0, -0.3, 0.01]} 
             fontSize={0.2} 
             color={data.color} 
             fontWeight="bold"
             material-depthTest={false}
             renderOrder={101}
           >
             NIVEL: {data.level}%
           </Text>
        </group>
      )}
    </group>
  );
};

const Skills3D = () => {
  const [activeSkill, setActiveSkill] = useState(null);
  const textures = useTexture(textureUrls);
  const { viewport } = useThree();
  
  const isMobile = viewport.width < viewport.height; 

  return (
    <group>
      <mesh visible={false} onClick={() => setActiveSkill(null)} position={[0,0,-2]}>
         <planeGeometry args={[50, 50]} />
      </mesh>
      {skillsData.map((skill, index) => (
        <SkillNode 
            key={index}
            index={index}
            data={skill}
            texture={textures[index]}
            isMobile={isMobile}
            isActive={activeSkill === index}
            onClick={() => setActiveSkill(activeSkill === index ? null : index)}
        />
      ))}
    </group>
  );
};

export default Skills3D;