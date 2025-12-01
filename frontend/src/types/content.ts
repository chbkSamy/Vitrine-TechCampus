export interface Media {
  id?: number;
  url: string;
  alternativeText?: string | null;
  width?: number | null;
  height?: number | null;
}

export interface Hero {
  id?: number;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaUrl: string;
  image?: Media | null;
}

export interface Highlight {
  id?: number;
  title: string;
  description: string;
  icon?: string | null;
  order?: number | null;
}

export interface NewsItem {
  id?: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  status?: string;
  startDate?: string | null;
  endDate?: string | null;
  image?: Media | null;
}

export interface Program {
  id?: number;
  title: string;
  slug: string;
  level: string;
  type: string;
  shortDescription: string;
  longDescription?: string;
  duration?: string;
  prerequisites?: string;
  campus?: string;
}

export interface ContactSettings {
  id?: number;
  title: string;
  description: string;
  email: string;
  phone?: string | null;
  formEnabled?: boolean;
}

