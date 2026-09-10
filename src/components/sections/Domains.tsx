import { motion } from 'framer-motion';
import { domains } from '@/data/domains';
import { sectionLabels } from '@/data/navigation';

export default function Domains() {
  return (
    <section id="domains" className="relative py-20 md:py-28 px-5 md:px-8 bg-bg-warm">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              className="section-label mb-4"
            >
              {sectionLabels.domains}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.05 }}
              className="font-display font-semibold text-2xl md:text-4xl tracking-tight text-text"
            >
              What We <span className="text-text-muted">Explore.</span>
            </motion.h2>
          </div>
          <div className="lg:col-span-4 lg:pt-2 flex lg:items-end">
            <p className="text-sm text-text-secondary leading-relaxed">
              Eight focus areas spanning the core of modern computing — from fundamentals
              to emerging technologies.
            </p>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          className="border-t border-border"
        >
          {domains.map((domain) => (
            <motion.div
              key={domain.number}
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="group border-b border-border py-5 md:py-6 grid grid-cols-12 gap-4 items-baseline hover:bg-surface/60 transition-colors duration-300 px-2 -mx-2"
            >
              <div className="col-span-2 md:col-span-1">
                <span className="font-mono text-sm text-text-muted group-hover:text-accent transition-colors">
                  {domain.number}
                </span>
              </div>
              <div className="col-span-10 md:col-span-4">
                <h3 className="font-display font-semibold text-base md:text-lg text-text tracking-tight">
                  {domain.title}
                </h3>
              </div>
              <div className="col-span-12 md:col-span-7 md:pl-4">
                <p className="text-sm text-text-secondary leading-relaxed">
                  {domain.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
