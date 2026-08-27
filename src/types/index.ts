export type Category = 'All' | 'Audio' | 'Footwear' | 'Wearables' | 'Lifestyle';

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  accentHex?: string;
}

export interface Product3DConfig {
  meshType: 'headphones' | 'sneaker' | 'smartwatch' | 'perfume';
  scale?: number;
  rotation?: [number, number, number];
  position?: [number, number, number];
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: Category;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isFeatured?: boolean;
  description: string;
  features: string[];
  colors: ColorOption[];
  defaultColorId: string;
  config3D: Product3DConfig;
  specs: Record<string, string>;
}

export interface CartItem {
  product: Product;
  selectedColor: ColorOption;
  quantity: number;
}

export type LightingPreset = 'studio' | 'cyber' | 'sunset' | 'minimal';
