export interface SocialLink {
  label: string;
  href: string;
  icon: string;
  available: boolean;
}

// Only mark links as available: true when verified by the CCS team.
export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: '', icon: 'Github', available: false },
  { label: 'LinkedIn', href: '', icon: 'Linkedin', available: false },
  { label: 'Instagram', href: '', icon: 'Instagram', available: false },
  { label: 'Discord', href: '', icon: 'MessageCircle', available: false },
];

export const contactInfo = {
  organization: 'Code and Compute Society',
  institution: 'ARKA JAIN University, Jharkhand',
  address: 'Mohanpur, Gamharia, Seraikela-Kharsawan, Jharkhand – 832108',
  email: '', // Add verified CCS email when available
};

export const availableSocials = socialLinks.filter((s) => s.available);
