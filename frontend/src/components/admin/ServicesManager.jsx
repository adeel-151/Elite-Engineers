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

  const inputClasses = "w-full py-3 bg-transparent border-0 border-b border-gray-300 rounded-none focus:ring-0 focus:border-black outline-none text-sm transition-colors mb-2";

  return (
    <div>
      <h2 className="text-xl font-display uppercase tracking-widest mb-8">
        {editingId ? 'Edit Service' : 'Add New Service'}
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-12 bg-gray-50 p-6 border border-gray-100">
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

        <div className="mb-8">
          <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">
            {editingId ? 'Upload New Image (Optional)' : 'Upload Service Image'}
          </label>
          <input 
            id="service-image-upload"
            type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:tracking-widest file:uppercase file:bg-white file:border file:border-gray-200 file:text-black hover:file:bg-gray-100"
          />
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={isSubmitting} className={`px-12 py-3 text-xs tracking-widest uppercase transition-colors rounded-full ${isSubmitting ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}>
            {isSubmitting ? 'Please Wait...' : (editingId ? 'Update Service' : 'Save Service')}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="px-12 py-3 text-xs tracking-widest uppercase transition-colors rounded-full bg-gray-200 text-black hover:bg-gray-300">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* List */}
      <h2 className="text-xl font-display uppercase tracking-widest mb-6">Existing Services</h2>
      {loading ? (
        <div className="text-gray-500 text-sm">Loading services...</div>
      ) : services.length === 0 ? (
        <div className="text-gray-500 text-sm italic">No services found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <div key={service._id} className="border border-gray-200 bg-white p-4 flex flex-col">
              {service.img && (
                <img src={service.img} alt={service.title} className="w-full h-40 object-cover mb-4 bg-gray-100" />
              )}
              <h3 className="font-display uppercase tracking-widest text-lg mb-2">{service.title}</h3>
              <p className="text-xs text-gray-500 mb-4 line-clamp-3 flex-grow">{service.desc}</p>
              
              <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100">
                <button onClick={() => handleEdit(service)} className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-xs tracking-widest uppercase transition-colors flex justify-center items-center gap-2">
                  <FaEdit /> Edit
                </button>
                <button onClick={() => handleDelete(service._id)} className="flex-1 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-xs tracking-widest uppercase transition-colors flex justify-center items-center gap-2">
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
