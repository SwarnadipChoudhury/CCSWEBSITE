export interface NavLink {
  label: string;
  href: string;
  number: string;
}

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#home', number: '00' },
  { label: 'About', href: '#about', number: '01' },
  { label: 'Domains', href: '#domains', number: '02' },
  { label: 'Events', href: '#events', number: '03' },
  { label: 'Projects', href: '#projects', number: '04' },
  { label: 'Team', href: '#team', number: '05' },
  { label: 'Achievements', href: '#achievements', number: '06' },
  { label: 'Gallery', href: '#gallery', number: '07' },
  { label: 'Join Us', href: '#join', number: '08' },
  { label: 'Contact', href: '#contact', number: '09' },
];

export const sectionLabels = {
  about: '01 / ABOUT',
  domains: '02 / EXPLORE',
  events: '03 / EVENTS',
  projects: '04 / PROJECTS',
  team: '05 / PEOPLE',
  achievements: '06 / ACHIEVEMENTS',
  gallery: '07 / GALLERY',
  community: '08 / COMMUNITY',
  join: '09 / JOIN',
  contact: '10 / CONTACT',
};
