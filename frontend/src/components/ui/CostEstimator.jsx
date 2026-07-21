import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const CostEstimator = () => {
  const [projectType, setProjectType] = useState('residential');
  const [area, setArea] = useState(2000);
  const [quality, setQuality] = useState('standard');
  const [estimatedCost, setEstimatedCost] = useState({ min: 0, max: 0 });
  const [email, setEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pricing constants (PKR per Sq Ft roughly)
  const rates = {
    residential: { standard: 5000, premium: 7000, luxury: 10000 },
    commercial: { standard: 6000, premium: 8500, luxury: 12000 },
    interior: { standard: 3000, premium: 5000, luxury: 8000 }
  };

  useEffect(() => {
    // Calculate cost based on inputs
    const baseRate = rates[projectType][quality];
    const cost = baseRate * area;
    // Provide a -10% to +10% range
    setEstimatedCost({
      min: cost * 0.9,
      max: cost * 1.1
    });
  }, [projectType, area, quality]);

  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      return `PKR ${(amount / 10000000).toFixed(2)} Crore`;
    } else if (amount >= 100000) {
      return `PKR ${(amount / 100000).toFixed(2)} Lac`;
    }
    return `PKR ${amount.toLocaleString()}`;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      await axios.post('http://localhost:5000/api/inquiries', {
        name: 'Estimator Tool Lead',
        email,
        message: `Requested detailed cost breakdown for a ${area} sq ft ${quality} ${projectType} project. Estimated Range: ${formatCurrency(estimatedCost.min)} - ${formatCurrency(estimatedCost.max)}`,
        type: 'quotation'
      });
      setSubmitStatus('success');
      setEmail('');
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 border border-gray-200 p-8 md:p-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h3 className="text-3xl font-display uppercase tracking-widest mb-4">Instant Cost Estimator</h3>
        <p className="text-sm font-light text-gray-500">Get a rough estimate for your upcoming project in seconds.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Controls */}
        <div className="space-y-8">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-4">Project Type</label>
            <div className="flex gap-4">
              {['residential', 'commercial', 'interior'].map(type => (
                <button 
                  key={type}
                  onClick={() => setProjectType(type)}
                  className={`flex-1 py-3 border text-xs tracking-widest uppercase transition-colors ${projectType === type ? 'border-accent bg-accent text-white' : 'border-gray-300 text-gray-500 hover:border-black hover:text-black'}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-4">
              Total Area: <span className="text-black font-semibold">{area.toLocaleString()} Sq Ft</span>
            </label>
            <input 
              type="range" 
              min="500" max="20000" step="100" 
              value={area} 
              onChange={(e) => setArea(Number(e.target.value))}
              className="w-full accent-accent h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>500 sq ft</span>
              <span>20,000+ sq ft</span>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-4">Finish Quality</label>
            <div className="flex gap-4">
              {['standard', 'premium', 'luxury'].map(q => (
                <button 
                  key={q}
                  onClick={() => setQuality(q)}
                  className={`flex-1 py-3 border text-xs tracking-widest uppercase transition-colors ${quality === q ? 'border-accent bg-accent text-white' : 'border-gray-300 text-gray-500 hover:border-black hover:text-black'}`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results & Lead Capture */}
        <div className="bg-white p-8 border border-gray-200 flex flex-col justify-center text-center">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Estimated Range</p>
          <div className="text-2xl md:text-3xl lg:text-4xl font-display text-accent mb-8">
            {formatCurrency(estimatedCost.min)} <br/><span className="text-sm text-gray-400 font-sans">to</span> <br/>{formatCurrency(estimatedCost.max)}
          </div>
          
          <p className="text-xs font-light text-gray-500 mb-6 italic">
            *This is a rough estimate. Actual costs vary based on site conditions, material choices, and design complexity.
          </p>

          <form onSubmit={handleEmailSubmit} className="mt-auto">
            {submitStatus === 'success' ? (
              <div className="p-3 bg-green-50 text-green-700 text-sm border border-green-200">
                Detailed estimate sent to your email!
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  required
                  placeholder="Enter email for detailed breakdown" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-none focus:outline-none focus:border-black text-sm"
                />
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="py-3 px-6 bg-black text-white text-xs uppercase tracking-widest hover:bg-accent transition-colors"
                >
                  {isSubmitting ? 'Sending...' : 'Send Details'}
                </button>
              </div>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-500 text-xs mt-2">Failed to send. Try again.</p>
            )}
          </form>
        </div>

      </div>
    </div>
  );
};

export default CostEstimator;
