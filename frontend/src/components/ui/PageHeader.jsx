import { motion } from 'framer-motion';

const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="pt-40 pb-20 bg-secondary relative overflow-hidden flex flex-col items-center justify-center min-h-[40vh]">
      {/* Decorative Accent Bar */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-accent"></div>
      
      {/* Subtle Background Pattern/Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
        {subtitle && (
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-accent uppercase tracking-[0.2em] text-xs font-semibold mb-4 block"
          >
            {subtitle}
          </motion.span>
        )}
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-white text-4xl md:text-6xl lg:text-7xl font-display tracking-widest uppercase mb-6"
        >
          {title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "6rem" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-[2px] bg-accent"
        ></motion.div>
      </div>
    </div>
  );
};

export default PageHeader;
