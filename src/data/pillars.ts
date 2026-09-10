export interface Pillar {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export const pillars: Pillar[] = [
  {
    number: '01',
    title: 'LEARN',
    description:
      'Build strong foundations through peer learning, workshops and technical sessions.',
    icon: 'GraduationCap',
  },
  {
    number: '02',
    title: 'BUILD',
    description:
      'Turn ideas into working projects, experiments and real-world solutions.',
    icon: 'Hammer',
  },
  {
    number: '03',
    title: 'CONNECT',
    description:
      'Meet students, developers, mentors and technology communities.',
    icon: 'Network',
  },
];
