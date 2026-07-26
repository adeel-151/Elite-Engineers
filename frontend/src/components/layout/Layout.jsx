import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTop from '../ui/BackToTop';
import FloatingWhatsApp from '../ui/FloatingWhatsApp';
import CookieConsent from '../ui/CookieConsent';
import PageTransition from './PageTransition';

const Layout = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Navbar />
      <main className="flex-grow pt-0">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <BackToTop />
      
      {/* WhatsApp Floating Button */}
      <FloatingWhatsApp />

      {/* Cookie Consent Banner */}
      <CookieConsent />
    </div>
  );
};

export default Layout;
