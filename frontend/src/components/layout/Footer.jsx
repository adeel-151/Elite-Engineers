import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaTwitter,
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock,
  FaArrowRight, FaCheckCircle, FaChevronUp, FaWhatsapp,
} from 'react-icons/fa';
import { useState } from 'react';
import logoImg from '../../assets/logo.png';

// ─── Footer Data ─────────────────────────────────────────────────────────────
const services = [
  'Engineering & Construction Services',
  'Turnkey Construction Solutions',
  'Grey Structure Execution',
  'Architectural Consultancy',
  'Structural Design & Analysis',
  '3D Interior & Exterior Design',
  'Project Planning & Supervision',
  'Land Surveying Services',
  'Town Planning & Development',
];

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Our Portfolio', path: '/projects' },
  { label: 'Services', path: '/services' },
  { label: 'Our Clients', path: '/clients' },
  { label: 'Contact Us', path: '/contact' },
];

const certifications = [
  'ISO 9001 Certified',
  'PEC Registered',
  'DHA Approved',
  'LEED Certified',
  'NESPAK Partner',
  'LDA Approved',
];

const socials = [
  { icon: FaFacebookF, href: 'https://facebook.com', label: 'Facebook' },
  { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: FaLinkedinIn, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: FaYoutube, href: 'https://youtube.com', label: 'YouTube' },
  { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
];

// ─── Footer Component ─────────────────────────────────────────────────────────
const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#080d1a] text-white relative overflow-hidden">

      {/* ── Blueprint Background Pattern ─────────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(245,158,11,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,158,11,0.6) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* ── Top Start-Project CTA Band ─────────────────────────────────────── */}
      <div className="relative border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-2">Ready to Begin?</p>
              <h3 className="text-white text-2xl md:text-3xl font-display tracking-widest uppercase font-light">
                Let's Build Something <span className="text-amber-400 font-bold">Iconic</span> Together
              </h3>
            </div>
            <Link
              to="/contact"
              className="flex-shrink-0 flex items-center gap-3 px-8 py-4 bg-amber-400 text-black text-xs tracking-widest uppercase font-bold hover:bg-white transition-colors duration-300"
            >
              Start Your Project <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Footer Grid ───────────────────────────────────────────────── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

          {/* Column 1 — Brand & Bio */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link to="/" className="flex items-center mb-6 group w-fit">
              <img
                src={logoImg}
                alt="Elite Engineers Logo"
                className="h-16 object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              />
            </Link>

            <p className="text-gray-400 font-light text-sm leading-relaxed mb-6 max-w-sm">
              Pakistan's premier engineering consultancy — transforming ambitious visions into architectural masterpieces. 15 years of structural precision, design excellence, and unwavering client trust.
            </p>

            {/* Contact quick info */}
            <div className="space-y-3 mb-8 text-sm text-gray-400">
              <a href="tel:+923025719521" className="flex items-center gap-3 hover:text-amber-400 transition-colors">
                <FaPhoneAlt className="text-amber-400 flex-shrink-0" />
                <span>+92 302-571-9521</span>
              </a>
              <a href="https://wa.me/923030002300" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-amber-400 transition-colors">
                <FaWhatsapp className="text-amber-400 flex-shrink-0" />
                <span>+92 303-000-2300</span>
              </a>
              <a href="mailto:elite.pk@outlook.com" className="flex items-center gap-3 hover:text-amber-400 transition-colors">
                <FaEnvelope className="text-amber-400 flex-shrink-0" />
                <span>elite.pk@outlook.com</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 border border-white/15 flex items-center justify-center text-gray-400 hover:bg-amber-400 hover:border-amber-400 hover:text-black transition-all duration-300 text-xs"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Our Services */}
          <div>
            <h4 className="text-white font-display text-xs tracking-[0.25em] uppercase mb-7 pb-3 border-b border-white/10">Our Services</h4>
            <ul className="space-y-3">
              {services.map((svc) => (
                <li key={svc}>
                  <Link
                    to="/services"
                    className="text-gray-400 font-light text-sm hover:text-amber-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-amber-400/0 group-hover:bg-amber-400 rounded-full transition-colors duration-300 flex-shrink-0" />
                    {svc}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Quick Links */}
          <div>
            <h4 className="text-white font-display text-xs tracking-[0.25em] uppercase mb-7 pb-3 border-b border-white/10">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-gray-400 font-light text-sm hover:text-amber-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-amber-400/0 group-hover:bg-amber-400 rounded-full transition-colors duration-300 flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Office Hours */}
            <div className="mt-8 p-4 bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-amber-400 text-xs tracking-widest uppercase mb-2">
                <FaClock className="text-[10px]" />
                <span>Office Hours</span>
              </div>
              <p className="text-gray-400 text-xs font-light">Mon – Sat: 9:00 AM – 7:00 PM</p>
              <p className="text-gray-500 text-xs font-light">Sunday: By Appointment</p>
            </div>
          </div>

          {/* Column 4 — Contact & Newsletter */}
          <div>
            <h4 className="text-white font-display text-xs tracking-[0.25em] uppercase mb-7 pb-3 border-b border-white/10">Stay Updated</h4>

            {/* Address */}
            <div className="flex items-start gap-3 text-gray-400 text-sm mb-6">
              <FaMapMarkerAlt className="text-amber-400 mt-1 flex-shrink-0" />
              <div>
                <p className="font-light">Office# A-09, Block A, Islamabad Comfort</p>
                <p className="font-light">Main road H-13, Opp. NUST University</p>
                <p className="font-light">Islamabad, Pakistan — 45200</p>
                <a
                  href="https://maps.google.com/?q=H-13+Islamabad+Comfort+NUST+University+Islamabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] tracking-widest uppercase text-amber-400/70 hover:text-amber-400 transition-colors mt-1 block"
                >
                  View on Map →
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <p className="text-gray-400 font-light text-xs leading-relaxed mb-4">
              Subscribe for construction insights, project showcases, and engineering news from Pakistan's top firm.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full bg-white/5 border border-white/15 text-white placeholder-gray-600 px-4 py-3 text-xs focus:outline-none focus:border-amber-400 transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-amber-400 text-black text-xs tracking-widest uppercase py-3 font-bold hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2"
              >
                {subscribed ? (
                  <>
                    <FaCheckCircle /> Subscribed!
                  </>
                ) : (
                  <>Subscribe <FaArrowRight className="text-[10px]" /></>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* ── Awards & Certifications Row ────────────────────────────────────── */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-gray-600 text-[10px] tracking-widest uppercase mr-2">Certified & Approved:</span>
            {certifications.map((cert) => (
              <span
                key={cert}
                className="border border-amber-400/30 text-amber-400/70 text-[10px] tracking-widest uppercase px-3 py-1.5 hover:border-amber-400 hover:text-amber-400 transition-colors cursor-default"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ─────────────────────────────────────────────────────── */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-gray-600 tracking-wider">

            <p>© {new Date().getFullYear()} ELITE ENGINEERS. ALL RIGHTS RESERVED.</p>

            <div className="flex items-center gap-1 text-gray-600">
              <span>Made in</span>
              <span className="text-base leading-none">🇵🇰</span>
              <span>Pakistan with</span>
              <span className="text-red-500 text-base leading-none">♥</span>
            </div>

            <div className="flex gap-6 text-gray-600">
              <a href="#" className="hover:text-amber-400 transition-colors uppercase">Privacy Policy</a>
              <a href="#" className="hover:text-amber-400 transition-colors uppercase">Terms of Service</a>
              <a href="#" className="hover:text-amber-400 transition-colors uppercase">Sitemap</a>
            </div>

          </div>
        </div>
      </div>


    </footer>
  );
};

export default Footer;
