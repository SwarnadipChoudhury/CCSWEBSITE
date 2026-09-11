import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, ArrowRight, Building2, Users } from 'lucide-react';
import { events, hasUpcomingEvents } from '@/data/events';
import { sectionLabels } from '@/data/navigation';
import { useMotionPrefs } from '@/hooks/useMotionPrefs';

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const organizedByLabel: Record<string, { label: string; icon: typeof Building2 }> = {
  CCS: { label: 'CCS', icon: Users },
  University: { label: 'University', icon: Building2 },
  Partner: { label: 'Partner', icon: Building2 },
};

export default function Events() {
  const upcoming = events.filter((e) => e.status === 'upcoming');
  const past = events.filter((e) => e.status === 'past');
  const sectionRef = useRef<HTMLElement>(null);
  const { allowRichMotion } = useMotionPrefs();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const dateColX = useTransform(scrollYProgress, [0, 1], [0, allowRichMotion ? -18 : 0]);

  return (
    <section ref={sectionRef} id="events" className="relative py-20 md:py-28 px-5 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              className="section-label mb-4"
            >
              {sectionLabels.events}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.05 }}
              className="font-display font-semibold text-2xl md:text-4xl tracking-tight text-text"
            >
              Events &amp; <span className="text-text-muted">Activities.</span>
            </motion.h2>
          </div>
          <div className="lg:col-span-4 lg:pt-2 flex lg:items-end">
            <p className="text-sm text-text-secondary leading-relaxed">
              Workshops, hackathons, coding competitions, guest sessions and community meetups.
            </p>
          </div>
        </div>

        {/* Upcoming */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <h3 className="font-mono text-[11px] text-text-secondary tracking-wider uppercase">
              Upcoming
            </h3>
          </div>

          {!hasUpcomingEvents ? (
            <div className="border-t border-border pt-8">
              <p className="font-display text-lg text-text mb-2">
                New events are coming soon.
              </p>
              <p className="text-sm text-text-muted max-w-md leading-relaxed">
                The CCS team is planning the next set of workshops, sessions and competitions.
                Check back for updates.
              </p>
            </div>
          ) : (
            <div className="relative border-t border-border pl-5 md:pl-6">
              <motion.div
                style={{ scaleY: scrollYProgress }}
                className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-accent origin-top"
              />
              <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-border -z-10" />
              {upcoming.map((event, i) => {
                const orgInfo = organizedByLabel[event.organizedBy];
                const OrgIcon = orgInfo.icon;
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: allowRichMotion ? -28 : 0, y: allowRichMotion ? 0 : 16 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative border-b border-border py-6 grid grid-cols-12 gap-4 items-start"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 + 0.15, type: 'spring', stiffness: 300, damping: 18 }}
                      className="hidden md:block absolute -left-[26px] top-7 w-2.5 h-2.5 rounded-full bg-accent border-2 border-bg"
                    />
                    <div className="col-span-12 md:col-span-3">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-mono text-accent">{event.category}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-2">
                        <OrgIcon size={11} className="text-text-muted" />
                        <span className="font-mono text-[10px] text-text-muted">{orgInfo.label}</span>
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <h4 className="font-display font-semibold text-lg text-text mb-1">{event.title}</h4>
                      <p className="text-sm text-text-secondary leading-relaxed">{event.description}</p>
                    </div>
                    <motion.div style={{ x: dateColX }} className="col-span-12 md:col-span-3 md:text-right">
                      <span className="flex items-center gap-1.5 text-sm text-text-secondary md:justify-end">
                        <Calendar size={13} /> {formatDate(event.date)}
                      </span>
                      {event.registrationUrl && (
                        <a
                          href={event.registrationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1 text-sm text-accent hover:gap-2 transition-all"
                        >
                          Register <ArrowRight size={13} />
                        </a>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Past */}
        {past.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-text-muted" />
              <h3 className="font-mono text-[11px] text-text-muted tracking-wider uppercase">
                Past Events
              </h3>
            </div>
            <div className="border-t border-border">
              {past.map((event, i) => {
                const orgInfo = organizedByLabel[event.organizedBy];
                const OrgIcon = orgInfo.icon;
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="border-b border-border py-6 grid grid-cols-12 gap-4 items-start opacity-60"
                  >
                    <div className="col-span-12 md:col-span-3">
                      <span className="font-mono text-xs text-text-muted">{event.category}</span>
                      <div className="flex items-center gap-1.5 mt-2">
                        <OrgIcon size={11} className="text-text-muted" />
                        <span className="font-mono text-[10px] text-text-muted">{orgInfo.label}</span>
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <h4 className="font-display font-semibold text-base text-text mb-1">{event.title}</h4>
                      <p className="text-sm text-text-secondary leading-relaxed">{event.description}</p>
                    </div>
                    <div className="col-span-12 md:col-span-3 md:text-right">
                      <span className="flex items-center gap-1.5 text-sm text-text-muted md:justify-end">
                        <Calendar size={13} /> {formatDate(event.date)}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
