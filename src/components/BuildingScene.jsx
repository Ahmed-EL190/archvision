import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function Building({ position = [0, 0, 0], floors = 20, width = 1, depth = 1, color = '#C9A84C' }) {
  const groupRef = useRef();
  const height = floors * 0.15;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  const floors_arr = useMemo(() => Array.from({ length: floors }, (_, i) => i), [floors]);

  return (
    <group ref={groupRef} position={position}>
      {/* Main building wireframe */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(width, height, depth)]} />
        <lineBasicMaterial color={color} opacity={0.6} transparent />
      </lineSegments>

      {/* Floor lines */}
      {floors_arr.map((i) => (
        <Line
          key={i}
          points={[
            [-width/2, -height/2 + (i * height/floors), -depth/2],
            [width/2, -height/2 + (i * height/floors), -depth/2],
            [width/2, -height/2 + (i * height/floors), depth/2],
            [-width/2, -height/2 + (i * height/floors), depth/2],
            [-width/2, -height/2 + (i * height/floors), -depth/2],
          ]}
          color={color}
          lineWidth={0.5}
          opacity={0.3}
          transparent
        />
      ))}

      {/* Glowing core */}
      <mesh>
        <cylinderGeometry args={[0.02, 0.02, height, 8]} />
        <meshBasicMaterial color={color} opacity={0.4} transparent />
      </mesh>
    </group>
  );
}

function BuildingCity() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  const buildings = [
    { pos: [0, 0, 0], floors: 40, w: 1.2, d: 1.2, color: '#C9A84C' },
    { pos: [2.5, -1, 0], floors: 25, w: 0.9, d: 0.9, color: '#E2C97E' },
    { pos: [-2.5, -1, 0], floors: 30, w: 1.0, d: 1.0, color: '#9B7A2F' },
    { pos: [1.2, -1.5, 2], floors: 18, w: 0.7, d: 0.7, color: '#C9A84C' },
    { pos: [-1.2, -1.5, -2], floors: 22, w: 0.8, d: 0.8, color: '#E2C97E' },
    { pos: [4, -2, 1], floors: 12, w: 0.6, d: 0.6, color: '#9B7A2F' },
    { pos: [-4, -2, -1], floors: 15, w: 0.6, d: 0.6, color: '#C9A84C' },
  ];

  return (
    <group ref={groupRef}>
      {buildings.map((b, i) => (
        <Building
          key={i}
          position={b.pos}
          floors={b.floors}
          width={b.w}
          depth={b.d}
          color={b.color}
        />
      ))}

      {/* Ground grid */}
      <gridHelper args={[20, 20, 'rgba(201,168,76,0.1)', 'rgba(201,168,76,0.05)']} position={[0, -3.5, 0]} />

      {/* Connecting lines between buildings */}
      {[0,1,2,3].map(i => (
        <Line
          key={`conn-${i}`}
          points={[
            buildings[i].pos,
            buildings[i+1].pos,
          ]}
          color="#C9A84C"
          lineWidth={0.3}
          opacity={0.15}
          transparent
        />
      ))}
    </group>
  );
}

function Particles() {
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, []);

  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#C9A84C" opacity={0.6} transparent sizeAttenuation />
    </points>
  );
}

export default function BuildingScene({ height = '100%' }) {
  return (
    <div style={{ height, width: '100%' }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[8, 3, 8]} fov={50} />
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} color="#C9A84C" intensity={0.5} />
        <pointLight position={[-10, -10, -10]} color="#E2C97E" intensity={0.3} />

        <BuildingCity />
        <Particles />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />

        <fog attach="fog" args={['#0A0A0F', 15, 40]} />
      </Canvas>
    </div>
  );
}
