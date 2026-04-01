import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ cartCount, setIsCartOpen }: { cartCount: number, setIsCartOpen: (open: boolean) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Catálogo', path: '/catalogo' },
    { name: 'Nosotros', path: '/#about' },
    { name: 'Tiendas', path: '/#locations' },
  ];

  const handleNav = (path: string) => {
    if (path.includes('#')) {
      const [route, hash] = path.split('#');
      if (location.pathname === route || (route === '' && location.pathname === '/')) {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(path);
      }
    } else {
      navigate(path);
      if (path === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 border-b border-[#1A1A1A]/10 transition-all duration-300 ${isMenuOpen
      ? 'bg-white'
      : 'bg-white shadow-md md:bg-[#F9F7F2]/80 md:backdrop-blur-md md:shadow-none'
      }`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative z-50">
        <Link
          to="/"
          className="flex items-center"
        >
          <img
            src="/logo.png"
            alt="BD SOCKS"
            className="w-35 object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={(e) => {
                if (link.path.includes('#')) {
                  const [route, hash] = link.path.split('#');
                  if (location.pathname === route || (route === '' && location.pathname === '/')) {
                    e.preventDefault();
                    const el = document.getElementById(hash);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              className={`text-sm uppercase tracking-widest transition-colors hover:text-[#4A5D4E] ${location.pathname === link.path ? 'font-bold underline underline-offset-8 text-[#4A5D4E]' : 'text-[#1A1A1A]/70'
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 hover:bg-[#1A1A1A]/5 rounded-full transition-colors"
          >
            <FontAwesomeIcon icon={faShoppingBag} className="w-6 h-6 text-[#1A1A1A]" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#4A5D4E] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="md:hidden p-2 text-[#1A1A1A]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 flex flex-col space-y-6"
          >
            {navLinks.map(link => (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className="text-2xl font-serif text-left border-b border-[#1A1A1A]/5 pb-4 text-[#1A1A1A]"
              >
                {link.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
