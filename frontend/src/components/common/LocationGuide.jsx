import React from 'react';
import { PROGRAMMATIC_CITIES } from '../../utils/programmaticSeoConfig';

/**
 * General (non-promissory) guidance shown on location and category pages so each page carries
 * useful text of its own instead of only a listing grid. It describes what any buyer or tenant should
 * check. It deliberately makes no claims about Keystone's own verification process, approvals or inventory.
 */
export function getGuidance(cityKey, listingType, propertyType) {
  const city = PROGRAMMATIC_CITIES[cityKey];
  const rera = city ? city.reraName : 'the state RERA portal';
  const commercial = propertyType === 'COMMERCIAL';

  if (listingType === 'RENT' || listingType === 'LEASE') {
    const items = commercial
      ? [
          'Read the lease deed. Check the lock-in period, deposit amount and annual rent increase.',
          'Confirm who pays maintenance charges and power backup costs.',
          'Ask about the fit-out period. Check if rent is due during it.',
          'Ensure the premises can legally be used for your business type.',
        ]
      : [
          'Get a written rental agreement. It must state rent, deposit, lock-in and notice period.',
          'Ask if society maintenance is included in the rent or billed separately.',
          'Make an inventory list at move-in. Take photos of all furniture and fittings.',
          'Complete tenant verification as required locally. Keep copies of all receipts.',
        ];
    return {
      heading: commercial ? 'Before you lease commercial space' : 'Before you rent',
      items,
    };
  }

  const items = [
    `For under-construction projects, check ${rera}. Note the registration number and completion date.`,
    'Ask for title documents and an encumbrance certificate. Have a lawyer check the sale agreement first.',
    'For ready properties, ask for the occupancy certificate. Check for pending society dues.',
    'Compare prices using the same area measure. Use carpet area, not super area, for a fair comparison.',
    'Budget for stamp duty and registration charges on top of the sale price.',
  ];
  if (cityKey === 'dwarka') {
    items.splice(2, 0, 'For CGHS and DDA flats in Dwarka, verify the society share certificate and DDA conveyance deed.');
  }
  if (commercial) items.splice(3, 0, 'Check the permitted use of the building. Verify the lease status of any tenanted unit.');
  return { heading: commercial ? 'Before you buy commercial property' : 'Before you buy', items };
}


export default function LocationGuide({ cityKey, displayCity, listingType, propertyType, headingLevel = 2 }) {
  const city = PROGRAMMATIC_CITIES[cityKey];
  if (!city) return null;
  const guide = getGuidance(cityKey, listingType, propertyType);
  const H = `h${headingLevel}`;

  return (
    <section className="card" style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#FFFFFF' }}>
      <H style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.75rem', color: 'var(--text-primary)' }}>
        About searching in {displayCity || city.name}
      </H>
      <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
        {city.overview}
      </p>
      <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, margin: '0 0 0.5rem', color: 'var(--text-primary)' }}>
        {guide.heading}
      </h3>
      <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.7 }}>
        {guide.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
