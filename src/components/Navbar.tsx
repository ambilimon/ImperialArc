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
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="luxury-container flex justify-between items-center">
        <Link to="/" className="flex items-center z-20">
          <img 
            src="/lovable-uploads/832c9db0-ce68-43da-a4f1-fd68503046e6.png" 
            alt="ImperialArc" 
            className="h-16 md:h-20" 
          />
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-display font-medium text-sm tracking-wider transition-colors duration-300 ${
                location.pathname === link.path
                  ? 'text-imperial-gold'
                  : isScrolled ? 'text-imperial-dark hover:text-imperial-gold' : 'text-white hover:text-imperial-gold'
              } link-underline`}
            >
              {link.name.toUpperCase()}
            </Link>
          ))}
          <Link 
            to="/contact" 
            className="luxury-btn ml-4"
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
              ? 'rotate-45 translate-y-2 bg-imperial-dark' 
              : isScrolled ? 'bg-imperial-dark' : 'bg-white'
          }`}></span>
          <span className={`block w-6 h-0.5 transition-all duration-300 ${
            isMobileMenuOpen 
              ? 'opacity-0' 
              : 'opacity-100 ' + (isScrolled ? 'bg-imperial-dark' : 'bg-white')
          }`}></span>
          <span className={`block w-6 h-0.5 transition-all duration-300 ${
            isMobileMenuOpen 
              ? '-rotate-45 -translate-y-2 bg-imperial-dark' 
              : isScrolled ? 'bg-imperial-dark' : 'bg-white'
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
            className="md:hidden fixed inset-0 bg-white z-10 pt-20"
          >
            <div className="py-8 px-6 space-y-6 flex flex-col h-full">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block py-3 font-display font-medium text-base tracking-wider border-b border-gray-100 ${
                    location.pathname === link.path
                      ? 'text-imperial-gold'
                      : 'text-imperial-dark hover:text-imperial-gold'
                  }`}
                >
                  {link.name.toUpperCase()}
                </Link>
              ))}
              <Link 
                to="/contact" 
                className="luxury-btn mt-auto mb-8 w-full text-center"
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
