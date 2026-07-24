import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { lazy, Suspense, useState } from 'react';
import Layout from './components/layout/Layout';
import SkeletonLoader from './components/ui/SkeletonLoader';
import InitialLoader from './components/ui/InitialLoader';

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Clients = lazy(() => import('./pages/Clients'));
const Contact = lazy(() => import('./pages/Contact'));
const Admin = lazy(() => import('./pages/Admin'));

function App() {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <>
      {showLoader && <InitialLoader onComplete={() => setShowLoader(false)} />}
      
      <Toaster position="top-center" toastOptions={{ duration: 4000, style: { borderRadius: '10px', background: '#333', color: '#fff' } }} />
      
      <div style={{ opacity: showLoader ? 0 : 1, transition: 'opacity 0.5s ease-in' }}>
        <Suspense fallback={<div className="min-h-screen pt-24"><SkeletonLoader type="detail" /></div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<ProjectDetails />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="clients" element={<Clients />} />
            <Route path="contact" element={<Contact />} />
            <Route path="admin" element={<Admin />} />
          </Route>
        </Routes>
      </Suspense>
      </div>
    </>
  );
}

export default App;
