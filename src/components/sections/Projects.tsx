import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects, hasProjects } from '@/data/projects';
import { sectionLabels } from '@/data/navigation';

const statusLabels: Record<string, string> = {
  planned: 'Planned',
  'in-progress': 'In Progress',
  completed: 'Completed',
};

export default function Projects() {
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 2) * 0.08 }}
                className="border-b border-border py-8 grid grid-cols-12 gap-4 items-start"
              >
                <div className="col-span-2 md:col-span-1">
                  <span className="font-mono text-xs text-text-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="col-span-10 md:col-span-7">
                  <h3 className="font-display font-semibold text-lg text-text mb-2">{project.name}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-bg border border-border text-[11px] font-mono text-text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-4 md:text-right">
                  <span className="font-mono text-xs text-text-muted block mb-2">
                    {statusLabels[project.status]}
                  </span>
                  <span className="text-xs text-text-muted block mb-3">Team: {project.team}</span>
                  <div className="flex md:justify-end gap-4">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline">
                        Code
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline">
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
