import { useState } from 'react';
import SEO from '../components/ui/SEO';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import ProjectForm from '../components/admin/ProjectForm';
import ProjectGrid from '../components/admin/ProjectGrid';

const Admin = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [activeTab, setActiveTab] = useState('manage'); // 'manage' | 'form'
  const [editingProject, setEditingProject] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const receivedToken = res.data.token;
      setToken(receivedToken);
      localStorage.setItem('token', receivedToken);
      toast.success('Logged in successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    toast.success('Logged out');
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setActiveTab('form');
  };

  const handleFormSuccess = () => {
    setEditingProject(null);
    setActiveTab('manage');
  };

  const handleFormCancel = () => {
    setEditingProject(null);
    setActiveTab('manage');
  };

  const inputClasses = "w-full py-3 bg-transparent border-0 border-b border-gray-300 rounded-none focus:ring-0 focus:border-black outline-none text-sm transition-colors mb-2";

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-40">
        <SEO title="Admin Login" description="Elite Engineers Admin Login" />
        <div className="bg-white p-12 shadow-sm max-w-md w-full border border-gray-100">
          <h2 className="text-3xl font-display uppercase tracking-widest text-center mb-8">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Admin Email" className={inputClasses} value={email} onChange={e => setEmail(e.target.value)} required />
            <div className="mb-6"></div>
            <input type="password" placeholder="Password" className={inputClasses} value={password} onChange={e => setPassword(e.target.value)} required />
            <div className="mb-8"></div>
            <button type="submit" className="w-full py-3 bg-black text-white text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-48 pb-24">
      <SEO title="Admin Dashboard" description="Elite Engineers Admin Dashboard" />
      
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
          <div>
            <h1 className="text-3xl font-display uppercase tracking-widest mb-4">Admin Dashboard</h1>
            <div className="flex gap-6">
              <button 
                onClick={() => { setActiveTab('manage'); setEditingProject(null); }}
                className={`text-sm uppercase tracking-widest pb-2 transition-colors ${activeTab === 'manage' ? 'text-black border-b-2 border-black font-semibold' : 'text-gray-400 hover:text-black'}`}
              >
                Manage Projects
              </button>
              <button 
                onClick={() => { setActiveTab('form'); setEditingProject(null); }}
                className={`text-sm uppercase tracking-widest pb-2 transition-colors ${activeTab === 'form' ? 'text-black border-b-2 border-black font-semibold' : 'text-gray-400 hover:text-black'}`}
              >
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </button>
            </div>
          </div>
          <button onClick={handleLogout} className="text-xs text-red-500 uppercase tracking-widest hover:text-red-700 pb-2">
            Logout
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          key={activeTab}
          className="bg-white p-8 border border-gray-100 shadow-sm min-h-[500px]"
        >
          {activeTab === 'manage' ? (
            <ProjectGrid token={token} onEdit={handleEdit} />
          ) : (
            <>
              <h2 className="text-xl font-display uppercase tracking-widest mb-8">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h2>
              <ProjectForm 
                token={token} 
                initialData={editingProject} 
                onSuccess={handleFormSuccess} 
                onCancel={editingProject ? handleFormCancel : null} 
              />
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
