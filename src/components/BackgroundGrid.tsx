import { useEffect, useRef } from 'react';

export default function BackgroundGrid() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!ref.current) return;
        const scrollY = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const progress = Math.min(scrollY / maxScroll, 1);
        const perspective = 600 + progress * 150;
        const rotateX = 62 + progress * 3;
        ref.current.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) translateY(${scrollY * 0.1}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div
        ref={ref}
        className="grid-bg absolute inset-0 opacity-40"
        style={{
          transformOrigin: 'center bottom',
          maskImage: 'radial-gradient(ellipse 70% 50% at center 30%, black 0%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at center 30%, black 0%, transparent 75%)',
        }}
      />
    </div>
  );
}
