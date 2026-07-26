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
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 pointer-events-none"
        >
          <div className="max-w-6xl mx-auto pointer-events-auto">
            <div className="bg-white rounded-lg shadow-[0_-5px_20px_rgba(0,0,0,0.15)] border border-gray-100 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-display uppercase tracking-widest text-primary mb-2">
                  We Value Your Privacy
                </h3>
                <p className="text-sm font-light text-gray-600 leading-relaxed">
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                  By clicking "Accept", you consent to our use of cookies.
                </p>
              </div>
              <div className="flex flex-row items-center gap-4 shrink-0">
                <button
                  onClick={handleReject}
                  className="px-6 py-2.5 bg-gray-100 text-gray-700 uppercase tracking-widest text-xs font-semibold hover:bg-gray-200 transition-colors duration-300 rounded"
                >
                  Reject All
                </button>
                <button
                  onClick={handleAccept}
                  className="px-6 py-2.5 bg-accent text-white uppercase tracking-widest text-xs font-semibold hover:bg-black transition-colors duration-300 rounded"
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
