export type EventCategory =
  | 'Hackathon'
  | 'Workshop'
  | 'Technical Session'
  | 'Coding Competition'
  | 'Guest Session'
  | 'Project Showcase'
  | 'Community Meetup';

export type EventStatus = 'upcoming' | 'past';

export interface ClubEvent {
  id: string;
  title: string;
  date: string;
  category: EventCategory;
  description: string;
  registrationUrl?: string;
  status: EventStatus;
  organizedBy: 'CCS' | 'University' | 'Partner';
}

export const eventCategories: EventCategory[] = [
  'Hackathon',
  'Workshop',
  'Technical Session',
  'Coding Competition',
  'Guest Session',
  'Project Showcase',
  'Community Meetup',
];

// Only include verified, publicly documented events.
// Replace placeholder data with confirmed events as they become available.
export const events: ClubEvent[] = [
  {
    id: 'hack-horizon-2',
    title: 'Hack Horizon 2.0',
    date: '2026-04-10',
    category: 'Hackathon',
    description:
      'A 24-hour hackathon at ARKA JAIN University bringing together student developers, designers and innovators to build solutions over a weekend.',
    registrationUrl: undefined,
    status: 'past',
    organizedBy: 'University',
  },
];

export const hasUpcomingEvents = events.some((e) => e.status === 'upcoming');
