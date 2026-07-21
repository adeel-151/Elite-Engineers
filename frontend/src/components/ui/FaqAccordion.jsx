import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const faqs = [
  {
    question: "How long does a typical commercial project take?",
    answer: "Project timelines vary greatly depending on scope, scale, and local regulations. A mid-sized commercial building typically takes 12 to 18 months from ground-breaking to handover, while interior fit-outs can take 3 to 6 months."
  },
  {
    question: "Do you provide architectural design or just construction?",
    answer: "We provide comprehensive Turnkey solutions. Our in-house team handles everything from initial architectural conceptualization and 3D rendering to structural engineering and final construction execution."
  },
  {
    question: "How do you ensure the quality of materials used?",
    answer: "We procure materials exclusively from certified, industry-leading vendors. Our on-site quality assurance team tests all raw materials (concrete, steel, fixtures) to ensure they meet international ISO standards before use."
  },
  {
    question: "Are your buildings environmentally sustainable?",
    answer: "Yes. We actively design for LEED certification. This includes integrating solar ready roofs, advanced HVAC for energy efficiency, and sustainable locally-sourced materials wherever possible."
  },
  {
    question: "Can you help with getting the necessary approvals from authorities?",
    answer: "Absolutely. Navigating bureaucracy is part of our service. We handle all NOCs, DHA approvals, and municipal permits required to start and complete your project legally and safely."
  }
];

const FaqAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-16">
      <div className="text-center mb-12">
        <h2 className="text-sm tracking-widest text-accent uppercase mb-2 font-semibold">Got Questions?</h2>
        <h3 className="text-3xl md:text-4xl font-display uppercase tracking-widest text-primary">Frequently Asked Questions</h3>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 bg-white rounded-lg overflow-hidden shadow-sm">
            <button
              onClick={() => toggleFaq(index)}
              className="w-full flex justify-between items-center p-6 text-left focus:outline-none hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-primary font-display pr-4">{faq.question}</span>
              <motion.div
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-accent"
              >
                <FaChevronDown />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-6 pt-0 text-gray-600 font-light border-t border-gray-100">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqAccordion;
