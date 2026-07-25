import { motion } from 'framer-motion';

// Import images
import logoBahria from '../../assets/bahria-town.png';
import logoDha from '../../assets/dha.png';
import logoEmaar from '../../assets/emaar.png';
import logoNespak from '../../assets/nespek.png';
import logoPackages from '../../assets/pakage-mall.jpg';
import logoArfa from '../../assets/arfa.png';
import logoFfc from '../../assets/FFC.PK_BIG.png';
import logoSapphire from '../../assets/SapphireGroup.png';

const partners = [
  { name: 'Bahria Town', category: 'Real Estate Developer', logo: logoBahria },
  { name: 'DHA Lahore', category: 'Housing Authority', logo: logoDha },
  { name: 'Emaar Pakistan', category: 'International Developer', logo: logoEmaar },
  { name: 'NESPAK', category: 'Engineering Consultancy', logo: logoNespak },
  { name: 'Packages Mall', category: 'Commercial Development', logo: logoPackages },
  { name: 'Arfa Tech Park', category: 'Technology Campus', logo: logoArfa },
  { name: 'FFC Corporation', category: 'Industrial Client', logo: logoFfc },
  { name: 'Sapphire Group', category: 'Fashion & Real Estate', logo: logoSapphire },
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
              <div className="h-16 flex items-center justify-center mb-4">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-h-full max-w-[120px] object-contain filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300" 
                />
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
