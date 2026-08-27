import type { Product, ProductCategory } from '../types';

/**
 * SOLI MASALA catalogue.
 *
 * The four entries below correspond to the real packaging artwork supplied in
 * `img/` (copied to `/public/img/products`). Tamil names are transcribed from
 * the packs themselves.
 *
 * Adding products: append an object here. Nothing in the UI is hard-coded to a
 * slug or to a catalogue length — the grid, filters, search, routes, sitemap
 * and cart all read from this array, so the model scales to 50+ items.
 *
 * Prices, weights and blend descriptions are prototype content.
 */
export const products: Product[] = [
  {
    id: 'soli-chicken-masala',
    slug: 'chicken-masala',
    name: { en: 'SOLI Chicken Masala', ta: 'SOLI சிக்கன் மசாலா' },
    tamilName: 'சிக்கன் மசாலா',
    tagline: {
      en: 'For gravies that hold their colour and their heat.',
      ta: 'நிறமும் காரமும் தக்கவைக்கும் குழம்புகளுக்கு.',
    },
    description: {
      en: 'A rounded, roasted blend built for chicken curries, fry and pepper-forward gravies.',
      ta: 'சிக்கன் குழம்பு, வறுவல், மிளகுக் குழம்புகளுக்கென வறுத்துத் தயாரிக்கப்பட்ட கூட்டு.',
    },
    story: {
      en: 'Chicken asks for a masala with shoulders. This one leans on roasted coriander for body, black pepper for a slow-building sharpness, and just enough clove and star anise to carry the aroma across the kitchen. It behaves the same whether you are making a thin Sunday curry or a dry pepper fry.',
      ta: 'சிக்கனுக்கு வலிமையான மசாலா தேவை. வறுத்த கொத்தமல்லி உடலமைப்பையும், மிளகு மெல்ல எழும் கூர்மையையும், கிராம்பும் அன்னாசிப்பூவும் சமையலறை முழுக்கப் பரவும் நறுமணத்தையும் தருகின்றன. மெல்லிய ஞாயிறு குழம்பானாலும், உலர்ந்த மிளகு வறுவலானாலும் ஒரே சீராகச் செயல்படும்.',
    },
    category: 'non-veg',
    signature: true,
    featured: true,
    availability: 'in-stock',
    price: 235,
    weight: 500,
    image: '/img/products/chicken-masala.jpg',
    ingredients: ['coriander', 'chilli', 'pepper', 'cumin', 'clove', 'starAnise', 'turmeric', 'ginger'],
    usage: [
      { en: 'Chicken curry and kuzhambu', ta: 'சிக்கன் குழம்பு' },
      { en: 'Pepper chicken fry', ta: 'மிளகு சிக்கன் வறுவல்' },
      { en: 'Marinades before grilling', ta: 'வறுப்பதற்கு முன் ஊறவைக்க' },
    ],
    accent: '#b4291d',
  },
  {
    id: 'soli-curry-masala',
    slug: 'curry-masala',
    name: { en: 'SOLI Curry Masala', ta: 'SOLI கறி மசாலா' },
    tamilName: 'கறி மசாலா',
    tagline: {
      en: 'The everyday blend the whole shelf is built around.',
      ta: 'அன்றாடச் சமையலின் அடித்தளமான கூட்டு.',
    },
    description: {
      en: 'An all-purpose masala for everyday vegetable and meat curries — balanced, never loud.',
      ta: 'அன்றாட காய்கறி மற்றும் இறைச்சிக் கறிகளுக்கான சமநிலையான, மிதமான மசாலா.',
    },
    story: {
      en: 'Every kitchen keeps one tin that gets opened almost daily. This is that blend — coriander-led and deliberately even-tempered, so it supports whatever is in the pan instead of taking it over. Use it when you want the vegetable, not the masala, to be the thing you taste first.',
      ta: 'ஒவ்வொரு சமையலறையிலும் தினமும் திறக்கப்படும் ஒரு டப்பா இருக்கும். இதுவே அந்தக் கூட்டு — கொத்தமல்லி முதன்மையாக, வேண்டுமென்றே சமநிலையாக. பாத்திரத்தில் இருப்பதை மேலெழும்பாமல் தாங்கிப் பிடிக்கும். மசாலாவை விட காய்கறியின் சுவை முதலில் தெரிய வேண்டும் என்றால் இதைப் பயன்படுத்துங்கள்.',
    },
    category: 'veg',
    signature: false,
    featured: true,
    availability: 'in-stock',
    price: 210,
    weight: 500,
    image: '/img/products/curry-masala.jpg',
    ingredients: ['coriander', 'cumin', 'turmeric', 'chilli', 'pepper', 'fennel', 'cinnamon', 'curryLeaf'],
    usage: [
      { en: 'Mixed vegetable curry', ta: 'கலவை காய்கறிக் கறி' },
      { en: 'Everyday gravies', ta: 'அன்றாடக் குழம்புகள்' },
      { en: 'Poriyal and stir-fries', ta: 'பொரியல் மற்றும் வறுவல்' },
    ],
    accent: '#c1663d',
  },
  {
    id: 'soli-madurai-kuzhambu-masala',
    slug: 'madurai-kuzhambu-masala',
    name: { en: 'SOLI Madurai Kuzhambu Masala', ta: 'SOLI மதுரை குழம்பு மசாலா' },
    tamilName: 'மதுரை குழம்பு மசாலா',
    tagline: {
      en: 'Built for a kuzhambu that thickens slowly.',
      ta: 'மெல்ல கெட்டியாகும் குழம்புக்காக.',
    },
    description: {
      en: 'A darker, fuller blend for tamarind kuzhambu — the kind that tastes better the next morning.',
      ta: 'புளிக் குழம்புக்கான அடர்த்தியான கூட்டு — மறுநாள் காலையில் இன்னும் சுவைக்கும்.',
    },
    story: {
      en: 'A kuzhambu is a patient dish. It wants tamarind, time and a masala with enough fenugreek and roasted dal to thicken as it sits. This blend is deliberately heavier than the everyday curry masala, and it is happiest in a clay pot on a low flame with the lid half on.',
      ta: 'குழம்பு பொறுமையான உணவு. புளி, நேரம், மற்றும் நேரம் செல்லச் செல்ல கெட்டியாக்கும் வெந்தயமும் வறுத்த பருப்பும் கொண்ட மசாலா வேண்டும். அன்றாட கறி மசாலாவை விட வேண்டுமென்றே கனமானது. மண் பானையில், சிறு தீயில், மூடி பாதி திறந்திருக்கும்போது இது சிறப்பாகும்.',
    },
    category: 'veg',
    signature: true,
    featured: true,
    availability: 'in-stock',
    price: 245,
    weight: 500,
    image: '/img/products/madurai-kuzhambu-masala.jpg',
    ingredients: ['coriander', 'chilli', 'fenugreek', 'toorDal', 'pepper', 'garlic', 'curryLeaf', 'asafoetida'],
    usage: [
      { en: 'Vatha kuzhambu', ta: 'வத்தல் குழம்பு' },
      { en: 'Puli kuzhambu', ta: 'புளிக் குழம்பு' },
      { en: 'Brinjal and drumstick gravies', ta: 'கத்தரிக்காய், முருங்கைக்காய் குழம்பு' },
    ],
    accent: '#5f7a3c',
  },
  {
    id: 'soli-sambar-powder',
    slug: 'sambar-powder',
    name: { en: 'SOLI Sambar Powder', ta: 'SOLI சாம்பார் பொடி' },
    tamilName: 'சாம்பார் பொடி',
    tagline: {
      en: 'One spoon, and the house knows what is cooking.',
      ta: 'ஒரு கரண்டி போதும் — வீடு முழுக்கத் தெரியும்.',
    },
    description: {
      en: 'Roasted dal and coriander ground for sambar that stays fragrant from the first ladle to the last.',
      ta: 'முதல் கரண்டி முதல் கடைசி வரை நறுமணம் குறையாத சாம்பாருக்காக, வறுத்த பருப்பும் கொத்தமல்லியும்.',
    },
    story: {
      en: 'Sambar is the dish most South Indian homes are measured by, which makes its powder the hardest to get right. Roasted toor dal gives it body, curry leaf keeps it recognisably regional, and a restrained hand with asafoetida holds the whole thing in place without ever announcing itself.',
      ta: 'தென்னிந்திய வீடுகள் அளவிடப்படுவது சாம்பாரால்தான் — அதனால் அதன் பொடியைச் சரியாகச் செய்வதே கடினம். வறுத்த துவரம் பருப்பு கெட்டித்தன்மையையும், கறிவேப்பிலை பிராந்திய அடையாளத்தையும் தருகிறது. அளவான பெருங்காயம் தன்னைக் காட்டிக்கொள்ளாமல் அனைத்தையும் ஒன்றாகப் பிடித்து வைக்கிறது.',
    },
    category: 'veg',
    signature: false,
    featured: true,
    availability: 'in-stock',
    price: 190,
    weight: 500,
    image: '/img/products/sambar-powder.jpg',
    ingredients: ['coriander', 'toorDal', 'chilli', 'fenugreek', 'turmeric', 'curryLeaf', 'asafoetida', 'mustard'],
    usage: [
      { en: 'Everyday sambar', ta: 'அன்றாட சாம்பார்' },
      { en: 'Tiffin sambar for idli and dosa', ta: 'இட்லி, தோசைக்கான டிபன் சாம்பார்' },
      { en: 'Vegetable kootu', ta: 'காய்கறி கூட்டு' },
    ],
    accent: '#dfa02b',
  },
];

