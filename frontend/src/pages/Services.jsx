import { motion, useScroll, useTransform } from 'framer-motion';
import SEO from '../components/ui/SEO';
import { useRef } from 'react';
import { FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CostEstimator from '../components/ui/CostEstimator';
import FaqAccordion from '../components/ui/FaqAccordion';

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
      img: "https://images.unsplash.com/photo-1504307651254-35680f356f58?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Turnkey Construction Solutions",
      desc: "Complete project delivery from first blueprint to final handover — one team, zero coordination headaches, total accountability.",
      img: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Grey Structure Execution",
      desc: "Robust and precise grey structure construction — foundations, columns, beams, slabs — built to last and built to code.",
      img: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Architectural Consultancy",
      desc: "Expert architectural guidance from concept to completion — space planning, façade design, and regulatory compliance handled expertly.",
      img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Structural Design & Analysis",
      desc: "Advanced structural engineering using modern software to ensure safety, durability, and compliance with international standards.",
      img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "3D Interior & Exterior Design",
      desc: "Photorealistic 3D visualisations of interiors and exteriors — see your project in stunning detail before a single brick is laid.",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
    },
    {
      title: "Project Planning & Supervision",
      desc: "Detailed project scheduling, resource allocation, and on-site supervision to keep every phase on time and within budget.",
      img: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Land Surveying Services",
      desc: "Accurate topographic and boundary surveys using modern instruments — essential groundwork for every successful project.",
      img: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Town Planning & Development",
      desc: "Strategic urban and residential town planning — master plans, zoning consultation, and development approvals handled end to end.",
      img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop"
    },
  ];

  return (
    <>
      <SEO 
        title="Our Services" 
        description="Explore the comprehensive engineering, design, and construction services offered by Elite Engineers."
      />

      {/* Hero Sticky Image */}
      <StickyImageSection imageSrc="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop" heightClass="h-[60vh]">
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
      <StickyImageSection imageSrc="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop" heightClass="h-[50vh]">
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
