import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import ProceduralBuilding from './ProceduralBuilding';

// ─── Camera Keyframes ────────────────────────────────────────────────────────
// Each keyframe: { p: scroll%, pos: [x,y,z], target: [x,y,z] }
const KEYFRAMES = [
  { p: 0.00, pos: [5, 2, 14],   target: [0, 1, 0] },   // Low angle, close (empty site)
  { p: 0.12, pos: [7, 4, 17],   target: [0, 2, 0] },   // Pull back slightly (foundation)
  { p: 0.25, pos: [12, 8, 16],  target: [0, 6, 0] },   // Rising (structure begins)
  { p: 0.40, pos: [16, 14, 12], target: [0, 12, 0] },  // Higher angle (floors)
  { p: 0.55, pos: [10, 16, -8], target: [0, 14, 0] },  // Orbit behind (facade)
  { p: 0.70, pos: [-8, 18, 14], target: [0, 15, 0] },  // Other side (glass)
  { p: 0.85, pos: [18, 20, 16], target: [0, 14, 0] },  // Wide 3/4 (details)
  { p: 1.00, pos: [22, 22, 22], target: [0, 12, 0] },  // Final hero shot
];

function easeInOut3(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ─── Camera Controller ───────────────────────────────────────────────────────
function CameraController({ progressRef }) {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });
  const tmpPos = useRef(new THREE.Vector3());
  const tmpTarget = useRef(new THREE.Vector3());

  useEffect(() => {
    const handle = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handle, { passive: true });
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  useFrame(() => {
    const p = progressRef.current;

    // Smooth mouse (subtle parallax)
    smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.04;
    smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.04;

    // Find surrounding keyframes
    let i = 0;
    while (i < KEYFRAMES.length - 2 && KEYFRAMES[i + 1].p <= p) i++;
    const kf1 = KEYFRAMES[i];
    const kf2 = KEYFRAMES[Math.min(i + 1, KEYFRAMES.length - 1)];

    const range = kf2.p - kf1.p;
    const t = range > 0 ? Math.max(0, Math.min((p - kf1.p) / range, 1)) : 1;
    const st = easeInOut3(t);

    // Interpolate camera position + mouse parallax
    tmpPos.current.set(
      THREE.MathUtils.lerp(kf1.pos[0], kf2.pos[0], st) + smoothMouse.current.x * 0.6,
      THREE.MathUtils.lerp(kf1.pos[1], kf2.pos[1], st) + smoothMouse.current.y * 0.4,
      THREE.MathUtils.lerp(kf1.pos[2], kf2.pos[2], st),
    );

    // Interpolate lookAt target
    tmpTarget.current.set(
      THREE.MathUtils.lerp(kf1.target[0], kf2.target[0], st),
      THREE.MathUtils.lerp(kf1.target[1], kf2.target[1], st),
      THREE.MathUtils.lerp(kf1.target[2], kf2.target[2], st),
    );

    // Apply with lerp for extra cinematic smoothness
    camera.position.lerp(tmpPos.current, 0.08);
    camera.lookAt(tmpTarget.current);
  });

  return null;
}

// ─── Main Scene ──────────────────────────────────────────────────────────────
export default function BuildingScene({ progressRef }) {
  return (
    <>
      {/* Atmospheric fog — subtle depth */}
      <fog attach="fog" args={['#0d1117', 35, 85]} />

      {/* ── Lighting ── */}
      <ambientLight intensity={0.25} color="#b0c4de" />
      <hemisphereLight args={['#6b8cae', '#3a2f0b', 0.35]} />

      {/* Main directional (sun) */}
      <directionalLight
        position={[20, 35, 12]}
        intensity={1.8}
        color="#fff5e6"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={80}
        shadow-camera-left={-22}
        shadow-camera-right={22}
        shadow-camera-top={38}
        shadow-camera-bottom={-5}
        shadow-bias={-0.0003}
      />

      {/* Secondary fill light (cool blue from opposite side) */}
      <directionalLight position={[-12, 18, -8]} intensity={0.35} color="#4a6fa5" />

      {/* Subtle backlight for rim */}
      <directionalLight position={[0, 10, -20]} intensity={0.2} color="#8090a0" />

      {/* Environment map for realistic reflections on glass/metal */}
      <Environment preset="city" environmentIntensity={0.8} />

      {/* ── Camera ── */}
      <CameraController progressRef={progressRef} />

      {/* ── Building + Environment ── */}
      <ProceduralBuilding progressRef={progressRef} />
    </>
  );
}
