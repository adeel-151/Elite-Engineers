import { useState } from 'react';
import SEO from '../components/ui/SEO';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import ProjectForm from '../components/admin/ProjectForm';
import ProjectGrid from '../components/admin/ProjectGrid';
import GalleryManager from '../components/admin/GalleryManager';
import InquiriesViewer from '../components/admin/InquiriesViewer';
import ServicesManager from '../components/admin/ServicesManager';
import TeamManager from '../components/admin/TeamManager';
import ClientsManager from '../components/admin/ClientsManager';
import FaqManager from '../components/admin/FaqManager';
import API_BASE_URL from '../config/api';

const Admin = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [activeTab, setActiveTab] = useState('manage'); // 'manage' | 'form' | 'gallery'
  const [editingProject, setEditingProject] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
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

  const inputClasses = "w-full py-3 bg-transparent border-0 border-b border-gray-700 rounded-none focus:ring-0 focus:border-accent outline-none text-sm transition-colors mb-2 text-white placeholder-gray-500";

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary pt-40">
        <SEO title="Admin Login" description="Elite Engineers Admin Login" />
        <div className="bg-secondary p-12 shadow-2xl max-w-md w-full border border-gray-800">
          <h2 className="text-3xl font-display uppercase tracking-widest text-center mb-8 text-white">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Admin Email" className={inputClasses} value={email} onChange={e => setEmail(e.target.value)} required />
            <div className="mb-6"></div>
            <input type="password" placeholder="Password" className={inputClasses} value={password} onChange={e => setPassword(e.target.value)} required />
            <div className="mb-8"></div>
            <button type="submit" className="w-full py-3 bg-accent text-white text-xs tracking-widest uppercase hover:bg-amber-500 transition-colors">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'manage', label: 'Projects' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'services', label: 'Services' },
    { id: 'team', label: 'Team Members' },
    { id: 'clients', label: 'Clients' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'inquiries', label: 'Inquiries (Messages)' },
  ];

  return (
    <div className="min-h-screen bg-primary pt-24 pb-24 text-white">
      <SEO title="Admin Dashboard" description="Elite Engineers Admin Dashboard" />
      
      <div className="max-w-[1400px] mx-auto px-4 mt-8 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-secondary border border-gray-800 p-6 shadow-sm sticky top-32">
            <h1 className="text-xl font-display uppercase tracking-widest mb-8 border-b border-gray-800 pb-4 text-white">Dashboard</h1>
            
            <div className="flex flex-col gap-2">
              {tabs.map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setEditingProject(null); }}
                  className={`text-left text-xs uppercase tracking-widest py-3 px-4 transition-colors rounded ${activeTab === tab.id || (activeTab === 'form' && tab.id === 'manage') ? 'bg-accent text-white font-semibold' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button 
              onClick={handleLogout} 
              className="w-full mt-12 text-left text-xs text-red-400 uppercase tracking-widest hover:text-red-300 py-3 px-4 border border-red-900/30 hover:bg-red-900/20 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            key={activeTab}
            className="bg-secondary p-6 md:p-10 border border-gray-800 shadow-sm min-h-[600px]"
          >
            {activeTab === 'manage' ? (
              <ProjectGrid token={token} onEdit={handleEdit} />
            ) : activeTab === 'form' ? (
              <>
                <h2 className="text-xl font-display uppercase tracking-widest mb-8 text-white">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h2>
                <ProjectForm 
                  token={token} 
                  initialData={editingProject} 
                  onSuccess={handleFormSuccess} 
                  onCancel={editingProject ? handleFormCancel : null} 
                />
              </>
            ) : activeTab === 'gallery' ? (
              <GalleryManager token={token} />
            ) : activeTab === 'services' ? (
              <ServicesManager token={token} />
            ) : activeTab === 'team' ? (
              <TeamManager token={token} />
            ) : activeTab === 'clients' ? (
              <ClientsManager token={token} />
            ) : activeTab === 'faqs' ? (
              <FaqManager token={token} />
            ) : activeTab === 'inquiries' ? (
              <InquiriesViewer token={token} />
            ) : null}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
