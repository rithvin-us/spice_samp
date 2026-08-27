import type { Language } from '../types';

/**
 * Interface dictionary.
 *
 * Page components are never duplicated per language — every component reads
 * from here through `useT()`. Product, ingredient and narrative copy lives in
 * its own data files as `Bilingual` values and is resolved the same way.
 *
 * The English object is the source of truth for the key shape; `ta` is checked
 * against it by the `Dictionary` type, so a missing Tamil key is a build error.
 */
const en = {
  brand: {
    name: 'SOLI MASALA',
    lineOne: 'Ground with tradition.',
    lineTwo: 'Made for today.',
  },

  nav: {
    shop: 'Shop',
    story: 'Our Story',
    process: "How It's Made",
    about: 'About',
    menu: 'Menu',
    close: 'Close',
    openMenu: 'Open menu',
    home: 'Home',
  },

  hero: {
    supporting:
      'Handpicked spices and carefully crafted masalas, inspired by the kitchens of South India.',
    primaryCta: 'Explore Masalas',
    secondaryCta: 'Our Story',
    logoAlt: 'SOLI Masala',
  },

  statement: {
    label: 'From the land',
    titleOne: 'From the land',
    titleTwo: 'to the kitchen.',
    body: 'The flavour of a masala begins long before it reaches the cooking pot.',
    detail:
      'It begins in how the spice was grown, how long it was allowed to dry, and how much patience someone was willing to give it over a low flame. We buy whole, roast separately, and grind in batches small enough to keep their aroma.',
  },

  pantry: {
    label: 'Shop the SOLI pantry',
    title: 'Four blends.',
    titleAccent: 'Each with a job to do.',
    body: 'Every SOLI masala is built around a specific dish rather than a general idea of flavour.',
    viewAll: 'View all masalas',
  },

  product: {
    view: 'View product',
    add: 'Add to cart',
    adding: 'Added',
    price: 'Price',
    weight: 'Weight',
    net: 'Net weight',
    quantity: 'Quantity',
    decrease: 'Decrease quantity',
    increase: 'Increase quantity',
    inStock: 'In stock',
    lowStock: 'Low stock',
    soldOut: 'Sold out',
    whatsInside: "What's inside",
    insideNote: 'Blend details shown are prototype content for this demonstration site.',
    howToUse: 'How to use it',
    aboutBlend: 'About this blend',
    signature: 'Signature blend',
    forVeg: 'For vegetarian dishes',
    forNonVeg: 'For meat and seafood dishes',
    related: 'Also in the pantry',
    backToShop: 'Back to shop',
    dragHint: 'Drag to look around',
    notFound: 'We could not find that masala.',
    notFoundBody: 'It may have been renamed. The full pantry is one tap away.',
  },

  shop: {
    title: 'The SOLI pantry',
    subtitle:
      'Blends for everyday cooking, ground in small batches. Filter by the dishes each one is made for.',
    search: 'Search masalas',
    searchPlaceholder: 'Search by dish, spice or name',
    clear: 'Clear',
    filterAll: 'All',
    filterVeg: 'Veg',
    filterNonVeg: 'Non-veg',
    filterSignature: 'Signature',
    filterHint: 'Filter by the dishes each blend is made for.',
    resultsOne: 'blend',
    resultsMany: 'blends',
    empty: 'No blends match that search.',
    emptyBody: 'Try a dish name, a spice, or clear the filters.',
    reset: 'Reset filters',
  },

  process: {
    label: 'From spice to masala',
    title: 'From spice',
    titleAccent: 'to masala.',
    subtitle: 'Where patience becomes flavour.',
    body: 'Seven stages, none of which can be hurried without it showing in the pot.',
    stage: 'Stage',
    ready: 'Ready for your kitchen.',
    readyBody: 'Everything above happens before the packet reaches you. The rest is yours.',
    shopNow: 'Shop the pantry',
    staticNote: 'Showing the stages as stills.',
  },

  heritage: {
    label: 'Heritage',
    titleOne: 'Some recipes are written down.',
    titleTwo: 'Some are passed on.',
    body: 'SOLI began the way most South Indian blends do — in a kitchen, with somebody deciding it could be better.',
    readMore: 'Read our story',
    disclaimer:
      'This is a prototype experience. The narrative on this page is written for demonstration and is not a record of real company history.',
  },

  about: {
    label: 'About SOLI',
    title: 'A spice company that still thinks like a kitchen.',
    intro:
      'SOLI makes South Indian masalas for people who care how their food tastes but no longer have an afternoon to spend roasting coriander. We do that part. The cooking is still yours.',
    closing: 'Ground with tradition. Made for today.',
    readAbout: 'About SOLI',
  },

  cart: {
    title: 'Your cart',
    open: 'Open cart',
    close: 'Close cart',
    empty: 'Your cart is empty.',
    emptyBody: 'Blends you add will appear here.',
    startShopping: 'Start shopping',
    remove: 'Remove',
    removed: 'Removed',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    shippingNote: 'Calculated at checkout',
    total: 'Total',
    checkout: 'Proceed to checkout',
    continue: 'Continue shopping',
    items: 'items',
    item: 'item',
    added: 'Added to cart',
  },

  checkout: {
    title: 'Checkout',
    demoBadge: 'Demonstration only',
    demoTitle: 'This is a prototype checkout.',
    demoBody:
      'No payment is processed and no card, address or personal details are collected or transmitted. The summary below shows what a real order would contain.',
    orderSummary: 'Order summary',
    placeOrder: 'Place demo order',
    placed: 'Demo order recorded',
    placedBody:
      'Nothing was charged and nothing was sent. Your cart has been cleared so you can try the flow again.',
    backToShop: 'Back to the pantry',
    emptyTitle: 'There is nothing to check out.',
  },

  footer: {
    tagline: 'Handpicked spices and carefully crafted masalas, inspired by the kitchens of South India.',
    shop: 'Shop',
    explore: 'Explore',
    prototype: 'Prototype',
    prototypeNote:
      'A demonstration build. Product packaging and the SOLI mark are supplied brand assets; pricing, availability and narrative copy are prototype content.',
    rights: 'SOLI Masala',
    language: 'Language',
  },

  spotlight: {
    next: 'Next masala',
    previous: 'Previous masala',
  },

  reviews: {
    label: 'From our kitchens to yours',
    title: 'What cooks say',
    titleAccent: 'after the first packet.',
    body: 'Notes from people who cook with SOLI every week.',
    sample: 'Sample content',
    disclaimer:
      'Prototype build: the reviews and customer marks on this page are placeholder content, not real customers or endorsements.',
    verified: 'Cooks with SOLI',
    ratingLabel: 'Rated',
    outOf: 'out of 5',
  },

  clients: {
    title: 'Kitchens that cook with SOLI',
    placeholder: 'Placeholder marks',
  },

  contact: {
    label: 'Contact',
    title: 'Talk to us.',
    body: 'Questions about a blend, a bulk order, or a recipe you would like us to get right — we read everything.',
    linkedin: 'LinkedIn',
    instagram: 'Instagram',
    whatsapp: 'WhatsApp',
    email: 'Email',
    linkedinNote: 'Company updates',
    instagramNote: 'Kitchen notes and recipes',
    whatsappNote: 'Quickest reply',
    emailNote: 'Orders and everything else',
    placeholderNote: 'Prototype: these links are placeholders and go nowhere yet.',
  },

  common: {
    currency: '₹',
    grams: 'g',
    skipToContent: 'Skip to content',
    loading: 'Loading',
  },
} as const;

