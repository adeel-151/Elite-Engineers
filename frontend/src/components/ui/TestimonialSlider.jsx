import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'Ahmad Raza Khan',
    role: 'CEO, ARK Developers',
    company: 'ARK Developers Pvt. Ltd.',
    rating: 5,
    text: "Elite Engineers transformed our vision into a landmark. Their structural precision and architectural creativity surpassed every expectation. The Gulberg commercial tower they designed for us is now an icon in the city.",
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=200&auto=format&fit=crop',
    project: 'Gulberg Commercial Tower',
  },
  {
    id: 2,
    name: 'Sana Mirza',
    role: 'Director, Sapphire Living',
    company: 'Sapphire Residences',
    rating: 5,
    text: "From the first blueprint to the final handover, the team was professional, transparent, and incredibly skilled. We handed them a blank lot and received a luxury residence that clients love. Truly world-class.",
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    project: 'Sapphire Luxury Residence, DHA Phase 6',
  },
  {
    id: 3,
    name: 'Bilal Mahmood',
    role: 'Founder, TechNest Pakistan',
    company: 'TechNest Pakistan',
    rating: 5,
    text: "We needed a cutting-edge tech campus with open, collaborative spaces. Elite Engineers understood our culture and delivered a space that actually makes our people more productive. On-time, on-budget — flawless.",
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop',
    project: 'TechNest Campus, Arfa Software Technology Park',
  },
  {
    id: 4,
    name: 'Dr. Fatima Qureshi',
    role: 'Medical Director, QureCare Hospitals',
    company: 'QureCare Group',
    rating: 5,
    text: "Designing a hospital is a life-or-death matter — every detail must be right. Elite Engineers navigated complex MEP requirements, infection-control standards, and patient flow with exceptional expertise. I am thoroughly impressed.",
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
    project: 'QureCare Hospital, Faisalabad',
  },
];

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  };

  return (
    <div className="relative py-28 bg-[#0a0f1e] overflow-hidden">
      {/* Background blueprint pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(245,158,11,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,158,11,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-3">What Clients Say</p>
          <h2 className="text-white text-3xl md:text-4xl font-display tracking-widest uppercase">
            Client Testimonials
          </h2>
          <div className="w-16 h-[1px] bg-amber-400 mx-auto mt-6" />
        </div>

        {/* Slider */}
        <div className="relative min-h-[320px] flex items-center">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="w-full"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Left: Avatar + info */}
                  <div className="flex-shrink-0 flex flex-col items-center text-center md:w-48">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-amber-400 mb-4">
                      <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                    <h4 className="text-white font-semibold text-sm tracking-wide">{t.name}</h4>
                    <p className="text-amber-400 text-xs tracking-wider mt-1">{t.role}</p>
                    <p className="text-gray-500 text-xs mt-1">{t.company}</p>
                    <div className="flex gap-1 mt-3">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <FaStar key={i} className="text-amber-400 text-xs" />
                      ))}
                    </div>
                  </div>

                  {/* Right: Quote */}
                  <div className="flex-1">
                    <FaQuoteLeft className="text-amber-400/30 text-5xl mb-4" />
                    <p className="text-gray-300 font-light leading-relaxed text-base md:text-lg italic">
                      "{t.text}"
                    </p>
                    <p className="text-gray-600 text-xs tracking-widest uppercase mt-6">
                      Project: <span className="text-amber-400/70">{t.project}</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={prev}
            className="w-10 h-10 border border-white/20 text-white/60 hover:border-amber-400 hover:text-amber-400 flex items-center justify-center transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft size={12} />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`h-[3px] transition-all duration-300 ${i === current ? 'w-8 bg-amber-400' : 'w-3 bg-white/20'}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 border border-white/20 text-white/60 hover:border-amber-400 hover:text-amber-400 flex items-center justify-center transition-all duration-300"
            aria-label="Next testimonial"
          >
            <FaChevronRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
