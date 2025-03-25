
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useIsMobile } from '../hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMobile) {
      if (isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen, isMobile]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#1A1A1A] shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="luxury-container flex justify-between items-center">
        <Link to="/" className="flex items-center z-20">
          <img 
            src="/lovable-uploads/63d2298c-9df3-4389-a38c-34cec49d215a.png" 
            alt="ImperialArc" 
            className="h-10 sm:h-14 md:h-18 w-auto" 
          />
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-display font-medium text-sm tracking-wider transition-colors duration-300 ${
                index === 0 ? 'text-[#D4AF37]' : 'text-white'
              } ${
                location.pathname === link.path
                  ? 'text-[#D4AF37]'
                  : isScrolled ? 'text-white hover:text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'
              } link-underline`}
            >
              {link.name.toUpperCase()}
            </Link>
          ))}
          <Link 
            to="/contact" 
            className="bg-[#000080] text-white px-6 py-3 rounded-none font-medium transition-all duration-300 hover:bg-opacity-90 hover:translate-y-[-2px]"
          >
            GET A QUOTE
          </Link>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col space-y-1.5 p-2 z-20"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 transition-all duration-300 ${
            isMobileMenuOpen 
              ? 'rotate-45 translate-y-2 bg-white' 
              : isScrolled ? 'bg-white' : 'bg-white'
          }`}></span>
          <span className={`block w-6 h-0.5 transition-all duration-300 ${
            isMobileMenuOpen 
              ? 'opacity-0' 
              : 'opacity-100 ' + (isScrolled ? 'bg-white' : 'bg-white')
          }`}></span>
          <span className={`block w-6 h-0.5 transition-all duration-300 ${
            isMobileMenuOpen 
              ? '-rotate-45 -translate-y-2 bg-white' 
              : isScrolled ? 'bg-white' : 'bg-white'
          }`}></span>
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 bg-[#1A1A1A] z-10 pt-20"
          >
            <div className="py-8 px-6 space-y-6 flex flex-col h-full">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block py-3 font-display font-medium text-base tracking-wider border-b border-gray-800 ${
                    location.pathname === link.path
                      ? 'text-[#D4AF37]'
                      : 'text-white hover:text-[#D4AF37]'
                  }`}
                >
                  {link.name.toUpperCase()}
                </Link>
              ))}
              <Link 
                to="/contact" 
                className="bg-[#000080] text-white mt-auto mb-8 w-full text-center py-3"
              >
                GET A QUOTE
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
