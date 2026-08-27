import type { HeritageChapter, ProcessStage } from '../types';

/**
 * Narrative content.
 *
 * SOLI's actual company history was not supplied, so the copy below is written
 * as understated prototype narrative. It deliberately contains no founders,
 * dates, places, factories, certifications, awards or production figures, and
 * makes no claim to be a record of real events.
 */

export const heritageChapters: HeritageChapter[] = [
  {
    id: 'kitchen',
    label: { en: 'The kitchen', ta: 'சமையலறை' },
    title: { en: 'It began where most things do.', ta: 'பெரும்பாலான விஷயங்கள் தொடங்கும் இடத்திலேயே.' },
    body: {
      en: 'Not in a boardroom. In a kitchen, where somebody decided the shop-bought powder was not quite right and started roasting their own. Coriander first, because it takes the longest. Then the chillies, watched closely, because they turn in seconds.',
      ta: 'கூட்டரங்கில் அல்ல. ஒரு சமையலறையில்தான். கடையில் வாங்கிய பொடி சரியில்லை என்று தோன்றி, யாரோ ஒருவர் தாமே வறுக்கத் தொடங்கினார். முதலில் கொத்தமல்லி — அதற்குத்தான் அதிக நேரம். பிறகு மிளகாய், நொடிகளில் மாறிவிடும் என்பதால் கண் விலக்காமல்.',
    },
  },
  {
    id: 'measure',
    label: { en: 'The measure', ta: 'அளவு' },
    title: { en: 'Nothing was written down.', ta: 'எதுவும் எழுதி வைக்கப்படவில்லை.' },
    body: {
      en: 'The proportions lived in the hand, not on paper. A little more pepper in the cold months. A little less chilli when children were eating. The recipe changed slightly every time it was made, and that was never considered a problem.',
      ta: 'அளவுகள் காகிதத்தில் அல்ல, கையில் இருந்தன. குளிர் காலத்தில் கொஞ்சம் அதிக மிளகு. குழந்தைகள் சாப்பிடும்போது கொஞ்சம் குறைவான மிளகாய். ஒவ்வொரு முறையும் சிறிது மாறியது — அது ஒருபோதும் குறையாகக் கருதப்படவில்லை.',
    },
  },
  {
    id: 'sharing',
    label: { en: 'The sharing', ta: 'பகிர்வு' },
    title: { en: 'Then the neighbours asked.', ta: 'பிறகு அக்கம்பக்கத்தார் கேட்டார்கள்.' },
    body: {
      en: 'A packet passed over a wall. A jar sent with someone travelling. Cooks who worked in other homes began asking for the same blend, and small batches quietly became slightly larger ones.',
      ta: 'சுவரின் மேலாகக் கடத்தப்பட்ட ஒரு பொட்டலம். பயணம் செல்பவரிடம் அனுப்பப்பட்ட ஒரு ஜாடி. வேறு வீடுகளில் சமைப்பவர்களும் அதே கூட்டைக் கேட்கத் தொடங்க, சிறு தொகுதிகள் அமைதியாகச் சற்றுப் பெரியவை ஆயின.',
    },
  },
  {
    id: 'today',
    label: { en: 'Today', ta: 'இன்று' },
    title: { en: 'The hand is still in it.', ta: 'கை இன்னும் அதில் இருக்கிறது.' },
    body: {
      en: 'Kitchens are busier now and fewer of us have an afternoon to spend over a roasting pan. SOLI exists so that the part which took patience is already done — and the part that takes you is still yours.',
      ta: 'இப்போது சமையலறைகள் பரபரப்பானவை; வறுக்கும் சட்டியில் ஒரு மதியத்தைச் செலவழிக்க பலருக்கு நேரமில்லை. பொறுமை தேவைப்பட்ட பகுதி ஏற்கனவே முடிந்திருக்க வேண்டும் என்பதற்காகவே SOLI இருக்கிறது — உங்கள் கை தேவைப்படும் பகுதி இன்னும் உங்களுடையதே.',
    },
  },
];

