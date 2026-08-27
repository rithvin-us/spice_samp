import type { Ingredient } from '../types';

/**
 * Shared ingredient library. Products reference entries by id so a blend can be
 * described without duplicating flavour copy across the catalogue.
 *
 * Flavour notes only — no proportions, no nutrition or health claims.
 */
export const ingredients: Record<string, Ingredient> = {
  coriander: {
    id: 'coriander',
    name: { en: 'Coriander', ta: 'கொத்தமல்லி' },
    tamilName: 'கொத்தமல்லி',
    note: { en: 'Earthy and citrusy.', ta: 'மண்வாசனையும் எலுமிச்சைத் தன்மையும்.' },
    colour: '#b08a4a',
  },
  cumin: {
    id: 'cumin',
    name: { en: 'Cumin', ta: 'சீரகம்' },
    tamilName: 'சீரகம்',
    note: { en: 'Warm and aromatic.', ta: 'சூடான, நறுமணமான சுவை.' },
    colour: '#8a6a3c',
  },
  chilli: {
    id: 'chilli',
    name: { en: 'Chilli', ta: 'மிளகாய்' },
    tamilName: 'மிளகாய்',
    note: { en: 'Deep, rounded heat.', ta: 'ஆழமான, நிறைவான காரம்.' },
    colour: '#b4291d',
  },
  pepper: {
    id: 'pepper',
    name: { en: 'Black Pepper', ta: 'மிளகு' },
    tamilName: 'மிளகு',
    note: { en: 'Sharp and woody.', ta: 'கூர்மையான, மரவாசனை.' },
    colour: '#3d332c',
  },
  turmeric: {
    id: 'turmeric',
    name: { en: 'Turmeric', ta: 'மஞ்சள்' },
    tamilName: 'மஞ்சள்',
    note: { en: 'Golden and gently bitter.', ta: 'பொன்னிறமும் லேசான கசப்பும்.' },
    colour: '#dfa02b',
  },
  fenugreek: {
    id: 'fenugreek',
    name: { en: 'Fenugreek', ta: 'வெந்தயம்' },
    tamilName: 'வெந்தயம்',
    note: { en: 'Bittersweet, holds a blend together.', ta: 'இனிப்பும் கசப்பும் கலந்து கூட்டைப் பிணைக்கிறது.' },
    colour: '#c9a13f',
  },
  curryLeaf: {
    id: 'curryLeaf',
    name: { en: 'Curry Leaf', ta: 'கறிவேப்பிலை' },
    tamilName: 'கறிவேப்பிலை',
    note: { en: 'Green, unmistakably South Indian.', ta: 'பசுமையான, தென்னிந்திய அடையாளம்.' },
    colour: '#5f7a3c',
  },
  cinnamon: {
    id: 'cinnamon',
    name: { en: 'Cinnamon', ta: 'பட்டை' },
    tamilName: 'பட்டை',
    note: { en: 'Sweet bark, quietly warming.', ta: 'இனிப்பான பட்டை, மென்மையான சூடு.' },
    colour: '#9c5f34',
  },
  clove: {
    id: 'clove',
    name: { en: 'Clove', ta: 'கிராம்பு' },
    tamilName: 'கிராம்பு',
    note: { en: 'Intense and resinous.', ta: 'தீவிரமான, பிசின் நறுமணம்.' },
    colour: '#5d3a24',
  },
  cardamom: {
    id: 'cardamom',
    name: { en: 'Cardamom', ta: 'ஏலக்காய்' },
    tamilName: 'ஏலக்காய்',
    note: { en: 'Cool, floral lift.', ta: 'குளிர்ச்சியான, மலர் நறுமணம்.' },
    colour: '#8f9b62',
  },
  starAnise: {
    id: 'starAnise',
    name: { en: 'Star Anise', ta: 'அன்னாசிப்பூ' },
    tamilName: 'அன்னாசிப்பூ',
    note: { en: 'Liquorice depth.', ta: 'அதிமதுர ஆழம்.' },
    colour: '#6b3f2a',
  },
  fennel: {
    id: 'fennel',
    name: { en: 'Fennel', ta: 'பெருஞ்சீரகம்' },
    tamilName: 'பெருஞ்சீரகம்',
    note: { en: 'Sweet and cooling.', ta: 'இனிப்பும் குளிர்ச்சியும்.' },
    colour: '#a3a05e',
  },
  mustard: {
    id: 'mustard',
    name: { en: 'Mustard', ta: 'கடுகு' },
    tamilName: 'கடுகு',
    note: { en: 'Pungent when it meets heat.', ta: 'சூட்டில் விரியும் காரம்.' },
    colour: '#4a3b23',
  },
  toorDal: {
    id: 'toorDal',
    name: { en: 'Toor Dal', ta: 'துவரம் பருப்பு' },
    tamilName: 'துவரம் பருப்பு',
    note: { en: 'Roasted, lends body to a sambar.', ta: 'வறுத்தது, சாம்பாருக்கு கெட்டித்தன்மை.' },
    colour: '#d0a44a',
  },
  asafoetida: {
    id: 'asafoetida',
    name: { en: 'Asafoetida', ta: 'பெருங்காயம்' },
    tamilName: 'பெருங்காயம்',
    note: { en: 'Savoury, used with restraint.', ta: 'சுவையூட்டி, அளவோடு சேர்ப்பது.' },
    colour: '#b98b3e',
  },
  garlic: {
    id: 'garlic',
    name: { en: 'Garlic', ta: 'பூண்டு' },
    tamilName: 'பூண்டு',
    note: { en: 'Round and savoury.', ta: 'நிறைவான, சுவையான தன்மை.' },
    colour: '#e0d3ba',
  },
  ginger: {
    id: 'ginger',
    name: { en: 'Dry Ginger', ta: 'சுக்கு' },
    tamilName: 'சுக்கு',
    note: { en: 'Bright, peppery edge.', ta: 'கூர்மையான, மிளகுத் தன்மை.' },
    colour: '#c8a173',
  },
  bayLeaf: {
    id: 'bayLeaf',
    name: { en: 'Bay Leaf', ta: 'பிரியாணி இலை' },
    tamilName: 'பிரியாணி இலை',
    note: { en: 'Soft herbal background.', ta: 'மென்மையான மூலிகை பின்னணி.' },
    colour: '#6d7a4a',
  },
  nutmeg: {
    id: 'nutmeg',
    name: { en: 'Nutmeg', ta: 'ஜாதிக்காய்' },
    tamilName: 'ஜாதிக்காய்',
    note: { en: 'Sweet, close to the nose.', ta: 'இனிப்பான, நெருக்கமான நறுமணம்.' },
    colour: '#8b6141',
  },
  poppySeed: {
    id: 'poppySeed',
    name: { en: 'Poppy Seed', ta: 'கசகசா' },
    tamilName: 'கசகசா',
    note: { en: 'Nutty, thickens a gravy.', ta: 'நட்ஸ் சுவை, குழம்பை கெட்டியாக்கும்.' },
    colour: '#cfc3a6',
  },
};

export const getIngredient = (id: string): Ingredient | undefined => ingredients[id];

export const getIngredients = (ids: string[]): Ingredient[] =>
  ids.map((id) => ingredients[id]).filter((x): x is Ingredient => Boolean(x));
