import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/ui/SEO';
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand } from 'react-icons/fa';

// ─── Import all 51 project images ────────────────────────────────────────────
import img1  from '../assets/img1.jpeg';
import img2  from '../assets/img2.jpeg';
import img3  from '../assets/img3.jpeg';
import img4  from '../assets/img4.jpeg';
import img5  from '../assets/img5.jpeg';
import img6  from '../assets/img6.jpeg';
import img7  from '../assets/img7.jpeg';
import img8  from '../assets/img8.jpeg';
import img9  from '../assets/img9.jpeg';
import img10 from '../assets/img10.jpeg';
import img11 from '../assets/img11.jpeg';
import img12 from '../assets/img12.jpeg';
import img13 from '../assets/img13.jpeg';
import img14 from '../assets/img14.jpeg';
import img15 from '../assets/img15.jpeg';
import img16 from '../assets/img16.jpeg';
import img17 from '../assets/img17.jpeg';
import img18 from '../assets/img18.jpeg';
import img19 from '../assets/img19.jpeg';
import img20 from '../assets/img20.jpeg';
import img21 from '../assets/img21.jpeg';
import img22 from '../assets/img22.jpeg';
import img23 from '../assets/img23.jpeg';
import img24 from '../assets/img24.jpeg';
import img25 from '../assets/img25.jpeg';
import img26 from '../assets/img26.jpeg';
import img27 from '../assets/img27.jpeg';
import img28 from '../assets/img28.jpeg';
import img29 from '../assets/img29.jpeg';
import img30 from '../assets/img30.jpeg';
import img31 from '../assets/img31.jpeg';
import img32 from '../assets/img32.jpeg';
import img33 from '../assets/img33.jpeg';
import img34 from '../assets/img34.jpeg';
import img35 from '../assets/img35.jpeg';
import img36 from '../assets/img36.jpeg';
import img37 from '../assets/img37.jpeg';
import img38 from '../assets/img38.jpeg';
import img39 from '../assets/img39.jpeg';
import img40 from '../assets/img40.jpeg';
import img41 from '../assets/img41.jpeg';
import img42 from '../assets/img42.jpeg';
import img43 from '../assets/img43.jpeg';
import img44 from '../assets/img44.jpeg';
import img45 from '../assets/img45.jpeg';
import img46 from '../assets/img46.jpeg';
import img47 from '../assets/img47.jpeg';
import img48 from '../assets/img48.jpeg';
import img49 from '../assets/img49.jpeg';
import img50 from '../assets/img50.jpeg';
import img51 from '../assets/img51.jpeg';

// ─── Gallery Data ─────────────────────────────────────────────────────────────
const allImages = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
  img11, img12, img13, img14, img15, img16, img17, img18, img19, img20,
  img21, img22, img23, img24, img25, img26, img27, img28, img29, img30,
  img31, img32, img33, img34, img35, img36, img37, img38, img39, img40,
  img41, img42, img43, img44, img45, img46, img47, img48, img49, img50,
  img51,
];

// ─── Gallery Component ────────────────────────────────────────────────────────
const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loaded, setLoaded] = useState({});

  const openLightbox = (index) => {
    setActiveIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + allImages.length) % allImages.length);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % allImages.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  goPrev();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'Escape')     closeLightbox();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen, goPrev, goNext, closeLightbox]);

  return (
    <>
      <SEO
        title="Projects Gallery"
        description="Explore the complete photo gallery of Elite Engineers' construction, architectural, and interior projects across Pakistan."
      />

      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div className="pt-32 pb-16 bg-[#080d1a] relative overflow-hidden">
        {/* Blueprint grid bg */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(245,158,11,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(245,158,11,0.8) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-amber-400 text-xs tracking-[0.4em] uppercase mb-4"
          >
            Our Work
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-white text-4xl md:text-6xl font-display tracking-widest uppercase font-light"
          >
            Projects <span className="text-amber-400 font-bold">Gallery</span>
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '80px' }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-[1px] bg-amber-400 mx-auto mt-8"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-400 text-sm font-light tracking-widest mt-6"
          >
            {allImages.length} photos — Click any image to view full size
          </motion.p>
        </div>
      </div>

      {/* ── Masonry Grid ─────────────────────────────────────────────────── */}
      <div className="bg-[#080d1a] pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
            {allImages.map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: (index % 8) * 0.05 }}
                className="break-inside-avoid mb-3 group relative overflow-hidden cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                {/* Image */}
                <img
                  src={src}
                  alt={`Elite Engineers Project ${index + 1}`}
                  className={`w-full object-cover transition-all duration-700 group-hover:scale-105 ${
                    loaded[index] ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setLoaded(prev => ({ ...prev, [index]: true }))}
                  loading="lazy"
                />
                {/* Skeleton while loading */}
                {!loaded[index] && (
                  <div className="w-full aspect-[4/3] bg-gray-800 animate-pulse" />
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 border-2 border-amber-400 flex items-center justify-center text-amber-400">
                    <FaExpand className="text-lg" />
                  </div>
                </div>

                {/* Image number badge */}
                <div className="absolute top-2 left-2 bg-black/60 text-amber-400 text-[10px] tracking-widest px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-[0.3em] uppercase">
              {activeIndex + 1} / {allImages.length}
            </div>

            {/* Close */}
            <button
              className="absolute top-4 right-4 w-10 h-10 border border-white/30 flex items-center justify-center text-white hover:bg-amber-400 hover:border-amber-400 transition-colors duration-200 z-10"
              onClick={closeLightbox}
            >
              <FaTimes />
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 md:left-8 w-12 h-12 border border-white/30 flex items-center justify-center text-white hover:bg-amber-400 hover:border-amber-400 transition-colors duration-200 z-10"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
            >
              <FaChevronLeft />
            </button>

            {/* Image */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="max-w-5xl max-h-[85vh] mx-16 md:mx-24"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={allImages[activeIndex]}
                alt={`Project ${activeIndex + 1}`}
                className="max-w-full max-h-[85vh] object-contain shadow-2xl"
              />
            </motion.div>

            {/* Next */}
            <button
              className="absolute right-4 md:right-8 w-12 h-12 border border-white/30 flex items-center justify-center text-white hover:bg-amber-400 hover:border-amber-400 transition-colors duration-200 z-10"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
            >
              <FaChevronRight />
            </button>

            {/* Thumbnail strip */}
            <div className="absolute bottom-0 left-0 right-0 py-3 px-4 flex gap-1.5 overflow-x-auto scrollbar-hide bg-black/80 justify-start md:justify-center">
              {allImages.map((src, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
                  className={`flex-shrink-0 w-12 h-12 overflow-hidden transition-all duration-200 ${
                    i === activeIndex
                      ? 'ring-2 ring-amber-400 opacity-100 scale-110'
                      : 'opacity-40 hover:opacity-70'
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
