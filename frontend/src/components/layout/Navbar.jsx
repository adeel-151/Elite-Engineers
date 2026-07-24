import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../../assets/logo.png';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu and dropdown on route change
  useEffect(() => { setIsOpen(false); setOpenDropdown(null); }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'PORTFOLIO', path: '/projects', children: [
      { name: 'All Projects', path: '/projects' },
      { name: 'Projects Gallery', path: '/gallery' },
    ]},
    { name: 'ABOUT US', path: '/about' },
    { name: 'SERVICES', path: '/services' },
    { name: 'CONTACT', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path || (path === '/projects' && location.pathname === '/gallery');

  const needsSolidBg = ['/admin', '/clients'].includes(location.pathname);
  const isSolid = isScrolled || isOpen || needsSolidBg;

  return (
    <>
      {/* ── Main Navbar ─────────────────────────────────────────────────── */}
      <nav
        className={`
          w-full fixed top-0 left-0 right-0 z-50
          flex items-center justify-between
          px-6 md:px-12
          transition-all duration-300 ease-in-out
          ${isSolid
            ? 'bg-white/95 backdrop-blur-lg border-b border-gray-200/60 shadow-sm py-3 md:py-4'
            : 'bg-transparent border-transparent py-5 md:py-6'
          }
        `}
      >
        {/* ── Logo ─────────────────────────────────────────────────────── */}
        <Link
          to="/"
          className="flex items-center flex-shrink-0 z-50"
          onClick={() => setIsOpen(false)}
        >
          <img
            src={logoImg}
            alt="Elite Engineers Logo"
            className={`object-contain transition-all duration-300 ${
              isSolid
                ? 'h-12 md:h-14 brightness-100'
                : 'h-14 md:h-16 brightness-0 invert'
            }`}
          />
        </Link>

        {/* ── Desktop Nav Links ─────────────────────────────────────────── */}
        <div
          ref={dropdownRef}
          className={`
            hidden md:flex items-center gap-8 lg:gap-10
            text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-300
            ${isSolid ? 'text-gray-700' : 'text-white/90'}
          `}
        >
          {navLinks.map((link) =>
            link.children ? (
              /* Dropdown link */
              <div
                key={link.path}
                className="relative group"
              >
                <button
                  className={`
                    flex items-center gap-1 relative pb-0.5 hover:text-amber-500 transition-colors duration-300
                    after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-amber-500
                    after:transition-all after:duration-300
                    ${isActive(link.path) ? 'text-amber-500 after:w-full' : 'after:w-0 hover:after:w-full'}
                  `}
                >
                  {link.name}
                  <FaChevronDown className="text-[8px] transition-transform duration-200 group-hover:rotate-180" />
                </button>

                {/* Dropdown menu — shows on group hover via CSS, no JS state needed */}
                <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-gray-100 shadow-xl z-50 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                  {link.children.map((child) => (
                    <Link
                      key={child.path}
                      to={child.path}
                      className={`block px-5 py-3 text-[11px] tracking-widest uppercase transition-colors duration-200 border-l-2
                        ${location.pathname === child.path
                          ? 'text-amber-500 border-amber-500 bg-amber-50'
                          : 'text-gray-600 border-transparent hover:text-amber-500 hover:border-amber-500 hover:bg-amber-50'
                        }`}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              /* Regular link */
              <Link
                key={link.path}
                to={link.path}
                className={`
                  relative pb-0.5 hover:text-amber-500 transition-colors duration-300
                  after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-amber-500
                  after:transition-all after:duration-300
                  ${isActive(link.path) ? 'text-amber-500 after:w-full' : 'after:w-0 hover:after:w-full'}
                `}
              >
                {link.name}
              </Link>
            )
          )}

          {/* Get a Quote CTA button */}
          <Link
            to="/contact"
            className={`
              ml-2 px-5 py-2 text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-300
              ${isSolid
                ? 'bg-amber-500 text-black hover:bg-gray-900 hover:text-white'
                : 'border border-white/60 text-white hover:bg-white hover:text-black backdrop-blur-sm'
              }
            `}
          >
            Get a Quote
          </Link>
        </div>

        {/* ── Mobile Hamburger ────────────────────────────────────────── */}
        <button
          className={`md:hidden text-xl z-50 focus:outline-none transition-colors duration-300 ${isSolid ? 'text-gray-900' : 'text-white'}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <AnimatePresence mode="wait">
            {isOpen
              ? <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><FaTimes /></motion.span>
              : <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><FaBars /></motion.span>
            }
          </AnimatePresence>
        </button>
      </nav>

      {/* ── Mobile Full-Screen Menu ──────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 bg-[#080d1a] z-40 flex flex-col items-center justify-center gap-1 md:hidden overflow-y-auto"
          >
            {/* Logo in mobile overlay */}
            <div className="absolute top-4 left-6">
              <img
                src={logoImg}
                alt="Elite Engineers Logo"
                className="h-12 object-contain brightness-0 invert"
              />
            </div>

            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                className="text-center"
              >
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block text-3xl font-display tracking-[0.15em] uppercase py-3 px-8 text-center transition-colors duration-300
                    ${isActive(link.path) ? 'text-amber-400' : 'text-white/80 hover:text-amber-400'}
                  `}
                >
                  {link.name}
                </Link>
                {/* Sub-links for PORTFOLIO */}
                {link.children && (
                  <div className="flex flex-col items-center gap-1 mt-1 mb-2">
                    {link.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        onClick={() => setIsOpen(false)}
                        className={`text-sm tracking-[0.2em] uppercase px-4 py-1 transition-colors duration-200
                          ${location.pathname === child.path ? 'text-amber-400' : 'text-white/40 hover:text-amber-300'}
                        `}
                      >
                        — {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}

            {/* Mobile CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-8"
            >
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="px-10 py-4 bg-amber-400 text-black text-sm tracking-widest uppercase font-bold hover:bg-white transition-colors duration-300"
              >
                GET A QUOTE
              </Link>
            </motion.div>

            {/* Bottom contact hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-10 text-gray-600 text-xs tracking-widest"
            >
              +92 302-571-9521 · elite.pk@outlook.com
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
