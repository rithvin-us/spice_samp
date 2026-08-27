/* =========================================================================
   SOLI MASALA — shared domain types
   ========================================================================= */

export type Language = 'en' | 'ta';

/** Bilingual string. Every customer-facing value carries both languages. */
export interface Bilingual {
  en: string;
  ta: string;
}

/**
 * Kitchen use, not a claim about the blend's own composition — these masalas
 * are spice blends made *for* a style of dish.
 */
export type ProductCategory = 'veg' | 'non-veg';

export type Availability = 'in-stock' | 'low-stock' | 'sold-out';

export interface IngredientRef {
  /** Key into the ingredient library in `data/ingredients.ts`. */
  id: string;
}

export interface Product {
  id: string;
  slug: string;
  name: Bilingual;
  /** Tamil name exactly as printed on the supplied packaging. */
  tamilName: string;
  tagline: Bilingual;
  description: Bilingual;
  story: Bilingual;
  category: ProductCategory;
  /** Drives the SIGNATURE filter. */
  signature: boolean;
  featured: boolean;
  availability: Availability;
  /** Indian rupees. Prototype pricing. */
  price: number;
  /** Grams. */
  weight: number;
  /** Supplied packaging artwork, served from /public. */
  image: string;
  /** Shown if `image` fails, and used by ProductViewer when no GLB exists. */
  fallbackImage?: string;
  /**
   * Optional path to a GLB under /public/models. When present, ProductViewer
   * renders the real model instead of the packaging artwork — no other code
   * needs to change.
   */
  modelPath?: string;
  /** Ordered ingredient keys, most characterful first. */
  ingredients: string[];
  usage: Bilingual[];
  accent: string;
}

export interface Ingredient {
  id: string;
  name: Bilingual;
  tamilName: string;
  /** Short flavour note — no health or nutrition claims. */
  note: Bilingual;
  colour: string;
}

export interface CartLine {
  productId: string;
  slug: string;
  name: Bilingual;
  tamilName: string;
  price: number;
  weight: number;
  image: string;
  quantity: number;
}

export interface ProcessStage {
  id: string;
  index: string;
  title: Bilingual;
  body: Bilingual;
  material: Bilingual;
}

export interface HeritageChapter {
  id: string;
  label: Bilingual;
  title: Bilingual;
  body: Bilingual;
}

/** Rendering budget picked once per session by `lib/performance.ts`. */
export type CapabilityTier = 'high' | 'medium' | 'low' | 'reduced';
