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

  const inputClasses = "w-full py-3 bg-transparent border-0 border-b border-gray-300 rounded-none focus:ring-0 focus:border-black outline-none text-sm transition-colors mb-2";

  return (
    <div>
      <h2 className="text-xl font-display uppercase tracking-widest mb-8">
        {editingId ? 'Edit Client / Partner' : 'Add New Client / Partner'}
      </h2>

      <form onSubmit={handleSubmit} className="mb-12 bg-gray-50 p-6 border border-gray-100">
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

        <div className="mb-8">
          <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">
            {editingId ? 'Upload New Logo (Optional)' : 'Upload Client Logo'}
          </label>
          <input 
            id="client-image-upload"
            type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:tracking-widest file:uppercase file:bg-white file:border file:border-gray-200 file:text-black hover:file:bg-gray-100"
          />
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={isSubmitting} className={`px-12 py-3 text-xs tracking-widest uppercase transition-colors rounded-full ${isSubmitting ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}>
            {isSubmitting ? 'Please Wait...' : (editingId ? 'Update Client' : 'Save Client')}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="px-12 py-3 text-xs tracking-widest uppercase transition-colors rounded-full bg-gray-200 text-black hover:bg-gray-300">
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="text-xl font-display uppercase tracking-widest mb-6">Our Clients</h2>
      {loading ? (
        <div className="text-gray-500 text-sm">Loading clients...</div>
      ) : clients.length === 0 ? (
        <div className="text-gray-500 text-sm italic">No clients found.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {clients.map(client => (
            <div key={client._id} className="border border-gray-200 bg-white p-4 flex flex-col items-center text-center">
              <div className="w-full aspect-video flex items-center justify-center bg-gray-50 mb-4 overflow-hidden border border-gray-100 p-2">
                {client.logo ? (
                  <img src={client.logo} alt={client.name} className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300" />
                ) : (
                  <span className="text-gray-300 text-xs">No Logo</span>
                )}
              </div>
              <h3 className="font-display uppercase tracking-widest text-sm mb-1">{client.name}</h3>
              {client.company && <p className="text-[10px] text-gray-500 uppercase tracking-widest">{client.company}</p>}
              
              <div className="flex gap-2 w-full mt-4 pt-4 border-t border-gray-100">
                <button onClick={() => handleEdit(client)} className="flex-1 py-1 text-gray-500 hover:text-black text-[10px] tracking-widest uppercase transition-colors flex justify-center items-center gap-1">
                  <FaEdit /> Edit
                </button>
                <button onClick={() => handleDelete(client._id)} className="flex-1 py-1 text-red-400 hover:text-red-600 text-[10px] tracking-widest uppercase transition-colors flex justify-center items-center gap-1">
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
