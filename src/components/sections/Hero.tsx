import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';

const HeroScene = lazy(() => import('@/components/HeroScene'));

const scrollTo = (href: string) => {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
};

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      <div className="absolute inset-0 z-1 bg-gradient-to-b from-bg/50 via-bg/20 to-bg pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-8 w-full pt-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-mono text-[10px] md:text-xs text-accent tracking-[0.2em] mb-8"
        >
          ARKA JAIN UNIVERSITY — JHARKHAND
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="font-display font-bold text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.0] text-text"
        >
          CODE. COMPUTE.
          <br />
          <span className="accent-text">CREATE.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-8 text-base md:text-lg text-text-secondary max-w-lg leading-relaxed"
        >
          The student technology community at ARKA JAIN University — for students who build,
          learn, experiment and push technology forward.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row gap-3"
        >
          <button
            onClick={() => scrollTo('#about')}
            className="group flex items-center justify-center gap-2 px-5 py-3 bg-accent text-white font-medium text-sm hover:bg-accent-dim transition-colors"
          >
            Explore CCS
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scrollTo('#join')}
            className="group flex items-center justify-center gap-2 px-5 py-3 border border-border-bright bg-surface text-text font-medium text-sm hover:border-accent hover:text-accent transition-colors"
          >
            Join the Community
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-5 md:left-8 z-10 flex items-center gap-2 text-text-muted"
      >
        <span className="font-mono text-[10px] tracking-[0.15em]">SCROLL</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
