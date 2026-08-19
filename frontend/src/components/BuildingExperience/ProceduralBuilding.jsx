import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Building Constants ──────────────────────────────────────────────────────
const W = 14;       // Building width
const D = 8;        // Building depth
const FH = 3;       // Floor height
const NF = 10;      // Number of floors
const BH = NF * FH; // Total building height (30)

// ─── Animation Helpers ───────────────────────────────────────────────────────
function stageP(p, s, e) {
  return p <= s ? 0 : p >= e ? 1 : (p - s) / (e - s);
}
function easeOut3(t) { return 1 - Math.pow(1 - t, 3); }
function easeOut4(t) { return 1 - Math.pow(1 - t, 4); }

// ─── Tree Sub-Component ─────────────────────────────────────────────────────
function Tree() {
  return (
    <group>
      {/* Trunk */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.15, 3, 6]} />
        <meshStandardMaterial color="#4a3726" roughness={0.9} />
      </mesh>
      {/* Canopy */}
      <mesh position={[0, 3.8, 0]} castShadow>
        <sphereGeometry args={[1.3, 8, 6]} />
        <meshStandardMaterial color="#2d6b2e" roughness={0.85} flatShading />
      </mesh>
    </group>
  );
}

// ─── Main Building Component ─────────────────────────────────────────────────
export default function ProceduralBuilding({ progressRef }) {
  // Group refs for each construction stage
  const foundationRef = useRef();
  const columnsRef = useRef();
  const floorsRef = useRef();
  const facadeRef = useRef();
  const glassRef = useRef();
  const detailsRef = useRef();
  const landscapeRef = useRef();

  // ── Shared PBR Materials ───────────────────────────────────────────────────
  const mats = useMemo(() => ({
    concreteDark: new THREE.MeshStandardMaterial({
      color: 0x5a5a5a, roughness: 0.92, metalness: 0.05,
    }),
    concrete: new THREE.MeshStandardMaterial({
      color: 0x8a8a8a, roughness: 0.85, metalness: 0.05,
    }),
    concreteLight: new THREE.MeshStandardMaterial({
      color: 0x9a9a9a, roughness: 0.80, metalness: 0.05,
    }),
    metal: new THREE.MeshStandardMaterial({
      color: 0xb0b0b0, roughness: 0.28, metalness: 0.95,
    }),
    metalDark: new THREE.MeshStandardMaterial({
      color: 0x3a3a3a, roughness: 0.40, metalness: 0.90,
    }),
    glass: new THREE.MeshStandardMaterial({
      color: 0x2a4a6b, roughness: 0.08, metalness: 0.92,
      transparent: true, opacity: 0, envMapIntensity: 2.5,
      side: THREE.DoubleSide, depthWrite: false,
    }),
    glassDark: new THREE.MeshStandardMaterial({
      color: 0x1a2a3a, roughness: 0.10, metalness: 0.90,
      transparent: true, opacity: 0.75,
    }),
    ground: new THREE.MeshStandardMaterial({
      color: 0x2a2a2a, roughness: 0.95, metalness: 0,
    }),
    road: new THREE.MeshStandardMaterial({
      color: 0x1a1a1a, roughness: 0.95, metalness: 0,
    }),
    grass: new THREE.MeshStandardMaterial({
      color: 0x2d5a27, roughness: 0.92, metalness: 0,
    }),
  }), []);

  // ── Computed Positions ─────────────────────────────────────────────────────
  const columns = useMemo(() => {
    const pos = [];
    [-6, -3, 0, 3, 6].forEach(x =>
      [-3.5, 0, 3.5].forEach(z =>
        pos.push([x, BH / 2, z])
      )
    );
    return pos;
  }, []);

  const mullions = useMemo(() => {
    const arr = [];
    [-4.5, -1.5, 1.5, 4.5].forEach(x => {
      arr.push({ pos: [x, BH / 2, -D / 2], face: 'front' });
      arr.push({ pos: [x, BH / 2, D / 2], face: 'back' });
    });
    return arr;
  }, []);

  const treePositions = useMemo(() => [
    [-10, 0, -6], [-12, 0, 2], [10, 0, -5],
    [11, 0, 3], [-4, 0, 9], [5, 0, 9],
  ], []);

  // ── Reduced Motion Check ───────────────────────────────────────────────────
  const prefersReduced = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  );

  // ── Per-Frame Animation ────────────────────────────────────────────────────
  useFrame(() => {
    const p = progressRef.current;

    if (prefersReduced.current) {
      // Show everything assembled
      if (foundationRef.current) { foundationRef.current.position.y = 0; foundationRef.current.visible = true; }
      if (columnsRef.current) { columnsRef.current.position.y = 0; columnsRef.current.visible = true; }
      if (floorsRef.current) { floorsRef.current.visible = true; floorsRef.current.children.forEach((f, i) => { f.position.y = (i + 1) * FH; f.visible = true; }); }
      if (facadeRef.current) { facadeRef.current.visible = true; }
      if (glassRef.current) { glassRef.current.visible = true; mats.glass.opacity = 0.5; }
      if (detailsRef.current) { detailsRef.current.visible = true; detailsRef.current.scale.setScalar(1); }
      if (landscapeRef.current) { landscapeRef.current.children.forEach(c => { c.visible = true; c.scale.setScalar(1); c.position.y = 0; }); }
      return;
    }

    // ── STAGE: Foundation (10%–25%) ──────────────────────────────────────────
    if (foundationRef.current) {
      const fp = easeOut3(stageP(p, 0.10, 0.25));
      foundationRef.current.position.y = THREE.MathUtils.lerp(-6, 0, fp);
      foundationRef.current.visible = p >= 0.08;
    }

    // ── STAGE: Columns (25%–40%) ─────────────────────────────────────────────
    if (columnsRef.current) {
      const cp = easeOut4(stageP(p, 0.25, 0.40));
      columnsRef.current.position.y = THREE.MathUtils.lerp(-35, 0, cp);
      columnsRef.current.visible = p >= 0.23;
    }

    // ── STAGE: Floor Slabs (40%–55%, staggered) ──────────────────────────────
    if (floorsRef.current) {
      floorsRef.current.children.forEach((floor, i) => {
        const delay = i * 0.013;
        const fp = easeOut3(stageP(p, 0.40 + delay, 0.43 + delay + 0.015));
        const finalY = (i + 1) * FH;
        floor.position.y = finalY + THREE.MathUtils.lerp(10, 0, fp);
        floor.visible = stageP(p, 0.38 + delay, 1) > 0;
      });
    }

    // ── STAGE: Facade — Side Walls + Mullions (55%–70%) ──────────────────────
    if (facadeRef.current) {
      const fcp = easeOut3(stageP(p, 0.55, 0.70));
      facadeRef.current.visible = p >= 0.53;
      facadeRef.current.children.forEach(child => {
        const ud = child.userData;
        if (ud.type === 'sideLeft') {
          child.position.x = THREE.MathUtils.lerp(-W / 2 - 6, -W / 2, fcp);
        } else if (ud.type === 'sideRight') {
          child.position.x = THREE.MathUtils.lerp(W / 2 + 6, W / 2, fcp);
        } else if (ud.type === 'mullion') {
          const off = ud.face === 'front' ? -3 : 3;
          child.position.z = ud.finalZ + off * (1 - fcp);
        }
      });
    }

    // ── STAGE: Glass Curtain Wall (70%–82%) ──────────────────────────────────
    if (glassRef.current) {
      const gp = easeOut3(stageP(p, 0.70, 0.82));
      glassRef.current.visible = p >= 0.68;
      glassRef.current.children.forEach(child => {
        if (child.userData.type === 'gFront') {
          child.position.z = THREE.MathUtils.lerp(-D / 2 - 4, -D / 2, gp);
        } else if (child.userData.type === 'gBack') {
          child.position.z = THREE.MathUtils.lerp(D / 2 + 4, D / 2, gp);
        }
      });
      mats.glass.opacity = gp * 0.5;
    }

    // ── STAGE: Architectural Details (82%–92%) ───────────────────────────────
    if (detailsRef.current) {
      const dp = easeOut3(stageP(p, 0.82, 0.92));
      detailsRef.current.visible = p >= 0.80;
      detailsRef.current.scale.setScalar(THREE.MathUtils.lerp(0.01, 1, dp));
    }

    // ── STAGE: Landscape (92%–100%) ──────────────────────────────────────────
    if (landscapeRef.current) {
      const lp = easeOut3(stageP(p, 0.92, 1.00));
      landscapeRef.current.children.forEach(child => {
        if (child.userData.type === 'tree') {
          child.scale.setScalar(THREE.MathUtils.lerp(0.05, 1, lp));
          child.position.y = THREE.MathUtils.lerp(-3, 0, lp);
          child.visible = lp > 0.01;
        }
      });
    }
  });

  // ── JSX Render ─────────────────────────────────────────────────────────────
  return (
    <group>
      {/* ═══════════ GROUND (always visible) ═══════════ */}
      <mesh position={[0, -0.05, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.95} />
      </mesh>
      {/* Road in front */}
      <mesh position={[0, 0.01, -(D / 2 + 6)]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 5]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.95} />
      </mesh>
      {/* Road center line */}
      <mesh position={[0, 0.02, -(D / 2 + 6)]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 0.15]} />
        <meshStandardMaterial color="#555555" roughness={0.9} />
      </mesh>
      {/* Grass patches */}
      <mesh position={[14, 0.01, 2]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 16]} />
        <meshStandardMaterial color="#2d5a27" roughness={0.92} />
      </mesh>
      <mesh position={[-14, 0.01, 2]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 16]} />
        <meshStandardMaterial color="#2d5a27" roughness={0.92} />
      </mesh>
      {/* Sidewalk */}
      <mesh position={[0, 0.015, -(D / 2 + 2.5)]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 2]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.88} />
      </mesh>

      {/* ═══════════ FOUNDATION ═══════════ */}
      <group ref={foundationRef} visible={false}>
        {/* Base slab */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow material={mats.concreteDark}>
          <boxGeometry args={[W + 2, 1, D + 2]} />
        </mesh>
        {/* Foundation edge — front */}
        <mesh position={[0, 0.75, -(D / 2 + 0.65)]} castShadow material={mats.concreteDark}>
          <boxGeometry args={[W + 2, 1.5, 0.3]} />
        </mesh>
        {/* Foundation edge — back */}
        <mesh position={[0, 0.75, D / 2 + 0.65]} castShadow material={mats.concreteDark}>
          <boxGeometry args={[W + 2, 1.5, 0.3]} />
        </mesh>
        {/* Foundation edge — left */}
        <mesh position={[-(W / 2 + 0.85), 0.75, 0]} castShadow material={mats.concreteDark}>
          <boxGeometry args={[0.3, 1.5, D + 2]} />
        </mesh>
        {/* Foundation edge — right */}
        <mesh position={[W / 2 + 0.85, 0.75, 0]} castShadow material={mats.concreteDark}>
          <boxGeometry args={[0.3, 1.5, D + 2]} />
        </mesh>
      </group>

      {/* ═══════════ STRUCTURAL COLUMNS ═══════════ */}
      <group ref={columnsRef} visible={false}>
        {columns.map((pos, i) => (
          <mesh key={`col-${i}`} position={pos} castShadow material={mats.metal}>
            <cylinderGeometry args={[0.2, 0.2, BH, 8]} />
          </mesh>
        ))}
        {/* Horizontal beams at every 2nd floor (structural realism) */}
        {[2, 4, 6, 8, 10].map(floor => (
          <React.Fragment key={`beam-f${floor}`}>
            {/* Front beam */}
            <mesh position={[0, floor * FH, -3.5]} castShadow material={mats.metal}>
              <boxGeometry args={[W, 0.2, 0.15]} />
            </mesh>
            {/* Back beam */}
            <mesh position={[0, floor * FH, 3.5]} castShadow material={mats.metal}>
              <boxGeometry args={[W, 0.2, 0.15]} />
            </mesh>
          </React.Fragment>
        ))}
      </group>

      {/* ═══════════ FLOOR SLABS ═══════════ */}
      <group ref={floorsRef}>
        {Array.from({ length: NF }, (_, i) => (
          <mesh
            key={`floor-${i}`}
            position={[0, (i + 1) * FH + 10, 0]}
            visible={false}
            castShadow
            receiveShadow
            material={mats.concreteLight}
          >
            <boxGeometry args={[W + 0.4, 0.35, D + 0.4]} />
          </mesh>
        ))}
      </group>

      {/* ═══════════ FACADE (Side Walls + Mullions) ═══════════ */}
      <group ref={facadeRef} visible={false}>
        {/* Left concrete wall */}
        <mesh
          position={[-W / 2 - 6, BH / 2, 0]}
          castShadow
          material={mats.concrete}
          userData={{ type: 'sideLeft' }}
        >
          <boxGeometry args={[0.2, BH, D]} />
        </mesh>
        {/* Right concrete wall */}
        <mesh
          position={[W / 2 + 6, BH / 2, 0]}
          castShadow
          material={mats.concrete}
          userData={{ type: 'sideRight' }}
        >
          <boxGeometry args={[0.2, BH, D]} />
        </mesh>
        {/* Vertical mullions (window frames) on glass faces */}
        {mullions.map((m, i) => (
          <mesh
            key={`mul-${i}`}
            position={[m.pos[0], m.pos[1], m.pos[2]]}
            castShadow
            material={mats.metal}
            userData={{ type: 'mullion', face: m.face, finalZ: m.pos[2] }}
          >
            <boxGeometry args={[0.06, BH, 0.06]} />
          </mesh>
        ))}
      </group>

      {/* ═══════════ GLASS CURTAIN WALL ═══════════ */}
      <group ref={glassRef} visible={false}>
        {/* Front glass */}
        <mesh
          position={[0, BH / 2, -D / 2 - 4]}
          material={mats.glass}
          userData={{ type: 'gFront' }}
        >
          <boxGeometry args={[W, BH, 0.05]} />
        </mesh>
        {/* Back glass */}
        <mesh
          position={[0, BH / 2, D / 2 + 4]}
          material={mats.glass}
          userData={{ type: 'gBack' }}
        >
          <boxGeometry args={[W, BH, 0.05]} />
        </mesh>
      </group>

      {/* ═══════════ ARCHITECTURAL DETAILS ═══════════ */}
      <group ref={detailsRef} visible={false}>
        {/* Entrance canopy */}
        <mesh position={[0, FH + 0.3, -(D / 2 + 1.8)]} castShadow material={mats.metal}>
          <boxGeometry args={[8, 0.12, 3.5]} />
        </mesh>
        {/* Canopy support pillars */}
        <mesh position={[-3.5, FH / 2 + 0.3, -(D / 2 + 3.2)]} castShadow material={mats.metal}>
          <cylinderGeometry args={[0.08, 0.08, FH, 6]} />
        </mesh>
        <mesh position={[3.5, FH / 2 + 0.3, -(D / 2 + 3.2)]} castShadow material={mats.metal}>
          <cylinderGeometry args={[0.08, 0.08, FH, 6]} />
        </mesh>
        {/* Entrance doors */}
        <mesh position={[0, FH / 2, -(D / 2 + 0.08)]} material={mats.glassDark}>
          <boxGeometry args={[5, FH - 0.2, 0.06]} />
        </mesh>
        {/* Roof parapet — front */}
        <mesh position={[0, BH + 0.5, -D / 2]} castShadow material={mats.concrete}>
          <boxGeometry args={[W + 0.6, 1, 0.15]} />
        </mesh>
        {/* Roof parapet — back */}
        <mesh position={[0, BH + 0.5, D / 2]} castShadow material={mats.concrete}>
          <boxGeometry args={[W + 0.6, 1, 0.15]} />
        </mesh>
        {/* Roof parapet — left */}
        <mesh position={[-W / 2, BH + 0.5, 0]} castShadow material={mats.concrete}>
          <boxGeometry args={[0.15, 1, D + 0.6]} />
        </mesh>
        {/* Roof parapet — right */}
        <mesh position={[W / 2, BH + 0.5, 0]} castShadow material={mats.concrete}>
          <boxGeometry args={[0.15, 1, D + 0.6]} />
        </mesh>
        {/* Roof HVAC unit */}
        <mesh position={[-3, BH + 1, 0]} castShadow material={mats.metalDark}>
          <boxGeometry args={[2.8, 1.6, 1.8]} />
        </mesh>
        {/* Roof equipment */}
        <mesh position={[3, BH + 1.2, 1]} castShadow material={mats.metalDark}>
          <boxGeometry args={[1.5, 2, 1.2]} />
        </mesh>
        {/* Antenna */}
        <mesh position={[1, BH + 2, -1]} castShadow material={mats.metal}>
          <cylinderGeometry args={[0.08, 0.08, 4, 6]} />
        </mesh>
        {/* Warm entrance light */}
        <pointLight position={[0, FH, -(D / 2 + 1.5)]} intensity={0.6} color="#ffe0b2" distance={10} />
      </group>

      {/* ═══════════ LANDSCAPE (Trees) ═══════════ */}
      <group ref={landscapeRef}>
        {treePositions.map((pos, i) => (
          <group
            key={`tree-${i}`}
            position={[pos[0], -3, pos[2]]}
            visible={false}
            userData={{ type: 'tree' }}
          >
            <Tree />
          </group>
        ))}
      </group>
    </group>
  );
}
