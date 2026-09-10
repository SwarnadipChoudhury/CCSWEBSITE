import { motion } from 'framer-motion';
import { achievements } from '@/data/achievements';
import { sectionLabels } from '@/data/navigation';

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-20 md:py-28 px-5 md:px-8 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="section-label mb-4"
        >
          {sectionLabels.achievements}
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.05 }}
            className="lg:col-span-7 font-display font-semibold text-2xl md:text-4xl tracking-tight leading-[1.1] text-text"
          >
            Built by Students.
            <br />
            <span className="text-text-muted">Driven by Curiosity.</span>
          </motion.h2>
          <p className="lg:col-span-5 lg:pt-2 text-sm text-text-secondary leading-relaxed max-w-sm">
            Milestones that mark the CCS journey. Only verified milestones are shown — no
            fabricated statistics.
          </p>
        </div>

        <div className="mt-16 md:mt-20 space-y-0">
          {achievements.map((item, i) => {
            const alignRight = i % 2 === 1;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: 0.05, duration: 0.5 }}
                className={`relative py-10 md:py-14 border-t border-border last:border-b ${
                  alignRight ? 'md:pl-[32%] md:text-left' : 'md:pr-[32%]'
                }`}
              >
                <span
                  aria-hidden
                  className={`pointer-events-none select-none absolute top-2 md:top-4 font-display font-bold text-[5rem] md:text-[8rem] leading-none text-text opacity-[0.045] ${
                    alignRight ? 'right-0 md:right-4' : 'left-0 md:left-4'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="relative flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-green" />
                  <span className="font-mono text-[10px] text-green tracking-wider uppercase">
                    Verified
                  </span>
                </div>
                <h3 className="relative font-display font-semibold text-xl md:text-2xl text-text mb-3 max-w-lg">
                  {item.title}
                </h3>
                <p className="relative text-sm md:text-base text-text-secondary leading-relaxed max-w-md">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
