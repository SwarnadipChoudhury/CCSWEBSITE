import { motion } from 'framer-motion';
import { MapPin, Mail, ArrowUpRight } from 'lucide-react';
import { contactInfo, socialLinks } from '@/data/socials';
import { sectionLabels } from '@/data/navigation';

export default function Contact() {
  const availableSocials = socialLinks.filter((s) => s.available);

  return (
    <section id="contact" className="relative py-20 md:py-28 px-5 md:px-8 bg-bg-warm">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="section-label mb-4"
        >
          {sectionLabels.contact}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.05 }}
          className="font-display font-semibold text-2xl md:text-4xl tracking-tight text-text mb-16"
        >
          Get in <span className="text-text-muted">Touch.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-8"
          >
            <div>
              <div className="font-mono text-[10px] text-text-muted tracking-wider uppercase mb-2">
                Organization
              </div>
              <p className="font-display text-base text-text">{contactInfo.organization}</p>
              <p className="text-sm text-text-secondary mt-1">{contactInfo.institution}</p>
            </div>

            <div>
              <div className="font-mono text-[10px] text-text-muted tracking-wider uppercase mb-2">
                Location
              </div>
              <div className="flex items-start gap-2 text-sm text-text-secondary leading-relaxed">
                <MapPin size={15} className="text-accent mt-0.5 shrink-0" />
                <span>{contactInfo.address}</span>
              </div>
              <a
                href="https://maps.google.com/?q=ARKA+JAIN+University+Gamharia+Jharkhand"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-xs text-accent hover:gap-2 transition-all"
              >
                View on map <ArrowUpRight size={12} />
              </a>
            </div>

            <div>
              <div className="font-mono text-[10px] text-text-muted tracking-wider uppercase mb-2">
                Email
              </div>
              {contactInfo.email ? (
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
                >
                  <Mail size={15} className="text-accent" />
                  {contactInfo.email}
                </a>
              ) : (
                <p className="text-sm text-text-muted">To be announced</p>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <div className="font-mono text-[10px] text-text-muted tracking-wider uppercase mb-4">
              Social
            </div>
            {availableSocials.length > 0 ? (
              <div className="space-y-3">
                {availableSocials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-3 border-b border-border text-sm text-text-secondary hover:text-accent transition-colors group"
                  >
                    {social.label}
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-text-muted leading-relaxed">
                Social links will be added here once verified by the CCS team.
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
