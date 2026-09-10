export type GalleryCategory =
  | 'Events'
  | 'Workshops'
  | 'Hackathons'
  | 'Community'
  | 'Projects'
  | 'Campus';

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category: GalleryCategory;
}

export const galleryCategories: GalleryCategory[] = [
  'Events',
  'Workshops',
  'Hackathons',
  'Community',
  'Projects',
  'Campus',
];

// Replace with real CCS photos as they are supplied.
export const gallery: GalleryImage[] = [];

export const hasGalleryImages = gallery.length > 0;
