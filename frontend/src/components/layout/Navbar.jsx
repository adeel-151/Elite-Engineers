import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const navLinks = [
    { name: 'PORTFOLIO', path: '/projects' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'SERVICES & CONSULTING', path: '/services' },
    { name: 'CONTACT', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full bg-white text-primary py-4 md:py-6 px-4 flex flex-col items-center border-b border-gray-100 z-50 fixed top-0 shadow-sm">
      {/* Centered Logo */}
      <Link to="/" className="mb-4 md:mb-6 flex flex-col items-center">
        {/* Abstract Logo Icon based on image */}
        <div className="w-8 h-8 border-[1.5px] border-accent flex items-center justify-center mb-2 transform rotate-45">
          <div className="w-3 h-3 bg-accent transform -rotate-45"></div>
        </div>
        <span className="font-display text-xl md:text-2xl tracking-[0.2em] font-bold text-primary">ELITE ENGINEERS</span>
      </Link>

      {/* Navigation Links */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-12 mt-2 md:mt-4 text-[10px] md:text-xs font-semibold tracking-widest text-gray-500 uppercase">
        {navLinks.map((link) => (
          <Link 
            key={link.path} 
            to={link.path}
            className={`hover:text-accent transition-colors duration-300 ${isActive(link.path) ? 'text-accent border-b-2 border-accent pb-1' : ''}`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
