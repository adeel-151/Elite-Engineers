import { motion } from 'framer-motion';
import { FaSearch, FaPencilRuler, FaFileSignature, FaHardHat, FaKey } from 'react-icons/fa';

const steps = [
  {
    icon: FaSearch,
    step: '01',
    title: 'Discovery & Consultation',
    desc: 'We begin with a deep-dive consultation to understand your vision, budget, site constraints, and timeline. Our team conducts a thorough feasibility analysis to map the clearest path forward.',
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop',
  },
  {
    icon: FaPencilRuler,
    step: '02',
    title: 'Design & Engineering',
    desc: 'Our architects and structural engineers collaborate on BIM-integrated 3D models, structural calculations, MEP coordination, and material specifications — all aligned with local codes and regulations.',
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop',
  },
  {
    icon: FaFileSignature,
    step: '03',
    title: 'Approvals & Permitting',
    desc: 'We manage the entire regulatory process — LDA, DHA, and CDA approvals, environmental clearances, and building permits — so you can focus on your business while we handle the bureaucracy.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
  },
  {
    icon: FaHardHat,
    step: '04',
    title: 'Precision Construction',
    desc: 'Our certified construction teams execute every phase with meticulous quality control — from foundation to rooftop. Weekly progress reports and on-site inspections ensure we stay on track.',
    img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop',
  },
  {
    icon: FaKey,
    step: '05',
    title: 'Handover & Warranty',
    desc: 'Final inspection, snag-list resolution, full documentation handover — and a comprehensive post-completion warranty. Our relationship with you doesnt end at handover; it continues for years.',
    img: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=800&auto=format&fit=crop',
  },
];

const ProcessTimeline = () => {
  return (
    <div className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-3">Our Approach</p>
          <h2 className="text-3xl md:text-4xl font-display tracking-widest uppercase text-gray-900">
            How We Work
          </h2>
          <div className="w-16 h-[1px] bg-amber-500 mx-auto mt-6" />
          <p className="text-gray-500 font-light mt-6 max-w-xl mx-auto text-sm leading-relaxed">
            A proven 5-step process refined over 15 years — from initial concept to final key handover.
          </p>
        </motion.div>

        {/* Timeline Steps */}
        <div className="space-y-0">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            const Icon = step.icon;

            return (
              <div key={step.step} className="relative">
                {/* Vertical connecting line (not on last) */}
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-[1px] h-12 bg-gradient-to-b from-amber-400/60 to-transparent z-10 hidden md:block" />
                )}

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className={`grid grid-cols-1 md:grid-cols-2 gap-0 items-center mb-12`}
                >
                  {/* Image Block */}
                  <div className={`${isEven ? 'md:order-1' : 'md:order-2'} h-[320px] md:h-[380px] overflow-hidden relative group`}>
                    <img
                      src={step.img}
                      alt={step.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    {/* Step number overlay */}
                    <div className="absolute top-6 left-6 text-7xl font-display font-bold text-white/10 leading-none select-none">
                      {step.step}
                    </div>
                  </div>

                  {/* Content Block */}
                  <div className={`${isEven ? 'md:order-2' : 'md:order-1'} bg-gray-50 h-[320px] md:h-[380px] flex flex-col justify-center px-10 md:px-16 relative`}>
                    {/* Center connector dot */}
                    <div className="hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-400 border-4 border-white shadow-lg z-20"
                      style={{ [isEven ? 'left' : 'right']: '-8px' }}
                    />

                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-amber-400/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="text-amber-500 text-xl" />
                      </div>
                      <span className="text-xs tracking-[0.3em] text-amber-500 uppercase font-semibold">Step {step.step}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-display uppercase tracking-wide text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 font-light text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProcessTimeline;