/** The seven stages of "From Spice to Masala". */
export const processStages: ProcessStage[] = [
  {
    id: 'source',
    index: '01',
    title: { en: 'Source', ta: 'தேர்வு நிலம்' },
    body: {
      en: 'A blend is decided long before anything is ground. Whole spices arrive as pods, bark and seed — still rough, still carrying the field.',
      ta: 'அரைப்பதற்கு முன்பே கூட்டு தீர்மானிக்கப்படுகிறது. முழு மசாலாக்கள் காய், பட்டை, விதையாக வருகின்றன — இன்னும் வயலின் தன்மையுடன்.',
    },
    material: { en: 'Soil', ta: 'மண்' },
  },
  {
    id: 'select',
    index: '02',
    title: { en: 'Select', ta: 'பிரித்தல்' },
    body: {
      en: 'Sorted by hand and by eye. Broken seed, hollow pods and stalk are taken out before anything else happens.',
      ta: 'கையாலும் கண்ணாலும் பிரிக்கப்படுகிறது. உடைந்த விதை, வெற்றுக் காய், தண்டு — அனைத்தும் முதலிலேயே நீக்கப்படுகின்றன.',
    },
    material: { en: 'Cloth', ta: 'துணி' },
  },
  {
    id: 'roast',
    index: '03',
    title: { en: 'Roast', ta: 'வறுத்தல்' },
    body: {
      en: 'Each spice is roasted separately, because none of them are ready at the same moment. Coriander takes its time. Chilli takes seconds.',
      ta: 'ஒவ்வொரு மசாலாவும் தனித்தனியே வறுக்கப்படுகிறது — எதுவும் ஒரே நேரத்தில் தயாராவதில்லை. கொத்தமல்லிக்கு நேரம் தேவை. மிளகாய்க்கு நொடிகள் போதும்.',
    },
    material: { en: 'Brass', ta: 'பித்தளை' },
  },
  {
    id: 'grind',
    index: '04',
    title: { en: 'Grind', ta: 'அரைத்தல்' },
    body: {
      en: 'Ground in small batches and kept cool. Heat is the enemy of aroma, so the stone is allowed to rest as often as it works.',
      ta: 'சிறு தொகுதிகளாக, குளிர்ச்சியுடன் அரைக்கப்படுகிறது. நறுமணத்தின் எதிரி வெப்பம் — எனவே கல் வேலை செய்யும் அளவுக்கே ஓய்வும் பெறுகிறது.',
    },
    material: { en: 'Stone', ta: 'கல்' },
  },
  {
    id: 'blend',
    index: '05',
    title: { en: 'Blend', ta: 'கலத்தல்' },
    body: {
      en: 'The moment separate spices stop being separate. Folded together slowly until no single one of them can be tasted on its own.',
      ta: 'தனித்தனி மசாலாக்கள் தனித்தன்மையை இழக்கும் தருணம். எதுவும் தனியாகச் சுவைக்கத் தெரியாத வரை மெல்லக் கலக்கப்படுகிறது.',
    },
    material: { en: 'Spice', ta: 'மசாலா' },
  },
  {
    id: 'pack',
    index: '06',
    title: { en: 'Pack', ta: 'நிரப்புதல்' },
    body: {
      en: 'Sealed while the aroma is at its strongest, so the packet you open smells like the room it was made in.',
      ta: 'நறுமணம் உச்சத்தில் இருக்கும்போதே அடைக்கப்படுகிறது — நீங்கள் திறக்கும் பொட்டலம் அது தயாரான அறையைப் போலவே மணக்க வேண்டும்.',
    },
    material: { en: 'Paper', ta: 'காகிதம்' },
  },
  {
    id: 'serve',
    index: '07',
    title: { en: 'Serve', ta: 'பரிமாறல்' },
    body: {
      en: 'Ready for your kitchen. What happens next is the part no blend can do for you.',
      ta: 'உங்கள் சமையலறைக்குத் தயார். அடுத்து நடப்பது — எந்தக் கூட்டாலும் உங்களுக்காகச் செய்ய முடியாத பகுதி.',
    },
    material: { en: 'Fire', ta: 'நெருப்பு' },
  },
];

