import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects, hasProjects } from '@/data/projects';
import { sectionLabels } from '@/data/navigation';
import { useMotionPrefs } from '@/hooks/useMotionPrefs';
import { StaggerContainer, StaggerItem } from '@/components/motion/Reveal';

const statusLabels: Record<string, string> = {
  planned: 'Planned',
  'in-progress': 'In Progress',
  completed: 'Completed',
};

export default function Projects() {
  const { allowRichMotion } = useMotionPrefs();
  return (
    <section id="projects" className="relative py-20 md:py-28 px-5 md:px-8 bg-bg-warm">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              className="section-label mb-4"
            >
              {sectionLabels.projects}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.05 }}
              className="font-display font-semibold text-2xl md:text-4xl tracking-tight text-text"
            >
              Project <span className="text-text-muted">Showcase.</span>
            </motion.h2>
          </div>
          <div className="lg:col-span-4 lg:pt-2 flex lg:items-end">
            <p className="text-sm text-text-secondary leading-relaxed">
              Real projects built by CCS members — with tech stacks, links and live demos.
            </p>
          </div>
        </div>

        {!hasProjects ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="border-t border-border pt-10"
          >
            <p className="font-display text-lg md:text-xl text-text mb-2">
              Projects from the community are coming soon.
            </p>
            <p className="text-sm text-text-muted max-w-md leading-relaxed mb-6">
              CCS members are working on ideas and solutions. Once projects are ready, they will
              appear here with details, tech stacks and links.
            </p>
            <div className="inline-flex items-center gap-1.5 font-mono text-xs text-text-muted">
              <ArrowUpRight size={13} />
              Build something worth showcasing.
            </div>
          </motion.div>
        ) : (
          <div className="border-t border-border">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={
                  allowRichMotion
                    ? { clipPath: 'inset(0 0 0 100%)', opacity: 0 }
                    : { opacity: 0, y: 16 }
                }
                whileInView={
                  allowRichMotion
                    ? { clipPath: 'inset(0 0 0 0%)', opacity: 1 }
                    : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: (i % 2) * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="border-b border-border hover:border-accent/30 transition-colors duration-300 py-8 grid grid-cols-12 gap-4 items-start"
              >
                <div className="col-span-2 md:col-span-1">
                  <span className="font-mono text-xs text-text-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="col-span-10 md:col-span-7">
                  <h3 className="font-display font-semibold text-lg text-text mb-2">{project.name}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3">{project.description}</p>
                  <StaggerContainer stagger={0.05} delayChildren={0.2} margin="-40px" className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <StaggerItem
                        key={tech}
                        direction="up"
                        distance={8}
                        className="px-2 py-0.5 bg-bg border border-border text-[11px] font-mono text-text-secondary"
                      >
                        {tech}
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="col-span-12 md:col-span-4 md:text-right"
                >
                  <span className="font-mono text-xs text-text-muted block mb-2">
                    {statusLabels[project.status]}
                  </span>
                  <span className="text-xs text-text-muted block mb-3">Team: {project.team}</span>
                  <div className="flex md:justify-end gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1 text-sm text-accent hover:gap-1.5 transition-all"
                      >
                        Code <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 -ml-1 group-hover:ml-0 transition-all" />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1 text-sm text-accent hover:gap-1.5 transition-all"
                      >
                        Demo <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 -ml-1 group-hover:ml-0 transition-all" />
                      </a>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
