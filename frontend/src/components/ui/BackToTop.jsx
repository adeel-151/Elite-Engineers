import { useState, useEffect } from 'react';
import { FaLongArrowAltUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-24 md:bottom-8 md:right-28 z-50 w-12 h-12 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors shadow-md"
          aria-label="Back to top"
        >
          <FaLongArrowAltUp className="text-xl" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
