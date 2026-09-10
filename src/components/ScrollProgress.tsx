import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-accent z-[140] origin-left"
      style={{ scaleX: reduceMotion ? scrollYProgress : smoothed }}
    />
  );
}
