import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hasPointer, setHasPointer] = useState(true);

  useEffect(() => {
    // Check if the device has a fine pointer (e.g., mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setHasPointer(mediaQuery.matches);
    
    // Optional: listen for changes in pointer capability
    const handleMediaChange = (e) => setHasPointer(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      // Elements that should trigger the cursor expansion
      const interactiveElements = ['A', 'BUTTON', 'INPUT', 'TEXTAREA'];
      // Also check if the element or its parent has a specific cursor style
      const isInteractive = interactiveElements.includes(e.target.tagName) || 
                            window.getComputedStyle(e.target).cursor === 'pointer';
                            
      setIsHovering(isInteractive);
    };

    if (mediaQuery.matches) {
      window.addEventListener('mousemove', updateMousePosition);
      window.addEventListener('mouseover', handleMouseOver);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!hasPointer) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(195,152,107,0.2)' : 'transparent'
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: "tween",
          ease: "linear",
          duration: 0
        }}
      />
    </>
  );
};

export default CustomCursor;