/** Every key in `en`, with the same shape, in Tamil. */
type Dictionary = {
  [K in keyof typeof en]: { [P in keyof (typeof en)[K]]: string };
};

const ta: Dictionary = {
  brand: {
    name: 'SOLI MASALA',
    lineOne: 'பாரம்பரியத்தில் அரைத்தது.',
    lineTwo: 'இன்றைக்காகச் செய்தது.',
  },

  nav: {
    shop: 'கடை',
    story: 'எங்கள் கதை',
    process: 'எப்படித் தயாராகிறது',
    about: 'எங்களைப் பற்றி',
    menu: 'பட்டியல்',
    close: 'மூடு',
    openMenu: 'பட்டியலைத் திற',
    home: 'முகப்பு',
  },

  hero: {
    supporting:
      'தென்னிந்திய சமையலறைகளின் தாக்கத்தில், கையால் தேர்ந்தெடுக்கப்பட்ட மசாலாக்களும் கவனமாகத் தயாரிக்கப்பட்ட கூட்டுகளும்.',
    primaryCta: 'மசாலாக்களைப் பாருங்கள்',
    secondaryCta: 'எங்கள் கதை',
    logoAlt: 'SOLI மசாலா',
  },

  statement: {
    label: 'நிலத்திலிருந்து',
    titleOne: 'நிலத்திலிருந்து',
    titleTwo: 'சமையலறைக்கு.',
    body: 'ஒரு மசாலாவின் சுவை, அது பாத்திரத்தை அடைவதற்கு நெடுங்காலம் முன்பே தொடங்குகிறது.',
    detail:
      'அது எப்படி விளைந்தது, எவ்வளவு நேரம் காய வைக்கப்பட்டது, சிறு தீயில் யாரோ எவ்வளவு பொறுமை காட்டினார்கள் என்பதிலிருந்தே தொடங்குகிறது. முழுதாக வாங்கி, தனித்தனியே வறுத்து, நறுமணம் காக்கும் அளவுக்குச் சிறிய தொகுதிகளாக அரைக்கிறோம்.',
  },

  pantry: {
    label: 'SOLI அலமாரியில் வாங்குங்கள்',
    title: 'நான்கு கூட்டுகள்.',
    titleAccent: 'ஒவ்வொன்றுக்கும் ஒரு வேலை.',
    body: 'ஒவ்வொரு SOLI மசாலாவும் பொதுவான சுவைக் கருத்தை விட, ஒரு குறிப்பிட்ட உணவை மையமாகக் கொண்டு உருவாக்கப்படுகிறது.',
    viewAll: 'அனைத்து மசாலாக்களையும் பார்க்க',
  },

  product: {
    view: 'விவரம் பார்க்க',
    add: 'கூடையில் சேர்',
    adding: 'சேர்க்கப்பட்டது',
    price: 'விலை',
    weight: 'எடை',
    net: 'நிகர எடை',
    quantity: 'அளவு',
    decrease: 'அளவைக் குறை',
    increase: 'அளவைக் கூட்டு',
    inStock: 'கிடைக்கிறது',
    lowStock: 'இருப்பு குறைவு',
    soldOut: 'விற்றுத் தீர்ந்தது',
    whatsInside: 'உள்ளே என்ன இருக்கிறது',
    insideNote: 'இங்கு காட்டப்படும் கூட்டு விவரங்கள் இந்த மாதிரி இணையதளத்திற்கான உதாரணத் தகவல்.',
    howToUse: 'எப்படிப் பயன்படுத்துவது',
    aboutBlend: 'இந்தக் கூட்டு பற்றி',
    signature: 'சிறப்புக் கூட்டு',
    forVeg: 'சைவ உணவுகளுக்கு',
    forNonVeg: 'இறைச்சி மற்றும் கடல் உணவுகளுக்கு',
    related: 'அலமாரியில் மேலும்',
    backToShop: 'கடைக்குத் திரும்பு',
    dragHint: 'சுற்றிப் பார்க்க இழுக்கவும்',
    notFound: 'அந்த மசாலாவைக் கண்டுபிடிக்க முடியவில்லை.',
    notFoundBody: 'பெயர் மாறியிருக்கலாம். முழு அலமாரியும் ஒரு தொடுதலில் உள்ளது.',
  },

  shop: {
    title: 'SOLI அலமாரி',
    subtitle:
      'அன்றாடச் சமையலுக்கான கூட்டுகள், சிறு தொகுதிகளாக அரைக்கப்பட்டவை. எந்த உணவுக்கானது என்பதைக் கொண்டு வடிகட்டுங்கள்.',
    search: 'மசாலாக்களைத் தேடு',
    searchPlaceholder: 'உணவு, மசாலா அல்லது பெயரால் தேடுங்கள்',
    clear: 'அழி',
    filterAll: 'அனைத்தும்',
    filterVeg: 'சைவம்',
    filterNonVeg: 'அசைவம்',
    filterSignature: 'சிறப்பு',
    filterHint: 'ஒவ்வொரு கூட்டும் எந்த உணவுக்காகச் செய்யப்பட்டது என்பதைக் கொண்டு வடிகட்டுங்கள்.',
    resultsOne: 'கூட்டு',
    resultsMany: 'கூட்டுகள்',
    empty: 'அந்தத் தேடலுக்கு எந்தக் கூட்டும் பொருந்தவில்லை.',
    emptyBody: 'உணவின் பெயர், ஒரு மசாலா, அல்லது வடிகட்டியை நீக்கிப் பாருங்கள்.',
    reset: 'வடிகட்டியை நீக்கு',
  },

  process: {
    label: 'மசாலாவிலிருந்து கூட்டுக்கு',
    title: 'மசாலாவிலிருந்து',
    titleAccent: 'கூட்டுக்கு.',
    subtitle: 'பொறுமை சுவையாக மாறும் இடம்.',
    body: 'ஏழு நிலைகள் — எதையும் அவசரப்படுத்தினால் அது பாத்திரத்தில் தெரிந்துவிடும்.',
    stage: 'நிலை',
    ready: 'உங்கள் சமையலறைக்குத் தயார்.',
    readyBody: 'மேலே உள்ள அனைத்தும் பொட்டலம் உங்களை அடைவதற்கு முன்பே நடக்கின்றன. மீதி உங்களுடையது.',
    shopNow: 'அலமாரியில் வாங்குங்கள்',
    staticNote: 'நிலைகள் நிழற்படங்களாகக் காட்டப்படுகின்றன.',
  },

  heritage: {
    label: 'பாரம்பரியம்',
    titleOne: 'சில செய்முறைகள் எழுதப்படுகின்றன.',
    titleTwo: 'சில கடத்தப்படுகின்றன.',
    body: 'பெரும்பாலான தென்னிந்தியக் கூட்டுகள் தொடங்கும் விதத்திலேயே SOLI-யும் தொடங்கியது — ஒரு சமையலறையில், இதை இன்னும் சிறப்பாகச் செய்யலாம் என்று யாரோ முடிவெடுத்தபோது.',
    readMore: 'எங்கள் கதையைப் படியுங்கள்',
    disclaimer:
      'இது ஒரு மாதிரி அனுபவம். இந்தப் பக்கத்தில் உள்ள கதை விளக்கத்திற்காக எழுதப்பட்டது; இது நிறுவனத்தின் உண்மையான வரலாற்றுப் பதிவு அல்ல.',
  },

  about: {
    label: 'SOLI பற்றி',
    title: 'இன்னும் சமையலறை போலவே சிந்திக்கும் ஒரு மசாலா நிறுவனம்.',
    intro:
      'உணவின் சுவையில் அக்கறை கொண்டவர்களுக்காக — ஆனால் கொத்தமல்லி வறுக்க ஒரு மதியத்தைச் செலவிட முடியாதவர்களுக்காக — SOLI தென்னிந்திய மசாலாக்களைத் தயாரிக்கிறது. அந்தப் பகுதியை நாங்கள் செய்கிறோம். சமையல் இன்னும் உங்களுடையதே.',
    closing: 'பாரம்பரியத்தில் அரைத்தது. இன்றைக்காகச் செய்தது.',
    readAbout: 'SOLI பற்றி',
  },

  cart: {
    title: 'உங்கள் கூடை',
    open: 'கூடையைத் திற',
    close: 'கூடையை மூடு',
    empty: 'உங்கள் கூடை காலியாக உள்ளது.',
    emptyBody: 'நீங்கள் சேர்க்கும் கூட்டுகள் இங்கே தோன்றும்.',
    startShopping: 'வாங்கத் தொடங்குங்கள்',
    remove: 'நீக்கு',
    removed: 'நீக்கப்பட்டது',
    subtotal: 'கூட்டுத்தொகை',
    shipping: 'அனுப்புகை',
    shippingNote: 'கட்டணத்தின்போது கணக்கிடப்படும்',
    total: 'மொத்தம்',
    checkout: 'கட்டணத்திற்குச் செல்',
    continue: 'தொடர்ந்து வாங்குங்கள்',
    items: 'பொருட்கள்',
    item: 'பொருள்',
    added: 'கூடையில் சேர்க்கப்பட்டது',
  },

  checkout: {
    title: 'கட்டணம்',
    demoBadge: 'விளக்கத்திற்கு மட்டும்',
    demoTitle: 'இது ஒரு மாதிரிக் கட்டணப் பக்கம்.',
    demoBody:
      'எந்தக் கட்டணமும் செலுத்தப்படவில்லை; அட்டை, முகவரி அல்லது தனிப்பட்ட விவரங்கள் எதுவும் சேகரிக்கப்படவோ அனுப்பப்படவோ இல்லை. உண்மையான ஆர்டரில் என்ன இருக்கும் என்பதை மட்டும் கீழே காணலாம்.',
    orderSummary: 'ஆர்டர் சுருக்கம்',
    placeOrder: 'மாதிரி ஆர்டர் செய்',
    placed: 'மாதிரி ஆர்டர் பதிவானது',
    placedBody:
      'எதுவும் வசூலிக்கப்படவில்லை, எதுவும் அனுப்பப்படவில்லை. மீண்டும் முயற்சிக்க உங்கள் கூடை காலி செய்யப்பட்டுள்ளது.',
    backToShop: 'அலமாரிக்குத் திரும்பு',
    emptyTitle: 'கட்டணத்திற்கு எதுவும் இல்லை.',
  },

  footer: {
    tagline:
      'தென்னிந்திய சமையலறைகளின் தாக்கத்தில், கையால் தேர்ந்தெடுக்கப்பட்ட மசாலாக்களும் கவனமாகத் தயாரிக்கப்பட்ட கூட்டுகளும்.',
    shop: 'கடை',
    explore: 'பார்வையிட',
    prototype: 'மாதிரி',
    prototypeNote:
      'இது ஒரு விளக்க மாதிரி. தயாரிப்புப் பொட்டலங்களும் SOLI அடையாளமும் வழங்கப்பட்ட பிராண்ட் சொத்துகள்; விலை, இருப்பு மற்றும் கதை உள்ளடக்கம் மாதிரித் தகவல்.',
    rights: 'SOLI Masala',
    language: 'மொழி',
  },

  spotlight: {
    next: 'அடுத்த மசாலா',
    previous: 'முந்தைய மசாலா',
  },

  reviews: {
    label: 'எங்கள் சமையலறையிலிருந்து உங்களுக்கு',
    title: 'முதல் பொட்டலத்திற்குப் பிறகு',
    titleAccent: 'சமையல்காரர்கள் சொல்வது.',
    body: 'ஒவ்வொரு வாரமும் SOLI கொண்டு சமைப்பவர்களின் குறிப்புகள்.',
    sample: 'மாதிரி உள்ளடக்கம்',
    disclaimer:
      'இது ஒரு மாதிரி பதிப்பு: இந்தப் பக்கத்தில் உள்ள விமர்சனங்களும் வாடிக்கையாளர் அடையாளங்களும் மாதிரித் தகவல்; உண்மையான வாடிக்கையாளர்கள் அல்லது பரிந்துரைகள் அல்ல.',
    verified: 'SOLI கொண்டு சமைப்பவர்',
    ratingLabel: 'மதிப்பீடு',
    outOf: '/ 5',
  },

  clients: {
    title: 'SOLI கொண்டு சமைக்கும் சமையலறைகள்',
    placeholder: 'மாதிரி அடையாளங்கள்',
  },

  contact: {
    label: 'தொடர்பு',
    title: 'எங்களிடம் பேசுங்கள்.',
    body: 'ஒரு கூட்டு பற்றிய கேள்வி, மொத்த ஆர்டர், அல்லது நாங்கள் சரியாகச் செய்ய வேண்டும் என நீங்கள் விரும்பும் ஒரு செய்முறை — அனைத்தையும் படிக்கிறோம்.',
    linkedin: 'LinkedIn',
    instagram: 'Instagram',
    whatsapp: 'WhatsApp',
    email: 'மின்னஞ்சல்',
    linkedinNote: 'நிறுவனச் செய்திகள்',
    instagramNote: 'சமையல் குறிப்புகளும் செய்முறைகளும்',
    whatsappNote: 'விரைவான பதில்',
    emailNote: 'ஆர்டர்களும் மற்ற அனைத்தும்',
    placeholderNote: 'மாதிரி: இந்த இணைப்புகள் இடம்பிடிப்புகள், இன்னும் எங்கும் செல்லாது.',
  },

  common: {
    currency: '₹',
    grams: 'கி',
    skipToContent: 'உள்ளடக்கத்திற்குச் செல்',
    loading: 'ஏற்றுகிறது',
  },
};

export const dictionaries: Record<Language, Dictionary> = {
  en: en as unknown as Dictionary,
  ta,
};

export type Copy = Dictionary;

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: 'EN',
  ta: 'தமிழ்',
};
