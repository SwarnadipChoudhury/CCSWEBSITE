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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start pt-8 border-t border-border">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <p className="font-display text-2xl md:text-4xl tracking-tight text-text max-w-lg leading-tight mb-8">
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

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-border"
          >
            <p className="font-mono text-[10px] text-text-muted tracking-wider uppercase mb-4">
              Elsewhere
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {socialLinks.map((social) => (
                <span
                  key={social.label}
                  className={`text-sm ${social.available ? 'text-text' : 'text-text-muted'}`}
                >
                  {social.label}
                  <span
                    className={`ml-1.5 text-xs align-middle ${
                      social.available ? 'text-accent' : 'text-text-muted/60'
                    }`}
                  >
                    {social.available ? '●' : '○'}
                  </span>
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
