import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InitialLoader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show loader for exactly 2.5 seconds to complete the animation
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800); // Wait for exit animation to finish
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 bg-[#0a0a0a] z-[9999] flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 45 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-16 h-16 border-[2px] border-accent flex items-center justify-center mb-8"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: -45 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="w-5 h-5 bg-accent"
            ></motion.div>
          </motion.div>
          
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
              className="text-white font-display text-2xl md:text-3xl tracking-[0.3em] font-bold uppercase text-center ml-3"
            >
              Elite Engineers
            </motion.h1>
          </div>

          <div className="overflow-hidden mt-6">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-accent text-xs tracking-[0.4em] uppercase font-light text-center"
            >
              Building the future
            </motion.p>
          </div>

          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
            className="h-[1px] bg-accent mt-8 opacity-50"
          ></motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InitialLoader;
