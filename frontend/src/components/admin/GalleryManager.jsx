import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';
import API_BASE_URL from '../../config/api';

const GalleryManager = ({ token }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  const fetchImages = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/gallery`);
      setImages(res.data.data.images);
    } catch (err) {
      toast.error('Failed to load gallery images');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error('Please select an image');

    setUploading(true);
    const toastId = toast.loading('Uploading image...');
    
    const formData = new FormData();
    formData.append('image', file);

    try {
      await axios.post(`${API_BASE_URL}/api/gallery`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      toast.success('Image uploaded successfully', { id: toastId });
      setFile(null);
      document.getElementById('gallery-upload-input').value = '';
      fetchImages();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed', { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/gallery/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      toast.success('Image deleted');
      setImages(images.filter(img => img._id !== id));
    } catch (err) {
      toast.error('Failed to delete image');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-display uppercase tracking-widest mb-6 text-white">Manage Gallery Images</h2>
      
      <form onSubmit={handleUpload} className="mb-10 bg-primary p-6 border border-gray-800 flex flex-col md:flex-row items-start md:items-end gap-4">
        <div className="flex-1 w-full">
          <label className="block text-xs text-gray-400 uppercase tracking-widest mb-4">Upload New Image</label>
          <input 
            id="gallery-upload-input"
            type="file" 
            accept="image/*" 
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-xs file:tracking-widest file:uppercase file:bg-accent file:text-white hover:file:bg-black transition-all duration-300 cursor-pointer transition-all"
          />
        </div>
        <button 
          type="submit" 
          disabled={uploading || !file} 
          className={`px-8 py-3 w-full md:w-auto text-xs tracking-widest uppercase transition-colors rounded-full mt-4 md:mt-0 ${uploading || !file ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-accent text-white hover:bg-black transition-colors duration-300'}`}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading images...</div>
      ) : images.length === 0 ? (
        <div className="text-center py-12 text-gray-400 bg-primary border border-gray-800 rounded">No images found. Upload some!</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map(img => (
            <div key={img._id} className="relative group aspect-square bg-secondary border border-gray-800 overflow-hidden rounded hover:border-gray-600 transition-all">
              <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  onClick={() => handleDelete(img._id)}
                  className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg hover:scale-110"
                  title="Delete image"
                >
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

export default GalleryManager;
