import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaTrash, FaEdit } from 'react-icons/fa';
import API_BASE_URL from '../../config/api';

const ClientsManager = ({ token }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [quote, setQuote] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const fetchClients = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/clients`);
      setClients(res.data.data.clients || []);
    } catch (err) {
      toast.error('Failed to load clients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const resetForm = () => {
    setName('');
    setCompany('');
    setQuote('');
    setImageFile(null);
    setEditingId(null);
    if(document.getElementById('client-image-upload')) {
        document.getElementById('client-image-upload').value = '';
    }
  };

  const handleEdit = (client) => {
    setEditingId(client._id);
    setName(client.name || '');
    setCompany(client.company || '');
    setQuote(client.quote || '');
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return toast.error('Client name is required');

    setIsSubmitting(true);
    const toastId = toast.loading(editingId ? 'Updating client...' : 'Adding client...');

    const formData = new FormData();
    formData.append('name', name);
    if (company) formData.append('company', company);
    if (quote) formData.append('quote', quote);
    if (imageFile) formData.append('image', imageFile);

    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/clients/${editingId}`, formData, {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Client updated successfully', { id: toastId });
      } else {
        await axios.post(`${API_BASE_URL}/api/clients`, formData, {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Client added successfully', { id: toastId });
      }
      resetForm();
      fetchClients();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this client?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/clients/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      toast.success('Client deleted');
      fetchClients();
    } catch (err) {
      toast.error('Failed to delete client');
    }
  };

  const inputClasses = "w-full py-3 bg-transparent border-0 border-b border-gray-700 rounded-none focus:ring-0 focus:border-accent outline-none text-sm transition-colors mb-2 text-white placeholder-gray-500";

  return (
    <div>
      <h2 className="text-xl font-display uppercase tracking-widest mb-8 text-white">
        {editingId ? 'Edit Client / Partner' : 'Add New Client / Partner'}
      </h2>

      <form onSubmit={handleSubmit} className="mb-12 bg-primary p-6 border border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
          <div>
            <input type="text" placeholder="Client Name" className={inputClasses} value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <input type="text" placeholder="Company Name (Optional)" className={inputClasses} value={company} onChange={e => setCompany(e.target.value)} />
          </div>
        </div>

        <div className="mb-4">
          <textarea placeholder="Testimonial / Quote (Optional)" rows="2" className={`${inputClasses} resize-none`} value={quote} onChange={e => setQuote(e.target.value)}></textarea>
        </div>

        <div className="mb-8 mt-6">
          <label className="block text-xs text-gray-400 uppercase tracking-widest mb-4">
            {editingId ? 'Upload New Logo (Optional)' : 'Upload Client Logo'}
          </label>
          <input 
            id="client-image-upload"
            type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])}
            className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-xs file:tracking-widest file:uppercase file:bg-accent file:text-white hover:file:bg-amber-500 cursor-pointer transition-all"
          />
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={isSubmitting} className={`px-12 py-3 text-xs tracking-widest uppercase transition-colors rounded-full ${isSubmitting ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-accent text-white hover:bg-amber-500'}`}>
            {isSubmitting ? 'Please Wait...' : (editingId ? 'Update Client' : 'Save Client')}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="px-12 py-3 text-xs tracking-widest uppercase transition-colors rounded-full bg-gray-800 text-white hover:bg-gray-700 border border-gray-700">
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="text-xl font-display uppercase tracking-widest mb-6 text-white">Our Clients</h2>
      {loading ? (
        <div className="text-gray-400 text-sm">Loading clients...</div>
      ) : clients.length === 0 ? (
        <div className="text-gray-400 text-sm italic">No clients found.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {clients.map(client => (
            <div key={client._id} className="border border-gray-800 bg-primary p-4 flex flex-col items-center text-center hover:border-gray-600 transition-all">
              <div className="w-full aspect-video flex items-center justify-center bg-secondary mb-4 overflow-hidden border border-gray-800 p-2">
                {client.logo ? (
                  <img src={client.logo.startsWith('http') ? client.logo : `${API_BASE_URL}/${client.logo.replace(/\\/g, '/')}`} alt={client.name} className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-90 hover:opacity-100" />
                ) : (
                  <span className="text-gray-600 text-xs">No Logo</span>
                )}
              </div>
              <h3 className="font-display uppercase tracking-widest text-sm mb-1 text-white">{client.name}</h3>
              {client.company && <p className="text-[10px] text-gray-400 uppercase tracking-widest">{client.company}</p>}
              
              <div className="flex gap-2 w-full mt-4 pt-4 border-t border-gray-800">
                <button onClick={() => handleEdit(client)} className="flex-1 py-1 text-gray-400 hover:text-white text-[10px] tracking-widest uppercase transition-colors flex justify-center items-center gap-1">
                  <FaEdit /> Edit
                </button>
                <button onClick={() => handleDelete(client._id)} className="flex-1 py-1 text-red-500 hover:text-red-400 text-[10px] tracking-widest uppercase transition-colors flex justify-center items-center gap-1">
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

export default ClientsManager;
