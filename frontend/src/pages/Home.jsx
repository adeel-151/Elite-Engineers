import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight, FaShieldAlt, FaTrophy, FaClock, FaMoneyBillWave, FaLeaf, FaHandshake, FaArrowRight, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import CounterStat from '../components/ui/CounterStat';
import TestimonialSlider from '../components/ui/TestimonialSlider';
import ProcessTimeline from '../components/ui/ProcessTimeline';
import BlogPreview from '../components/ui/BlogPreview';
import PartnerLogos from '../components/ui/PartnerLogos';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';
import img6 from '../assets/img6.jpg';
import img7 from '../assets/img7.jpg';
import img8 from '../assets/img8.jpg';
import img9 from '../assets/img9.jpg';
import img10 from '../assets/img10.jpg';
import img11 from '../assets/img11.jpg';

// ─── Hero Slideshow Data ─────────────────────────────────────────────────────
const heroSlides = [
  {
    image: img7,
    headline: 'BUILDING\nTHE FUTURE',
    subtext: 'Engineering landmarks that define the modern skyline.',
    tag: 'Excellence in Construction',
  },
  {
    image: img3,
    headline: 'PRECISION\nCRAFTED',
    subtext: 'Every structure built with uncompromising attention to detail.',
    tag: 'Structural Mastery',
  },
  {
    image: img6,
    headline: 'INNOVATIVE\nDESIGN',
    subtext: 'Where architectural elegance meets engineering resilience.',
    tag: 'Architecture & Innovation',
  },
  {
    image: img3,
    headline: 'TRUSTED\nPARTNERS',
    subtext: 'Over 15 years delivering world-class engineering solutions.',
    tag: 'Legacy of Trust',
  },
];

// ─── Why Choose Us Features ──────────────────────────────────────────────────
const whyFeatures = [
  {
    icon: FaShieldAlt,
    title: 'Certified & Compliant',
    desc: 'ISO 9001 certified, PEC registered, and DHA / LDA approved. Every project meets the highest national and international standards.',
  },
  {
    icon: FaTrophy,
    title: 'Award-Winning Design',
    desc: 'Multiple national and international architectural excellence awards recognizing our commitment to outstanding design and engineering.',
  },
  {
    icon: FaClock,
    title: 'On-Time Delivery',
    desc: '98% of our projects are delivered on schedule. We set realistic timelines and hold ourselves accountable — no excuses, no delays.',
  },
  {
    icon: FaMoneyBillWave,
    title: 'Transparent Pricing',
    desc: 'No hidden costs, no surprise invoices. You receive a full cost breakdown at every project phase so you stay in control of your budget.',
  },
  {
    icon: FaLeaf,
    title: 'Sustainable Practices',
    desc: 'LEED-aligned green building standards, energy-efficient materials, and low-waste construction methods — building responsibly for the future.',
  },
  {
    icon: FaHandshake,
    title: 'End-to-End Service',
    desc: 'From first sketch to final key handover — design, engineering, permitting, and construction under one roof. One team, zero coordination headaches.',
  },
];

// ─── Services Preview Data ───────────────────────────────────────────────────
const servicesPreview = [
  {
    title: 'Engineering & Construction',
    desc: 'Full-spectrum construction solutions from structural planning to on-site execution.',
    icon: '⬡',
    img: img6,
  },
  {
    title: 'Turnkey Construction',
    desc: 'Complete project delivery — first blueprint to final handover under one roof.',
    icon: '⬡',
    img: img10,
  },
  {
    title: 'Architectural Consultancy',
    desc: 'Expert guidance on space planning, façade design, and regulatory compliance.',
    icon: '⬡',
    img: img3,
  },
  {
    title: 'Structural Design & Analysis',
    desc: 'Advanced structural engineering ensuring safety and international code compliance.',
    icon: '⬡',
    img: img5,
  },
  {
    title: '3D Interior & Exterior Design',
    desc: 'Photorealistic 3D visualisations — see your project in detail before it is built.',
    icon: '⬡',
    img: img8,
  },
  {
    title: 'Town Planning & Development',
    desc: 'Strategic master plans, zoning consultation, and development approvals.',
    icon: '⬡',
    img: img4,
  },
];

