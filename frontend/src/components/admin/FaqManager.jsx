import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaTrash, FaEdit } from 'react-icons/fa';
import API_BASE_URL from '../../config/api';

const FaqManager = ({ token }) => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const fetchFaqs = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/faqs`);
      setFaqs(res.data.data.faqs || []);
    } catch (err) {
      toast.error('Failed to load FAQs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const resetForm = () => {
    setQuestion('');
    setAnswer('');
    setEditingId(null);
  };

  const handleEdit = (faq) => {
    setEditingId(faq._id);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question || !answer) return toast.error('Both fields are required');

    setIsSubmitting(true);
    const toastId = toast.loading(editingId ? 'Updating FAQ...' : 'Adding FAQ...');

    const data = { question, answer };

    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/faqs/${editingId}`, data, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        toast.success('FAQ updated successfully', { id: toastId });
      } else {
        await axios.post(`${API_BASE_URL}/api/faqs`, data, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        toast.success('FAQ added successfully', { id: toastId });
      }
      resetForm();
      fetchFaqs();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/faqs/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      toast.success('FAQ deleted');
      fetchFaqs();
    } catch (err) {
      toast.error('Failed to delete FAQ');
    }
  };

  const inputClasses = "w-full py-3 bg-transparent border-0 border-b border-gray-700 rounded-none focus:ring-0 focus:border-accent outline-none text-sm transition-colors mb-2 text-white placeholder-gray-500";

  return (
    <div>
      <h2 className="text-xl font-display uppercase tracking-widest mb-8 text-white">
        {editingId ? 'Edit FAQ' : 'Add New FAQ'}
      </h2>

      <form onSubmit={handleSubmit} className="mb-12 bg-primary p-6 border border-gray-800">
        <div className="mb-4">
          <input type="text" placeholder="Question" className={inputClasses} value={question} onChange={e => setQuestion(e.target.value)} required />
        </div>

        <div className="mb-8">
          <textarea placeholder="Answer" rows="4" className={`${inputClasses} resize-none`} value={answer} onChange={e => setAnswer(e.target.value)} required></textarea>
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={isSubmitting} className={`px-12 py-3 text-xs tracking-widest uppercase transition-colors rounded-full ${isSubmitting ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-accent text-white hover:bg-black transition-colors duration-300'}`}>
            {isSubmitting ? 'Please Wait...' : (editingId ? 'Update FAQ' : 'Save FAQ')}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="px-12 py-3 text-xs tracking-widest uppercase transition-colors rounded-full bg-transparent text-accent hover:bg-accent hover:text-white border border-accent transition-colors duration-300">
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="text-xl font-display uppercase tracking-widest mb-6 text-white">Existing FAQs</h2>
      {loading ? (
        <div className="text-gray-400 text-sm">Loading FAQs...</div>
      ) : faqs.length === 0 ? (
        <div className="text-gray-400 text-sm italic">No FAQs found.</div>
      ) : (
        <div className="flex flex-col gap-4">
          {faqs.map(faq => (
            <div key={faq._id} className="border border-gray-800 bg-primary p-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between hover:border-gray-600 transition-all">
              <div className="flex-grow">
                <h3 className="font-display uppercase tracking-widest text-sm mb-2 text-white">{faq.question}</h3>
                <p className="text-xs text-gray-400">{faq.answer}</p>
              </div>
              
              <div className="flex gap-2 shrink-0 w-full md:w-auto">
                <button onClick={() => handleEdit(faq)} className="flex-1 md:flex-none px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white text-xs tracking-widest uppercase transition-colors flex justify-center items-center gap-2">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(faq._id)} className="flex-1 md:flex-none px-4 py-2 bg-red-900/30 hover:bg-red-900/50 text-red-500 hover:text-red-400 text-xs tracking-widest uppercase transition-colors flex justify-center items-center gap-2">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FaqManager;
