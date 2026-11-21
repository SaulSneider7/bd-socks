import { createContext, useContext } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  images: string[];
  sizes: string[];
  is_featured: boolean;
}

export interface StoreLocation {
  id: number;
  title: string;
  logo: string | null;
  items: { label: string; href: string }[];
}

export interface SiteContent {
  products: Product[];
  heroSlides: { id: number; src: string; alt: string }[];
  images: Record<string, { src: string; alt: string }>;
  locations: StoreLocation[];
  mainLocation: StoreLocation | null;
}

export const ContentContext = createContext<SiteContent | null>(null);

export function useContent() {
  const content = useContext(ContentContext);
  if (!content) throw new Error('El contenido debe cargarse antes de mostrar la página.');
  return content;
}
