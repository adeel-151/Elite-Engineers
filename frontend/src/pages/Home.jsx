import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { FaChevronUp, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';
import API_BASE_URL from '../config/api';

// Hero Slideshow Data
const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    headline: 'BUILDING\nTHE FUTURE',
    subtext: 'Engineering landmarks that define the modern skyline.',
    tag: 'Excellence in Construction',
  },
  {
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2062&auto=format&fit=crop',
    headline: 'PRECISION\nCRAFTED',
    subtext: 'Every structure built with uncompromising attention to detail.',
    tag: 'Structural Mastery',
  },
  {
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop',
    headline: 'INNOVATIVE\nDESIGN',
    subtext: 'Where architectural elegance meets engineering resilience.',
    tag: 'Architecture & Innovation',
  },
  {
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2073&auto=format&fit=crop',
    headline: 'TRUSTED\nPARTNERS',
    subtext: 'Over 15 years delivering world-class engineering solutions.',
    tag: 'Legacy of Trust',
  },
];

// Hero Slideshow Component
const HeroSlideshow = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);

  const goTo = useCallback((index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 900);
  }, [isAnimating]);

  const goNext = useCallback(() => {
    goTo((current + 1) % heroSlides.length);
  }, [current, goTo]);

  const goPrev = useCallback(() => {
    goTo((current - 1 + heroSlides.length) % heroSlides.length);
  }, [current, goTo]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const slide = heroSlides[current];

  return (
    <div className="h-screen w-full relative overflow-hidden bg-black">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={slide.image}
            alt={slide.headline}
            className="w-full h-full object-cover opacity-65"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70 z-10" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center pt-24">

        {/* Tag Badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`tag-${current}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <span className="text-xs tracking-[0.2em] md:tracking-[0.35em] uppercase text-white/70 border border-white/30 px-3 md:px-5 py-2 backdrop-blur-sm">
              {slide.tag}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Main Headline */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={`headline-${current}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-white text-3xl md:text-5xl lg:text-6xl tracking-[0.08em] md:tracking-[0.1em] font-bold mb-4 md:mb-6 leading-tight whitespace-pre-line"
          >
            {slide.headline}
          </motion.h1>
        </AnimatePresence>

        {/* Subtext */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`sub-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-white/80 text-sm md:text-lg tracking-wide md:tracking-widest max-w-xs md:max-w-xl font-light mb-8 md:mb-10"
          >
            {slide.subtext}
          </motion.p>
        </AnimatePresence>

        {/* CTA Button */}
        <motion.a
          href="/projects"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="px-10 py-3 border border-white/60 text-white text-xs tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
        >
          EXPLORE PROJECTS
        </motion.a>
      </div>

      {/* Prev / Next Arrows — hidden on mobile */}
      <button
        onClick={goPrev}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <FaChevronLeft size={14} />
      </button>
      <button
        onClick={goNext}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <FaChevronRight size={14} />
      </button>



      {/* Slide Counter */}
      <div className="absolute bottom-10 right-8 z-30 text-white/50 text-xs tracking-widest">
        {String(current + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
      </div>
    </div>
  );
};

// Reusable Sticky Section Component
const StickyImageSection = ({ imageSrc, children }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

  return (
    <div ref={containerRef} className="h-screen w-full relative overflow-hidden">
      <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
        <img src={imageSrc} alt="Background" className="w-full h-full object-cover opacity-70" />
      </motion.div>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/40">
        {children}
      </div>
    </div>
  );
};

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop';
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_BASE_URL}/${imagePath.replace(/\\/g, '/')}`;
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/projects`);
        const allProjects = res.data.data.projects;
        setFeaturedProjects(allProjects.slice(0, 3));
      } catch (error) {
        // Fallback dummy data if backend is down
        setFeaturedProjects([
          { _id: '1', title: 'The Skyline Tower', category: 'Commercial', images: ['https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=2070&auto=format&fit=crop'] },
          { _id: '2', title: 'Aura Residences', category: 'Residential', images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop'] },
          { _id: '3', title: 'Tech Hub Interior', category: 'Interior Fit-out', images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop'] }
        ]);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="bg-white">
      <SEO 
        title="Home" 
        description="Elite Engineers is a premier engineering firm delivering cutting-edge architectural, structural, and construction solutions."
      />


      {/* Main Hero Slideshow */}
      <HeroSlideshow />
      

      {/* Scrollable Content Block 1 */}
      <div className="py-32 bg-white relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="text-xl md:text-2xl font-light leading-relaxed text-gray-800"
          >
            We merge architectural elegance with structural resilience, defining the modern skyline. Discover our latest endeavors below.
          </motion.p>
        </div>
      </div>

      {/* Sticky Background 2 */}
      <StickyImageSection imageSrc="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2062&auto=format&fit=crop">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-white text-3xl md:text-5xl font-light tracking-widest text-center px-4"
        >
          OUR PHILOSOPHY
        </motion.h2>
      </StickyImageSection>

      {/* Scrollable Content Block 2: Philosophy & Stats */}
      <div className="py-32 bg-white relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl mb-6 tracking-widest uppercase">Precision & Innovation</h3>
              <p className="text-gray-600 font-light leading-relaxed mb-6">
                Every project is a testament to our commitment to excellence. We do not just construct buildings; we engineer landmarks that withstand the test of time. By integrating sustainable practices with cutting-edge technology, we ensure that our structures are as efficient as they are striking.
              </p>
              <button className="px-8 py-2 border border-gray-300 text-xs tracking-widest text-gray-500 uppercase hover:text-black hover:border-black transition-colors rounded-full">
                DISCOVER MORE
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-8 text-center"
            >
              <div className="p-8 border border-gray-100">
                <div className="text-4xl md:text-5xl font-display text-accent mb-2">15+</div>
                <div className="text-xs tracking-widest text-gray-500 uppercase">Years Experience</div>
              </div>
              <div className="p-8 border border-gray-100">
                <div className="text-4xl md:text-5xl font-display text-accent mb-2">120</div>
                <div className="text-xs tracking-widest text-gray-500 uppercase">Projects Completed</div>
              </div>
              <div className="p-8 border border-gray-100">
                <div className="text-4xl md:text-5xl font-display text-accent mb-2">50</div>
                <div className="text-xs tracking-widest text-gray-500 uppercase">Expert Engineers</div>
              </div>
              <div className="p-8 border border-gray-100">
                <div className="text-4xl md:text-5xl font-display text-accent mb-2">100%</div>
                <div className="text-xs tracking-widest text-gray-500 uppercase">Client Satisfaction</div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Trust Badges Marquee */}
      <div className="bg-gray-50 py-12 border-y border-gray-200 overflow-hidden relative z-20">
        <div className="text-center mb-8">
          <h3 className="text-xs tracking-widest text-gray-400 uppercase">Trusted by Industry Leaders & Certified by</h3>
        </div>
        <div className="flex whitespace-nowrap overflow-hidden">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            className="flex gap-16 md:gap-32 px-8 items-center opacity-50"
          >
            {/* Duplicated for seamless scrolling */}
            {Array(8).fill(['ISO 9001', 'PEC REGISTERED', 'DHA APPROVED', 'LEED CERTIFIED']).flat().map((badge, i) => (
              <div key={i} className="text-xl md:text-2xl font-display font-bold text-gray-400 tracking-widest">
                {badge}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Featured Projects Teaser */}
      <div className="py-24 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-sm tracking-widest text-accent uppercase mb-2">Our Masterpieces</h2>
              <h3 className="text-3xl md:text-4xl font-display uppercase tracking-widest">Featured Works</h3>
            </div>
            <a href="/projects" className="hidden md:block text-xs font-semibold tracking-widest uppercase hover:text-accent transition-colors border-b border-black hover:border-accent pb-1">
              View All Projects
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((p, i) => (
              <motion.div 
                key={p._id || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="group cursor-pointer"
                onClick={() => {
                  if (p._id) window.location.href = `/projects/${p._id}`;
                }}
              >
                <div className="w-full h-[400px] bg-gray-100 overflow-hidden mb-6 relative">
                  <img src={getImageUrl(p.images?.[0])} alt={p.title} className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-all duration-700" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <h4 className="text-xl font-display uppercase tracking-wider mb-2">{p.title}</h4>
                <p className="text-xs text-accent uppercase tracking-widest font-semibold">{p.category}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
             <a href="/projects" className="text-xs font-semibold tracking-widest uppercase hover:text-accent transition-colors border-b border-black hover:border-accent pb-1">
              View All Projects
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
