import React, { useRef, useMemo, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

function ArchitecturalGrid() {
  const groupRef = useRef();
  const instancedMeshRef = useRef();
  const wireframeRef = useRef();
  
  const gridSize = 12;
  const count = gridSize * gridSize;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useLayoutEffect(() => {
    let i = 0;
    const offset = (gridSize - 1) / 2;
    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        // Create a cityscape height map pattern
        const distFromCenter = Math.sqrt(Math.pow(x - offset, 2) + Math.pow(z - offset, 2));
        let height = Math.random() * 2 + 0.5;
        // Taller in the center
        if (distFromCenter < 3) height += Math.random() * 4 + 2;
        else if (distFromCenter < 5) height += Math.random() * 2 + 1;
        
        dummy.position.set((x - offset) * 1.5, height / 2 - 3, (z - offset) * 1.5);
        dummy.scale.set(1, height, 1);
        dummy.updateMatrix();
        
        if (instancedMeshRef.current) instancedMeshRef.current.setMatrixAt(i, dummy.matrix);
        if (wireframeRef.current) wireframeRef.current.setMatrixAt(i, dummy.matrix);
        i++;
      }
    }
    if (instancedMeshRef.current) instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    if (wireframeRef.current) wireframeRef.current.instanceMatrix.needsUpdate = true;
  }, [dummy]);

  // Scroll animations
  useGSAP(() => {
    const triggerOpts = {
      trigger: "#architecture-section",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5, // smooth scrubbing
    };

    gsap.to(groupRef.current.rotation, {
      y: Math.PI * 1.25,
      ease: "power1.inOut",
      scrollTrigger: triggerOpts
    });

    gsap.fromTo(groupRef.current.position, 
      { y: -2, z: -8, x: -2 },
      {
        y: 1,
        z: 4,
        x: 2,
        ease: "power1.inOut",
        scrollTrigger: triggerOpts
      }
    );
  });

  useFrame((state, delta) => {
    // Add a very slow ambient rotation
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Solid blocks */}
      <instancedMesh ref={instancedMeshRef} args={[null, null, count]}>
        <boxGeometry args={[0.9, 1, 0.9]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.8} />
      </instancedMesh>
      
      {/* Golden Wireframe outlines */}
      <instancedMesh ref={wireframeRef} args={[null, null, count]}>
        <boxGeometry args={[0.91, 1.01, 0.91]} />
        <meshBasicMaterial color="#f59e0b" wireframe transparent opacity={0.3} />
      </instancedMesh>
    </group>
  );
}

export default function ThreeDArchitecture() {
  return (
    <section id="architecture-section" className="w-full h-[80dvh] bg-black relative flex items-center justify-center overflow-hidden border-y border-white/5">
      {/* Text Overlay pinned on top of the 3D canvas */}
      <div className="absolute z-10 pointer-events-none flex flex-col items-center justify-center w-full h-full text-center px-4">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-[0.15em] uppercase font-display drop-shadow-2xl">
          Engineering the <span className="text-amber-500">Future</span>
        </h2>
        <p className="text-white/80 max-w-2xl text-sm md:text-lg tracking-widest font-light drop-shadow-md bg-black/40 px-6 py-4 backdrop-blur-md rounded border border-white/10 uppercase">
          Scroll to explore the blueprint of tomorrow
        </p>
      </div>
      
      {/* The 3D Canvas */}
      <div className="absolute inset-0 z-0 opacity-90 cursor-default">
        <Canvas camera={{ position: [0, 5, 12], fov: 45 }} dpr={[1, 1.5]} gl={{ powerPreference: 'high-performance' }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 20, 10]} intensity={1.5} color="#f59e0b" />
          <directionalLight position={[-10, -20, -10]} intensity={0.5} color="#ffffff" />
          
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <ArchitecturalGrid />
          </Float>

        </Canvas>
      </div>
      
      {/* Dark gradient fades at top and bottom so it blends with the page */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
    </section>
  );
}
