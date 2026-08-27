import type { Bilingual } from '../types';

/**
 * Reviews, customer marks and contact details.
 */

export interface Review {
  id: string;
  quote: Bilingual;
  name: string;
  role: Bilingual;
  city: Bilingual;
  rating: number;
  productSlug: string;
}

export const reviews: Review[] = [
  {
    id: 'r1',
    quote: {
      en: 'I stopped roasting my own coriander after the first packet. The kuzhambu tastes the way my mother made it, which I did not expect from something I bought.',
      ta: 'முதல் பொட்டலத்திற்குப் பிறகு நானே கொத்தமல்லி வறுப்பதை நிறுத்திவிட்டேன். கிராமத்து மண்பானை சமையல் மணம் அப்படியே வருது — கடையில் வாங்கியதிலிருந்து இதை நான் எதிர்பார்க்கவில்லை.',
    },
    name: 'Lakshmi Ammal',
    role: { en: 'Home kitchen', ta: 'பாரம்பரிய சமையல்' },
    city: { en: 'Madurai', ta: 'மதுரை' },
    rating: 5,
    productSlug: 'madurai-kuzhambu-masala',
  },
  {
    id: 'r2',
    quote: {
      en: 'Authentic wedding feast sambar aroma! The balance of asafoetida and roasted toor dal is flawless. My family loves it every single day.',
      ta: 'கல்யாண வீட்டு சாம்பார் மணம்! பெருங்காயமும் வறுத்த துவரம் பருப்பு மணமும் கச்சிதமா அமைஞ்சிருக்கு. வீட்ல எல்லோரும் விரும்பி சாப்பிடுறாங்க.',
    },
    name: 'Karpagam',
    role: { en: 'Family kitchen', ta: 'குடும்பச் சமையலறை' },
    city: { en: 'Tanjore', ta: 'தஞ்சாவூர்' },
    rating: 5,
    productSlug: 'sambar-powder',
  },
  {
    id: 'r3',
    quote: {
      en: 'Outstanding for Chettinad style chicken fry and curry. The aroma of pepper, cumin, and clove stands out beautifully without burying the meat flavor.',
      ta: 'செட்டிநாடு பாணி கோழி வறுவலுக்கு இந்த மசாலா பிரமாதம்! மிளகு, சீரகம், கிராம்பு மணம் தூக்கலா இருக்கு, கடையில் வாங்குற பொடி மாதிரியே இல்லை.',
    },
    name: 'Murugan',
    role: { en: 'Chettinad cook', ta: 'செட்டிநாடு சமையல்காரர்' },
    city: { en: 'Tirunelveli', ta: 'திருநெல்வேலி' },
    rating: 5,
    productSlug: 'chicken-masala',
  },
  {
    id: 'r4',
    quote: {
      en: 'Gives incredible depth to potato fry and vegetable curries. Tastes just like spices fresh-ground on a traditional stone ammi!',
      ta: 'உருளைக்கிழங்கு வறுவல் மற்றும் காய் கறிகளுக்கு நல்ல டேஸ்ட் கொடுக்குது. அம்மியில அரைச்ச கார சுவை அப்படியே இருக்கு!',
    },
    name: 'Selvi',
    role: { en: 'Home kitchen', ta: 'வீட்டுச் சமையலறை' },
    city: { en: 'Dindigul', ta: 'திண்டுக்கல்' },
    rating: 5,
    productSlug: 'curry-masala',
  },
  {
    id: 'r5',
    quote: {
      en: 'We go through two packets a week at the mess. It behaves the same every time, which matters more than anything else when cooking at scale.',
      ta: 'எங்கள் மெஸ்ஸில் வாரத்திற்கு இரண்டு பொட்டலம் தீர்ந்துவிடும். ஒவ்வொரு முறையும் ஒரே சீரான மணம் மற்றும் காரம் — மெஸ்ஸில் சமைக்கும்போது இதுவே மிக முக்கியம்.',
    },
    name: 'Suresh',
    role: { en: 'Mess chef', ta: 'மெஸ் சமையல் கலைஞர்' },
    city: { en: 'Coimbatore', ta: 'கோயம்புத்தூர்' },
    rating: 5,
    productSlug: 'sambar-powder',
  },
  {
    id: 'r6',
    quote: {
      en: 'Just like my grandmother’s stone-ground Kuzhambu masala in Chettinad. Crucial for authentic Madurai Meen Kuzhambu!',
      ta: 'காரைக்குடி ஆச்சி அம்மியில் அரைச்ச குழம்பு மசாலா மாதிரியே இருக்கு! மதுரை மீன் குழம்புக்கு இந்த மசாலா தான் சரியான காரமும் சுவையும் தருது.',
    },
    name: 'Meenakshi',
    role: { en: 'Traditional kitchen', ta: 'பாரம்பரிய சமையலறை' },
    city: { en: 'Karaikudi', ta: 'காரைக்குடி' },
    rating: 5,
    productSlug: 'madurai-kuzhambu-masala',
  },
  {
    id: 'r7',
    quote: {
      en: 'Opened the packet and the whole kitchen smelled of freshly roasted spices. Perfect balance of natural heat and rich color.',
      ta: 'பொட்டலத்தைத் திறந்ததும் சமையலறை முழுவதும் வறுத்த மசாலா மணம் தூக்குது. சரியான காரமும் இயற்கை நிறமும் அற்புதம்!',
    },
    name: 'Anitha',
    role: { en: 'Home kitchen', ta: 'வீட்டுச் சமையலறை' },
    city: { en: 'Chennai', ta: 'சென்னை' },
    rating: 5,
    productSlug: 'chicken-masala',
  },
  {
    id: 'r8',
    quote: {
      en: 'Perfect masala for morning tiffin sambar and afternoon rice meals alike. Pure home-cooked happiness.',
      ta: 'காலை டிபன் சாம்பாருக்கும் மதிய சாம்பாருக்கும் கச்சிதமான மசாலா. அம்மா கைபக்ஷம் மாதிரியே திருப்தியா இருக்கு!',
    },
    name: 'Soundaram',
    role: { en: 'Home kitchen', ta: 'வீட்டுச் சமையலறை' },
    city: { en: 'Kumbakonam', ta: 'கும்பகோணம்' },
    rating: 5,
    productSlug: 'sambar-powder',
  }
];

