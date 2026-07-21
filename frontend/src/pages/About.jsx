import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FaChevronUp } from 'react-icons/fa';

// Reusable Sticky Section Component
const StickyImageSection = ({ imageSrc, heightClass = "h-[60vh]", children }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={containerRef} className={`${heightClass} w-full relative overflow-hidden`}>
      <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
        <img src={imageSrc} alt="Background" className="w-full h-full object-cover grayscale opacity-60 scale-110" />
      </motion.div>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/30">
        {children}
      </div>
    </div>
  );
};

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Elite Engineers</title>
      </Helmet>

      {/* Hero Sticky Image */}
      <StickyImageSection imageSrc="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" heightClass="h-[70vh]">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white text-5xl md:text-6xl tracking-widest uppercase"
        >
          ABOUT US
        </motion.h1>
      </StickyImageSection>

      {/* Main Content */}
      <div className="py-24 bg-white relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <p className="text-base font-light leading-relaxed text-gray-600 mb-6">
              Elite Engineers is a premier consulting and construction firm dedicated to transforming visions into reality. With a strong foundation in structural integrity and modern aesthetics, we navigate complex engineering challenges with precision.
            </p>
            <p className="text-base font-light leading-relaxed text-gray-600">
              Our multidisciplinary team of architects, civil engineers, and project managers work synergistically to deliver sustainable, cutting-edge solutions for commercial and residential developments across the region.
            </p>
          </motion.div>

        </div>
      </div>

      {/* Sticky Blueprint/Office Background */}
      <StickyImageSection imageSrc="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" heightClass="h-[50vh]">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-white text-3xl md:text-4xl font-light tracking-widest text-center px-4 uppercase"
        >
          OUR CORE VALUES
        </motion.h2>
      </StickyImageSection>

      {/* Core Values Grid */}
      <div className="py-24 bg-white relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h3 className="text-xl mb-4 tracking-widest uppercase font-semibold">Integrity</h3>
              <p className="text-gray-500 font-light text-sm">We believe in transparent operations, honest communication, and delivering exactly what we promise, ensuring trust at every step.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <h3 className="text-xl mb-4 tracking-widest uppercase font-semibold">Innovation</h3>
              <p className="text-gray-500 font-light text-sm">Embracing the latest technologies and sustainable practices to create structures that are built for tomorrow's challenges.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <h3 className="text-xl mb-4 tracking-widest uppercase font-semibold">Excellence</h3>
              <p className="text-gray-500 font-light text-sm">A relentless pursuit of quality. From materials to execution, we accept nothing short of perfection in our craft.</p>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="py-24 bg-gray-50 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="text-center mb-16"
          >
             <h2 className="text-3xl tracking-widest uppercase">LEADERSHIP</h2>
             <div className="w-12 h-[1px] bg-accent mx-auto mt-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Adeel Khan', role: 'Chief Executive Officer', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop' },
              { name: 'Sarah Ahmed', role: 'Head of Architecture', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop' },
              { name: 'Usman Ali', role: 'Lead Structural Engineer', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop' },
              { name: 'Fatima Zafar', role: 'Project Manager', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop' }
            ].map((person, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="w-full h-80 bg-gray-200 overflow-hidden mb-4 grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img src={person.img} alt={person.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-semibold uppercase tracking-wider">{person.name}</h4>
                <p className="text-xs text-accent uppercase tracking-widest mt-1">{person.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </>
  );
};

export default About;