/** Sections of the /about page. */
export const aboutChapters: HeritageChapter[] = [
  {
    id: 'origin',
    label: { en: 'The origin', ta: 'தொடக்கம்' },
    title: { en: 'A shelf, not a strategy.', ta: 'ஒரு அலமாரி — ஒரு திட்டம் அல்ல.' },
    body: {
      en: 'SOLI started as a set of jars on a kitchen shelf, each labelled in handwriting that only the household could read. There was no plan to make a brand of it. There was a plan to not run out.',
      ta: 'சமையலறை அலமாரியில் சில ஜாடிகளாக SOLI தொடங்கியது — வீட்டாருக்கு மட்டுமே புரியும் கையெழுத்தில் பெயரிடப்பட்டவை. இதை ஒரு நிறுவனமாக்கும் திட்டம் இல்லை. தீர்ந்துவிடக் கூடாது என்பதுதான் திட்டம்.',
    },
  },
  {
    id: 'kitchen',
    label: { en: 'The kitchen', ta: 'சமையலறை' },
    title: { en: 'Everything is still judged by taste.', ta: 'இன்றும் சுவையே தீர்ப்பு.' },
    body: {
      en: 'A blend is finished when it tastes finished — cooked into something simple, eaten, and adjusted if it needs adjusting. It is a slower way to decide, and we have not found a better one.',
      ta: 'சுவையில் முழுமை தெரியும்போதுதான் ஒரு கூட்டு முடிகிறது — எளிய உணவில் சமைத்து, சாப்பிட்டு, தேவைப்பட்டால் திருத்தி. இது மெதுவான வழி; இதைவிடச் சிறந்ததை நாங்கள் இன்னும் காணவில்லை.',
    },
  },
  {
    id: 'craft',
    label: { en: 'The craft', ta: 'கைவினை' },
    title: { en: 'Small batches, on purpose.', ta: 'சிறு தொகுதிகள் — வேண்டுமென்றே.' },
    body: {
      en: 'Spices are roasted separately and ground in quantities small enough to stay cool. It is the least efficient part of what we do and the part we are least willing to change.',
      ta: 'மசாலாக்கள் தனித்தனியே வறுக்கப்பட்டு, குளிர்ச்சி காக்கும் அளவுக்குச் சிறிய தொகுதிகளாக அரைக்கப்படுகின்றன. இது எங்கள் வேலையின் மிகக் குறைந்த திறனுள்ள பகுதி — மாற்ற நாங்கள் மிகக் குறைவாக விரும்பும் பகுதியும் இதுவே.',
    },
  },
  {
    id: 'people',
    label: { en: 'The people', ta: 'மனிதர்கள்' },
    title: { en: 'Cooks, mostly.', ta: 'பெரும்பாலும் சமையல்காரர்கள்.' },
    body: {
      en: 'The people who decide what goes into a SOLI blend are the people who cook with it every week. Recipes reach us from home kitchens and from cooks who feed a great many more people than that.',
      ta: 'SOLI கூட்டில் என்ன சேர்வது என்பதைத் தீர்மானிப்பவர்கள், ஒவ்வொரு வாரமும் அதைக் கொண்டு சமைப்பவர்களே. வீட்டுச் சமையலறைகளிலிருந்தும், அதைவிட மிக அதிகமானோருக்கு உணவளிப்பவர்களிடமிருந்தும் செய்முறைகள் எங்களை வந்தடைகின்றன.',
    },
  },
  {
    id: 'future',
    label: { en: 'The future', ta: 'எதிர்காலம்' },
    title: { en: 'More kitchens. Same hand.', ta: 'மேலும் சமையலறைகள். அதே கை.' },
    body: {
      en: 'There are blends we have not made yet, and regional gravies we would like to get right before we sell them. When they are ready, they will arrive the same way these did — quietly, and only once they taste like themselves.',
      ta: 'நாங்கள் இன்னும் செய்யாத கூட்டுகள் உள்ளன; விற்பதற்கு முன் சரியாகச் செய்ய விரும்பும் பிராந்தியக் குழம்புகளும் உள்ளன. தயாராகும்போது, இவை வந்த வழியிலேயே அவையும் வரும் — அமைதியாக, தமக்கே உரிய சுவை வந்த பிறகுதான்.',
    },
  },
];
