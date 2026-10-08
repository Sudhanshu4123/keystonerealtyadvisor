import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Network,
  Building2,
  MapPin,
  ShieldCheck,
  Briefcase,
  Layers,
  Globe2,
  ExternalLink,
  ChevronRight,
  Code2,
  Sparkles,
  ArrowRight,
  Search,
  Landmark,
  Share2,
} from 'lucide-react';
import SEO from '../../components/common/SEO';

export default function EntityMapPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showJsonSchema, setShowJsonSchema] = useState(false);

  // Structured Knowledge Graph Entities
  const entities = [
    {
      id: 'keystone-realty-advisor',
      name: 'Keystone Realty Advisor',
      type: 'RealEstateAgent & Advisory Practice',
      category: 'organization',
      categoryLabel: 'Core Organization',
      description: 'Independent professional real estate advisory, institutional acquisitions, and corporate leasing practice operating across Delhi NCR, India.',
      wikidataUrl: null,
      relationships: [
        { rel: 'headquartersIn', target: 'Gurugram, Haryana, India' },
        { rel: 'operatesIn', target: 'Delhi, Gurugram, Noida, Greater Noida' },
        { rel: 'providesService', target: 'Residential Acquisition, Commercial Leasing, Asset Valuation, NRI Advisory' },
        { rel: 'compliesWith', target: 'Haryana Real Estate Regulatory Authority (HRERA)' },
        { rel: 'facilitatesProjectsBy', target: 'Conscient Infrastructure, DLF Limited, Godrej Properties, M3M India' },
      ],
      officialProps: {
        legalName: 'Keystone Realty Advisor',
        email: 'keystonexhelpdeskp@gmail.com',
        phone: '+91 9911956274',
        website: 'https://keystonerealtyadvisor.com',
        sameAs: ['https://www.linkedin.com/company/keyston-realty-advisor/'],
      },
    },
    {
      id: 'entity-gurugram',
      name: 'Gurugram (Gurgaon)',
      type: 'Administrative City & Economic Hub',
      category: 'places',
      categoryLabel: 'Geo & Location Entities',
      description: 'Major financial, technology, and luxury residential metropolis in the National Capital Region (NCR), Haryana, India.',
      wikidataUrl: 'https://www.wikidata.org/wiki/Q11854',
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Gurgaon',
      wikidataId: 'Q11854',
      relationships: [
        { rel: 'partOf', target: 'National Capital Region (NCR), India' },
        { rel: 'state', target: 'Haryana (Wikidata: Q1174)' },
        { rel: 'keyMicroMarkets', target: 'Golf Course Road, Golf Course Ext Road, Dwarka Expressway, SPR, Cyber City' },
      ],
    },
    {
      id: 'entity-delhi',
      name: 'Delhi (National Capital Territory)',
      type: 'Capital Territory & Urban Region',
      category: 'places',
      categoryLabel: 'Geo & Location Entities',
      description: 'The capital territory of India, home to central government institutions, diplomatic enclaves, and premium heritage residential colonies.',
      wikidataUrl: 'https://www.wikidata.org/wiki/Q1353',
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Delhi',
      wikidataId: 'Q1353',
      relationships: [
        { rel: 'partOf', target: 'India (Wikidata: Q668)' },
        { rel: 'keyMicroMarkets', target: 'South Delhi, Vasant Vihar, Greater Kailash, Dwarka, Diplomatic Enclave' },
      ],
    },
    {
      id: 'entity-noida',
      name: 'Noida (New Okhla Industrial Development Authority)',
      type: 'Planned Industrial & Residential City',
      category: 'places',
      categoryLabel: 'Geo & Location Entities',
      description: 'Systematically planned city in Gautam Buddha Nagar district, Uttar Pradesh, featuring large IT parks and connectivity to Jewar Airport.',
      wikidataUrl: 'https://www.wikidata.org/wiki/Q832560',
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Noida',
      wikidataId: 'Q832560',
      relationships: [
        { rel: 'partOf', target: 'National Capital Region (NCR)' },
        { rel: 'state', target: 'Uttar Pradesh (Wikidata: Q1498)' },
        { rel: 'keyMicroMarkets', target: 'Noida Expressway (Sectors 128-150), Central Noida, Sector 62 IT Hub' },
      ],
    },
    {
      id: 'entity-dwarka-expressway',
      name: 'Dwarka Expressway (NH-248BB / NPR)',
      type: 'High-Speed Infrastructure Expressway',
      category: 'corridors',
      categoryLabel: 'Infrastructure Corridors',
      description: '29 km 8-lane elevated expressway linking Shiv Murti in Mahipalpur, Delhi to Kherki Daula Toll Plaza in Gurugram, Haryana.',
      wikidataUrl: 'https://www.wikidata.org/wiki/Q5318063',
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Dwarka_Expressway',
      wikidataId: 'Q5318063',
      relationships: [
        { rel: 'connects', target: 'Delhi (Mahipalpur / Dwarka) with Gurugram (NH-48)' },
        { rel: 'transitHubs', target: 'IGI Airport T3, Yashobhoomi (IICC Dwarka), Global City Gurugram' },
      ],
    },
    {
      id: 'entity-golf-course-ext-road',
      name: 'Golf Course Extension Road & SPR Corridor',
      type: 'Prime Luxury Arterial Corridor',
      category: 'corridors',
      categoryLabel: 'Infrastructure Corridors',
      description: 'Premier ultra-luxury residential and Grade-A commercial corridor encompassing Sectors 58 through 68 and Southern Peripheral Road in Gurugram.',
      wikidataUrl: null,
      relationships: [
        { rel: 'connects', target: 'Golf Course Road, Sohna Elevated Corridor, NH-48' },
        { rel: 'keyDevelopments', target: 'DLF Arbour, M3M Golfestate, Trump Towers Delhi NCR, WorldMark Gurgaon' },
      ],
    },
    {
      id: 'entity-hrera',
      name: 'Haryana Real Estate Regulatory Authority (HRERA)',
      type: 'Statutory Real Estate Regulatory Authority',
      category: 'regulatory',
      categoryLabel: 'Regulatory & Governance Entities',
      description: 'Government regulatory body established under RERA Act 2016 ensuring transparency, escrow enforcement, and consumer protection in Haryana.',
      wikidataUrl: 'https://www.wikidata.org/wiki/Q25053860',
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Real_Estate_(Regulation_and_Development)_Act,_2016',
      wikidataId: 'Q25053860',
      relationships: [
        { rel: 'jurisdiction', target: 'State of Haryana, India (Gurugram & Panchkula Benches)' },
        { rel: 'governs', target: 'Real Estate Developer Registrations, Escrow Accounts, DTCP Licensing' },
      ],
    },
    {
      id: 'entity-dlf',
      name: 'DLF Limited',
      type: 'Public Commercial & Residential Developer',
      category: 'developers',
      categoryLabel: 'Developer Brand Entities',
      description: 'India’s largest publicly traded real estate development corporation with iconic luxury townships across Gurugram and Delhi.',
      wikidataUrl: 'https://www.wikidata.org/wiki/Q1155452',
      wikipediaUrl: 'https://en.wikipedia.org/wiki/DLF_(company)',
      wikidataId: 'Q1155452',
      relationships: [
        { rel: 'foundedIn', target: '1946 (Headquarters: New Delhi, India)' },
        { rel: 'signatureProjects', target: 'DLF Cyber City, The Camellias, DLF Arbour, DLF Phase 1-5' },
      ],
    },
    {
      id: 'entity-godrej-properties',
      name: 'Godrej Properties Limited',
      type: 'Public Real Estate Corporation',
      category: 'developers',
      categoryLabel: 'Developer Brand Entities',
      description: 'Real estate development arm of the Godrej Group conglomerate, known for sustainable green building certifications and Tier-1 residential communities.',
      wikidataUrl: 'https://www.wikidata.org/wiki/Q5579361',
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Godrej_Properties',
      wikidataId: 'Q5579361',
      relationships: [
        { rel: 'partOf', target: 'Godrej Group (Wikidata: Q1533908)' },
        { rel: 'activeCorridors', target: 'Dwarka Expressway, Golf Course Ext Road, Noida Sector 150' },
      ],
    },
    {
      id: 'entity-conscient',
      name: 'Conscient Infrastructure',
      type: 'Luxury Real Estate Developer',
      category: 'developers',
      categoryLabel: 'Developer Brand Entities',
      description: 'Premier infrastructure developer delivering world-class residential condominiums, including Conscient Parq (Sector 80 Gurgaon) and Conscient Hines Elevate.',
      wikidataUrl: null,
      relationships: [
        { rel: 'headquarters', target: 'Gurugram, Haryana, India' },
        { rel: 'flagshipDevelopments', target: 'Conscient Parq (Sector 80), Conscient Hines Elevate (Golf Course Ext)' },
      ],
    },
  ];

  const categories = [
    { id: 'all', label: 'All Entities' },
    { id: 'organization', label: 'Core Organization' },
    { id: 'places', label: 'Geo & Places' },
    { id: 'corridors', label: 'Infrastructure Corridors' },
    { id: 'developers', label: 'Developer Brands' },
    { id: 'regulatory', label: 'Regulatory Bodies' },
  ];

  const filteredEntities = entities.filter((entity) => {
    const matchesCategory = activeFilter === 'all' || entity.category === activeFilter;
    const q = searchTerm.toLowerCase().trim();
    const matchesQuery =
      !q ||
      entity.name.toLowerCase().includes(q) ||
      entity.type.toLowerCase().includes(q) ||
      entity.description.toLowerCase().includes(q) ||
      entity.categoryLabel.toLowerCase().includes(q);

    return matchesCategory && matchesQuery;
  });

  // Complete Knowledge Graph JSON-LD Schema
  const knowledgeGraphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['RealEstateAgent', 'ProfessionalService'],
        '@id': 'https://keystonerealtyadvisor.com/#organization',
        name: 'Keystone Realty Advisor',
        url: 'https://keystonerealtyadvisor.com',
        logo: 'https://keystonerealtyadvisor.com/keystone-logo.png',
        image: 'https://keystonerealtyadvisor.com/keystone-logo.png',
        description: 'Certified real estate advisory practice providing institutional property acquisitions, commercial leasing, and asset valuation in Delhi NCR, India.',
        telephone: '+919911956274',
        email: 'keystonexhelpdeskp@gmail.com',
        sameAs: ['https://www.linkedin.com/company/keyston-realty-advisor/'],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Gurugram',
          addressRegion: 'Haryana',
          addressCountry: 'IN',
        },
        areaServed: [
          {
            '@type': 'City',
            name: 'Gurugram',
            sameAs: 'https://www.wikidata.org/wiki/Q11854',
          },
          {
            '@type': 'City',
            name: 'Delhi',
            sameAs: 'https://www.wikidata.org/wiki/Q1353',
          },
          {
            '@type': 'City',
            name: 'Noida',
            sameAs: 'https://www.wikidata.org/wiki/Q832560',
          },
        ],
        knowsAbout: [
          'https://www.wikidata.org/wiki/Q6895', // Real estate
          'https://www.wikidata.org/wiki/Q5318063', // Dwarka Expressway
          'https://www.wikidata.org/wiki/Q25053860', // RERA
          'https://www.wikidata.org/wiki/Q1155452', // DLF
          'https://www.wikidata.org/wiki/Q5579361', // Godrej Properties
        ],
      },
      {
        '@type': 'Place',
        '@id': 'https://keystonerealtyadvisor.com/#gurugram',
        name: 'Gurugram',
        alternateName: 'Gurgaon',
        sameAs: 'https://www.wikidata.org/wiki/Q11854',
        containedInPlace: {
          '@type': 'State',
          name: 'Haryana',
          sameAs: 'https://www.wikidata.org/wiki/Q1174',
        },
      },
      {
        '@type': 'Place',
        '@id': 'https://keystonerealtyadvisor.com/#delhi',
        name: 'Delhi',
        alternateName: 'National Capital Territory of Delhi',
        sameAs: 'https://www.wikidata.org/wiki/Q1353',
        containedInPlace: {
          '@type': 'Country',
          name: 'India',
          sameAs: 'https://www.wikidata.org/wiki/Q668',
        },
      },
      {
        '@type': 'Place',
        '@id': 'https://keystonerealtyadvisor.com/#noida',
        name: 'Noida',
        sameAs: 'https://www.wikidata.org/wiki/Q832560',
        containedInPlace: {
          '@type': 'State',
          name: 'Uttar Pradesh',
          sameAs: 'https://www.wikidata.org/wiki/Q1498',
        },
      },
    ],
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - var(--header-height))', paddingBottom: '5rem' }}>
      <SEO
        title="Entity Map & Knowledge Graph | Keystone Realty Advisor"
        description="Official Semantic Entity Map and Knowledge Graph of Keystone Realty Advisor. Discover our verified connections with Gurugram, Delhi, Noida, Dwarka Expressway, HRERA, and Tier-1 developers."
        canonicalUrl="/entity-map"
        keywords="Keystone entity map, Google Knowledge Graph real estate, Keystone Realty entities, Wikidata real estate Gurgaon, HRERA entity mapping"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Entity Map', path: '/entity-map' },
        ]}
        schema={knowledgeGraphSchema}
      />

      {/* Hero Header */}
      <section
        style={{
          backgroundColor: 'var(--color-dark-950)',
          color: '#FFFFFF',
          padding: '4.5rem 0 3.5rem',
          borderBottom: '1px solid #1E293B',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-50%',
            right: '-10%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(229, 192, 88, 0.08) 0%, rgba(15, 23, 42, 0) 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '880px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--color-gold-400)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: '0.75rem',
            }}
          >
            <Network size={16} />
            <span>Semantic Web & Knowledge Graph Architecture</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.125rem, 4.5vw, 3rem)',
              fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            Official Entity Map & Knowledge Graph
          </h1>

          <p style={{ fontSize: '1.0625rem', color: '#CBD5E1', lineHeight: 1.6, maxWidth: '740px', margin: '0 auto 2.25rem' }}>
            A machine-readable and visual map demonstrating Keystone Realty Advisor’s semantic relationships across geographic territories, infrastructure corridors, statutory regulatory bodies, and Tier-1 development corporations.
          </p>

          {/* Search & Schema Toggle Bar */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', maxWidth: '640px', margin: '0 auto' }}>
            <div style={{ flex: 1, minWidth: '280px', position: 'relative' }}>
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '1.125rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94A3B8',
                }}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search entities (e.g. Gurugram, Dwarka, HRERA, DLF)..."
                style={{
                  width: '100%',
                  padding: '0.8125rem 1rem 0.8125rem 3rem',
                  backgroundColor: '#0F172A',
                  border: '1px solid #334155',
                  borderRadius: '9999px',
                  color: '#FFFFFF',
                  fontSize: '0.9375rem',
                  outline: 'none',
                }}
              />
            </div>

            <button
              onClick={() => setShowJsonSchema(!showJsonSchema)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.8125rem 1.25rem',
                borderRadius: '9999px',
                backgroundColor: showJsonSchema ? 'var(--color-gold-500)' : '#1E293B',
                color: showJsonSchema ? '#0F172A' : '#FFFFFF',
                border: '1px solid #334155',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <Code2 size={16} />
              <span>{showJsonSchema ? 'Hide JSON-LD Graph' : 'View JSON-LD Graph'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* JSON-LD Schema Inspector (Collapsible) */}
      {showJsonSchema && (
        <div className="container" style={{ maxWidth: '1180px', marginTop: '2.5rem' }}>
          <div
            style={{
              backgroundColor: '#0F172A',
              border: '1px solid #334155',
              borderRadius: 'var(--radius-lg, 12px)',
              padding: '1.75rem',
              color: '#38BDF8',
              fontFamily: 'monospace',
              fontSize: '0.8125rem',
              overflowX: 'auto',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
            }}
          >
            <div style={{ color: '#E5C058', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Code2 size={16} />
              <span>Injected Schema.org Knowledge Graph Schema:</span>
            </div>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(knowledgeGraphSchema, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Main Entities Grid */}
      <div className="container" style={{ maxWidth: '1180px', marginTop: '3.5rem' }}>
        {/* Filter Navigation Tabs */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg, 12px)',
            border: '1px solid var(--border-color, #E2E8F0)',
            padding: '1rem 1.5rem',
            boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
            marginBottom: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748B', marginRight: '0.5rem' }}>
            Filter Entity Type:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: '9999px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                border: '1px solid',
                borderColor: activeFilter === cat.id ? 'var(--color-gold-500)' : '#E2E8F0',
                backgroundColor: activeFilter === cat.id ? 'rgba(229, 192, 88, 0.12)' : '#FAFAFC',
                color: activeFilter === cat.id ? 'var(--color-gold-700, #B48C28)' : '#475569',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Entities Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem',
          }}
        >
          {filteredEntities.map((entity) => (
            <div
              key={entity.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg, 12px)',
                border: '1px solid var(--border-color, #E2E8F0)',
                overflow: 'hidden',
                boxShadow: '0 2px 10px rgba(15, 23, 42, 0.04)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Card Header */}
              <div
                style={{
                  padding: '1.5rem',
                  borderBottom: '1px solid #F1F5F9',
                  backgroundColor: '#FAFAFC',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'var(--color-gold-700, #B48C28)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {entity.categoryLabel}
                  </div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                    {entity.name}
                  </h2>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.25rem' }}>
                    Type: <strong>{entity.type}</strong>
                  </div>
                </div>

                {entity.wikidataId && (
                  <a
                    href={entity.wikidataUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`View ${entity.name} on Wikidata`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      padding: '0.25rem 0.6rem',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(15, 23, 42, 0.06)',
                      color: '#0F172A',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                    }}
                  >
                    <span>Wikidata: {entity.wikidataId}</span>
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>

              {/* Card Content */}
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {entity.description}
                </p>

                {/* Relationships Box */}
                <div
                  style={{
                    backgroundColor: '#F8FAFC',
                    borderRadius: '8px',
                    padding: '1rem',
                    border: '1px solid #E2E8F0',
                    marginTop: 'auto',
                  }}
                >
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Knowledge Graph Triples & Relationships:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {entity.relationships.map((rel, idx) => (
                      <div key={idx} style={{ fontSize: '0.8125rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', lineHeight: 1.4 }}>
                        <span style={{ color: 'var(--color-gold-700, #B48C28)', fontWeight: 600, flexShrink: 0 }}>
                          [{rel.rel}]:
                        </span>
                        <span style={{ color: '#475569' }}>{rel.target}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Machine-Readable Raw Entity Files Banner */}
        <div
          style={{
            padding: '2.5rem 3rem',
            backgroundColor: 'var(--color-dark-950)',
            borderRadius: 'var(--radius-lg, 12px)',
            border: '1px solid #1E293B',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
        >
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-gold-400)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
              <Sparkles size={14} />
              <span>AI Agents, LLM Scrapers & Open Data Protocol</span>
            </div>
            <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#FFFFFF', margin: '0 0 0.5rem' }}>
              Raw AI Knowledge Dossiers & Static Protocol Files
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#94A3B8', margin: 0, lineHeight: 1.6 }}>
              In addition to this visual semantic map, Keystone Realty Advisor provides plain text LLM knowledge files at <code style={{ color: '#E5C058' }}>/llms.txt</code> and <code style={{ color: '#E5C058' }}>/llms-full.txt</code> for automated AI agents and citation bots.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="/llms-full.txt"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.25rem',
                borderRadius: '8px',
                backgroundColor: 'var(--color-gold-500)',
                color: '#0F172A',
                fontWeight: 700,
                fontSize: '0.875rem',
                textDecoration: 'none',
              }}
            >
              <span>View llms-full.txt</span>
              <ExternalLink size={14} />
            </a>

            <Link
              to="/sitemap"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.25rem',
                borderRadius: '8px',
                backgroundColor: '#1E293B',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '0.875rem',
                textDecoration: 'none',
                border: '1px solid #334155',
              }}
            >
              <span>HTML Sitemap</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
