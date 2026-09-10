import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { sectionLabels } from '@/data/navigation';

interface FormData {
  name: string;
  email: string;
  course: string;
  year: string;
  skills: string;
  github: string;
  reason: string;
}

const initialData: FormData = {
  name: '',
  email: '',
  course: '',
  year: '',
  skills: '',
  github: '',
  reason: '',
};

const inputClass =
  'w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors';

export default function Join() {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData(initialData);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="join" className="relative py-24 md:py-32 px-5 md:px-8 bg-bg-warm">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="font-mono text-xs text-accent tracking-[0.25em] mb-4"
            >
              {sectionLabels.join}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.1 }}
              className="font-display font-semibold text-3xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-text"
            >
              Your Next Project{' '}
              <span className="text-text-muted">Could Start Here.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg text-text-secondary leading-relaxed"
            >
              Whether you're writing your first program or already building full-stack systems,
              CCS is a place to learn, collaborate and create.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 space-y-3"
            >
              {['No prior experience required', 'Open to all AJU students', 'Learn at your own pace'].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-text-secondary">
                  <div className="w-5 h-5 rounded-full bg-green-light border border-green/20 flex items-center justify-center">
                    <Check size={12} className="text-green" />
                  </div>
                  {item}
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-surface border border-border rounded-2xl p-6 md:p-8"
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-green-light border border-green/20 flex items-center justify-center mb-4">
                  <Check size={28} className="text-green" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-2 text-text">Application Received</h3>
                <p className="text-sm text-text-muted max-w-xs">
                  Thank you for your interest in CCS. The team will review your application and
                  reach out soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-text-muted mb-2 tracking-wider">
                      NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Your full name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-text-muted mb-2 tracking-wider">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-text-muted mb-2 tracking-wider">
                      COURSE
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.course}
                      onChange={(e) => handleChange('course', e.target.value)}
                      placeholder="e.g. B.Tech CSE"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-text-muted mb-2 tracking-wider">
                      YEAR
                    </label>
                    <select
                      required
                      value={formData.year}
                      onChange={(e) => handleChange('year', e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Select year</option>
                      <option value="1st">1st Year</option>
                      <option value="2nd">2nd Year</option>
                      <option value="3rd">3rd Year</option>
                      <option value="4th">4th Year</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-text-muted mb-2 tracking-wider">
                    SKILLS
                  </label>
                  <input
                    type="text"
                    value={formData.skills}
                    onChange={(e) => handleChange('skills', e.target.value)}
                    placeholder="e.g. Python, React, UI/UX, ML..."
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-text-muted mb-2 tracking-wider">
                    GITHUB
                  </label>
                  <input
                    type="text"
                    value={formData.github}
                    onChange={(e) => handleChange('github', e.target.value)}
                    placeholder="github.com/username"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-text-muted mb-2 tracking-wider">
                    WHY DO YOU WANT TO JOIN CCS?
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.reason}
                    onChange={(e) => handleChange('reason', e.target.value)}
                    placeholder="Tell us what excites you about computing and what you hope to build..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="group w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent-dim transition-colors"
                >
                  Join the Community
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-center text-xs text-text-muted font-mono">
                  Frontend-ready · Submission layer to be configured
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
