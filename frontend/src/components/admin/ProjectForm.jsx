import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import API_BASE_URL from '../../config/api';

const projectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  location: z.string().min(2, 'Location is required'),
});

const ProjectForm = ({ token, initialData = null, onSuccess, onCancel }) => {
  const [images, setImages] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!initialData;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData || {
      category: 'Architectural & Structural Design'
    }
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({ category: 'Architectural & Structural Design', title: '', description: '', location: '' });
    }
  }, [initialData, reset]);

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    const toastId = toast.loading(isEditing ? 'Updating project...' : 'Uploading project...');

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('category', data.category);
    formData.append('description', data.description);
    formData.append('location', data.location);
    
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    } else if (!isEditing) {
      toast.error('Please upload at least one image', { id: toastId });
      setIsSubmitting(false);
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`${API_BASE_URL}/api/projects/${initialData._id}`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        toast.success('Project updated successfully!', { id: toastId });
      } else {
        await axios.post(`${API_BASE_URL}/api/projects`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        toast.success('Project created successfully!', { id: toastId });
      }
      
      reset();
      setImages(null);
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save project', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full py-3 bg-transparent border-0 border-b border-gray-300 rounded-none focus:ring-0 focus:border-black outline-none text-sm transition-colors mb-2";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
        <div>
          <input type="text" placeholder="Project Title" className={inputClasses} {...register('title')} />
          {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
        </div>
        
        <div>
          <select className={inputClasses} {...register('category')}>
            <option value="Architectural & Structural Design">Architectural & Structural Design</option>
            <option value="Construction">Construction</option>
            <option value="Project Management & Supervision">Project Management & Supervision</option>
            <option value="Renovation & Interior Fit-Out">Renovation & Interior Fit-Out</option>
            <option value="Quantity Surveying/Estimation/BOQs">Quantity Surveying/Estimation/BOQs</option>
            <option value="Engineering Consultancy">Engineering Consultancy</option>
          </select>
          {errors.category && <p className="text-red-500 text-xs">{errors.category.message}</p>}
        </div>
      </div>

      <div className="mb-4">
        <input type="text" placeholder="Location (e.g. DHA, Lahore)" className={inputClasses} {...register('location')} />
        {errors.location && <p className="text-red-500 text-xs">{errors.location.message}</p>}
      </div>

      <div className="mb-4">
        <textarea placeholder="Project Description..." rows="4" className={`${inputClasses} resize-none min-h-[100px]`} {...register('description')}></textarea>
        {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
      </div>

      <div className="mb-8">
        <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">
          {isEditing ? 'Upload New Images (Optional - will replace old ones)' : 'Upload Images (Max 10)'}
        </label>
        <input 
          type="file" multiple accept="image/*" onChange={e => setImages(e.target.files)}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:tracking-widest file:uppercase file:bg-gray-100 file:text-black hover:file:bg-gray-200"
        />
      </div>

      <div className="flex gap-4">
        <button type="submit" disabled={isSubmitting} className={`px-12 py-3 text-xs tracking-widest uppercase transition-colors rounded-full ${isSubmitting ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}>
          {isSubmitting ? 'Please Wait...' : (isEditing ? 'Update Project' : 'Publish Project')}
        </button>
        {isEditing && (
          <button type="button" onClick={onCancel} className="px-12 py-3 text-xs tracking-widest uppercase transition-colors rounded-full bg-gray-200 text-black hover:bg-gray-300">
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
};

export default ProjectForm;
