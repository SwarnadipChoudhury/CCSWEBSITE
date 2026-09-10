import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Central place to decide how much motion a viewer should get.
 * - reduceMotion: OS-level prefers-reduced-motion, or explicit opt-out
 * - isMobile: narrow / touch viewport — used to disable expensive
 *   scroll-linked parallax and keep only simple opacity/y reveals
 * - allowRichMotion: the single flag most components should branch on
 */
export function useMotionPrefs() {
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return {
    reduceMotion: !!reduceMotion,
    isMobile,
    allowRichMotion: !reduceMotion && !isMobile,
  };
}
