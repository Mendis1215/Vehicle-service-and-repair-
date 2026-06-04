import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaWrench } from 'react-icons/fa';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Reviews', path: '/reviews' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-brand-dark shadow-lg shadow-black/50 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <img src="/logo.png" alt="L.Y.Mendis" className="h-12 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                id={`nav-${link.name.toLowerCase()}`}
                className={`nav-link font-body font-medium text-sm tracking-wide ${
                  location.pathname === link.path ? 'active text-brand-red' : 'text-brand-white'
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="tel:0777103387"
              className="bg-brand-red hover:bg-brand-red-hover text-white font-body font-semibold text-sm px-5 py-2 rounded transition-colors"
            >
              Call Now
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          id="mobile-menu-btn"
          className="md:hidden text-brand-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-dark border-t border-brand-gray px-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block py-3 font-body font-medium border-b border-brand-gray/50 ${
                location.pathname === link.path ? 'text-brand-red' : 'text-brand-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="tel:0777103387"
            className="block mt-4 text-center bg-brand-red text-white font-semibold py-3 rounded"
          >
            Call Now
          </a>
        </div>
      )}
    </nav>
  );
}
