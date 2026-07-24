import { useState, useEffect, useRef } from 'react';
import SEO from '../components/ui/SEO';
import axios from 'axios';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider';
import API_BASE_URL from '../config/api';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import img6 from '../assets/img6.jpg';
import img7 from '../assets/img7.jpg';
import img8 from '../assets/img8.jpg';
import img10 from '../assets/img10.jpg';

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
        <img src={imageSrc} alt="Background" className="w-full h-full object-cover opacity-60 scale-110" />
      </motion.div>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/40">
        {children}
      </div>
    </div>
  );
};


const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/projects`);
        // If there are less than 6 projects, we might want to duplicate them for display purposes to match the dense grid in the image
        const fetched = res.data.data.projects;
        // Mock categories for the sake of UI if none exist
        const enriched = fetched.map((p, i) => ({
           ...p,
           category: p.category || (i % 2 === 0 ? 'Residential' : 'Commercial')
        }));
        setProjects(enriched.length > 0 ? [...enriched, ...enriched, ...enriched].slice(0, 6) : []);
        setLoading(false);
      } catch (err) {
        // Fallback dummy data so the UI doesn't break if backend is not running
        const dummyProjects = [
          { _id: '1', title: 'The Skyline Tower', category: 'Commercial', images: [img1] },
          { _id: '2', title: 'Aura Residences', category: 'Residential', images: [img2] },
          { _id: '3', title: 'Tech Hub Interior', category: 'Interior', images: [img8] },
          { _id: '4', title: 'Urban Plaza', category: 'Commercial', images: [img7] },
          { _id: '5', title: 'Serenity Villa', category: 'Residential', images: [img4] },
          { _id: '6', title: 'Modern Office', category: 'Interior', images: [img3] }
        ];
        setProjects(dummyProjects);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <>
      <SEO 
        title="Our Projects" 
        description="View the diverse portfolio of residential, commercial, and interior projects completed by Elite Engineers."
      />
      

      {/* Hero Sticky Image */}
      <StickyImageSection imageSrc={img6} heightClass="h-[70vh]">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white text-3xl md:text-5xl lg:text-6xl tracking-widest uppercase"
        >
          OUR PORTFOLIO
        </motion.h1>
      </StickyImageSection>


      <div className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl">OUR PROJECTS</h2>
          </motion.div>
          
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
               <div className="bg-gray-100 h-64 animate-pulse"></div>
               <div className="bg-gray-100 h-64 animate-pulse"></div>
               <div className="bg-gray-100 h-64 animate-pulse"></div>
            </div>
          )}

          {error && <p className="text-red-500 text-center">{error}</p>}

          {!loading && !error && projects.length === 0 && (
            <p className="text-gray-500 text-center">Projects coming soon.</p>
          )}

          {!loading && !error && projects.length > 0 && (
            <>
              {/* Category Filters */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {['All', 'Residential', 'Commercial', 'Interior'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2 text-xs tracking-widest uppercase transition-colors rounded-full border ${activeCategory === cat ? 'bg-accent border-accent text-white' : 'bg-transparent border-gray-300 text-gray-500 hover:border-black hover:text-black'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={activeCategory} // Force re-animation on category change
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {projects.filter(p => activeCategory === 'All' || p.category.toLowerCase() === activeCategory.toLowerCase()).map((project, index) => (
                  <Link to={`/projects/${project._id}`} key={project._id + index} className="relative group overflow-hidden h-64 md:h-80 bg-gray-100 cursor-pointer block">
                    {project.images && project.images.length > 0 ? (
                      <img 
                        src={project.images[0]} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200"></div>
                    )}
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-6">
                       <h3 className="text-white font-display uppercase tracking-widest text-lg mb-2">{project.title}</h3>
                       <p className="text-accent text-xs font-semibold uppercase">{project.category}</p>
                    </div>
                  </Link>
                ))}
              </motion.div>
            </>
          )}
        </div>
        
        {/* Floating Divider Icon */}
        <div className="absolute -bottom-6 right-8 md:right-24 w-12 h-12 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-400 z-10">
           <FaChevronUp />
        </div>
      </div>

      {/* Before & After Showcase */}
      <div className="py-24 bg-white relative z-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm tracking-widest text-accent uppercase mb-2">Transformation Showcase</h2>
            <h3 className="text-3xl font-display uppercase tracking-widest text-black">From Blueprint to Reality</h3>
          </div>
          <BeforeAfterSlider 
            beforeImage={img10}
            afterImage={img2}
          />
        </div>
      </div>

      {/* Client Testimonials */}
      <div className="py-24 bg-gray-50 relative z-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm tracking-widest text-accent uppercase mb-12">Client Testimonials</h2>
            <div className="text-xl md:text-2xl font-light italic text-gray-700 mb-8 leading-relaxed">
              "Elite Engineers transformed our vision into a structural masterpiece. Their attention to detail and unwavering commitment to quality is truly unmatched in the industry."
            </div>
            <div className="font-semibold uppercase tracking-wider">— Faisal Rehman</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest">CEO, Apex Holdings</div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Projects;
