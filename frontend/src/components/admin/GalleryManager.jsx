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
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
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
      <h2 className="text-xl font-display uppercase tracking-widest mb-6">Manage Gallery Images</h2>
      
      <form onSubmit={handleUpload} className="mb-10 bg-gray-50 p-6 border border-gray-100 flex items-end gap-4">
        <div className="flex-1">
          <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Upload New Image</label>
          <input 
            id="gallery-upload-input"
            type="file" 
            accept="image/*" 
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:tracking-widest file:uppercase file:bg-white file:border file:border-gray-200 file:text-black hover:file:bg-gray-100"
          />
        </div>
        <button 
          type="submit" 
          disabled={uploading || !file} 
          className={`px-8 py-2 text-xs tracking-widest uppercase transition-colors rounded-full ${uploading || !file ? 'bg-gray-300 text-white cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading images...</div>
      ) : images.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No images found. Upload some!</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map(img => (
            <div key={img._id} className="relative group aspect-square bg-gray-100 border border-gray-200 overflow-hidden">
              <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  onClick={() => handleDelete(img._id)}
                  className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
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
