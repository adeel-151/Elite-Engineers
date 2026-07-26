import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTop from '../ui/BackToTop';
import FloatingWhatsApp from '../ui/FloatingWhatsApp';
import CookieConsent from '../ui/CookieConsent';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Navbar />
      <main className="flex-grow pt-0">
        <Outlet />
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
