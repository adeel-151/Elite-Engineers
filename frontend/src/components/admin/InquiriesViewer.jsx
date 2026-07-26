import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import API_BASE_URL from '../../config/api';

const InquiriesViewer = ({ token }) => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/inquiries`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInquiries(res.data.data.inquiries);
      setLoading(false);
    } catch (err) {
      toast.error('Failed to load inquiries');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/inquiries/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Inquiry deleted successfully');
      fetchInquiries();
    } catch (err) {
      toast.error('Failed to delete inquiry');
    }
  };

  if (loading) return <div className="text-gray-400 uppercase tracking-widest text-sm">Loading Inquiries...</div>;

  return (
    <div>
      <h2 className="text-xl font-display uppercase tracking-widest mb-8 text-white">Inquiries & Messages</h2>
      
      <div className="overflow-x-auto border border-gray-800 rounded-lg">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="text-xs text-gray-300 uppercase bg-secondary border-b border-gray-800">
            <tr>
              <th className="px-6 py-4 font-display tracking-widest">Date</th>
              <th className="px-6 py-4 font-display tracking-widest">Name / Company</th>
              <th className="px-6 py-4 font-display tracking-widest">Contact</th>
              <th className="px-6 py-4 font-display tracking-widest">Message / Details</th>
              <th className="px-6 py-4 font-display tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500 italic bg-primary">No inquiries found.</td>
              </tr>
            ) : (
              inquiries.map((inq) => (
                <tr key={inq._id} className="bg-primary border-b border-gray-800 hover:bg-secondary transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-xs">
                    {new Date(inq.createdAt).toLocaleDateString()}<br/>
                    <span className="text-gray-500">{new Date(inq.createdAt).toLocaleTimeString()}</span>
                  </td>
                  <td className="px-6 py-4 font-medium text-white">
                    {inq.name}
                    {inq.company && <><br/><span className="text-xs text-gray-500 font-normal">{inq.company}</span></>}
                  </td>
                  <td className="px-6 py-4">
                    {inq.email && <div className="text-accent">{inq.email}</div>}
                    {inq.phone && <div>{inq.phone}</div>}
                  </td>
                  <td className="px-6 py-4 max-w-md">
                    {inq.subject && <div className="font-semibold text-white mb-1">{inq.subject}</div>}
                    <div className="text-xs line-clamp-3" title={inq.message}>{inq.message}</div>
                    
                    {/* Cost Estimator specific details */}
                    {(inq.serviceType || inq.area) && (
                      <div className="mt-2 text-xs bg-secondary p-2 rounded border border-gray-800">
                        <strong className="text-accent">Estimation Request:</strong> {inq.serviceType} | {inq.area} Sq Ft
                        {inq.estimatedCost && <span> | Cost: {inq.estimatedCost}</span>}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDelete(inq._id)}
                      className="text-red-400 hover:text-red-300 uppercase tracking-widest text-[10px]"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InquiriesViewer;
