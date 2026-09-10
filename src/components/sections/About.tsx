import { motion } from 'framer-motion';
import { pillars } from '@/data/pillars';
import { sectionLabels } from '@/data/navigation';

export default function About() {
  return (
    <section id="about" className="relative py-20 md:py-28 px-5 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              className="section-label mb-6"
            >
              {sectionLabels.about}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.05 }}
              className="font-display font-semibold text-2xl md:text-4xl tracking-tight leading-[1.1] text-text"
            >
              More Than a Club.
              <br />
              <span className="text-text-muted">A Computing Community.</span>
            </motion.h2>
          </div>

          <div className="lg:col-span-7 lg:pt-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-lg text-text-secondary leading-[1.7] max-w-xl"
            >
              CCS is a student technology community at ARKA JAIN University where students
              learn, collaborate, experiment, participate in technical activities and build
              real projects — within the School of Engineering &amp; IT ecosystem.
            </motion.p>
          </div>
        </div>

        <div className="mt-16 lg:mt-20 divider-rule" />

        <div className="grid grid-cols-1 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.12 }}
              className={`py-8 md:py-10 ${
                i < 2 ? 'md:border-r md:border-border' : ''
              } ${i < 2 ? 'md:pr-10' : ''} ${i > 0 ? 'md:pl-10' : ''} ${
                i < 2 ? 'border-b md:border-b-0 border-border' : ''
              }`}
            >
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-mono text-xs text-accent">{pillar.number}</span>
                <span className="font-mono text-[10px] text-text-muted tracking-wider uppercase">
                  Pillar
                </span>
              </div>
              <h3 className="font-display font-bold text-xl tracking-tight mb-3 text-text">
                {pillar.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
