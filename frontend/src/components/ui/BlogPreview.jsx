import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaCalendarAlt, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import img6 from '../../assets/img6.jpg';
import img7 from '../../assets/img7.jpg';
import img8 from '../../assets/img8.jpg';

const articles = [
  {
    id: 1,
    category: 'Construction Trends',
    date: 'June 15, 2025',
    title: 'Top 5 Construction Trends Shaping Pakistan\'s Skyline in 2025',
    excerpt: 'From smart buildings and prefabricated structures to green rooftops and BIM-integrated workflows — we explore the technologies revolutionizing construction in Pakistan\'s fastest-growing cities.',
    fullContent: 'The construction industry in Pakistan is undergoing a massive transformation. Rapid urbanization and technological advancements are forcing developers to adopt modern methods.\n\n1. Smart Building Technologies\nModern buildings now integrate IoT devices for automated lighting, HVAC control, and advanced security, reducing energy consumption significantly.\n\n2. Prefabricated and Modular Construction\nTo combat rising labor costs and delays, developers are turning to off-site manufacturing. This drastically reduces on-site construction time.\n\n3. Green and Sustainable Architecture\nWith growing environmental concerns, LEED-certified buildings featuring solar panels, green roofs, and rainwater harvesting are becoming the new standard.\n\n4. Building Information Modeling (BIM)\nBIM allows architects, engineers, and contractors to collaborate on a single 3D model, preventing costly clashes during the construction phase.\n\n5. Advanced Safety Protocols\nThe use of drones for site inspection and wearable tech for workers is minimizing accidents and improving overall site efficiency.\n\nAt Elite Engineers, we are proud to be at the forefront of these innovations, integrating them into our latest commercial and residential projects across the country.',
    img: img6,
    readTime: '5 min read',
  },
  {
    id: 2,
    category: 'DHA & LDA Compliance',
    date: 'May 28, 2025',
    title: 'The Complete Guide to DHA Lahore Building Approval in 2025',
    excerpt: 'Navigating DHA approvals can be complex. This comprehensive guide covers every step — from site plan submission and NOC requirements to construction start certificates and completion procedures.',
    fullContent: 'Securing building approvals in DHA Lahore requires strict adherence to their constantly updating bylaws. Knowing the exact process can save you months of delays.\n\nPhase 1: Soil Testing & Initial Survey\nBefore drawing a single line, a certified soil test is mandatory to ensure structural viability.\n\nPhase 2: Architectural & Structural Drawings\nDHA requires detailed submissions including floor plans, elevations, plumbing, electrification, and structural drawings vetted by a registered structural engineer.\n\nPhase 3: The NOC Process\nYou must obtain No Objection Certificates from various departments, including water, electricity, and sometimes environmental agencies, depending on the project scale.\n\nPhase 4: Site Demarcation & Construction Start\nOnce approved, DHA surveyors will demarcate your plot. Only then can you officially break ground.\n\nPhase 5: Inspections & Completion Certificate\nDHA teams will inspect the site at key milestones (foundation, plinth, roof casting). Upon finishing, a final inspection grants the completion certificate, allowing utility connections.\n\nOur regulatory team at Elite Engineers handles this entire process turnkey, ensuring 100% compliance without the headache.',
    img: img7,
    readTime: '8 min read',
  },
  {
    id: 3,
    category: 'Sustainable Design',
    date: 'May 10, 2025',
    title: 'Sustainable Architecture in Pakistan: Building Greener, Smarter Futures',
    excerpt: 'As energy costs rise and environmental awareness grows, LEED-aligned architecture is gaining momentum in Pakistan. Here\'s how Elite Engineers is leading the charge toward net-zero buildings.',
    fullContent: 'Sustainability is no longer a buzzword; it is a critical necessity in Pakistan due to energy crises and climate change. \n\nPassive Cooling Techniques\nBy orienting buildings to maximize natural airflow and minimize direct solar heat gain, we drastically reduce the reliance on mechanical air conditioning.\n\nEnergy-Efficient Materials\nUsing double-glazed windows, insulated cavity walls, and high-SRI (Solar Reflectance Index) roofing materials helps maintain internal temperatures naturally.\n\nWater Conservation Systems\nIntegrating greywater recycling and rainwater harvesting systems can reduce a building\'s freshwater consumption by up to 40%.\n\nSolar Integration\nInstead of treating solar panels as an afterthought, modern sustainable architecture incorporates Building-Integrated Photovoltaics (BIPV) directly into the facade and roofing.\n\nElite Engineers is committed to pushing the boundaries of green architecture, proving that luxury and sustainability can seamlessly coexist.',
    img: img8,
    readTime: '6 min read',
  },
];

