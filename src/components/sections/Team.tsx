import { motion } from 'framer-motion';
import { team, hasTeamMembers, teamRoles } from '@/data/team';
import { sectionLabels } from '@/data/navigation';

export default function Team() {
  return (
    <section id="team" className="relative py-20 md:py-28 px-5 md:px-8 bg-bg-warm">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              className="section-label mb-4"
            >
              {sectionLabels.team}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.05 }}
              className="font-display font-semibold text-2xl md:text-4xl tracking-tight text-text"
            >
              The <span className="text-text-muted">People.</span>
            </motion.h2>
          </div>
          <div className="lg:col-span-5 lg:pt-2">
            <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
              Student leaders, builders and community drivers. Member details will appear
              here once verified by the CCS team.
            </p>
          </div>
        </div>

        <div className="border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-3 py-6">
            {teamRoles.map((role, i) => (
              <motion.div
                key={role}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="flex items-baseline gap-2 py-1"
              >
                <span className="font-mono text-[10px] text-text-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm text-text-secondary">{role}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {!hasTeamMembers ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-8 border-t border-border pt-10"
          >
            <p className="font-display text-lg md:text-xl text-text mb-2">
              Team profiles are being prepared.
            </p>
            <p className="text-sm text-text-muted max-w-md leading-relaxed">
              Real team members will be shown here once their names, roles and social links
              are confirmed.
            </p>
          </motion.div>
        ) : (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.06 }}
                className="group"
              >
                <div className="relative h-56 overflow-hidden bg-surface border border-border mb-3">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-muted">
                      <span className="font-mono text-xs">No photo</span>
                    </div>
                  )}
                </div>
                <h3 className="font-display font-semibold text-base text-text">{member.name}</h3>
                <p className="text-xs text-accent font-mono mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
