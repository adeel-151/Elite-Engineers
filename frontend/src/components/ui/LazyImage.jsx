import { useState } from 'react';
import { motion } from 'framer-motion';

const LazyImage = ({ src, alt, className, style }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-gray-200 ${className}`} style={style}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={{ 
          opacity: isLoaded ? 1 : 0,
          filter: isLoaded ? 'blur(0px)' : 'blur(10px)' 
        }}
        transition={{ duration: 0.7 }}
        onLoad={() => setIsLoaded(true)}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default LazyImage;
