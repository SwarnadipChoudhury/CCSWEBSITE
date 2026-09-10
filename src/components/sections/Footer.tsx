import { Github, Linkedin, Instagram, MessageCircle } from 'lucide-react';
import { navLinks } from '@/data/navigation';
import { socialLinks } from '@/data/socials';

const iconMap: Record<string, typeof Github> = {
  Github,
  Linkedin,
  Instagram,
  MessageCircle,
};

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-border px-5 md:px-8 py-16 bg-bg-warm">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center font-mono font-bold text-white">
                CC
              </div>
              <div>
                <p className="font-display font-semibold text-base text-text">CCS</p>
                <p className="font-mono text-[10px] text-text-muted tracking-wider">
                  CODE &amp; COMPUTE SOCIETY
                </p>
              </div>
            </div>
            <p className="font-display text-lg text-text mb-2">Code. Compute. Create.</p>
            <p className="text-sm text-text-secondary max-w-sm leading-relaxed">
              A student technology community at ARKA JAIN University, Jharkhand.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs text-text-muted tracking-wider mb-4">NAVIGATE</p>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.slice(1).map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm text-text-secondary hover:text-accent transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-xs text-text-muted tracking-wider mb-4">CONNECT</p>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.icon];
                return (
                  <div
                    key={social.label}
                    className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-colors ${
                      social.available
                        ? 'border-border bg-surface text-text-secondary hover:text-accent hover:border-accent/30 cursor-pointer'
                        : 'border-border/50 bg-surface-2 text-text-muted/40'
                    }`}
                  >
                    {Icon && <Icon size={16} />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted font-mono text-center md:text-left">
            © 2026 Code and Compute Society, ARKA JAIN University.
          </p>
          <p className="text-xs text-text-muted font-mono">
            Designed &amp; built by CCS community.
          </p>
        </div>
      </div>
    </footer>
  );
}
