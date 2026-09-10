import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/data/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className={`fixed top-0 left-0 right-0 z-[120] transition-all duration-300 ${
          scrolled
            ? 'bg-bg/90 backdrop-blur-md border-b border-border'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <nav className="max-w-[1200px] mx-auto px-5 md:px-8 h-14 md:h-16 flex items-center justify-between">
          <button
            onClick={() => handleNavClick('#home')}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 bg-accent flex items-center justify-center font-mono font-bold text-white text-xs group-hover:bg-accent-dim transition-colors">
              CC
            </div>
            <span className="font-display font-semibold text-sm text-text hidden sm:block">
              CCS
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.slice(1, 8).map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-1.5 text-[13px] text-text-secondary hover:text-accent transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('#join')}
              className="hidden md:flex items-center px-4 py-2 bg-accent text-white text-[13px] font-medium hover:bg-accent-dim transition-colors"
            >
              Join CCS
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden flex items-center justify-center w-11 h-11 border border-border text-text-secondary hover:text-text hover:border-border-bright transition-colors bg-surface"
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[130] bg-bg flex flex-col"
          >
            <div className="flex items-center justify-between px-5 h-14 border-b border-border">
              <span className="font-mono text-[10px] text-text-muted tracking-wider">MENU</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center w-11 h-11 border border-border text-text-secondary hover:text-text transition-colors bg-surface"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center px-5 gap-0.5 overflow-y-auto">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => handleNavClick(link.href)}
                  className="flex items-baseline gap-4 py-2.5 text-left group"
                >
                  <span className="font-mono text-[10px] text-text-muted">{link.number}</span>
                  <span className="font-display text-xl text-text-secondary group-hover:text-accent transition-colors">
                    {link.label}
                  </span>
                </motion.button>
              ))}
            </div>
            <div className="px-5 py-5 border-t border-border">
              <p className="font-mono text-[10px] text-text-muted tracking-wider">
                ARKA JAIN UNIVERSITY — JHARKHAND
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
