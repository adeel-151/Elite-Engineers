import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaTrash, FaEdit } from 'react-icons/fa';
import API_BASE_URL from '../../config/api';

const TeamManager = ({ token }) => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const fetchTeam = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/team`);
      setTeam(res.data.data.teamMembers || []);
    } catch (err) {
      toast.error('Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const resetForm = () => {
    setName('');
    setRole('');
    setImageFile(null);
    setEditingId(null);
    if(document.getElementById('team-image-upload')) {
        document.getElementById('team-image-upload').value = '';
    }
  };

  const handleEdit = (member) => {
    setEditingId(member._id);
    setName(member.name);
    setRole(member.role);
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !role) return toast.error('Name and role are required');
    if (!editingId && !imageFile) return toast.error('Image is required for new team member');

    setIsSubmitting(true);
    const toastId = toast.loading(editingId ? 'Updating member...' : 'Adding member...');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('role', role);
    if (imageFile) formData.append('image', imageFile);

    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/team/${editingId}`, formData, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        toast.success('Member updated successfully', { id: toastId });
      } else {
        await axios.post(`${API_BASE_URL}/api/team`, formData, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        toast.success('Member added successfully', { id: toastId });
      }
      resetForm();
      fetchTeam();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this team member?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/team/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      toast.success('Member deleted');
      fetchTeam();
    } catch (err) {
      toast.error('Failed to delete member');
    }
  };

  const inputClasses = "w-full py-3 bg-transparent border-0 border-b border-gray-300 dark:border-gray-700 rounded-none focus:ring-0 focus:border-accent outline-none text-sm transition-colors mb-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500";

  return (
    <div>
      <h2 className="text-xl font-display uppercase tracking-widest mb-8 text-gray-900 dark:text-white">
        {editingId ? 'Edit Team Member' : 'Add New Team Member'}
      </h2>

      <form onSubmit={handleSubmit} className="mb-12 bg-gray-50 dark:bg-primary p-6 border border-gray-200 dark:border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
          <div>
            <input type="text" placeholder="Full Name" className={inputClasses} value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <input type="text" placeholder="Role / Designation" className={inputClasses} value={role} onChange={e => setRole(e.target.value)} required />
          </div>
        </div>

        <div className="mb-8 mt-6">
          <label className="block text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">
            {editingId ? 'Upload New Image (Optional)' : 'Upload Member Photo'}
          </label>
          <input 
            id="team-image-upload"
            type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])}
            className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-6 file:border-0 file:text-xs file:tracking-widest file:uppercase file:bg-accent file:text-gray-900 dark:text-white hover:file:bg-black transition-all duration-300 cursor-pointer transition-all"
          />
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={isSubmitting} className={`px-12 py-3 text-xs tracking-widest uppercase transition-colors ${isSubmitting ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-accent text-white hover:bg-black transition-colors duration-300'}`}>
            {isSubmitting ? 'Please Wait...' : (editingId ? 'Update Member' : 'Save Member')}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="px-12 py-3 text-xs tracking-widest uppercase transition-colors bg-transparent text-accent hover:bg-accent hover:text-gray-900 dark:text-white border border-accent transition-colors duration-300">
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="text-xl font-display uppercase tracking-widest mb-6 text-gray-900 dark:text-white">Our Team</h2>
      {loading ? (
        <div className="text-gray-500 dark:text-gray-400 text-sm">Loading team...</div>
      ) : team.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400 text-sm italic">No team members found.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {team.map(member => (
            <div key={member._id} className="border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-primary flex flex-col items-center text-center p-6 relative group hover:border-gray-600 transition-all">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-secondary">
                <img src={member.img.startsWith('http') ? member.img : `${API_BASE_URL}/${member.img.replace(/\\/g, '/')}`} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <h3 className="font-display uppercase tracking-widest text-sm mb-1 text-gray-900 dark:text-white">{member.name}</h3>
              <p className="text-xs text-accent uppercase tracking-widest">{member.role}</p>
              
              <div className="flex gap-2 w-full mt-6 border-t border-gray-200 dark:border-gray-800 pt-4">
                <button onClick={() => handleEdit(member)} className="flex-1 py-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:text-white text-[10px] tracking-widest uppercase transition-colors flex justify-center items-center gap-1">
                  <FaEdit /> Edit
                </button>
                <button onClick={() => handleDelete(member._id)} className="flex-1 py-1 text-red-500 hover:text-red-400 text-[10px] tracking-widest uppercase transition-colors flex justify-center items-center gap-1">
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

export default TeamManager;
