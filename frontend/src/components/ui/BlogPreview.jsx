import { motion } from 'framer-motion';
import { FaArrowRight, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const articles = [
  {
    id: 1,
    category: 'Construction Trends',
    date: 'June 15, 2025',
    title: 'Top 5 Construction Trends Shaping Pakistan\'s Skyline in 2025',
    excerpt: 'From smart buildings and prefabricated structures to green rooftops and BIM-integrated workflows — we explore the technologies revolutionizing construction in Pakistan\'s fastest-growing cities.',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop',
    readTime: '5 min read',
  },
  {
    id: 2,
    category: 'DHA & LDA Compliance',
    date: 'May 28, 2025',
    title: 'The Complete Guide to DHA Lahore Building Approval in 2025',
    excerpt: 'Navigating DHA approvals can be complex. This comprehensive guide covers every step — from site plan submission and NOC requirements to construction start certificates and completion procedures.',
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600&auto=format&fit=crop',
    readTime: '8 min read',
  },
  {
    id: 3,
    category: 'Sustainable Design',
    date: 'May 10, 2025',
    title: 'Sustainable Architecture in Pakistan: Building Greener, Smarter Futures',
    excerpt: 'As energy costs rise and environmental awareness grows, LEED-aligned architecture is gaining momentum in Pakistan. Here\'s how Elite Engineers is leading the charge toward net-zero buildings.',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop',
    readTime: '6 min read',
  },
];

const BlogPreview = () => {
  return (
    <div className="py-28 bg-gray-50">
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
              className="group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 cursor-pointer"
            >
              {/* Image */}
              <div className="h-52 overflow-hidden relative">
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
              <div className="p-7">
                <div className="flex items-center gap-3 text-gray-400 text-xs mb-4">
                  <FaCalendarAlt className="text-amber-400" />
                  <span>{article.date}</span>
                  <span className="text-gray-300">·</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-display text-lg font-semibold text-gray-900 leading-snug mb-3 group-hover:text-amber-500 transition-colors duration-300">
                  {article.title}
                </h3>
                <p className="text-gray-500 font-light text-sm leading-relaxed line-clamp-3 mb-6">
                  {article.excerpt}
                </p>

                <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-amber-500 font-semibold group-hover:gap-3 transition-all duration-300">
                  <span>Read More</span>
                  <FaArrowRight className="text-[10px]" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPreview;
