import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = ['C', 'CO', 'COD', 'CODE'];

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [showFull, setShowFull] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 180);

    const showFullTimer = setTimeout(() => setShowFull(true), 180 * steps.length + 200);
    const exitTimer = setTimeout(() => setExiting(true), 180 * steps.length + 600);
    const completeTimer = setTimeout(() => onComplete(), 180 * steps.length + 1100);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(showFullTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-bg"
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <div className="grid-bg absolute inset-0 opacity-50" />
          <div className="relative flex flex-col items-center gap-6">
            <div className="font-mono text-accent text-sm tracking-[0.3em] mb-2">
              {String(step + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
            </div>
            <div className="h-px w-32 bg-border overflow-hidden">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: '0%' }}
                animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <div className="font-display font-bold text-5xl md:text-7xl tracking-tight min-h-[1.2em] flex items-center text-text">
              <AnimatePresence mode="wait">
                <motion.span
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                >
                  {steps[step]}
                </motion.span>
              </AnimatePresence>
              <motion.span
                className="ml-1 text-accent"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                _
              </motion.span>
            </div>
            <AnimatePresence>
              {showFull && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-mono text-xs md:text-sm text-text-muted tracking-[0.2em] uppercase"
                >
                  Code and Compute Society
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
