/**
 * Programmatic SEO Matrix Configuration for Keystone Realty Advisor
 * Defines target keywords, localities, BHK configs and descriptions.
 */

export const PROGRAMMATIC_CITIES = {
  gurugram: {
    name: 'Gurugram',
    region: 'IN-HR',
    aliases: ['gurgaon', 'gurugram'],
    state: 'Haryana',
    localities: ['Golf Course Road', 'Golf Course Ext Road', 'Dwarka Expressway', 'Sohna Road', 'Cyber City', 'Sector 80', 'Sector 62', 'Sector 42', 'DLF Phase 1', 'DLF Phase 4', 'DLF Phase 5'],
    reraName: 'Haryana RERA (HRERA)',
    overview: 'Gurugram (Gurgaon) is a major business and residential city in Haryana. Popular areas include Golf Course Road, Dwarka Expressway, Sohna Road and Cyber City.'
  },
  delhi: {
    name: 'Delhi',
    region: 'IN-DL',
    aliases: ['delhi', 'new-delhi'],
    state: 'Delhi',
    localities: ['South Delhi', 'Vasant Vihar', 'Greater Kailash', 'Chanakyapuri', 'Connaught Place', 'Dwarka', 'Defence Colony'],
    reraName: 'the RERA authority for Delhi',
    overview: 'Delhi has strong demand in South Delhi, Central Delhi and Dwarka. Builder floors and independent houses are common in established colonies.'
  },
  noida: {
    name: 'Noida',
    region: 'IN-UP',
    aliases: ['noida', 'greater-noida', 'noida-expressway'],
    state: 'Uttar Pradesh',
    localities: ['Noida Expressway', 'Sector 150', 'Sector 128', 'Sector 62', 'Sector 44', 'Greater Noida West'],
    reraName: 'UP RERA',
    overview: 'Noida and Greater Noida are in Uttar Pradesh, east of Delhi. Large residential sectors line the Noida Expressway and Greater Noida West.'
  },
  dwarka: {
    name: 'Dwarka',
    searchCity: 'Delhi',
    searchLocation: 'Dwarka',
    region: 'IN-DL',
    aliases: ['dwarka'],
    state: 'Delhi',
    localities: ['Sector 1', 'Sector 2', 'Sector 3', 'Sector 4', 'Sector 5', 'Sector 6', 'Sector 7', 'Sector 8', 'Sector 9', 'Sector 10', 'Sector 11', 'Sector 12', 'Sector 13', 'Sector 14', 'Sector 18', 'Sector 19'],
    reraName: 'the RERA authority for Delhi',
    overview: 'Dwarka is a planned residential area in South West Delhi. It is close to IGI Airport and Yashobhoomi. DDA and society apartments span Sectors 1 to 19.'
  }
};

export const PROGRAMMATIC_TYPES = {
  apartment: {
    label: 'Apartments & Flats',
    singular: 'Flat',
    code: 'APARTMENT',
    desc: 'apartments and flats in high-rise and low-rise societies'
  },
  villa: {
    label: 'Luxury Villas & Mansions',
    singular: 'Villa',
    code: 'VILLA',
    desc: 'independent villas, including villas in gated communities'
  },
  'builder-floor': {
    label: 'Builder Floors & Independent Floors',
    singular: 'Builder Floor',
    code: 'INDEPENDENT_FLOOR',
    desc: 'independent floors in low-rise buildings'
  },
  penthouse: {
    label: 'Luxury Penthouses',
    singular: 'Penthouse',
    code: 'PENTHOUSE',
    desc: 'penthouses and top-floor duplex homes'
  },
  commercial: {
    label: 'Commercial Spaces & Office Towers',
    singular: 'Commercial Space',
    code: 'COMMERCIAL',
    desc: 'office spaces, retail shops and other commercial property'
  },
  plot: {
    label: 'Plots & Land Parcels',
    singular: 'Plot',
    code: 'PLOT',
    desc: 'residential and commercial plots and land'
  },
  'pg-co-living': {
    label: 'PG & Co-Living Spaces',
    singular: 'PG / Co-Living',
    code: 'PG_CO_LIVING',
    desc: 'PG and co-living rooms for students and working professionals'
  }
};

export const PROGRAMMATIC_LISTING_TYPES = {
  sale: {
    label: 'for Sale',
    code: 'SALE',
    actionText: 'Buy property'
  },
  rent: {
    label: 'for Rent',
    code: 'RENT',
    actionText: 'Rent homes and flats'
  },
  lease: {
    label: 'for Lease',
    code: 'LEASE',
    actionText: 'Lease commercial space'
  }
};

/**
 * SINGLE SOURCE OF TRUTH for programmatic landing URLs.
 * - PROGRAMMATIC_PAGES: the only slugs that render a landing page (and are eligible for the XML sitemap).
 * - PROGRAMMATIC_ALIASES / CITY_PAGE_ALIASES: duplicate spellings that redirect to a primary slug.
 * Keep nginx.conf / nginx-ssl.conf (301 map + known-route map) and SitemapController.java in step with these;
 * `npm run seo:check` fails if they drift.
 */
export const PROGRAMMATIC_PAGES = [
  'flats-for-sale-in-gurugram',
  'flats-for-sale-in-delhi',
  'flats-for-sale-in-noida',
  'flats-for-rent-in-delhi',
  'flats-for-rent-in-noida',
  '3-bhk-flats-in-gurgaon',
  '2-bhk-flats-in-gurgaon',
  '4-bhk-flats-in-gurgaon',
  'luxury-villas-in-gurgaon',
  'luxury-villas-in-delhi',
  'builder-floors-in-delhi',
  'builder-floors-in-gurgaon',
  'commercial-properties-in-gurgaon',
  'commercial-properties-in-delhi',
  'flats-for-sale-in-dwarka',
];

