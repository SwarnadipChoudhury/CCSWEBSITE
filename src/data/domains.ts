export interface Domain {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export const domains: Domain[] = [
  {
    number: '01',
    title: 'Programming',
    description: 'Programming fundamentals, problem solving and competitive coding.',
    icon: 'Code2',
  },
  {
    number: '02',
    title: 'Web Development',
    description: 'Modern frontend, backend and full-stack development.',
    icon: 'Globe',
  },
  {
    number: '03',
    title: 'AI & Machine Learning',
    description: 'Exploring artificial intelligence, machine learning and emerging technologies.',
    icon: 'BrainCircuit',
  },
  {
    number: '04',
    title: 'Cybersecurity',
    description: 'Security awareness, ethical hacking concepts and secure computing.',
    icon: 'ShieldCheck',
  },
  {
    number: '05',
    title: 'App Development',
    description: 'Mobile and cross-platform application development.',
    icon: 'Smartphone',
  },
  {
    number: '06',
    title: 'Cloud & Computing',
    description: 'Cloud technologies, developer tools and computing infrastructure.',
    icon: 'Cloud',
  },
  {
    number: '07',
    title: 'Open Source',
    description: 'Collaborative development, Git/GitHub and open-source contribution.',
    icon: 'GitBranch',
  },
  {
    number: '08',
    title: 'Innovation',
    description: 'Building experimental ideas, prototypes and technology solutions.',
    icon: 'Lightbulb',
  },
];
