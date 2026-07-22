import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import SkeletonLoader from '../ui/SkeletonLoader';

const ProjectGrid = ({ token, onEdit }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:5000/${imagePath.replace(/\\/g, '/')}`;
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/projects');
      setProjects(res.data.data.projects);
    } catch (error) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      try {
        setDeletingId(id);
        const toastId = toast.loading('Deleting project...');
        await axios.delete(`http://localhost:5000/api/projects/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        toast.success('Project deleted successfully', { id: toastId });
        setProjects(projects.filter(p => p._id !== id));
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete project');
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
      </div>
    );
  }

  if (projects.length === 0) {
    return <div className="text-center py-12 text-gray-500 border border-dashed border-gray-300 rounded-lg">No projects found. Switch to the 'Add New' tab to create one!</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div key={project._id} className="bg-white border border-gray-100 shadow-sm rounded-lg overflow-hidden group hover:shadow-md transition-shadow">
          <div className="h-48 relative bg-gray-100">
            {project.images && project.images.length > 0 ? (
              <img src={getImageUrl(project.images[0])} alt={project.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
            )}
            
            {/* Hover Overlay Actions */}
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
              <button 
                onClick={() => onEdit(project)}
                className="flex items-center gap-2 px-6 py-2 bg-white text-black font-semibold tracking-widest uppercase text-xs rounded-full shadow-lg hover:bg-accent hover:text-white hover:scale-105 transition-all duration-300"
                title="Edit Project"
              >
                <FiEdit2 /> Edit
              </button>
              <button 
                onClick={() => handleDelete(project._id)}
                disabled={deletingId === project._id}
                className="flex items-center gap-2 px-6 py-2 bg-red-500 text-white font-semibold tracking-widest uppercase text-xs rounded-full shadow-lg hover:bg-red-600 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
                title="Delete Project"
              >
                <FiTrash2 /> Delete
              </button>
            </div>
          </div>
          
          <div className="p-4">
            <span className="text-xs text-accent uppercase tracking-widest">{project.category}</span>
            <h3 className="font-display text-lg mt-1 mb-2">{project.title}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">{project.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectGrid;
