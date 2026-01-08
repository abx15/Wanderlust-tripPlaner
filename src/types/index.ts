// Destination Types
export interface Destination {
  id: string;
  slug: string;
  name: string;
  country: string;
  continent: string;
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  startingPrice: number;
  currency: string;
  bestTimeToVisit: string;
  highlights: string[];
  attractions: Attraction[];
  weather: Weather;
  rating: number;
  reviewCount: number;
}

export interface Attraction {
  name: string;
  description: string;
  image: string;
}

export interface Weather {
  summer: string;
  winter: string;
  spring: string;
  autumn: string;
}

// Experience Types
export interface Experience {
  id: string;
  slug: string;
  title: string;
  category: ExperienceCategory;
  destination: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Expert';
  price: number;
  currency: string;
  included: string[];
  notIncluded: string[];
  highlights: string[];
  rating: number;
  reviewCount: number;
  maxGroupSize: number;
}

export type ExperienceCategory = 
  | 'Adventure'
  | 'Luxury'
  | 'Honeymoon'
  | 'Family'
  | 'Solo'
  | 'Cultural'
  | 'Wildlife';

// Blog Types
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: Author;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
}

export interface Author {
  name: string;
  avatar: string;
  role: string;
}

// Team Types
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

// Review Types
export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  destination?: string;
  experience?: string;
}

// Trip Planner Types
export interface TripPlan {
  destination: Destination | null;
  dates: {
    start: Date | null;
    end: Date | null;
  };
  experience: Experience | null;
  travelers: number;
}

// Dashboard Types
export interface SavedTrip {
  id: string;
  destination: Destination;
  experience?: Experience;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  totalCost: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  memberSince: string;
  tripsCompleted: number;
  countriesVisited: number;
  savedDestinations: string[];
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// Filter Types
export interface DestinationFilters {
  country: string;
  budget: [number, number];
  season: string;
  search: string;
}

export interface ExperienceFilters {
  category: ExperienceCategory | 'All';
  difficulty: string;
  priceRange: [number, number];
}