// ─── Gallery Images ──────────────────────────────────────────────────────────
const galleryImages = [
  { src: img1, label: 'Commercial Tower', span: 'md:col-span-2 md:row-span-2' },
  { src: img2, label: 'Luxury Residence', span: '' },
  { src: img8, label: 'Modern Office Interior', span: '' },
  { src: img11, label: 'Structural Blueprint', span: '' },
  { src: img6, label: 'Construction Progress', span: '' },
  { src: img7, label: 'Corporate HQ', span: '' },
];

// ─── Hero Slideshow Component ────────────────────────────────────────────────
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

  const goNext = useCallback(() => goTo((current + 1) % heroSlides.length), [current, goTo]);
  const goPrev = useCallback(() => goTo((current - 1 + heroSlides.length) % heroSlides.length), [current, goTo]);

  useEffect(() => {
    intervalRef.current = setInterval(() => setCurrent(prev => (prev + 1) % heroSlides.length), 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const slide = heroSlides[current];

  return (
    <div className="h-screen w-full relative overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full"
        >
          <img src={slide.image} alt={slide.headline} className="w-full h-full object-cover opacity-65" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70 z-10" />

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center pt-24">
        <AnimatePresence mode="wait">
          <motion.div key={`tag-${current}`} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.6, delay: 0.1 }} className="mb-6">
            <span className="text-xs tracking-[0.2em] md:tracking-[0.35em] uppercase text-white/70 border border-white/30 px-3 md:px-5 py-2 backdrop-blur-sm">{slide.tag}</span>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.h1 key={`headline-${current}`} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }} className="text-white text-4xl md:text-6xl lg:text-7xl tracking-[0.08em] md:tracking-[0.12em] font-bold mb-4 md:mb-6 leading-tight whitespace-pre-line font-display">
            {slide.headline}
          </motion.h1>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.p key={`sub-${current}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.7, delay: 0.4 }} className="text-white/80 text-sm md:text-lg tracking-wide md:tracking-widest max-w-xs md:max-w-xl font-light mb-10 md:mb-12">
            {slide.subtext}
          </motion.p>
        </AnimatePresence>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }} className="flex flex-col sm:flex-row gap-4">
          <Link to="/projects" className="px-10 py-3 bg-amber-500 text-black text-xs tracking-[0.3em] uppercase hover:bg-white transition-all duration-300 font-semibold">
            EXPLORE PROJECTS
          </Link>
          <Link to="/contact" className="px-10 py-3 border border-white/60 text-white text-xs tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm">
            GET A QUOTE
          </Link>
        </motion.div>
      </div>

      {/* Arrows */}
      <button onClick={goPrev} className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm" aria-label="Previous slide">
        <FaChevronLeft size={14} />
      </button>
      <button onClick={goNext} className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm" aria-label="Next slide">
        <FaChevronRight size={14} />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {heroSlides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} className={`transition-all duration-300 h-[2px] ${i === current ? 'w-8 bg-amber-400' : 'w-3 bg-white/30'}`} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>

      <div className="absolute bottom-10 right-8 z-30 text-white/50 text-xs tracking-widest">
        {String(current + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-8 z-30 hidden md:flex flex-col items-center gap-2">
        <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase rotate-90 origin-center mb-4">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </div>
  );
};

// ─── Sticky Image Section ────────────────────────────────────────────────────
const StickyImageSection = ({ imageSrc, children }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

  return (
    <div ref={containerRef} className="h-screen w-full relative overflow-hidden bg-black">
      <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
        <img src={imageSrc} alt="Background" className="w-full h-full object-cover opacity-70" />
      </motion.div>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/40">
        {children}
      </div>
    </div>
  );
};

// ─── Main Home Component ─────────────────────────────────────────────────────
const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return img1;
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_BASE_URL}/${imagePath.replace(/\\/g, '/')}`;
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/projects`);
        const allProjects = res.data.data.projects;
        setFeaturedProjects(allProjects.slice(0, 3));
      } catch {
        setFeaturedProjects([
          { _id: '1', title: 'The Skyline Tower', category: 'Commercial', images: [img1] },
          { _id: '2', title: 'Aura Residences', category: 'Residential', images: [img2] },
          { _id: '3', title: 'Tech Hub Interior', category: 'Interior Fit-out', images: [img8] },
        ]);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="bg-white">
      <SEO
        title="Home"
        description="Elite Engineers is a premier engineering firm in Lahore delivering cutting-edge architectural, structural, and construction solutions across Pakistan."
      />

      {/* ── 1. HERO SLIDESHOW ─────────────────────────────────────────────── */}
      <HeroSlideshow />

      {/* ── 2. CINEMATIC INTRO TEXT ───────────────────────────────────────── */}
      <div className="py-28 bg-white relative z-20 shadow-[0_-20px_60px_rgba(0,0,0,0.6)]">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-gray-800 tracking-wide"
          >
            We merge architectural elegance with structural resilience,{' '}
            <span className="text-amber-500 font-medium">defining the modern skyline</span> of Pakistan — one landmark at a time.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-24 h-[1px] bg-amber-400 mx-auto mt-10"
          />
        </div>
      </div>

      {/* ── 3. ANIMATED COUNTER STATS ─────────────────────────────────────── */}
      <div className="py-24 bg-[#0a0f1e] relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-xs tracking-[0.3em] text-gray-500 uppercase mb-16"
          >
            15 Years of Excellence — By the Numbers
          </motion.p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-6 divide-x-0 md:divide-x divide-white/10">
            <CounterStat end={15} suffix="+" label="Years Experience" duration={1800} />
            <CounterStat end={120} label="Projects Completed" duration={2000} />
            <CounterStat end={50} suffix="+" label="Expert Engineers" duration={1600} />
            <CounterStat end={100} suffix="%" label="Client Satisfaction" duration={2200} />
            <CounterStat prefix="₨" end={2.5} suffix="B+" label="Value Delivered" duration={2000} />
          </div>
        </div>
      </div>

      {/* ── 4. SERVICES PREVIEW STRIP ─────────────────────────────────────── */}
      <div className="py-28 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-3">What We Do</p>
              <h2 className="text-3xl md:text-4xl font-display tracking-widest uppercase text-gray-900">Our Expertise</h2>
              <div className="w-12 h-[1px] bg-amber-500 mt-5" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Link to="/services" className="flex items-center gap-2 text-xs tracking-widest uppercase text-gray-500 hover:text-amber-500 transition-colors mt-6 md:mt-0 border-b border-gray-300 hover:border-amber-500 pb-1">
                View All Services <FaArrowRight className="text-[10px]" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {servicesPreview.map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="group relative h-80 overflow-hidden cursor-pointer"
              >
                <img src={svc.img} alt={svc.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-black/95 transition-all duration-500" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="w-8 h-[1px] bg-amber-400 mb-4 group-hover:w-16 transition-all duration-500" />
                  <h3 className="text-white font-display text-lg uppercase tracking-wide mb-2">{svc.title}</h3>
                  <p className="text-gray-300 text-sm font-light leading-relaxed opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-20 transition-all duration-500 overflow-hidden">
                    {svc.desc}
                  </p>
                </div>
                {/* Corner accent */}
                <div className="absolute top-5 right-5 w-8 h-8 border border-amber-400/0 group-hover:border-amber-400/60 transition-all duration-500 transform rotate-45" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 5. STICKY PHILOSOPHY BANNER ───────────────────────────────────── */}
      <StickyImageSection imageSrc="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2062&auto=format&fit=crop">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center px-4"
        >
          <p className="text-amber-400 text-xs tracking-[0.4em] uppercase mb-4">Our Guiding Principle</p>
          <h2 className="text-white text-4xl md:text-6xl font-display font-light tracking-widest uppercase">
            OUR PHILOSOPHY
          </h2>
          <div className="w-20 h-[1px] bg-amber-400 mx-auto mt-6" />
        </motion.div>
      </StickyImageSection>

      {/* ── 6. PHILOSOPHY GRID & EXPANDED STATS ───────────────────────────── */}
      <div className="py-32 bg-white relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-4">Since 2009</p>
              <h3 className="text-3xl md:text-4xl font-display uppercase tracking-widest mb-8 text-gray-900">Precision & Innovation</h3>
              <p className="text-gray-600 font-light leading-loose mb-6 text-base">
                Every project is a testament to our commitment to excellence. We do not just construct buildings — we engineer landmarks that withstand the test of time. By integrating sustainable practices with cutting-edge technology, we ensure our structures are as efficient as they are striking.
              </p>
              <p className="text-gray-600 font-light leading-loose mb-10 text-base">
                Our multidisciplinary team navigates the full spectrum — from initial site feasibility and concept design through structural engineering, regulatory approvals, construction supervision, and final handover. This holistic approach means fewer stakeholders, tighter coordination, and superior results.
              </p>
              <Link to="/about" className="inline-flex items-center gap-3 px-8 py-3 border border-gray-300 text-xs tracking-widest text-gray-600 uppercase hover:text-black hover:border-black transition-colors">
                Discover Our Story <FaArrowRight className="text-[10px]" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-0"
            >
              {[
                { value: '15+', label: 'Years Experience' },
                { value: '120', label: 'Projects Delivered' },
                { value: '50+', label: 'Expert Engineers' },
                { value: '100%', label: 'Client Satisfaction' },
              ].map((stat, i) => (
                <div key={stat.label} className={`p-10 border border-gray-100 text-center group hover:bg-gray-900 transition-colors duration-500 ${i === 0 ? 'bg-gray-900' : 'bg-white'}`}>
                  <div className={`text-4xl md:text-5xl font-display font-bold mb-3 transition-colors duration-500 ${i === 0 ? 'text-amber-400' : 'text-gray-900 group-hover:text-amber-400'}`}>{stat.value}</div>
                  <div className={`text-xs tracking-widest uppercase transition-colors duration-500 ${i === 0 ? 'text-gray-400' : 'text-gray-500 group-hover:text-gray-400'}`}>{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── 7. WHY CHOOSE US ──────────────────────────────────────────────── */}
      <div className="py-28 bg-[#0a0f1e] relative z-20">
        {/* subtle dot grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(rgba(245,158,11,1) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-3">Our Differentiators</p>
            <h2 className="text-white text-3xl md:text-4xl font-display tracking-widest uppercase">Why Choose Elite Engineers</h2>
            <div className="w-16 h-[1px] bg-amber-400 mx-auto mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyFeatures.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group border border-white/10 hover:border-amber-400/50 p-8 transition-all duration-500 hover:bg-white/5"
                >
                  <div className="w-14 h-14 bg-amber-400/10 group-hover:bg-amber-400/20 flex items-center justify-center mb-6 transition-colors duration-300">
                    <Icon className="text-amber-400 text-2xl" />
                  </div>
                  <h3 className="text-white font-display text-lg uppercase tracking-wide mb-4">{feat.title}</h3>
                  <p className="text-gray-400 font-light text-sm leading-relaxed">{feat.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 8. HOW WE WORK TIMELINE ───────────────────────────────────────── */}
      <ProcessTimeline />

      {/* ── 9. FEATURED PROJECTS ──────────────────────────────────────────── */}
      <div className="py-28 bg-gray-50 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-3">Our Masterpieces</p>
              <h2 className="text-3xl md:text-4xl font-display uppercase tracking-widest text-gray-900">Featured Works</h2>
              <div className="w-12 h-[1px] bg-amber-500 mt-5" />
            </motion.div>
            <Link to="/projects" className="hidden md:flex items-center gap-2 text-xs font-semibold tracking-widest uppercase hover:text-amber-500 transition-colors border-b border-black hover:border-amber-500 pb-1 mt-6 md:mt-0">
              View All Projects <FaArrowRight className="text-[10px]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((p, i) => (
              <motion.div
                key={p._id || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className="group cursor-pointer"
                onClick={() => { if (p._id) window.location.href = `/projects/${p._id}`; }}
              >
                <div className="w-full h-[460px] bg-gray-100 overflow-hidden mb-5 relative">
                  <img src={getImageUrl(p.images?.[0])} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  {/* Category pill */}
                  <div className="absolute top-5 left-5">
                    <span className="bg-amber-400 text-black text-[10px] tracking-widest uppercase px-3 py-1 font-semibold">{p.category}</span>
                  </div>
                  {/* Arrow overlay on hover */}
                  <div className="absolute bottom-5 right-5 w-10 h-10 bg-amber-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <FaArrowRight className="text-black text-sm" />
                  </div>
                </div>
                <h4 className="text-xl font-display uppercase tracking-wider mb-1 group-hover:text-amber-500 transition-colors duration-300">{p.title}</h4>
                <p className="text-xs text-gray-400 uppercase tracking-widest">{p.category}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link to="/projects" className="text-xs font-semibold tracking-widest uppercase hover:text-amber-500 transition-colors border-b border-black hover:border-amber-500 pb-1">
              View All Projects
            </Link>
          </div>
        </div>
      </div>

      {/* ── 10. TRUST BADGES MARQUEE ──────────────────────────────────────── */}
      <div className="bg-white py-12 border-y border-gray-100 overflow-hidden relative z-20">
        <div className="text-center mb-8">
          <h3 className="text-xs tracking-[0.3em] text-gray-400 uppercase">Trusted by Industry Leaders & Certified by</h3>
        </div>
        <div className="flex whitespace-nowrap overflow-hidden">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 25 }}
            className="flex gap-16 md:gap-32 px-8 items-center opacity-40"
          >
            {Array(8).fill(['ISO 9001 CERTIFIED', 'PEC REGISTERED', 'DHA APPROVED', 'LEED CERTIFIED', 'NESPAK PARTNER', 'LDA APPROVED']).flat().map((badge, i) => (
              <div key={i} className="text-xl md:text-2xl font-display font-bold text-gray-600 tracking-widest">{badge}</div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── 11. CLIENT TESTIMONIALS ───────────────────────────────────────── */}
      <TestimonialSlider />

      {/* ── 12. PROJECT GALLERY MOSAIC ────────────────────────────────────── */}
      <div className="py-28 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-3">Our Finest Work</p>
            <h2 className="text-3xl md:text-4xl font-display tracking-widest uppercase text-gray-900">Project Gallery</h2>
            <div className="w-16 h-[1px] bg-amber-500 mx-auto mt-5" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-2 gap-3 h-[600px] md:h-[700px]">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={`group relative overflow-hidden ${img.span}`}
              >
                <img src={img.src} alt={img.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white text-xs tracking-widest uppercase font-semibold">{img.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/projects" className="inline-flex items-center gap-3 px-10 py-3 border border-gray-300 text-xs tracking-widest uppercase text-gray-600 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300">
              View Full Portfolio <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── 13. BLOG / INSIGHTS PREVIEW ───────────────────────────────────── */}
      <BlogPreview />

      {/* ── 14. PARTNER LOGOS ─────────────────────────────────────────────── */}
      <PartnerLogos />

      {/* ── 15. LOCATION CTA BAND ─────────────────────────────────────────── */}
      <div className="py-20 bg-amber-400 relative overflow-hidden z-20">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(0,0,0,0.1) 30px, rgba(0,0,0,0.1) 31px)' }} />
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <FaMapMarkerAlt className="text-black/40 text-4xl mx-auto mb-4" />
            <h2 className="text-2xl md:text-4xl font-display font-bold tracking-widest uppercase text-black mb-3">
              Serving Lahore, Islamabad, Karachi & Beyond
            </h2>
            <p className="text-black/60 font-light text-base mb-8 max-w-2xl mx-auto">
              From DHA Lahore to Bahria Islamabad — our teams are deployed across Pakistan's most prestigious developments. Wherever your project is, Elite Engineers delivers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="px-10 py-4 bg-black text-white text-xs tracking-widest uppercase hover:bg-gray-900 transition-colors font-semibold">
                DISCUSS YOUR PROJECT
              </Link>
              <a href="tel:+923025719521" className="flex items-center justify-center gap-2 px-10 py-4 border-2 border-black text-black text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors font-semibold">
                <FaPhoneAlt className="text-[10px]" /> +92 302-571-9521
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── 16. FINAL PARALLAX CTA ────────────────────────────────────────── */}
      <StickyImageSection imageSrc="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center px-4"
        >
          <p className="text-amber-400 text-xs tracking-[0.4em] uppercase mb-4">Take the First Step</p>
          <h2 className="text-white text-4xl md:text-6xl lg:text-7xl font-display font-light tracking-widest uppercase mb-4">
            Ready to Build
          </h2>
          <h2 className="text-amber-400 text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-widest uppercase mb-10">
            Something Iconic?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="px-12 py-4 bg-amber-400 text-black text-xs tracking-widest uppercase hover:bg-white transition-colors duration-300 font-bold">
              GET A FREE QUOTE
            </Link>
            <Link to="/projects" className="px-12 py-4 border border-white/60 text-white text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm">
              VIEW OUR WORK
            </Link>
          </div>
        </motion.div>
      </StickyImageSection>

    </div>
  );
};

export default Home;
