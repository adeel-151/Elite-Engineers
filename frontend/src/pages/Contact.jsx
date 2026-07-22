import { useState } from 'react';
import SEO from '../components/ui/SEO';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

// Validation Schemas
const contactSchema = z.object({
  name: z.string().min(2, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Required'),
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:5000/api/inquiries', { ...data, type: 'contact' });
      toast.success('Thank you! Your message has been sent.');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full py-3 bg-transparent border-0 border-b border-gray-300 rounded-none focus:ring-0 focus:border-black outline-none text-sm transition-colors";

  return (
    <>
      <SEO 
        title="Contact Us" 
        description="Get in touch with Elite Engineers. We are ready to bring your architectural and structural visions to life."
      />
      
      {/* Gritty Full Width B&W Image */}
      <div className="h-72 w-full bg-black relative pt-24">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
          alt="Building Texture" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-end pb-8 px-6 md:px-12">
          <p className="text-white/50 text-xs tracking-[0.3em] uppercase">Elite Engineers / Contact</p>
        </div>
      </div>

      <div className="py-24 bg-white relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-6">CONTACT US</h2>
            <p className="text-xs tracking-widest text-gray-500 uppercase">Say hello or drop us a line about your idea.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <input {...register('name')} placeholder="Name" className={inputClasses} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <input {...register('email')} type="email" placeholder="Email" className={inputClasses} />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>
              
              <div>
                <input {...register('phone')} placeholder="Phone" className={inputClasses} />
              </div>
              
              <div>
                <textarea {...register('message')} rows="1" placeholder="Type Message..." className={`${inputClasses} resize-none overflow-hidden min-h-[40px]`}></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>

              <div className="text-center pt-8">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-12 py-3 border border-accent text-accent hover:bg-accent hover:text-white transition-colors text-xs tracking-widest uppercase rounded-full"
                >
                  {isSubmitting ? 'SENDING...' : 'SEND'}
                </button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </>
  );
};

export default Contact;
