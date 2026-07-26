import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageLightbox = ({ images, initialIndex = 0, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, initialIndex]);

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors text-sm tracking-widest uppercase z-10"
          >
            Close
          </button>

          {/* Prev Button */}
          {images.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-4xl p-4 transition-colors z-10"
            >
              &#8249;
            </button>
          )}

          {/* Image Container */}
          <div className="relative w-full max-w-6xl max-h-[85vh] h-full p-4 flex items-center justify-center">
            <motion.img
              key={currentIndex} // Force re-render/animation on index change
              src={images[currentIndex]}
              alt={`Gallery image ${currentIndex + 1}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="max-w-full max-h-full object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
            />
          </div>

          {/* Next Button */}
          {images.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-4xl p-4 transition-colors z-10"
            >
              &#8250;
            </button>
          )}

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest">
            {currentIndex + 1} / {images.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageLightbox;
