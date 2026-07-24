import { motion, useScroll, useTransform } from 'framer-motion';
import SEO from '../components/ui/SEO';
import { useRef } from 'react';
import { FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CostEstimator from '../components/ui/CostEstimator';
import FaqAccordion from '../components/ui/FaqAccordion';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';
import img6 from '../assets/img6.jpg';
import img7 from '../assets/img7.jpg';
import img8 from '../assets/img8.jpg';
import img10 from '../assets/img10.jpg';
import img11 from '../assets/img11.jpg';

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
        <img src={imageSrc} alt="Background" className="w-full h-full object-cover opacity-60 scale-110" />
      </motion.div>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/40">
        {children}
      </div>
    </div>
  );
};

const Services = () => {
  const services = [
    {
      title: "Engineering & Construction Services",
      desc: "Full-spectrum engineering and construction solutions — from structural planning to on-site execution — delivered with precision and professionalism.",
      img: img6
    },
    {
      title: "Turnkey Construction Solutions",
      desc: "Complete project delivery from first blueprint to final handover — one team, zero coordination headaches, total accountability.",
      img: img10
    },
    {
      title: "Grey Structure Execution",
      desc: "Robust and precise grey structure construction — foundations, columns, beams, slabs — built to last and built to code.",
      img: img7
    },
    {
      title: "Architectural Consultancy",
      desc: "Expert architectural guidance from concept to completion — space planning, façade design, and regulatory compliance handled expertly.",
      img: img4
    },
    {
      title: "Structural Design & Analysis",
      desc: "Advanced structural engineering using modern software to ensure safety, durability, and compliance with international standards.",
      img: img5
    },
    {
      title: "3D Interior & Exterior Design",
      desc: "Photorealistic 3D visualisations of interiors and exteriors — see your project in stunning detail before a single brick is laid.",
      img: img8
    },
    {
      title: "Project Planning & Supervision",
      desc: "Detailed project scheduling, resource allocation, and on-site supervision to keep every phase on time and within budget.",
      img: img1
    },
    {
      title: "Land Surveying Services",
      desc: "Accurate topographic and boundary surveys using modern instruments — essential groundwork for every successful project.",
      img: img3
    },
    {
      title: "Town Planning & Development",
      desc: "Strategic urban and residential town planning — master plans, zoning consultation, and development approvals handled end to end.",
      img: img2
    },
  ];

  return (
    <>
      <SEO 
        title="Our Services" 
        description="Explore the comprehensive engineering, design, and construction services offered by Elite Engineers."
      />

      {/* Hero Sticky Image */}
      <StickyImageSection imageSrc={img10} heightClass="h-[60vh]">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white text-3xl md:text-5xl lg:text-6xl tracking-widest uppercase text-center px-4"
        >
          OUR EXPERTISE
        </motion.h1>
      </StickyImageSection>

      {/* Services Grid Content */}
      <div className="py-24 bg-white relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-sm tracking-widest text-gray-500 uppercase">Comprehensive Engineering Solutions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative h-96 overflow-hidden cursor-pointer"
              >
                <img 
                  src={service.img} 
                  alt={service.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300"></div>
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-2xl font-display text-white mb-2 uppercase tracking-wide">{service.title}</h3>
                  <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-500">
                    <p className="text-gray-300 font-light text-sm mt-2 mb-4 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {service.desc}
                    </p>
                  </div>
                  <div className="w-12 h-[2px] bg-accent group-hover:w-full transition-all duration-500"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 border-t border-gray-200">
        <FaqAccordion />
      </div>

      {/* Cost Estimator Section */}
      <div className="py-24 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CostEstimator />
        </div>
      </div>

      {/* CTA Sticky Background */}
      <StickyImageSection imageSrc={img6} heightClass="h-[50vh]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center px-4"
        >
          <h2 className="text-white text-3xl md:text-5xl tracking-widest uppercase mb-8">Ready to Build?</h2>
          <Link to="/contact" className="px-12 py-4 bg-accent text-white uppercase tracking-widest text-sm hover:bg-black transition-colors duration-300 rounded-full">
            GET A QUOTE
          </Link>
        </motion.div>
      </StickyImageSection>
    </>
  );
};

export default Services;
