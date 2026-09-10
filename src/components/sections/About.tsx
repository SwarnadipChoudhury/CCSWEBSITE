import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { pillars } from '@/data/pillars';
import { sectionLabels } from '@/data/navigation';
import { useMotionPrefs } from '@/hooks/useMotionPrefs';

const headingLines = ['More Than a Club.', 'A Computing Community.'];

const lineVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const wordVariants = {
  hidden: { opacity: 0, y: '100%' },
  visible: {
    opacity: 1,
    y: '0%',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { allowRichMotion } = useMotionPrefs();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const pillarsX = useTransform(scrollYProgress, [0, 1], [allowRichMotion ? -24 : 0, 0]);

  return (
    <section ref={sectionRef} id="about" className="relative py-20 md:py-28 px-5 md:px-8">
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

            <h2 className="font-display font-semibold text-2xl md:text-4xl tracking-tight leading-[1.1] text-text">
              {headingLines.map((line, li) => (
                <motion.span
                  key={line}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  variants={lineVariants}
                  className="block overflow-hidden"
                >
                  {line.split(' ').map((word, wi) => (
                    <span key={wi} className="inline-block overflow-hidden mr-[0.28em] align-top">
                      <motion.span
                        variants={wordVariants}
                        className={`inline-block ${li === 1 ? 'text-text-muted' : ''}`}
                      >
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </motion.span>
              ))}
            </h2>
          </div>

          <div className="lg:col-span-7 lg:pt-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-base md:text-lg text-text-secondary leading-[1.7] max-w-xl"
            >
              CCS is a student technology community at ARKA JAIN University where students
              learn, collaborate, experiment, participate in technical activities and build
              real projects — within the School of Engineering &amp; IT ecosystem.
            </motion.p>
          </div>
        </div>

        <div className="mt-16 lg:mt-20 divider-rule" />

        <motion.div style={{ x: pillarsX }} className="grid grid-cols-1 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
        </motion.div>
      </div>
    </section>
  );
}
