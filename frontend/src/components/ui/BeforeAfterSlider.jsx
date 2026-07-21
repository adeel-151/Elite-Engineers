import { useState } from 'react';
import { motion } from 'framer-motion';

const BeforeAfterSlider = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full relative overflow-hidden select-none bg-gray-100 h-[400px] md:h-[600px]"
    >
      {/* After Image (Background) */}
      <img 
        src={afterImage} 
        alt="After Construction" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 text-xs tracking-widest uppercase z-10 pointer-events-none">After</div>

      {/* Before Image (Foreground, Clipped) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img 
          src={beforeImage} 
          alt="Before Construction" 
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-90"
        />
        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 text-xs tracking-widest uppercase z-10">Before</div>
      </div>

      {/* Native Range Input for 100% reliable dragging */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={(e) => setSliderPosition(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 m-0"
      />

      {/* Custom Slider Handle UI (Follows the invisible input) */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white z-20 flex items-center justify-center pointer-events-none"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-lg border-2 border-white">
          <div className="flex gap-1">
            <div className="w-0.5 h-3 bg-white"></div>
            <div className="w-0.5 h-3 bg-white"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BeforeAfterSlider;
