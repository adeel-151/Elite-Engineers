import { useState, useEffect, useRef, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown, FaSun, FaMoon } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../../context/ThemeContext';

// ── Inline SVG Logo ──────────────────────────────────────────────────────────
// Gold shapes (#C79967) stay fixed. Black shapes use `currentColor` so they
// can be flipped white (dark bg) or black (solid navbar) via Tailwind classes.
const EliteLogo = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 2550 3300"
    className={className}
    aria-label="Elite Engineers Logo"
    role="img"
  >
    {/* Gold shapes — always #C79967 */}
    <g transform="translate(0,3300) scale(0.1,-0.1)" fill="#C79967" stroke="none">
      <path d="M13340 21860 l0 -710 1340 0 1340 0 0 710 0 710 -1340 0 -1340 0 0 -710z"/>
      <path d="M13063 22543 l-33 -17 0 -3508 0 -3508 35 0 35 0 0 3525 0 3525 -2 -1 -3 0 -32 -16z"/>
      <path d="M13340 18920 l0 -710 1340 0 1340 0 0 710 0 710 -1340 0 -1340 0 0 -710z"/>
      <path d="M13340 15840 l0 -710 1340 0 1340 0 0 710 0 710 -1340 0 -1340 0 0 -710z m1270 285 l0 -195 -200 0 -200 0 0 195 0 195 200 0 200 0 0 -195z m550 0 l0 -195 -200 0 -200 0 0 195 0 195 200 0 200 0 0 -195z m-550 -530 l0 -195 -200 0 -200 0 0 195 0 195 200 0 200 0 0 -195z m548 -2 l2 -193 -200 0 -200 0 0 195 0 195 198 -2 197 -3 3 -192z"/>
      <path d="M12396 14110 l-29 -9 -24 -23 -25 -23 -14 -27 -14 -27 0 -823 0 -823 18 -35 17 -35 34 -22 34 -23 5106 0 5106 0 33 20 32 20 20 32 20 33 0 828 0 829 -16 34 -16 34 -37 22 -36 23 -5090 2 -5090 1 -29 -8z m3469 -424 l50 -16 12 -8 12 -8 -21 -69 -21 -70 -2 -2 -1 -3 -55 21 -54 21 -86 5 -86 6 -54 -13 -54 -13 -46 -23 -45 -22 -38 -42 -38 -43 -18 -41 -19 -41 -12 -69 -12 -69 12 -71 12 -71 23 -51 23 -51 38 -38 38 -38 56 -26 56 -26 110 0 110 0 18 7 17 7 0 131 0 130 -100 0 -100 0 0 70 0 70 185 0 185 0 0 -259 0 -258 -62 -17 -63 -16 -54 -10 -54 -10 -96 0 -96 0 -64 15 -64 16 -58 31 -58 31 -50 52 -49 52 -30 59 -29 59 -14 55 -14 55 1 105 1 105 22 64 22 64 33 51 33 51 50 47 50 46 62 32 62 31 57 14 57 15 130 -4 130 -4 50 -16z m5170 -9 l60 -28 23 -22 24 -22 26 -44 25 -43 5 -73 4 -72 -12 -39 -12 -39 -24 -38 -24 -37 -40 -29 -39 -28 25 -24 26 -24 23 -45 23 -45 30 -126 31 -126 19 -51 20 -52 -88 0 -88 0 -11 14 -11 13 -36 144 -36 144 -20 36 -20 36 -31 18 -31 19 -78 4 -78 5 0 -217 0 -216 -85 0 -85 0 0 510 0 509 38 6 37 6 15 4 15 4 160 -2 160 -2 60 -28z m1148 4 l58 -23 -7 -21 -7 -22 -17 -50 -17 -50 -14 2 -14 2 -55 20 -55 20 -60 0 -60 1 -41 -19 -41 -18 -17 -38 -18 -37 6 -33 6 -33 28 -27 27 -28 65 -29 65 -30 61 -29 61 -29 45 -39 45 -40 23 -52 22 -52 -4 -76 -4 -76 -19 -40 -20 -40 -41 -41 -41 -41 -59 -23 -59 -23 -95 -5 -95 -4 -68 16 -67 16 -41 20 -40 21 7 22 7 22 17 50 18 50 8 -2 9 -2 65 -28 65 -28 90 0 90 0 36 23 37 22 17 42 16 42 -6 33 -6 33 -29 33 -28 33 -54 23 -53 24 -82 38 -81 39 -45 50 -44 49 -13 45 -12 45 4 58 4 58 18 36 17 37 37 37 37 37 30 16 30 15 40 14 40 13 110 -4 110 -3 58 -22z m-8803 -56 l0 -75 -205 0 -205 0 0 -135 0 -135 195 0 196 0 -3 -72 -3 -73 -192 -3 -193 -2 0 -155 0 -155 215 0 215 0 0 -75 0 -75 -300 0 -300 0 0 515 0 515 290 0 290 0 0 -75z m826 -187 l168 -263 58 -100 58 -100 0 363 0 362 80 0 80 0 0 -515 0 -515 -82 0 -83 0 -198 314 -198 315 -32 58 -32 58 -3 -372 -2 -373 -80 0 -80 0 0 515 0 515 89 0 89 0 168 -262z m2414 -253 l0 -515 -85 0 -85 0 0 515 0 515 85 0 85 0 0 -515z m856 253 l168 -263 58 -100 58 -100 0 363 0 362 80 0 80 0 0 -515 0 -515 -82 0 -83 0 -198 314 -198 315 -32 58 -32 58 -3 -372 -2 -373 -80 0 -80 0 0 515 0 515 89 0 89 0 168 -262z m1544 187 l0 -75 -205 0 -205 0 0 -135 0 -135 195 0 196 0 -3 -72 -3 -73 -192 -3 -193 -2 0 -155 0 -155 215 0 215 0 0 -75 0 -75 -300 0 -300 0 0 515 0 515 290 0 290 0 0 -75z m1050 0 l0 -75 -205 0 -205 0 0 -135 0 -135 195 0 196 0 -3 -72 -3 -73 -192 -3 -193 -2 0 -155 0 -155 215 0 215 0 0 -75 0 -75 -300 0 -300 0 0 515 0 515 290 0 290 0 0 -75z"/>
      <path d="M20738 13564 l-18 -5 0 -161 0 -160 93 4 92 4 43 23 44 22 20 46 20 46 -5 45 -5 44 -19 26 -19 26 -37 19 -37 19 -77 3 -78 4 -17 -5z"/>
      <path d="M3060 11150 l0 -130 1765 0 1765 0 0 130 0 130 -1765 0 -1765 0 0 -130z"/>
      <path d="M19180 11150 l0 -130 1765 0 1765 0 0 130 0 130 -1765 0 -1765 0 0 -130z"/>
    </g>
    {/* Black/adaptive shapes — use currentColor so Tailwind text-* classes control them */}
    <g transform="translate(0,3300) scale(0.1,-0.1)" fill="currentColor" stroke="none">
      <path d="M8580 18850 l0 -3720 2260 0 2260 0 0 185 0 185 -2067 2 -2068 3 -3 2152 -2 2151 152 74 153 74 952 459 953 459 2 379 3 379 960 464 959 465 5 4 4 5 -2261 0 -2262 0 0 -3720z"/>
      <path d="M10241 20047 l-913 -442 1 -8 1 -7 0 -1855 0 -1855 190 0 190 0 0 1743 0 1744 190 91 190 91 0 -1835 0 -1834 195 0 195 0 0 1926 0 1925 153 74 152 73 3 -1999 2 -1999 190 0 190 0 0 2305 0 2305 -7 -1 -8 -1 -914 -441z"/>
      <path d="M3050 13170 l0 -910 715 0 715 0 0 115 0 115 -535 0 -535 0 0 300 0 300 480 0 480 0 0 115 0 115 -480 0 -480 0 0 265 0 265 510 0 510 0 0 115 0 115 -690 0 -690 0 0 -910z"/>
      <path d="M5020 13170 l0 -910 710 0 710 0 0 120 0 120 -530 0 -530 0 0 790 0 790 -180 0 -180 0 0 -910z"/>
      <path d="M6930 13170 l0 -910 180 0 180 0 0 910 0 910 -180 0 -180 0 0 -910z"/>
      <path d="M7700 13965 l0 -115 375 0 375 0 0 -795 0 -795 180 0 180 0 2 793 3 792 378 3 377 2 0 115 0 115 -935 0 -935 0 0 -115z"/>
      <path d="M9970 13170 l0 -910 715 0 715 0 0 115 0 115 -535 0 -535 0 0 300 0 300 480 0 480 0 0 115 0 115 -480 0 -480 0 0 265 0 265 510 0 510 0 0 115 0 115 -690 0 -690 0 0 -910z"/>
      <path d="M15525 13695 l-60 -13 -45 -18 -45 -17 -53 -35 -52 -34 -40 -47 -40 -46 -26 -51 -25 -52 -14 -53 -15 -54 0 -95 0 -96 15 -59 16 -60 26 -55 27 -55 53 -53 53 -53 63 -30 64 -29 69 -15 69 -15 65 0 65 0 65 10 65 10 68 21 67 20 0 254 0 255 -185 0 -185 0 0 -70 0 -70 105 0 105 0 0 -130 0 -130 -27 -11 -28 -11 -110 4 -110 3 -57 28 -57 28 -40 46 -40 45 -22 57 -21 56 -5 80 -5 80 16 65 17 65 33 51 34 51 48 32 48 31 50 15 50 15 91 0 91 0 54 -15 55 -16 14 -2 15 -2 19 64 19 63 -13 9 -14 9 -39 11 -39 10 -56 10 -56 9 -65 -1 -65 -1 -60 -13z"/>
      <path d="M20680 13705 l-15 -4 -57 -6 -58 -6 0 -510 0 -509 85 0 85 0 0 216 0 216 84 -3 85 -4 28 -21 28 -21 17 -29 17 -29 34 -135 35 -135 11 -27 11 -28 90 0 90 0 -19 38 -19 38 -32 129 -31 130 -25 53 -24 54 -30 28 -31 28 20 7 19 6 45 48 45 49 16 53 16 53 0 36 0 36 -16 55 -16 54 -51 50 -52 50 -55 19 -55 18 -130 4 -130 3 -15 -4z m233 -146 l39 -10 36 -33 36 -33 4 -64 4 -64 -24 -35 -23 -35 -45 -22 -44 -23 -88 0 -88 0 0 158 0 159 7 6 6 7 71 0 71 0 38 -11z"/>
      <path d="M21878 13696 l-47 -14 -45 -26 -45 -26 -31 -37 -31 -38 -14 -49 -15 -50 0 -36 0 -36 17 -50 16 -49 48 -46 47 -46 78 -34 78 -34 60 -30 60 -30 23 -34 23 -34 0 -42 0 -42 -23 -34 -22 -34 -35 -18 -35 -18 -95 3 -95 4 -62 30 -63 30 -22 -69 -23 -69 20 -14 20 -15 70 -22 70 -22 105 1 105 1 60 23 60 23 52 53 52 53 17 57 16 58 -5 56 -5 56 -21 42 -21 41 -37 36 -38 37 -85 39 -85 40 -55 28 -55 27 -23 35 -24 34 5 43 5 43 18 20 19 21 30 16 30 15 71 0 70 -1 61 -24 60 -25 23 70 22 70 -14 8 -13 9 -50 16 -50 16 -90 4 -90 3 -47 -13z"/>
      <path d="M12800 13185 l0 -515 300 0 300 0 0 75 0 75 -215 0 -215 0 0 160 0 160 190 0 190 0 0 70 0 70 -190 0 -190 0 0 135 0 135 205 0 205 0 0 75 0 75 -290 0 -290 0 0 -515z"/>
      <path d="M13860 13185 l0 -515 80 0 80 0 0 377 0 378 75 -125 74 -125 159 -250 159 -250 82 -3 81 -3 0 516 0 515 -81 0 -80 0 3 -365 3 -364 -8 8 -8 8 -43 75 -42 75 -180 281 -179 282 -87 0 -88 0 0 -515z"/>
      <path d="M16450 13185 l0 -515 85 0 85 0 0 515 0 515 -85 0 -85 0 0 -515z"/>
      <path d="M17130 13185 l0 -515 80 0 80 0 0 377 0 377 69 -114 68 -115 165 -260 165 -260 82 -3 81 -3 0 516 0 515 -81 0 -80 0 3 -365 3 -364 -8 8 -8 8 -43 75 -42 75 -180 281 -179 282 -87 0 -88 0 0 -515z"/>
      <path d="M18440 13185 l0 -515 300 0 300 0 0 75 0 75 -215 0 -215 0 0 160 0 160 190 0 190 0 0 70 0 70 -190 0 -190 0 0 135 0 135 205 0 205 0 0 75 0 75 -290 0 -290 0 0 -515z"/>
      <path d="M19490 13185 l0 -515 300 0 300 0 0 75 0 75 -215 0 -215 0 0 160 0 160 190 0 190 0 0 70 0 70 -190 0 -190 0 0 135 0 135 205 0 205 0 0 75 0 75 -290 0 -290 0 0 -515z"/>
      <path d="M12533 11573 l-23 -4 0 -425 0 -424 149 0 149 0 65 20 65 20 41 41 41 42 17 56 16 56 -11 54 -11 53 -27 35 -26 35 -32 19 -31 19 -10 3 -9 3 43 39 42 38 15 28 14 28 0 61 0 61 -11 22 -11 22 -31 33 -31 32 -53 20 -54 20 -132 -1 -132 -2 -22 -4z m301 -106 l26 -17 15 -24 16 -24 1 -39 0 -40 -16 -31 -16 -32 -40 -20 -40 -20 -77 -3 -78 -2 -3 124 -3 125 6 14 5 14 89 -4 88 -4 27 -17z m6 -370 l44 -23 19 -32 19 -32 0 -44 0 -45 -18 -30 -17 -29 -41 -23 -40 -23 -91 0 -90 -1 -3 145 -3 144 6 14 5 15 83 -7 82 -7 45 -22z"/>
      <path d="M15483 11562 l-52 -19 -41 -28 -41 -28 -28 -36 -28 -36 -22 -42 -21 -42 -15 -58 -15 -57 0 -71 0 -71 15 -57 15 -57 24 -48 24 -47 54 -51 54 -51 59 -22 60 -23 96 4 96 4 66 32 66 33 40 46 41 46 24 51 24 51 11 53 11 53 0 58 0 58 -10 54 -10 54 -29 61 -29 62 -41 41 -40 40 -53 28 -53 27 -100 3 -100 3 -52 -18z m237 -102 l37 -19 32 -37 33 -37 19 -43 18 -44 9 -64 8 -65 -7 -66 -8 -66 -19 -42 -19 -43 -33 -38 -33 -37 -41 -21 -41 -22 -65 0 -65 0 -41 22 -41 21 -33 37 -33 38 -19 43 -19 42 -8 66 -7 65 7 65 8 66 19 42 19 43 33 38 33 37 31 16 31 16 30 8 30 8 49 -5 49 -5 37 -19z"/>
      <path d="M17543 11573 l-33 -4 0 -425 0 -424 155 0 154 0 53 11 53 11 62 29 61 29 50 55 51 55 21 58 22 57 11 73 10 74 -11 74 -12 75 -25 53 -25 54 -50 46 -50 47 -38 16 -37 16 -50 13 -50 14 -145 -2 -145 -1 -32 -4z m373 -117 l59 -27 23 -22 24 -22 24 -47 24 -48 8 -59 9 -60 -8 -66 -8 -66 -21 -47 -21 -47 -32 -33 -32 -34 -45 -23 -46 -23 -59 -11 -59 -11 -45 0 -46 0 -22 6 -23 6 0 329 0 328 28 4 27 5 91 -2 91 -3 59 -27z"/>
      <path d="M7220 11520 l0 -50 130 0 130 0 0 -370 0 -370 55 0 55 0 0 370 0 370 130 0 130 0 0 50 0 50 -315 0 -315 0 0 -50z"/>
      <path d="M8220 11150 l0 -420 55 0 55 0 0 195 0 195 205 0 205 0 0 -195 0 -195 55 0 55 0 0 420 0 420 -55 0 -55 0 -2 -172 -3 -173 -200 0 -200 0 -3 173 -2 172 -55 0 -55 0 0 -420z"/>
      <path d="M9320 11150 l0 -420 55 0 55 0 0 420 0 420 -55 0 -55 0 0 -420z"/>
      <path d="M9900 11150 l0 -420 55 0 55 0 0 338 0 337 51 -90 50 -90 152 -247 152 -248 63 0 62 0 0 420 0 420 -55 0 -55 0 0 -327 0 -327 -63 111 -63 111 -135 216 -134 216 -67 0 -68 0 0 -420z"/>
      <path d="M11000 11150 l0 -420 55 0 55 0 0 158 1 157 38 44 38 43 85 -123 85 -124 52 -77 52 -78 70 0 70 0 -8 13 -8 13 -148 218 -148 218 -5 13 -6 14 139 163 139 163 8 13 7 12 -70 0 -70 0 -73 -88 -73 -88 -80 -101 -80 -102 -7 0 -8 -1 0 190 0 190 -55 0 -55 0 0 -420z"/>
      <path d="M13460 11150 l0 -420 240 0 240 0 0 45 0 45 -182 2 -183 3 0 145 0 145 163 3 162 2 0 45 0 45 -162 2 -163 3 0 130 0 130 173 3 172 2 0 45 0 45 -230 0 -230 0 0 -420z"/>
      <path d="M14291 11548 l12 -23 123 -226 124 -226 0 -171 0 -172 55 0 55 0 0 173 0 173 136 234 136 233 5 14 5 13 -65 0 -66 0 -98 -190 -98 -190 -5 0 -5 0 -95 190 -95 190 -68 0 -68 0 12 -22z"/>
      <path d="M16410 11150 l0 -420 55 0 55 0 0 338 0 337 50 -90 51 -89 152 -248 152 -248 63 0 62 0 0 420 0 420 -55 0 -55 0 0 -327 0 -327 -63 111 -63 111 -135 216 -134 216 -67 0 -68 0 0 -420z"/>
    </g>
  </svg>
);

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
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
            ? 'bg-white/95 dark:bg-secondary/95 backdrop-blur-lg border-b border-gray-200/60 dark:border-gray-800 shadow-sm h-20 md:h-24'
            : 'bg-transparent border-transparent h-24 md:h-28'
          }
        `}
      >
        {/* ── Logo ─────────────────────────────────────────────────────── */}
        <Link
          to="/"
          className="flex items-center flex-shrink-0 z-50 h-full py-1 md:py-2"
          onClick={() => setIsOpen(false)}
        >
          <EliteLogo
            className={`w-auto object-contain transition-all duration-300 h-16 md:h-20 ${
              isSolid ? 'text-gray-900 dark:text-white' : 'text-white'
            }`}
          />
        </Link>

        {/* ── Desktop Nav Links ─────────────────────────────────────────── */}
        <div
          ref={dropdownRef}
          className={`
            hidden md:flex items-center gap-8 lg:gap-10
            text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-300
            ${isSolid ? 'text-gray-700 dark:text-gray-200' : 'text-white/90'}
          `}
        >
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.path}
                className="relative group"
              >
                <Link
                  to={link.path}
                  className={`
                    flex items-center gap-1 relative pb-0.5 hover:text-amber-500 transition-colors duration-300
                    after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-amber-500
                    after:transition-all after:duration-300
                    ${isActive(link.path) ? 'text-amber-500 after:w-full' : 'after:w-0 hover:after:w-full'}
                  `}
                >
                  {link.name}
                  <FaChevronDown className="text-[8px] transition-transform duration-200 group-hover:rotate-180" />
                </Link>

                {/* Dropdown menu — wrapper with top padding creates an invisible bridge so hover isn't lost */}
                <div className="absolute top-full left-0 pt-4 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-200 z-50">
                  <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 shadow-xl py-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className={`block px-5 py-3 text-[11px] tracking-widest uppercase transition-colors duration-200 border-l-2
                          ${location.pathname === child.path
                            ? 'text-amber-500 border-amber-500 bg-amber-50 dark:bg-[#222]'
                            : 'text-gray-600 dark:text-gray-300 border-transparent hover:text-amber-500 hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-[#222]'
                          }`}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
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

          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className={`ml-4 p-2 rounded-full transition-colors duration-300 ${
              isSolid 
                ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800' 
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <FaSun className="text-amber-400 text-lg" /> : <FaMoon className="text-lg" />}
          </button>

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

        {/* ── Mobile Hamburger & Theme Toggle ────────────────────────────────────────── */}
        <div className="flex items-center gap-4 md:hidden z-50">
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors duration-300 ${isSolid ? 'text-gray-900 dark:text-gray-200' : 'text-white'}`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <FaSun className="text-amber-400 text-xl" /> : <FaMoon className="text-xl" />}
          </button>
          
          <button
            className={`text-xl focus:outline-none transition-colors duration-300 ${isSolid ? 'text-gray-900 dark:text-gray-200' : 'text-white'}`}
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
        </div>
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
              <EliteLogo className="h-12 w-auto object-contain text-white" />
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
