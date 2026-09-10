export type TeamRole =
  | 'President'
  | 'Vice President'
  | 'Technical Lead'
  | 'Event Lead'
  | 'Design Lead'
  | 'Social Media Lead'
  | 'Core Team'
  | 'Member';

export interface TeamMember {
  id: string;
  name: string;
  role: TeamRole;
  image?: string;
  github?: string;
  linkedin?: string;
  instagram?: string;
}

export const teamRoles: TeamRole[] = [
  'President',
  'Vice President',
  'Technical Lead',
  'Event Lead',
  'Design Lead',
  'Social Media Lead',
  'Core Team',
  'Member',
];

// Replace with verified team members as their details are confirmed.
export const team: TeamMember[] = [];

export const hasTeamMembers = team.length > 0;
