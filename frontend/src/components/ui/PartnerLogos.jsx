import { motion } from 'framer-motion';

const partners = [
  { name: 'Bahria Town', category: 'Real Estate Developer' },
  { name: 'DHA Lahore', category: 'Housing Authority' },
  { name: 'Emaar Pakistan', category: 'International Developer' },
  { name: 'NESPAK', category: 'Engineering Consultancy' },
  { name: 'Packages Mall', category: 'Commercial Development' },
  { name: 'Arfa Tech Park', category: 'Technology Campus' },
  { name: 'FFC Corporation', category: 'Industrial Client' },
  { name: 'Sapphire Group', category: 'Fashion & Real Estate' },
];

const PartnerLogos = () => {
  return (
    <div className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase">
            Trusted by Pakistan's Leading Developers & Organizations
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-100">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="bg-white group flex flex-col items-center justify-center text-center p-8 md:p-10 hover:bg-gray-50 transition-colors duration-300 cursor-default"
            >
              {/* Stylized logo placeholder */}
              <div className="w-12 h-12 border border-gray-200 group-hover:border-amber-400 flex items-center justify-center mb-4 transition-colors duration-300 transform rotate-45">
                <div className="w-4 h-4 bg-gray-300 group-hover:bg-amber-400 transition-colors duration-300 transform -rotate-45" />
              </div>
              <h4 className="font-display text-sm font-bold tracking-wider text-gray-800 uppercase">
                {partner.name}
              </h4>
              <p className="text-gray-400 text-[10px] tracking-widest uppercase mt-1">
                {partner.category}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerLogos;
