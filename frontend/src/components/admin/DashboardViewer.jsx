import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import { FaProjectDiagram, FaEnvelope, FaUsers, FaTools, FaArrowRight } from 'react-icons/fa';
import API_BASE_URL from '../../config/api';

const DashboardViewer = ({ token, onNavigate }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data.data);
      } catch (err) {
        toast.error('Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [token]);

  if (loading) return <div className="text-gray-500 uppercase tracking-widest text-sm">Loading Dashboard...</div>;
  if (!stats) return <div className="text-red-500 uppercase tracking-widest text-sm">Failed to load data</div>;

  const cards = [
    { label: 'Total Projects', value: stats.totals.projects, icon: FaProjectDiagram, color: 'text-blue-500', tab: 'manage' },
    { label: 'Total Inquiries', value: stats.totals.inquiries, icon: FaEnvelope, color: 'text-amber-500', tab: 'inquiries' },
    { label: 'Total Clients', value: stats.totals.clients, icon: FaUsers, color: 'text-green-500', tab: 'clients' },
    { label: 'Active Services', value: stats.totals.services, icon: FaTools, color: 'text-purple-500', tab: 'services' },
  ];

  return (
    <div className="space-y-10">
      <h2 className="text-2xl font-display uppercase tracking-widest text-gray-900 dark:text-white mb-2">Overview Dashboard</h2>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-gray-50 dark:bg-primary border border-gray-200 dark:border-gray-800 p-6 rounded-lg relative overflow-hidden group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{card.label}</p>
                <h3 className="text-3xl font-display font-bold text-gray-900 dark:text-white">{card.value}</h3>
              </div>
              <div className={`p-3 bg-white dark:bg-secondary rounded-full shadow-sm ${card.color}`}>
                <card.icon size={20} />
              </div>
            </div>
            <button 
              onClick={() => onNavigate && onNavigate(card.tab)}
              className="mt-6 flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 group-hover:text-amber-500 transition-colors"
            >
              Manage <FaArrowRight size={10} />
            </button>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-gray-50 dark:bg-primary border border-gray-200 dark:border-gray-800 p-6 rounded-lg">
          <h3 className="text-sm font-display uppercase tracking-widest text-gray-900 dark:text-white mb-6">Inquiries Over Time</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.inquiriesChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '4px', color: '#F3F4F6' }}
                />
                <Bar dataKey="total" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Inquiries List */}
        <div className="bg-gray-50 dark:bg-primary border border-gray-200 dark:border-gray-800 p-6 rounded-lg flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-display uppercase tracking-widest text-gray-900 dark:text-white">Recent Inquiries</h3>
            <button onClick={() => onNavigate && onNavigate('inquiries')} className="text-[10px] text-amber-500 uppercase tracking-widest hover:underline">View All</button>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {stats.recentInquiries.length === 0 ? (
              <p className="text-xs text-gray-500 italic">No recent inquiries.</p>
            ) : (
              stats.recentInquiries.map(inq => (
                <div key={inq._id} className="border-b border-gray-200 dark:border-gray-800 pb-3 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate pr-2">{inq.name}</h4>
                    <span className="text-[10px] text-gray-500 whitespace-nowrap">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-1">{inq.subject || inq.type}</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardViewer;
