import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaMapMarkerAlt, FaRulerCombined, FaCalendarAlt, FaUserTie } from 'react-icons/fa';

// Mock data (since backend might be off). In reality, you'd fetch based on ID.
const mockProjects = {
  '1': { 
    title: 'The Skyline Tower', category: 'Commercial', 
    client: 'Apex Holdings', location: 'Gulberg III, Lahore', area: '150,000 Sq Ft', year: '2025',
    desc: 'The Skyline Tower is a modern architectural marvel designed to be the new hub for tech enterprises. The project involved deep foundational engineering to support 40 stories of pure glass and steel. Our team implemented sustainable cooling systems and a highly resilient core structure.',
    images: [
      'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504307651254-35680f356f58?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'
    ]
  },
  '2': { 
    title: 'Aura Residences', category: 'Residential', 
    client: 'DHA Phase 8', location: 'DHA, Lahore', area: '10,000 Sq Ft', year: '2024',
    desc: 'Aura Residences redefines luxury living. We handled the complete turnkey construction from structural design to premium interior fit-outs. The villa features smart home integration, an infinity pool, and a minimalist monochrome aesthetic requested by the client.',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop'
    ]
  }
};

const ProjectDetails = () => {
  const { id } = useParams();
  
  // If backend was running, we'd do a useEffect fetch here.
  // Using mock data for UI testing. Fallback to a default if ID not found in mock.
  const project = mockProjects[id] || {
    title: 'Tech Hub Interior', category: 'Interior',
    client: 'InnovateX', location: 'Johar Town, Lahore', area: '5,000 Sq Ft', year: '2023',
    desc: 'A modern, open-plan workspace designed to foster creativity and collaboration. The project required extensive HVAC remodeling and custom acoustic treatments.',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=2069&auto=format&fit=crop'
    ]
  };

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>{project.title} | Elite Engineers</title>
      </Helmet>

      {/* Hero Image */}
      <div className="h-[60vh] w-full relative">
        <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover grayscale opacity-90" />
        <div className="absolute inset-0 bg-black/40"></div>
        
        <Link to="/projects" className="absolute top-8 left-4 md:left-12 flex items-center gap-2 text-white text-xs uppercase tracking-widest hover:text-accent transition-colors z-10">
          <FaChevronLeft /> Back to Projects
        </Link>

        <div className="absolute bottom-12 left-4 md:left-12 z-10">
          <p className="text-accent text-sm uppercase tracking-widest mb-2 font-semibold">{project.category}</p>
          <h1 className="text-4xl md:text-6xl text-white font-display uppercase tracking-widest">{project.title}</h1>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Main Description */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-display uppercase tracking-widest mb-6">Project Overview</h2>
            <p className="text-gray-600 font-light leading-relaxed mb-8">{project.desc}</p>
            
            <h2 className="text-2xl font-display uppercase tracking-widest mb-6">The Challenge</h2>
            <p className="text-gray-600 font-light leading-relaxed">
              Every project comes with its unique set of hurdles. For this endeavor, our team had to navigate complex zoning laws and ensure structural stability while maintaining the architect's pure, minimalist vision. Through innovative engineering and rigorous quality control, we delivered beyond expectations.
            </p>
          </div>

          {/* Quick Facts Sidebar */}
          <div className="bg-gray-50 p-8 border border-gray-200 h-fit">
            <h3 className="text-sm font-display uppercase tracking-widest mb-6 text-black border-b border-gray-300 pb-2">Project Facts</h3>
            
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <FaUserTie className="text-accent mt-1 text-lg" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">Client</p>
                  <p className="font-semibold text-sm">{project.client}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-accent mt-1 text-lg" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">Location</p>
                  <p className="font-semibold text-sm">{project.location}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <FaRulerCombined className="text-accent mt-1 text-lg" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">Area</p>
                  <p className="font-semibold text-sm">{project.area}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <FaCalendarAlt className="text-accent mt-1 text-lg" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">Completed</p>
                  <p className="font-semibold text-sm">{project.year}</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Image Gallery */}
      <div className="pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {project.images.slice(1).map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className={`h-[400px] w-full overflow-hidden ${i === 2 ? 'md:col-span-2 h-[500px]' : ''}`} // Make 3rd image full width
            >
              <img src={img} alt={`${project.title} Gallery ${i}`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ProjectDetails;
