import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../../assets/logo.png';

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
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <img
              src={logoImg}
              alt="Elite Engineers Logo"
              className="h-28 md:h-36 object-contain brightness-0 invert"
            />
          </motion.div>

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
