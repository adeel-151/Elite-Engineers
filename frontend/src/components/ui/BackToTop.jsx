import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
      setIsVisible(scrollTop > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="hidden md:block">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed bottom-8 left-8 z-50 flex flex-col items-center gap-3 cursor-pointer group"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            {/* Vertical Progress Line */}
            <div className="relative w-[1px] h-16 bg-gray-300/50">
              <motion.div
                className="absolute bottom-0 left-0 w-full bg-amber-400"
                style={{ height: `${scrollProgress}%` }}
              />
            </div>

            {/* Diamond Icon — matches site logo */}
            <div
              className="w-10 h-10 border border-amber-400 rotate-45 flex items-center justify-center
                         group-hover:bg-amber-400 transition-all duration-300 relative"
            >
              {/* Inner arrow — rotated back to normal */}
              <svg
                className="w-3 h-3 -rotate-45 text-amber-400 group-hover:text-white transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </div>

            {/* Label */}
            <span className="text-[9px] tracking-[0.3em] uppercase text-gray-400 group-hover:text-amber-400 transition-colors duration-300 font-light">
              TOP
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BackToTop;
