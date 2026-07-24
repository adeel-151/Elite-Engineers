import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FaChevronUp } from 'react-icons/fa';
import SEO from '../components/ui/SEO';
import img1 from '../assets/img1.jpg';
import img3 from '../assets/img3.jpg';
import img9 from '../assets/img9.jpg';
import img11 from '../assets/img11.jpg';

// Reusable Sticky Section Component
const StickyImageSection = ({ imageSrc, heightClass = "h-[60vh]", children }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={containerRef} className={`${heightClass} w-full relative overflow-hidden bg-black`}>
      <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
        <img src={imageSrc} alt="Background" className="w-full h-full object-cover opacity-60 scale-110" />
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
      <SEO 
        title="About Us" 
        description="Learn about Elite Engineers, our mission, vision, and the expert team behind our world-class structural and architectural projects."
      />

      {/* Hero Sticky Image */}
      <StickyImageSection imageSrc={img1} heightClass="h-[70vh]">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white text-3xl md:text-5xl lg:text-6xl tracking-widest uppercase"
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
      <StickyImageSection imageSrc={img3} heightClass="h-[50vh]">
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

      {/* Certifications & Licenses */}
      <div className="py-24 bg-white relative z-20 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="text-center mb-16"
          >
             <h2 className="text-3xl tracking-widest uppercase">LICENSES & CERTIFICATIONS</h2>
             <div className="w-12 h-[1px] bg-accent mx-auto mt-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-surface"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white border border-gray-200 rounded-full flex items-center justify-center p-2 shadow-sm shrink-0">
                  <img src="https://upload.wikimedia.org/wikipedia/en/thumb/e/ef/Pakistan_Engineering_Council_logo.svg/1200px-Pakistan_Engineering_Council_logo.svg.png" alt="PEC Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold tracking-wide uppercase text-black">PEC Registered</h3>
                  <p className="text-[10px] md:text-xs text-accent tracking-widest uppercase mt-1">Licence No: 17520 (Category: C4/E)</p>
                </div>
              </div>
              <p className="text-gray-500 font-light text-sm leading-relaxed">
                Officially licensed by the Pakistan Engineering Council (PEC) as a certified Constructor and Operator, adhering strictly to national engineering standards and bye-laws.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-surface"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white border border-gray-200 rounded-full flex items-center justify-center p-2 shadow-sm shrink-0">
                  <div className="text-accent font-bold text-xl tracking-widest">SECP</div>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold tracking-wide uppercase text-black">SECP Incorporated</h3>
                  <p className="text-[10px] md:text-xs text-accent tracking-widest uppercase mt-1">CUIN: 0312523</p>
                </div>
              </div>
              <p className="text-gray-500 font-light text-sm leading-relaxed">
                Registered and incorporated under the Securities and Exchange Commission of Pakistan (SECP) as ELITE ENGINEERS (SMC-PRIVATE) LIMITED.
              </p>
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
              { name: 'Adeel Khan', role: 'Chief Executive Officer', img: img9 },
              { name: 'Sarah Ahmed', role: 'Head of Architecture', img: img3 },
              { name: 'Usman Ali', role: 'Lead Structural Engineer', img: img11 },
              { name: 'Fatima Zafar', role: 'Project Manager', img: img9 }
            ].map((person, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="w-full h-80 bg-gray-200 overflow-hidden mb-4 transition-all duration-500">
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
