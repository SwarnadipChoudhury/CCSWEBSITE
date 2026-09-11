import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ImageIcon } from 'lucide-react';
import { gallery, galleryCategories, hasGalleryImages } from '@/data/gallery';
import { sectionLabels } from '@/data/navigation';

export default function Gallery() {
  const [filter, setFilter] = useState<string>('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === 'All' ? gallery : gallery.filter((img) => img.category === filter);

  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightbox]);

  return (
    <section id="gallery" className="relative py-24 md:py-32 px-5 md:px-8 bg-bg-warm">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="font-mono text-xs text-accent tracking-[0.25em] mb-4"
        >
          {sectionLabels.gallery}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.1 }}
          className="font-display font-semibold text-3xl md:text-5xl lg:text-6xl tracking-tight max-w-3xl text-text"
        >
          <span className="text-text-muted">Gallery.</span>
        </motion.h2>

        {hasGalleryImages ? (
          <>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border pb-4">
              {['All', ...galleryCategories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`relative pb-1 font-mono text-xs tracking-wider uppercase transition-colors ${
                    filter === cat ? 'text-accent' : 'text-text-muted hover:text-text'
                  }`}
                >
                  {cat}
                  {filter === cat && (
                    <motion.span
                      layoutId="gallery-filter-underline"
                      className="absolute left-0 right-0 -bottom-[17px] h-[2px] bg-accent"
                    />
                  )}
                </button>
              ))}
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
              className="mt-8 columns-1 sm:columns-2 lg:columns-3 gap-4"
            >
              {filtered.map((img, i) => {
                const revealDirections = [
                  { y: 26, x: 0 },
                  { y: 0, x: -20 },
                  { y: 0, x: 20 },
                  { y: 34, x: 0 },
                ];
                const offset = revealDirections[i % revealDirections.length];
                return (
                  <motion.div
                    key={img.id}
                    variants={{
                      hidden: { opacity: 0, scale: 0.97, ...offset },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        x: 0,
                        y: 0,
                        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                    onClick={() => setLightbox(filtered.indexOf(img))}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setLightbox(filtered.indexOf(img));
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`View image: ${img.alt}`}
                    className="group relative mb-4 overflow-hidden border border-border cursor-pointer hover:border-accent/30 transition-colors bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <img
                      src={img.url}
                      alt={img.alt}
                      loading="lazy"
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="absolute bottom-3 left-3 font-mono text-xs text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-1 group-hover:translate-y-0">
                      {img.category}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>

            <AnimatePresence>
              {lightbox !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setLightbox(null)}
                  role="dialog"
                  aria-modal="true"
                  aria-label={filtered[lightbox].alt}
                  className="fixed inset-0 z-[160] bg-bg/95 backdrop-blur-xl flex items-center justify-center p-6"
                >
                  <button
                    onClick={() => setLightbox(null)}
                    aria-label="Close image"
                    className="absolute top-6 right-6 w-11 h-11 border border-border bg-surface flex items-center justify-center text-text-secondary hover:text-text"
                  >
                    <X size={20} />
                  </button>
                  <motion.img
                    initial={{ scale: 0.94, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.96, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    src={filtered[lightbox].url}
                    alt={filtered[lightbox].alt}
                    className="max-w-full max-h-[80vh] object-contain"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-12 border border-border p-12 md:p-16 text-center bg-surface"
          >
            <ImageIcon size={32} className="mx-auto text-text-muted mb-4" />
            <div className="font-mono text-xs text-text-muted tracking-wider mb-4">
              STATUS: AWAITING PHOTOS
            </div>
            <p className="font-display text-xl md:text-2xl text-text-secondary">
              The next chapter is being built.
            </p>
            <p className="mt-3 text-sm text-text-muted max-w-md mx-auto">
              Photos from CCS events, workshops and community moments will be displayed here once
              they are supplied by the team.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
