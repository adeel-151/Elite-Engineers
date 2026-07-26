import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Small delay so it doesn't pop up instantly on page load
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowConsent(false);
    // You can initialize analytics/tracking scripts here
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setShowConsent(false);
    // Ensure no tracking cookies are set here
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-8 pointer-events-none"
        >
          <div className="max-w-6xl mx-auto pointer-events-auto">
            <div className="bg-secondary relative shadow-[0_-10px_40px_rgba(0,0,0,0.5)] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
              {/* Top Accent Bar */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-accent"></div>
              
              <div className="flex-1 z-10 relative">
                <h3 className="text-lg font-display uppercase tracking-widest text-white mb-2">
                  Privacy Options
                </h3>
                <p className="text-sm font-light text-gray-400 leading-relaxed max-w-3xl">
                  We use cookies to ensure you get the best experience on our website, serve personalized content, and analyze our traffic. 
                  By clicking <span className="text-white font-normal">"Accept"</span>, you consent to our use of cookies.
                </p>
              </div>
              <div className="flex flex-row items-center gap-4 shrink-0 z-10 relative w-full md:w-auto mt-4 md:mt-0">
                <button
                  onClick={handleReject}
                  className="flex-1 md:flex-none px-6 py-3 bg-transparent border border-gray-700 text-gray-400 uppercase tracking-widest text-xs hover:border-white hover:text-white transition-all duration-300"
                >
                  Reject
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 md:flex-none px-8 py-3 bg-accent text-white uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(195,152,107,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
