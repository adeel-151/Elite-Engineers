import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaChevronUp } from 'react-icons/fa';

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
    setSubmitStatus(null);
    try {
      await axios.post('http://localhost:5000/api/inquiries', { ...data, type: 'contact' });
      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full py-3 bg-transparent border-0 border-b border-gray-300 rounded-none focus:ring-0 focus:border-black outline-none text-sm transition-colors";

  return (
    <>
      <Helmet>
        <title>Contact Us | Elite Engineers</title>
      </Helmet>
      
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
            {submitStatus === 'success' && (
              <div className="mb-8 p-4 text-sm text-green-700 bg-green-50 border border-green-200">
                Thank you! Your message has been sent.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-8 p-4 text-sm text-red-700 bg-red-50 border border-red-200">
                Failed to send message. Please try again.
              </div>
            )}

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

        {/* Floating Divider Icon */}
        <div className="absolute -top-6 right-8 md:right-24 w-12 h-12 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-400">
           <FaChevronUp />
        </div>
      </div>

      {/* Gritty Full Width B&W Image */}
      <div className="h-64 w-full bg-black relative">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
          alt="Building Texture" 
          className="w-full h-full object-cover opacity-60"
        />
        {/* Bottom divider pointing to footer */}
        <div className="absolute -bottom-6 right-8 md:right-24 w-12 h-12 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-400 z-10">
           <FaChevronUp />
        </div>
      </div>
    </>
  );
};

export default Contact;
