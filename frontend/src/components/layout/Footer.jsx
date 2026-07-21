import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white pt-20 pb-10 px-4 md:px-12 mt-auto border-t-[8px] border-accent">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & Bio */}
          <div>
            <div className="mb-6 flex flex-col items-start">
              <div className="w-8 h-8 border-[1.5px] border-accent flex items-center justify-center mb-2 transform rotate-45">
                <div className="w-3 h-3 bg-accent transform -rotate-45"></div>
              </div>
              <span className="font-display text-xl tracking-[0.2em] font-light text-white">ELITE ENGINEERS</span>
            </div>
            <p className="text-gray-400 font-light text-sm leading-relaxed mb-6">
              Transforming visions into reality through cutting-edge architectural design and robust structural engineering. Building tomorrow's landmarks, today.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:bg-accent hover:border-accent hover:text-white transition-all duration-300">
                <FaFacebookF />
              </a>
              <a href="#" className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:bg-accent hover:border-accent hover:text-white transition-all duration-300">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:bg-accent hover:border-accent hover:text-white transition-all duration-300">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-display tracking-widest uppercase mb-6">Explore</h4>
            <ul className="space-y-3 text-sm text-gray-400 font-light">
              <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/projects" className="hover:text-accent transition-colors">Our Portfolio</Link></li>
              <li><Link to="/services" className="hover:text-accent transition-colors">Services & Pricing</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-white font-display tracking-widest uppercase mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-accent mt-1 flex-shrink-0" />
                <span>Phase 5, DHA<br/>Lahore, Pakistan</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-accent flex-shrink-0" />
                <span>+92 372-234-9343</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-accent flex-shrink-0" />
                <span>info@elite-eng.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-white font-display tracking-widest uppercase mb-6">Newsletter</h4>
            <p className="text-gray-400 font-light text-sm leading-relaxed mb-4">
              Subscribe to get the latest updates on our mega projects and engineering insights.
            </p>
            <form className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-gray-800 border-none text-white px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <button 
                type="button" 
                className="w-full bg-accent text-white px-4 py-3 text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Sub Footer */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 tracking-wider">
            © {new Date().getFullYear()} ELITE ENGINEERS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 text-xs text-gray-500 tracking-wider">
            <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-white transition-colors">TERMS OF SERVICE</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