const BlogPreview = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const openModal = (article) => {
    setSelectedArticle(article);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedArticle(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="py-28 bg-gray-50 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-3">Knowledge Hub</p>
            <h2 className="text-3xl md:text-4xl font-display tracking-widest uppercase text-gray-900">
              Latest Insights
            </h2>
            <div className="w-12 h-[1px] bg-amber-500 mt-5" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 md:mt-0"
          >
            <Link
              to="/contact"
              className="text-xs tracking-widest uppercase text-gray-500 hover:text-amber-500 transition-colors border-b border-gray-300 hover:border-amber-500 pb-1"
            >
              Subscribe to Newsletter
            </Link>
          </motion.div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              onClick={() => openModal(article)}
              className="group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 cursor-pointer flex flex-col h-full"
            >
              {/* Image */}
              <div className="h-52 overflow-hidden relative shrink-0">
                <img
                  src={article.img}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                {/* Category pill */}
                <div className="absolute top-4 left-4">
                  <span className="bg-amber-400 text-black text-[10px] tracking-widest uppercase px-3 py-1 font-semibold">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-7 flex flex-col grow">
                <div className="flex items-center gap-3 text-gray-400 text-xs mb-4">
                  <FaCalendarAlt className="text-amber-400" />
                  <span>{article.date}</span>
                  <span className="text-gray-300">·</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-display text-lg font-semibold text-gray-900 leading-snug mb-3 group-hover:text-amber-500 transition-colors duration-300">
                  {article.title}
                </h3>
                <p className="text-gray-500 font-light text-sm leading-relaxed line-clamp-3 mb-6 grow">
                  {article.excerpt}
                </p>

                <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-amber-500 font-semibold group-hover:gap-3 transition-all duration-300 mt-auto">
                  <span>Read More</span>
                  <FaArrowRight className="text-[10px]" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
            >
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-amber-500 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md"
              >
                <FaTimes />
              </button>

              <div className="h-64 md:h-80 relative overflow-hidden">
                <img src={selectedArticle.img} alt={selectedArticle.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <span className="bg-amber-400 text-black text-[10px] tracking-widest uppercase px-3 py-1 font-semibold mb-4 inline-block">
                    {selectedArticle.category}
                  </span>
                  <h2 className="text-white text-2xl md:text-3xl font-display font-semibold leading-tight">
                    {selectedArticle.title}
                  </h2>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <div className="flex items-center gap-3 text-gray-500 text-xs mb-8 pb-8 border-b border-gray-100">
                  <FaCalendarAlt className="text-amber-500" />
                  <span>{selectedArticle.date}</span>
                  <span className="text-gray-300">·</span>
                  <span>{selectedArticle.readTime}</span>
                </div>

                <div className="prose prose-sm md:prose-base prose-gray max-w-none font-light leading-loose whitespace-pre-wrap">
                  {selectedArticle.fullContent}
                </div>
                
                <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Share this article</p>
                  <button onClick={closeModal} className="px-8 py-3 bg-black text-white text-xs tracking-widest uppercase hover:bg-amber-500 hover:text-black transition-colors font-semibold">
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogPreview;
