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
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Member updated successfully', { id: toastId });
      } else {
        await axios.post(`${API_BASE_URL}/api/team`, formData, {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
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

  const inputClasses = "w-full py-3 bg-transparent border-0 border-b border-gray-300 rounded-none focus:ring-0 focus:border-black outline-none text-sm transition-colors mb-2";

  return (
    <div>
      <h2 className="text-xl font-display uppercase tracking-widest mb-8">
        {editingId ? 'Edit Team Member' : 'Add New Team Member'}
      </h2>

      <form onSubmit={handleSubmit} className="mb-12 bg-gray-50 p-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
          <div>
            <input type="text" placeholder="Full Name" className={inputClasses} value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <input type="text" placeholder="Role / Designation" className={inputClasses} value={role} onChange={e => setRole(e.target.value)} required />
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">
            {editingId ? 'Upload New Image (Optional)' : 'Upload Member Photo'}
          </label>
          <input 
            id="team-image-upload"
            type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:tracking-widest file:uppercase file:bg-white file:border file:border-gray-200 file:text-black hover:file:bg-gray-100"
          />
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={isSubmitting} className={`px-12 py-3 text-xs tracking-widest uppercase transition-colors rounded-full ${isSubmitting ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}>
            {isSubmitting ? 'Please Wait...' : (editingId ? 'Update Member' : 'Save Member')}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="px-12 py-3 text-xs tracking-widest uppercase transition-colors rounded-full bg-gray-200 text-black hover:bg-gray-300">
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="text-xl font-display uppercase tracking-widest mb-6">Our Team</h2>
      {loading ? (
        <div className="text-gray-500 text-sm">Loading team...</div>
      ) : team.length === 0 ? (
        <div className="text-gray-500 text-sm italic">No team members found.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {team.map(member => (
            <div key={member._id} className="border border-gray-200 bg-white flex flex-col items-center text-center p-6 relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-gray-100">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <h3 className="font-display uppercase tracking-widest text-sm mb-1">{member.name}</h3>
              <p className="text-xs text-accent uppercase tracking-widest">{member.role}</p>
              
              <div className="flex gap-2 w-full mt-6 border-t border-gray-100 pt-4">
                <button onClick={() => handleEdit(member)} className="flex-1 py-1 text-gray-500 hover:text-black text-[10px] tracking-widest uppercase transition-colors flex justify-center items-center gap-1">
                  <FaEdit /> Edit
                </button>
                <button onClick={() => handleDelete(member._id)} className="flex-1 py-1 text-red-400 hover:text-red-600 text-[10px] tracking-widest uppercase transition-colors flex justify-center items-center gap-1">
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
