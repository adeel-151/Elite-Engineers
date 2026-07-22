import { useState, useEffect } from 'react';
import SEO from '../components/ui/SEO';
import axios from 'axios';
import SectionHeading from '../components/ui/SectionHeading';
import SkeletonLoader from '../components/ui/SkeletonLoader';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/clients');
        setClients(res.data.data.clients);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch clients. Please try again later.');
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  return (
    <>
      <SEO 
        title="Our Clients" 
        description="Elite Engineers takes pride in partnering with leading organizations and delivering excellence across all projects."
      />
      <div className="pt-32 pb-24 bg-surface min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading subtitle="Trusted By" title="Our Valued Clients" centered />
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">We are proud to have partnered with leading organizations to deliver excellence in every project.</p>
          
          {loading && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-center">
               <SkeletonLoader type="client" />
               <SkeletonLoader type="client" />
               <SkeletonLoader type="client" />
               <SkeletonLoader type="client" />
               <SkeletonLoader type="client" />
               <SkeletonLoader type="client" />
            </div>
          )}

          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && clients.length === 0 && (
            <p className="text-gray-500 text-lg">No clients to display yet.</p>
          )}

          {!loading && !error && clients.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-center">
               {clients.map((client) => (
                 <div key={client._id} className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                   {client.logo ? (
                     <img src={client.logo} alt={client.name} className="max-h-20 w-auto mb-4 object-contain" />
                   ) : (
                     <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400 font-bold text-xl">
                       {client.name.charAt(0)}
                     </div>
                   )}
                   <span className="font-semibold text-sm text-gray-700">{client.name}</span>
                 </div>
               ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Clients;
