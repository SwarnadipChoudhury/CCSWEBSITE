import { motion } from 'framer-motion';
import { achievements } from '@/data/achievements';
import { sectionLabels } from '@/data/navigation';

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-20 md:py-28 px-5 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              className="section-label mb-4"
            >
              {sectionLabels.achievements}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.05 }}
              className="font-display font-semibold text-2xl md:text-4xl tracking-tight leading-[1.1] text-text"
            >
              Built by Students.
              <br />
              <span className="text-text-muted">Driven by Curiosity.</span>
            </motion.h2>
          </div>
          <div className="lg:col-span-5 lg:pt-2">
            <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
              Milestones that mark the CCS journey. Only verified milestones are shown —
              no fabricated statistics.
            </p>
          </div>
        </div>

        <div className="border-t border-border">
          {achievements.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1 }}
              className="border-b border-border py-8 grid grid-cols-12 gap-4"
            >
              <div className="col-span-2 md:col-span-1">
                <span className="font-mono text-xs text-text-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="col-span-10 md:col-span-11">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-green" />
                  <span className="font-mono text-[10px] text-green tracking-wider uppercase">
                    Verified
                  </span>
                </div>
                <h3 className="font-display font-semibold text-lg text-text mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed max-w-2xl">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
