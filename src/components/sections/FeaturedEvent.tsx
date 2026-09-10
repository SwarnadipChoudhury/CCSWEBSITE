import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { events } from '@/data/events';

export default function FeaturedEvent() {
  const featured = events.find((e) => e.title.includes('Hack Horizon'));

  if (!featured) return null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <section className="relative py-20 md:py-28 px-5 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label mb-6"
        >
          Featured Community Ecosystem Event
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="font-display font-bold text-3xl md:text-5xl tracking-tight text-text leading-[1.05] mb-6"
            >
              {featured.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-lg text-text-secondary leading-[1.7] max-w-xl mb-8"
            >
              {featured.description}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="font-mono text-xs text-text-muted leading-relaxed"
            >
              Organized by ARKA JAIN University. Not a CCS-led event.
            </motion.p>
          </div>

          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="border border-border bg-surface p-6 md:p-8"
            >
              <div className="font-mono text-[10px] text-text-muted tracking-wider uppercase mb-6">
                Event Details
              </div>
              <dl className="space-y-5">
                <div className="flex items-start justify-between gap-4 pb-5 border-b border-border">
                  <dt className="flex items-center gap-2 text-sm text-text-secondary">
                    <Calendar size={15} className="text-accent" />
                    Date
                  </dt>
                  <dd className="text-sm font-medium text-text text-right">
                    {formatDate(featured.date)}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4 pb-5 border-b border-border">
                  <dt className="flex items-center gap-2 text-sm text-text-secondary">
                    <Clock size={15} className="text-teal" />
                    Duration
                  </dt>
                  <dd className="text-sm font-medium text-text text-right">24 Hours</dd>
                </div>
                <div className="flex items-start justify-between gap-4 pb-5 border-b border-border">
                  <dt className="flex items-center gap-2 text-sm text-text-secondary">
                    <MapPin size={15} className="text-green" />
                    Location
                  </dt>
                  <dd className="text-sm font-medium text-text text-right">
                    ARKA JAIN University
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-sm text-text-secondary">Category</dt>
                  <dd className="text-sm font-mono text-accent text-right">
                    {featured.category}
                  </dd>
                </div>
              </dl>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