/* ---------------------------------------------------------------- lookups */

export const getProduct = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const featuredProducts = (): Product[] => products.filter((p) => p.featured);

export type ProductFilter = 'all' | ProductCategory | 'signature';

export const FILTERS: ProductFilter[] = ['all', 'veg', 'non-veg', 'signature'];

const matchesFilter = (product: Product, filter: ProductFilter): boolean => {
  if (filter === 'all') return true;
  if (filter === 'signature') return product.signature;
  return product.category === filter;
};

/**
 * Filter + search over the catalogue. Search runs across both languages so a
 * Tamil query finds a product while the interface is in English, and vice
 * versa. Kept here rather than in a component so the same behaviour backs the
 * shop page, the nav search and anything added later.
 */
export function queryProducts(
  filter: ProductFilter = 'all',
  search = '',
  source: Product[] = products
): Product[] {
  const term = search.trim().toLowerCase();
  return source.filter((product) => {
    if (!matchesFilter(product, filter)) return false;
    if (!term) return true;
    const haystack = [
      product.name.en,
      product.name.ta,
      product.tamilName,
      product.description.en,
      product.description.ta,
      product.tagline.en,
      ...product.usage.flatMap((u) => [u.en, u.ta]),
      ...product.ingredients,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(term);
  });
}

/** Neighbouring products for the "keep looking" strip on a product page. */
export const relatedProducts = (slug: string, limit = 3): Product[] =>
  products.filter((p) => p.slug !== slug).slice(0, limit);
