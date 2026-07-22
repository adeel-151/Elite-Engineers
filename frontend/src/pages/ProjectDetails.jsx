import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaMapMarkerAlt, FaRulerCombined, FaCalendarAlt, FaUserTie } from 'react-icons/fa';
import axios from 'axios';
import SkeletonLoader from '../components/ui/SkeletonLoader';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/projects/${id}`);
        setProject(res.data.data.project);
        setLoading(false);
      } catch (err) {
        // Fallback dummy data
        setProject({
          title: 'Tech Hub Interior', category: 'Interior',
          client: { name: 'InnovateX' }, location: 'Johar Town, Lahore', area: '5,000 Sq Ft', completedDate: '2023-01-01',
          description: 'A modern, open-plan workspace designed to foster creativity and collaboration.',
          images: [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=2069&auto=format&fit=crop'
          ]
        });
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <SkeletonLoader type="detail" />;
  if (!project) return <div className="min-h-screen flex items-center justify-center">Project not found</div>;

  const images = project.images && project.images.length > 0 ? project.images : ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title={project.title} 
        description={project.description}
        image={images[0]}
      />

      {/* Hero Image */}
      <div className="h-[60vh] w-full relative">
        <img src={images[0]} alt={project.title} className="w-full h-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-black/40"></div>
        
        <Link to="/projects" className="absolute top-24 left-4 md:left-12 flex items-center gap-2 text-white text-xs uppercase tracking-widest hover:text-accent transition-colors z-10 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
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
            <p className="text-gray-600 font-light leading-relaxed mb-8">{project.description || project.desc}</p>
            
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
                  <p className="font-semibold text-sm">{project.client?.name || project.client || 'N/A'}</p>
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
                  <p className="font-semibold text-sm">{project.area || 'N/A'}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <FaCalendarAlt className="text-accent mt-1 text-lg" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">Completed</p>
                  <p className="font-semibold text-sm">{project.completedDate ? new Date(project.completedDate).getFullYear() : (project.year || 'N/A')}</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Image Gallery */}
      <div className="pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {images.slice(1).map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className={`h-[400px] w-full overflow-hidden ${i === 2 ? 'md:col-span-2 h-[500px]' : ''}`} // Make 3rd image full width
            >
              <img src={img} alt={`${project.title} Gallery ${i}`} className="w-full h-full object-cover transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ProjectDetails;
