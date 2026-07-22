import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks = [
    { name: 'PORTFOLIO', path: '/projects' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'SERVICES', path: '/services' },
    { name: 'CONTACT', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  // Determine if the navbar needs to be solid (scrolled, menu open, or on specific pages without hero image)
  const needsSolidBg = ['/admin', '/clients'].includes(location.pathname);
  const isSolid = isScrolled || isOpen || needsSolidBg;
  
  const textColorClass = isSolid ? 'text-primary' : 'text-white';
  const bgClass = isScrolled || needsSolidBg
    ? 'bg-white/90 backdrop-blur-lg border-b border-gray-200/50 shadow-sm' 
    : 'bg-transparent border-transparent';

  return (
    <>
      <nav className={`w-full ${bgClass} ${textColorClass} py-4 px-6 md:px-12 flex justify-between md:flex-col md:items-center z-50 fixed top-0 transition-all duration-300`}>
        
        {/* Logo */}
        <Link to="/" onClick={() => setIsOpen(false)} className="flex flex-row md:flex-col items-center gap-3 md:gap-0 md:mb-5 z-50">
          <div className={`w-8 h-8 md:w-10 md:h-10 border-[1.5px] ${isSolid ? 'border-accent' : 'border-white'} flex items-center justify-center md:mb-2 transform rotate-45 transition-colors duration-300`}>
            <div className={`w-3 h-3 md:w-4 md:h-4 ${isSolid ? 'bg-accent' : 'bg-white'} transform -rotate-45 transition-colors duration-300`}></div>
          </div>
          <span className="font-display text-lg md:text-3xl tracking-[0.2em] font-bold mt-1 md:mt-0 transition-colors duration-300">ELITE ENGINEERS</span>
        </Link>

        {/* Hamburger Icon (Mobile) */}
        <button 
          className="md:hidden text-2xl focus:outline-none z-50 transition-colors duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Links */}
        <div className={`hidden md:flex flex-wrap justify-center gap-12 text-sm md:text-base font-semibold tracking-[0.15em] uppercase transition-colors duration-300 ${isSolid ? 'text-gray-700' : 'text-white/90'}`}>
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`hover:text-accent transition-colors duration-300 ${isActive(link.path) ? 'text-accent border-b-2 border-accent pb-1' : 'pb-1'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-2xl z-40 flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {navLinks.map((link) => (
               <Link 
                 key={link.path} 
                 to={link.path}
                 onClick={() => setIsOpen(false)}
                 className={`text-xl font-display tracking-[0.2em] uppercase transition-colors duration-300 ${isActive(link.path) ? 'text-accent' : 'text-primary'}`}
               >
                 {link.name}
               </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
