import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaTrash, FaEdit } from 'react-icons/fa';
import API_BASE_URL from '../../config/api';

const ServicesManager = ({ token }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Form State
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [icon, setIcon] = useState('⬡');
  const [imageFile, setImageFile] = useState(null);

  const fetchServices = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/services`);
      setServices(res.data.data.services || []);
    } catch (err) {
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const resetForm = () => {
    setTitle('');
    setDesc('');
    setIcon('⬡');
    setImageFile(null);
    setEditingId(null);
    if(document.getElementById('service-image-upload')) {
        document.getElementById('service-image-upload').value = '';
    }
  };

  const handleEdit = (service) => {
    setEditingId(service._id);
    setTitle(service.title);
    setDesc(service.desc);
    setIcon(service.icon || '⬡');
    setImageFile(null); // Keep null to not overwrite unless chosen
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !desc) return toast.error('Title and description are required');
    if (!editingId && !imageFile) return toast.error('Image is required for new service');

    setIsSubmitting(true);
    const toastId = toast.loading(editingId ? 'Updating service...' : 'Creating service...');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('desc', desc);
    formData.append('icon', icon);
    if (imageFile) formData.append('image', imageFile);

    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/services/${editingId}`, formData, {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Service updated successfully', { id: toastId });
      } else {
        await axios.post(`${API_BASE_URL}/api/services`, formData, {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Service created successfully', { id: toastId });
      }
      resetForm();
      fetchServices();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/services/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      toast.success('Service deleted');
      fetchServices();
    } catch (err) {
      toast.error('Failed to delete service');
    }
  };

  const inputClasses = "w-full py-3 bg-transparent border-0 border-b border-gray-700 rounded-none focus:ring-0 focus:border-accent outline-none text-sm transition-colors mb-2 text-white placeholder-gray-500";

  return (
    <div>
      <h2 className="text-xl font-display uppercase tracking-widest mb-8 text-white">
        {editingId ? 'Edit Service' : 'Add New Service'}
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-12 bg-primary p-6 border border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
          <div>
            <input type="text" placeholder="Service Title" className={inputClasses} value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div>
            <input type="text" placeholder="Icon (e.g. ⬡, ★, ▱)" className={inputClasses} value={icon} onChange={e => setIcon(e.target.value)} />
          </div>
        </div>
        
        <div className="mb-4">
          <textarea placeholder="Service Description..." rows="3" className={`${inputClasses} resize-none`} value={desc} onChange={e => setDesc(e.target.value)} required></textarea>
        </div>

        <div className="mb-8 mt-6">
          <label className="block text-xs text-gray-400 uppercase tracking-widest mb-4">
            {editingId ? 'Upload New Image (Optional)' : 'Upload Service Image'}
          </label>
          <input 
            id="service-image-upload"
            type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])}
            className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-xs file:tracking-widest file:uppercase file:bg-accent file:text-white hover:file:bg-amber-500 cursor-pointer transition-all"
          />
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={isSubmitting} className={`px-12 py-3 text-xs tracking-widest uppercase transition-colors rounded-full ${isSubmitting ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-accent text-white hover:bg-amber-500'}`}>
            {isSubmitting ? 'Please Wait...' : (editingId ? 'Update Service' : 'Save Service')}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="px-12 py-3 text-xs tracking-widest uppercase transition-colors rounded-full bg-gray-800 text-white hover:bg-gray-700 border border-gray-700">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* List */}
      <h2 className="text-xl font-display uppercase tracking-widest mb-6 text-white">Existing Services</h2>
      {loading ? (
        <div className="text-gray-400 text-sm">Loading services...</div>
      ) : services.length === 0 ? (
        <div className="text-gray-400 text-sm italic">No services found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <div key={service._id} className="border border-gray-800 bg-primary p-4 flex flex-col hover:border-gray-600 transition-all">
              {service.img && (
                <img src={service.img.startsWith('http') ? service.img : `${API_BASE_URL}/${service.img.replace(/\\/g, '/')}`} alt={service.title} className="w-full h-40 object-cover mb-4 bg-secondary" />
              )}
              <h3 className="font-display uppercase tracking-widest text-lg mb-2 text-white">{service.title}</h3>
              <p className="text-xs text-gray-400 mb-4 line-clamp-3 flex-grow">{service.desc}</p>
              
              <div className="flex gap-2 mt-auto pt-4 border-t border-gray-800">
                <button onClick={() => handleEdit(service)} className="flex-1 py-2 bg-gray-800 hover:bg-gray-700 text-white text-xs tracking-widest uppercase transition-colors flex justify-center items-center gap-2">
                  <FaEdit /> Edit
                </button>
                <button onClick={() => handleDelete(service._id)} className="flex-1 py-2 bg-red-900/30 hover:bg-red-900/50 text-red-400 text-xs tracking-widest uppercase transition-colors flex justify-center items-center gap-2">
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesManager;
