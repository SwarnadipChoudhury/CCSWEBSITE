import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { socialLinks } from '@/data/socials';
import { sectionLabels } from '@/data/navigation';

export default function Community() {
  return (
    <section id="community" className="relative py-20 md:py-28 px-5 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              className="section-label mb-4"
            >
              {sectionLabels.community}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.05 }}
              className="font-display font-semibold text-2xl md:text-4xl tracking-tight leading-[1.1] text-text"
            >
              Find Your People.
              <br />
              <span className="text-text-muted">Build Your Network.</span>
            </motion.h2>
          </div>
          <div className="lg:col-span-5 lg:pt-2">
            <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
              Connect with CCS across platforms. Links will be activated as they are verified.
            </p>
          </div>
        </div>

        <div className="border-t border-border">
          {socialLinks.map((social, i) => (
            <motion.div
              key={social.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="border-b border-border py-5 flex items-center justify-between"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-text-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display font-medium text-base text-text">
                  {social.label}
                </span>
              </div>
              <span className={`font-mono text-xs ${social.available ? 'text-accent' : 'text-text-muted'}`}>
                {social.available ? 'Available' : 'Coming soon'}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-16 md:mt-20 flex flex-col items-start gap-6"
        >
          <p className="font-display text-xl md:text-3xl tracking-tight text-text max-w-lg leading-tight">
            Ready to build something?
          </p>
          <button
            onClick={() => document.querySelector('#join')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-medium text-sm hover:bg-accent-dim transition-colors"
          >
            Join CCS
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
