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
          'Read the lease deed for lock-in period, annual escalation, security deposit and permitted use.',
          'Confirm who pays maintenance, property tax and power backup charges.',
          'Ask about the fit-out period and whether rent is payable during it.',
          'Check that the premises can legally be used for your type of business.',
        ]
      : [
          'Insist on a written rental agreement that states rent, security deposit, lock-in and notice period.',
          'Ask whether society maintenance is included in the rent or billed separately.',
          'Make an inventory list of furniture and fittings at move-in, with photos.',
          'Complete tenant verification as required locally, and keep copies of all receipts.',
        ];
    return {
      heading: commercial ? 'Before you lease commercial space' : 'Before you rent',
      items,
    };
  }

  const items = [
    `For under-construction projects, look the project up on ${rera} and note its registration number and stated completion date.`,
    'Ask for the chain of title documents and an encumbrance certificate, and have a lawyer read the draft sale agreement before you pay a token amount.',
    'For ready properties, ask for the occupancy or completion certificate and check for pending society dues.',
    'Compare prices on the same area measure (carpet, built-up or super area), not just the quoted rate per sq ft.',
    'Budget for stamp duty, registration charges and any applicable taxes on top of the sale price.',
  ];
  if (cityKey === 'dwarka') {
    items.splice(2, 0, 'For CGHS and DDA society apartments in Dwarka, verify society share certificate, NOC from the managing committee, and DDA conveyance deed or sub-lease.');
  }
  if (commercial) items.splice(3, 0, 'Check the permitted use of the building and the lease status of any tenanted unit.');
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