export const PROGRAMMATIC_ALIASES = {
  'flats-for-sale-in-gurgaon': 'flats-for-sale-in-gurugram',
  '3-bhk-flats-in-gurugram': '3-bhk-flats-in-gurgaon',
  '2-bhk-flats-in-gurugram': '2-bhk-flats-in-gurgaon',
  '4-bhk-flats-in-gurugram': '4-bhk-flats-in-gurgaon',
  'luxury-villas-in-gurugram': 'luxury-villas-in-gurgaon',
};

// Hand-built city hub pages (own components) and their duplicate spellings.
export const CITY_PAGE_ALIASES = {
  'flats-in-delhi': 'properties-in-delhi',
  'properties-in-gurgaon': 'properties-in-gurugram',
  'flats-in-gurugram': 'properties-in-gurugram',
  'flats-in-gurgaon': 'properties-in-gurugram',
  'flats-in-noida': 'properties-in-noida',
  'flats-for-rent-in-gurgaon': 'flats-for-rent-in-gurugram',
};

const PLURAL_LABELS = {
  APARTMENT: 'Flats',
  VILLA: 'Villas',
  INDEPENDENT_FLOOR: 'Builder Floors',
  PENTHOUSE: 'Penthouses',
  COMMERCIAL: 'Commercial Properties',
  PLOT: 'Plots',
  PG_CO_LIVING: 'PG & Co-Living',
};

/**
 * Parses a programmatic slug into structured search criteria and page copy.
 * Only call this with a slug from PROGRAMMATIC_PAGES. Unknown slugs return `null`
 * so callers can render the 404 page instead of a guessed (Gurugram-defaulted) page.
 */
export function parseProgrammaticSlug(slug = '') {
  const clean = slug.toLowerCase().trim().replace(/^\/+|\/+$/g, '');
  if (!PROGRAMMATIC_PAGES.includes(clean)) return null;

  let cityKey = '';
  let targetCity = null;
  for (const [cKey, cData] of Object.entries(PROGRAMMATIC_CITIES)) {
    if (cData.aliases.some((alias) => clean.endsWith(`-in-${alias}`))) {
      cityKey = cKey;
      targetCity = cData;
      break;
    }
  }
  if (!targetCity) return null;

  // Display the city spelling used in the URL ("Gurgaon" vs "Gurugram" vs "Dwarka") so title/H1 match the target query.
  const displayCity = clean.endsWith('-in-gurgaon') ? 'Gurgaon' : targetCity.name;

  let listingType = '';
  if (clean.includes('-for-rent-')) listingType = 'RENT';
  else if (clean.includes('-for-sale-')) listingType = 'SALE';
  else if (clean.includes('-for-lease-')) listingType = 'LEASE';

  let propertyType = '';
  if (clean.includes('villa')) propertyType = 'VILLA';
  else if (clean.includes('floor')) propertyType = 'INDEPENDENT_FLOOR';
  else if (clean.includes('penthouse')) propertyType = 'PENTHOUSE';
  else if (clean.includes('commercial')) propertyType = 'COMMERCIAL';
  else if (clean.includes('plot')) propertyType = 'PLOT';
  else if (clean.includes('flat')) propertyType = 'APARTMENT';

  const bhkMatch = clean.match(/^(\d+)-bhk/);
  const bedrooms = bhkMatch ? bhkMatch[1] : '';

  const luxury = clean.startsWith('luxury-') ? 'Luxury ' : '';
  const bhkPrefix = bedrooms ? `${bedrooms} BHK ` : '';
  const plural = PLURAL_LABELS[propertyType] || 'Properties';
  const actionText = listingType === 'RENT' ? ' for Rent' : listingType === 'SALE' ? ' for Sale' : listingType === 'LEASE' ? ' for Lease' : '';
  const headingTitle = `${luxury}${bhkPrefix}${plural}${actionText} in ${displayCity}`;
  // Keep title under 60 chars: "<headingTitle> | Keystone" fits most slugs; brand is trimmed when heading is long.
  const brand = headingTitle.length <= 34 ? ' | Keystone Realty' : ' | Keystone';
  const pageTitle = `${headingTitle}${brand}`;

  const noun = `${luxury.toLowerCase()}${bhkPrefix}${plural.toLowerCase()}`;
  const actionVerb = listingType === 'RENT' ? ' for rent' : listingType === 'SALE' ? ' for sale' : listingType === 'LEASE' ? ' for lease' : '';
  // Descriptions kept under 155 chars
  const pageDescription = clean === 'flats-for-sale-in-dwarka'
    ? `Society flats for sale in Dwarka, Sectors 1-19. Browse verified listings and contact Keystone Realty for a site visit.`
    : `Browse ${noun}${actionVerb} in ${displayCity} by area and budget. Enquire with Keystone Realty to arrange a viewing.`;

  return {
    cityKey,
    city: targetCity.searchCity || targetCity.name, // value used for the API/city filter
    location: targetCity.searchLocation || '',     // value used for location filter
    displayCity,
    cityRegion: targetCity.region,
    cityData: targetCity,
    listingType,
    propertyType,
    bedrooms,
    headingTitle,
    pageTitle,
    pageDescription,
    canonicalSlug: clean,
  };
}
