import React, { useRef, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import BuildingScene from './BuildingScene';

gsap.registerPlugin(ScrollTrigger);

// ─── Stage Text Content ─────────────────────────────────────────────────────
const STAGES = [
  { label: 'Stage 01', text: 'BUILT WITH PRECISION', sub: 'Where vision meets engineering' },
  { label: 'Stage 02', text: 'FROM THE GROUND UP', sub: 'Foundation · Reinforced concrete' },
  { label: 'Stage 03', text: 'ENGINEERED FOR STRENGTH', sub: 'Structural steel framework' },
  { label: 'Stage 04', text: 'RISING WITH PURPOSE', sub: 'Floor systems · Precision placement' },
  { label: 'Stage 05', text: 'DESIGNED FOR TOMORROW', sub: 'Facade engineering · Premium finishes' },
  { label: 'Stage 06', text: 'CRAFTED WITH EXCELLENCE', sub: 'Glass curtain wall · Climate envelope' },
  { label: 'Stage 07', text: 'EVERY DETAIL MATTERS', sub: 'Architectural finishing touches' },
  { label: 'Elite Engineers', text: 'ENGINEERING THE FUTURE', sub: 'Precision. Innovation. Excellence.', cta: true },
];

function getStageIndex(p) {
  if (p < 0.10) return 0;
  if (p < 0.25) return 1;
  if (p < 0.40) return 2;
  if (p < 0.55) return 3;
  if (p < 0.70) return 4;
  if (p < 0.82) return 5;
  if (p < 0.92) return 6;
  return 7;
}

// ─── Main Exported Component ─────────────────────────────────────────────────
export default function BuildingExperience() {
  const sectionRef = useRef(null);
  const progressRef = useRef(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  // ── ScrollTrigger: Pin this section and scrub through 5000px ──
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=3000',
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        setCurrentStage(getStageIndex(self.progress));
      },
    });
  }, { scope: sectionRef });

  // ── Canvas ready ──
  const handleCreated = useCallback(() => {
    setIsLoaded(true);
    setTimeout(() => setShowLoading(false), 1200);
  }, []);

  const stage = STAGES[currentStage];

  return (
    <section
      ref={sectionRef}
      id="building-experience"
      className="w-full h-screen relative overflow-hidden"
      style={{ background: '#0d1117' }}
      aria-label="Interactive 3D building construction experience"
    >
      {/* ═══ Loading Screen ═══ */}
      <AnimatePresence>
        {showLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isLoaded ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center"
            style={{ background: '#0a0a0a' }}
          >
            <h2 className="text-amber-500 text-xl md:text-3xl font-display tracking-[0.35em] uppercase">
              ELITE ENGINEERS
            </h2>
            <p className="text-white/30 text-[10px] md:text-xs tracking-[0.25em] mt-5 uppercase font-light">
              Initializing Experience...
            </p>
            <div className="w-44 h-[2px] bg-white/10 mt-6 overflow-hidden">
              <motion.div
                className="h-full bg-amber-500"
                initial={{ width: '0%' }}
                animate={{ width: isLoaded ? '100%' : '50%' }}
                transition={{ duration: isLoaded ? 0.4 : 4, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ Stage Text Overlay ═══ */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center text-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage}
            initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -40, filter: 'blur(8px)' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex flex-col items-center max-w-3xl"
          >
            {/* Stage label */}
            <p className="text-amber-400/50 text-[10px] md:text-xs tracking-[0.5em] uppercase mb-5 font-light">
              {stage.label}
            </p>

            {/* Main headline */}
            <h2 className="text-white text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-[0.08em] md:tracking-[0.12em] uppercase leading-tight drop-shadow-2xl">
              {stage.text}
            </h2>

            {/* Sub-text */}
            <p className="text-white/50 text-[11px] md:text-sm tracking-[0.15em] mt-4 md:mt-5 max-w-lg font-light uppercase">
              {stage.sub}
            </p>

            {/* CTA on final stage */}
            {stage.cta && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-8 md:mt-10 pointer-events-auto flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to="/projects"
                  className="px-10 py-3 bg-amber-500 text-black text-xs tracking-[0.3em] uppercase hover:bg-white transition-all duration-300 font-semibold"
                >
                  EXPLORE OUR PROJECTS
                </Link>
                <Link
                  to="/contact"
                  className="px-10 py-3 border border-white/40 text-white text-xs tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
                >
                  GET A QUOTE
                </Link>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ═══ Side Progress Indicator ═══ */}
      <div className="absolute left-5 md:left-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-[3px]">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="transition-all duration-700 ease-out"
            style={{
              width: '2px',
              height: i <= currentStage ? '20px' : '10px',
              backgroundColor: i <= currentStage ? '#f59e0b' : 'rgba(255,255,255,0.12)',
            }}
          />
        ))}
        <span className="text-white/20 text-[9px] tracking-[0.2em] mt-2 rotate-90 origin-center whitespace-nowrap translate-y-8">
          SCROLL
        </span>
      </div>

      {/* ═══ 3D Canvas ═══ */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [5, 3, 15], fov: 50, near: 0.1, far: 200 }}
          shadows
          dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.5)]}
          onCreated={handleCreated}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        >
          <BuildingScene progressRef={progressRef} />
        </Canvas>
      </div>

      {/* ═══ Gradient Edges ═══ */}
      <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-[#0d1117] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none" />
    </section>
  );
}
