/**
 * Programmatic SEO Matrix Configuration for Keystone Realty Advisor
 * Defines target keywords, localities, BHK configs, schemas, and descriptions.
 */

export const PROGRAMMATIC_CITIES = {
  gurugram: {
    name: 'Gurugram',
    region: 'IN-HR',
    aliases: ['gurgaon', 'gurugram'],
    state: 'Haryana',
    localities: ['Golf Course Road', 'Golf Course Ext Road', 'Dwarka Expressway', 'Sohna Road', 'Cyber City', 'Sector 80', 'Sector 62', 'Sector 42', 'DLF Phase 1', 'DLF Phase 4', 'DLF Phase 5'],
    overview: 'Gurugram (Gurgaon) is India\'s premier luxury residential and corporate headquarters hub in Delhi NCR, home to Fortune 500 corporations, high-speed expressways, and elite gated residential townships.'
  },
  delhi: {
    name: 'Delhi',
    region: 'IN-DL',
    aliases: ['delhi', 'new-delhi'],
    state: 'Delhi',
    localities: ['South Delhi', 'Vasant Vihar', 'Greater Kailash', 'Chanakyapuri', 'Connaught Place', 'Dwarka', 'Defence Colony'],
    overview: 'Delhi offers prime heritage bungalows, elite builder floors in South Delhi, and prominent commercial business districts with long-term capital stability.'
  },
  noida: {
    name: 'Noida',
    region: 'IN-UP',
    aliases: ['noida', 'greater-noida', 'noida-expressway'],
    state: 'Uttar Pradesh',
    localities: ['Noida Expressway', 'Sector 150', 'Sector 128', 'Sector 62', 'Sector 44', 'Greater Noida West'],
    overview: 'Noida and Greater Noida feature planned infrastructure, upcoming international airport connectivity at Jewar, wide arterial expressways, and institutional IT corridors.'
  }
};

export const PROGRAMMATIC_TYPES = {
  apartment: {
    label: 'Apartments & Flats',
    singular: 'Flat',
    code: 'APARTMENT',
    desc: 'verified high-rise luxury apartments and residential condominiums'
  },
  villa: {
    label: 'Luxury Villas & Mansions',
    singular: 'Villa',
    code: 'VILLA',
    desc: 'exclusive gated community private villas with expansive gardens and amenities'
  },
  'builder-floor': {
    label: 'Builder Floors & Independent Floors',
    singular: 'Builder Floor',
    code: 'INDEPENDENT_FLOOR',
    desc: 'spacious low-rise independent floors with private parking and dedicated terrace access'
  },
  penthouse: {
    label: 'Luxury Penthouses',
    singular: 'Penthouse',
    code: 'PENTHOUSE',
    desc: 'top-floor duplex and triplex sky-villas offering panoramic skylines and private plunge pools'
  },
  commercial: {
    label: 'Commercial Spaces & Office Towers',
    singular: 'Commercial Space',
    code: 'COMMERCIAL',
    desc: 'Grade-A corporate office spaces, retail shops, and commercial investment assets'
  },
  plot: {
    label: 'Plots & Land Parcels',
    singular: 'Plot',
    code: 'PLOT',
    desc: 'clear-title residential and commercial development land parcels'
  },
  'pg-co-living': {
    label: 'PG & Co-Living Spaces',
    singular: 'PG / Co-Living',
    code: 'PG_CO_LIVING',
    desc: 'fully managed student and working professional co-living rooms with food and housekeeping'
  }
};

export const PROGRAMMATIC_LISTING_TYPES = {
  sale: {
    label: 'for Sale',
    code: 'SALE',
    actionText: 'Buy verified properties'
  },
  rent: {
    label: 'for Rent',
    code: 'RENT',
    actionText: 'Rent verified homes & flats'
  },
  lease: {
    label: 'for Lease',
    code: 'LEASE',
    actionText: 'Lease corporate & commercial spaces'
  }
};

