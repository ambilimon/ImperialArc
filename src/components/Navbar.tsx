
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

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
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/8f78daef-9b18-4a7f-bb6d-533938433f50.png" 
            alt="ImperialArc Logo" 
            className="h-10 md:h-12" 
          />
        </Link>

        {/* Desktop Navigation */}
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col space-y-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 ${isScrolled ? 'bg-imperial-dark' : 'bg-white'} transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 ${isScrolled ? 'bg-imperial-dark' : 'bg-white'} transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block w-6 h-0.5 ${isScrolled ? 'bg-imperial-dark' : 'bg-white'} transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full bg-white shadow-lg transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'
        }`}
      >
        <div className="py-5 px-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`block py-2 font-display font-medium text-sm tracking-wider ${
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
            className="block w-full text-center luxury-btn mt-4"
          >
            GET A QUOTE
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
