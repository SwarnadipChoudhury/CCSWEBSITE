export interface Achievement {
  title: string;
  description: string;
  verified: boolean;
}

// Only include verified achievements. Replace with confirmed milestones.
export const achievements: Achievement[] = [
  {
    title: 'Community Formation',
    description:
      'Established the Code and Compute Society as a student technology community within the School of Engineering & IT ecosystem at ARKA JAIN University.',
    verified: true,
  },
  {
    title: 'Hackathon Participation',
    description:
      'CCS community members participated in Hack Horizon 2.0, a 24-hour hackathon organized at ARKA JAIN University.',
    verified: true,
  },
];

export const hasAchievements = achievements.length > 0;
