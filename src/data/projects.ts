export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  team: string;
  github?: string;
  demo?: string;
  status: 'planned' | 'in-progress' | 'completed';
  image?: string;
}

// Replace with real CCS projects as they are confirmed.
export const projects: Project[] = [];

export const hasProjects = projects.length > 0;
