import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LayoutDashboard } from 'lucide-react';

const navLinks = [
  { label: 'الرئيسية', href: '/', en: 'Home' },
  { label: 'مشاريعنا', href: '/projects', en: 'Projects' },
  { label: 'من نحن', href: '/about', en: 'About' },
  { label: 'تواصل معنا', href: '/contact', en: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-dark py-3' : 'py-6'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <svg width="36" height="36" viewBox="0 0 80 80" className="transition-transform group-hover:scale-110 duration-300">
                <path d="M10 70 L10 40 Q10 10 40 10 Q70 10 70 40 L70 70" fill="none" stroke="#C9A84C" strokeWidth="3"/>
                <line x1="10" y1="70" x2="70" y2="70" stroke="#C9A84C" strokeWidth="3"/>
                <line x1="40" y1="10" x2="40" y2="70" stroke="rgba(201,168,76,0.3)" strokeWidth="1.5" strokeDasharray="4 4"/>
              </svg>
              <div className="absolute inset-0 bg-gold/20 blur-lg rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
            </div>
            <div>
              <div className="font-display text-lg font-bold tracking-[0.15em] leading-none">
                <span className="gold-text">ARCH</span>
                <span className="text-marble">VISION</span>
              </div>
              <div className="font-sans text-[9px] tracking-[0.3em] text-marble/30 uppercase mt-0.5">الرؤية المعمارية</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative font-sans text-xs tracking-widest uppercase transition-colors duration-300 group ${
                  location.pathname === link.href ? 'text-gold' : 'text-marble/60 hover:text-marble'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                  location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}

            <div className="w-px h-4 bg-marble/20" />

            <Link to="/dashboard" className="flex items-center gap-2 text-marble/40 hover:text-gold transition-colors duration-300">
              <LayoutDashboard size={14} />
              <span className="font-sans text-xs tracking-widest uppercase">لوحة التحكم</span>
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/contact" className="btn-primary">
              <span>احجز استشارة</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-marble/60 hover:text-gold transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Gold line */}
        <motion.div
          className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent w-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrolled ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 glass-dark flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 + 0.2 }}
              >
                <Link
                  to={link.href}
                  className="font-display text-4xl font-bold text-marble/80 hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