/**
 * Parses any programmatic slug pattern into structured search criteria
 * Supported formats:
 * - flats-for-rent-in-gurugram
 * - flats-for-sale-in-delhi
 * - 3-bhk-flats-in-gurgaon
 * - 2-bhk-apartments-for-rent-in-noida
 * - luxury-villas-in-gurugram
 * - commercial-properties-in-delhi
 * - properties-in-noida
 */
export function parseProgrammaticSlug(slug = '') {
  const clean = slug.toLowerCase().trim().replace(/^\/+|\/+$/g, '');

  let cityKey = 'gurugram';
  let targetCity = PROGRAMMATIC_CITIES.gurugram;
  for (const [cKey, cData] of Object.entries(PROGRAMMATIC_CITIES)) {
    if (cData.aliases.some(alias => clean.includes(alias))) {
      cityKey = cKey;
      targetCity = cData;
      break;
    }
  }

  let listingTypeKey = '';
  if (clean.includes('for-rent') || clean.includes('rent')) {
    listingTypeKey = 'RENT';
  } else if (clean.includes('for-sale') || clean.includes('sale') || clean.includes('buy')) {
    listingTypeKey = 'SALE';
  } else if (clean.includes('for-lease') || clean.includes('lease')) {
    listingTypeKey = 'LEASE';
  }

  let propertyTypeKey = '';
  let propertyTypeObj = null;
  if (clean.includes('villa')) {
    propertyTypeKey = 'VILLA';
    propertyTypeObj = PROGRAMMATIC_TYPES.villa;
  } else if (clean.includes('floor') || clean.includes('independent-floor')) {
    propertyTypeKey = 'INDEPENDENT_FLOOR';
    propertyTypeObj = PROGRAMMATIC_TYPES['builder-floor'];
  } else if (clean.includes('penthouse')) {
    propertyTypeKey = 'PENTHOUSE';
    propertyTypeObj = PROGRAMMATIC_TYPES.penthouse;
  } else if (clean.includes('commercial') || clean.includes('office')) {
    propertyTypeKey = 'COMMERCIAL';
    propertyTypeObj = PROGRAMMATIC_TYPES.commercial;
  } else if (clean.includes('plot') || clean.includes('land')) {
    propertyTypeKey = 'PLOT';
    propertyTypeObj = PROGRAMMATIC_TYPES.plot;
  } else if (clean.includes('pg') || clean.includes('co-living')) {
    propertyTypeKey = 'PG_CO_LIVING';
    propertyTypeObj = PROGRAMMATIC_TYPES['pg-co-living'];
  } else if (clean.includes('flat') || clean.includes('apartment')) {
    propertyTypeKey = 'APARTMENT';
    propertyTypeObj = PROGRAMMATIC_TYPES.apartment;
  }

  // Detect BHK
  let bedrooms = '';
  const bhkMatch = clean.match(/(\d+)\s*[-_]?\s*bhk/);
  if (bhkMatch) {
    bedrooms = bhkMatch[1];
  }

  // Construct Dynamic Titles and Headings
  const bhkPrefix = bedrooms ? `${bedrooms} BHK ` : '';
  const typeText = propertyTypeObj ? propertyTypeObj.singular : (bedrooms ? 'Flats' : 'Properties');
  const actionText = listingTypeKey === 'RENT' ? 'for Rent' : (listingTypeKey === 'SALE' ? 'for Sale' : (listingTypeKey === 'LEASE' ? 'for Lease' : ''));
  const headingTitle = `${bhkPrefix}${typeText} ${actionText} in ${targetCity.name}`.replace(/\s+/g, ' ').trim();
  const pageTitle = `${headingTitle} | Keystone Realty Advisor`;
  const pageDescription = `Explore verified ${bhkPrefix}${typeText.toLowerCase()} ${actionText.toLowerCase()} in ${targetCity.name}. Clear legal titles, transparent pricing, prime societies, and dedicated advisor guidance with Keystone Realty.`;

  return {
    city: targetCity.name,
    cityRegion: targetCity.region,
    cityData: targetCity,
    listingType: listingTypeKey,
    propertyType: propertyTypeKey,
    bedrooms: bedrooms,
    headingTitle,
    pageTitle,
    pageDescription,
    canonicalSlug: clean
  };
}
