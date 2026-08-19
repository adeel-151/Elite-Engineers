import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

function AbstractArchitecture() {
  const outerGroup = useRef();
  const innerMesh = useRef();

  useFrame((state, delta) => {
    if (outerGroup.current && innerMesh.current) {
      outerGroup.current.rotation.y += delta * 0.15;
      outerGroup.current.rotation.x += delta * 0.05;
      innerMesh.current.rotation.y -= delta * 0.2;
      innerMesh.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <group ref={outerGroup}>
      {/* Outer wireframe shape representing structural framing */}
      <mesh>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshStandardMaterial color="#f59e0b" wireframe />
      </mesh>
      
      {/* Inner solid core representing the solid foundation */}
      <mesh ref={innerMesh}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

export default function ThreeDArchitecture() {
  return (
    <section className="w-full h-[60vh] md:h-[80vh] bg-[#0a0a0a] relative flex items-center justify-center overflow-hidden border-y border-white/10">
      <div className="absolute z-10 pointer-events-none flex flex-col items-center justify-center w-full h-full text-center px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-[0.1em] uppercase font-display drop-shadow-lg">Engineering the Future</h2>
        <p className="text-white/70 max-w-xl text-sm md:text-base tracking-widest font-light drop-shadow-md bg-black/30 p-4 backdrop-blur-sm rounded-lg border border-white/5">
          Interactive 3D visualization. Drag to explore.
        </p>
      </div>
      <div className="absolute inset-0 z-0 opacity-80 cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#f59e0b" />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
          <Environment preset="city" />
          
          <AbstractArchitecture />
          
          <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={0.5} 
          />
        </Canvas>
      </div>
    </section>
  );
}