export interface ClientMark {
  id: string;
  name: string;
  kind: Bilingual;
}

export const clients: ClientMark[] = [
  { id: 'c1', name: 'Anjali Mess', kind: { en: 'Mess', ta: 'மெஸ்' } },
  { id: 'c2', name: 'Kadal Kitchen', kind: { en: 'Restaurant', ta: 'உணவகம்' } },
  { id: 'c3', name: 'Thendral Catering', kind: { en: 'Catering', ta: 'கேட்டரிங்' } },
  { id: 'c4', name: 'Nila Tiffin Room', kind: { en: 'Tiffin room', ta: 'டிபன் கடை' } },
  { id: 'c5', name: 'Ponni Provisions', kind: { en: 'Provisions', ta: 'மளிகை' } },
  { id: 'c6', name: 'Arasu Hotel', kind: { en: 'Hotel', ta: 'ஹோட்டல்' } },
  { id: 'c7', name: 'Muthu Bhavan', kind: { en: 'Bhavan', ta: 'பவன்' } },
  { id: 'c8', name: 'Vaigai Foods', kind: { en: 'Distributor', ta: 'விநியோகஸ்தர்' } },
];

export interface ContactChannel {
  id: 'linkedin' | 'instagram' | 'whatsapp' | 'email';
  handle: string;
  href: string;
}

export const contactChannels: ContactChannel[] = [
  { id: 'linkedin', handle: '/company/soli-masala', href: '#' },
  { id: 'instagram', handle: '@solimasala', href: '#' },
  { id: 'whatsapp', handle: '+91 00000 00000', href: '#' },
  { id: 'email', handle: 'hello@solimasala.in', href: '#' },
];
