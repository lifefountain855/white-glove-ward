import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, CircleDollarSign, BriefcaseBusiness, Home, CircleHelp, Info, LogIn, Menu, X } from 'lucide-react';
import Favicon from '../Favicon'

const navigationItems = [
  { label: 'home', to: '/', icon: Home },
  { label: 'services', to: '/services', icon: BriefcaseBusiness },
  { label: 'pricing', to: '/pricing', icon: CircleDollarSign },
  { label: 'about', to: '/about', icon: Info },
  { label: 'faq', to: '/faq', icon: CircleHelp },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  const location = useLocation();
  return (
    <nav className="w-full border-b border-border-subtle">
      <div className="max-w-[1400px] mx-auto px-8 py-6 flex items-center justify-between gap-5">
        
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
          {/* <img src="/logo.png" alt="white Glove Logo" className="w-8 h-8 object-contain filter invert" /> */}
          <Favicon className='w-20 lg:w-10'/>
          <span className="flex flex-col lg:flex-row gap-2 font-bold text-lg tracking-widest"><span>white</span><span>glove</span><span>ward</span></span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 lg:gap-10">
          {navigationItems.slice(1).map(({ label, to }) => (
            <Link key={to} to={to} className="hover:text-secondary transition-colors">{label}</Link>
          ))}
        </div>

        {/* CTA and Portal */}
        <div className="flex items-center gap-6">
          <Link to="/portal/login" className="group btn-secondary px-2! text-center hidden md:inline-flex text-sm">
           <span className='group-hover:translate-x-2 transition-transform duration-250 pr-1'>&gt;</span>
            <span>portal login</span>
            <span className='group-hover:-translate-x-2 transition-transform duration-250 pl-1'>&lt;</span>
          </Link>
          <Link to="/portal/customer" className="group btn-primary text-center hidden text-sm md:inline-flex">
            book a cleaning <span className='group-hover:translate-x-2 transition-transform duration-250'>→</span>
          </Link>
          <button
            type="button"
            className={`md:hidden p-2 border border-border-subtle hover:bg-black hover:text-white transition-colors ${isMenuOpen ? 'relative z-[60]' : ''}`}
            aria-label={isMenuOpen ? 'close navigation menu' : 'open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="close navigation menu"
              className="md:hidden fixed inset-0 z-40 cursor-default bg-black/65 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />
            <motion.div
              id="mobile-navigation"
              className="md:hidden fixed right-0 top-0 z-50 h-screen w-[min(88vw,380px)] overflow-y-auto border-l border-border-subtle bg-white px-2 pb-8 pt-24 shadow-2xl"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <div className="flex flex-col gap-2 mt-4">
                {navigationItems.map(({ label, to, icon: Icon }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={closeMenu}
                    className={`relative px-8 flex items-center gap-4 border-b border-border-subtle py-4 text-base transition-colors `+(label=='home' ? 'bg-black/90 text-white hover:text-white/60' :' hover:text-secondary') }
                  >
                    <Icon size={18} aria-hidden="true" />
                    <span>{label}</span>
                    {location.pathname==to && (<span className='absolute right-8 text-secondary'>&lt;</span>)}
                  </Link>
                ))}
                <div className='h-[5vh] flex-grow'></div>
                <Link
                  to="/portal/login"
                  onClick={closeMenu}
                  className="btn-secondary mt-4 flex flex-row justify-center text-sm"
                >
                  <span>&gt; portal login &lt;</span>
                </Link>
                <Link
                  to="/portal/customer"
                  onClick={closeMenu}
                  className="btn-primary mt-4 flex flex-row justify-center text-sm"
                >
                  <span>book a cleaning</span>
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
