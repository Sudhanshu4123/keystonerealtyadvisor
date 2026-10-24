import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { propertyService } from '../../services/propertyService';
import projectService from '../../services/projectService';
import PropertyGrid from '../../components/property/PropertyGrid';
import ProjectCard from '../../components/project/ProjectCard';
import DeveloperTicker from '../../components/common/DeveloperTicker';
import SEO from '../../components/common/SEO';
import {
  Search,
  Building2,
  ShieldCheck,
  TrendingUp,
  Compass,
  ArrowRight,
  Landmark,
  Layers,
  Award,
  CheckCircle2,
  Lock,
  FileCheck2,
  Users,
  Phone,
  Mail,
  BookOpen,
  Sparkles
} from 'lucide-react';

const BRAND_KEYWORDS_DIRECTORY = [
  {
    id: 1,
    title: 'Keystone Realty Advisor Pvt Ltd',
    category: 'Advisory & Consultancy',
    description: 'Keystone Realty Advisor provides property search and real estate advisory services for clients exploring residential properties, rental homes, commercial spaces, and real estate opportunities. Connect with us to discuss your property requirements and find suitable options.',
    link: '/advisory',
    linkText: 'Explore Advisory Services'
  },
  {
    id: 2,
    title: 'Keystone Real Estate Advisory Pvt Ltd',
    category: 'Advisory & Consultancy',
    description: 'Keystone Real Estate Advisory helps clients explore property opportunities across residential and commercial real estate. Whether you are buying, selling, renting, or exploring investment options, we aim to simplify your property search with relevant information and client-focused guidance.',
    link: '/advisory',
    linkText: 'Advisory Guidance'
  },
  {
    id: 3,
    title: 'Keystone Real Estate Consultant',
    category: 'Advisory & Consultancy',
    description: 'Looking for a reliable real estate consultant? Keystone Realty Advisor helps buyers, sellers, tenants, and property owners explore suitable residential and commercial properties based on their requirements, preferred locations, and budgets.',
    link: '/contact',
    linkText: 'Talk to a Real Estate Consultant'
  },
  {
    id: 4,
    title: 'Keystone Real Estate Advisory',
    category: 'Advisory & Consultancy',
    description: 'Keystone Real Estate Advisory focuses on helping clients navigate property searches, residential real estate, commercial spaces, and investment opportunities. Get assistance in exploring available properties and making informed real estate decisions.',
    link: '/advisory',
    linkText: 'Navigating Property Decisions'
  },
  {
    id: 5,
    title: 'Keystone Real Estate',
    category: 'Properties for Sale',
    description: 'Discover residential and commercial property opportunities with Keystone Realty Advisor. Explore houses, apartments, rental properties, office spaces, shops, and other real estate options to find a property that matches your needs.',
    link: '/properties',
    linkText: 'Browse All Real Estate'
  },
  {
    id: 6,
    title: 'Keystone Real Estate Advisory Reviews',
    category: 'Reviews & Verification',
    description: "Searching for Keystone Real Estate Advisory reviews? Review available customer feedback to understand other clients' experiences with property searches, communication, and real estate services. Always consider genuine reviews when evaluating a real estate advisory company.",
    link: '/contact',
    linkText: 'Review Feedback & Enquire'
  },
  {
    id: 7,
    title: 'Keystone Real Estate Group',
    category: 'Advisory & Consultancy',
    description: 'Keystone Realty Advisor helps clients explore a range of real estate opportunities, including residential properties, rental homes, commercial spaces, and property investments. Contact us to discuss your requirements and discover suitable property options.',
    link: '/advisory',
    linkText: 'Discover Group Opportunities'
  },
  {
    id: 8,
    title: 'Keystone Real Estate Services',
    category: 'Advisory & Consultancy',
    description: 'Explore real estate services with Keystone Realty Advisor, including assistance with residential property searches, houses for sale, rental properties, commercial spaces, and property opportunities. Our aim is to help clients make informed decisions based on their property needs.',
    link: '/advisory',
    linkText: 'Explore Real Estate Services'
  },
  {
    id: 9,
    title: 'Keystone Realty Houses Listings',
    category: 'Properties for Sale',
    description: 'Explore Keystone Realty houses listings to discover residential property options that match your preferred location, property type, and budget. Whether you are searching for a home to buy or rent, review available listings and enquire about relevant properties.',
    link: '/properties',
    linkText: 'Explore Houses Listings'
  },
  {
    id: 10,
    title: 'Keystone Real Estate Investments',
    category: 'Rentals & Commercial',
    description: 'Explore real estate investment opportunities with Keystone Realty Advisor. Consider residential properties, commercial spaces, and other property options according to your investment objectives, budget, location preferences, and risk considerations.',
    link: '/advisory',
    linkText: 'Investment Advisory'
  },
  {
    id: 11,
    title: 'Keystone Realty House for Sale',
    category: 'Properties for Sale',
    description: 'Looking for a Keystone Realty house for sale? Explore available residential property options and compare locations, property features, prices, and amenities. Contact Keystone Realty Advisor to enquire about suitable homes for purchase.',
    link: '/flats-for-sale-in-dwarka',
    linkText: 'View Houses for Sale'
  },
  {
    id: 12,
    title: 'Keystone Realty Houses Near Me',
    category: 'Properties for Sale',
    description: 'Searching for Keystone Realty houses near me? Explore property options in your preferred neighbourhood and compare available houses based on location, budget, size, and amenities. Contact Keystone Realty Advisor for assistance with your local property search.',
    link: '/properties-in-delhi',
    linkText: 'Explore Local Neighbourhoods'
  },
  {
    id: 13,
    title: 'Keystone Realty House for Rent',
    category: 'Rentals & Commercial',
    description: 'Find suitable rental property options with Keystone Realty Advisor. Whether you need a house or an apartment, explore available rental listings and enquire about rent, location, property features, and other relevant details before making a decision.',
    link: '/flats-for-rent-in-gurugram',
    linkText: 'Browse Rental Properties'
  },
  {
    id: 14,
    title: 'Keystone Property for Sale',
    category: 'Properties for Sale',
    description: 'Explore property for sale with Keystone Realty Advisor. Discover residential and commercial real estate opportunities, compare available options, and enquire about property details to identify a suitable choice for your requirements and budget.',
    link: '/flats-for-sale-in-gurugram',
    linkText: 'Explore Properties for Sale'
  },
  {
    id: 15,
    title: 'Keystone Realty Houses for Sale',
    category: 'Properties for Sale',
    description: 'Explore Keystone Realty houses for sale and discover residential property options for different requirements and budgets. Compare property locations, configurations, amenities, and asking prices, and contact us to enquire about available homes.',
    link: '/properties',
    linkText: 'Compare Houses for Sale'
  },
  {
    id: 16,
    title: 'Keystone Real Estate Company',
    category: 'Advisory & Consultancy',
    description: 'Keystone Realty Advisor is focused on helping clients explore residential and commercial property opportunities. From houses and apartments to rental properties, office spaces, and shops, we help clients identify options that align with their real estate requirements.',
    link: '/advisory',
    linkText: 'About Real Estate Company'
  },
  {
    id: 17,
    title: 'Keystone Commercial Real Estate',
    category: 'Rentals & Commercial',
    description: 'Explore commercial real estate opportunities with Keystone Realty Advisor, including office spaces, shops, and other commercial properties. Whether you are looking for a business location, commercial premises for rent, or a property to purchase, enquire about options that match your requirements.',
    link: '/properties?category=COMMERCIAL_PROPERTY',
    linkText: 'Commercial Real Estate'
  },
  {
    id: 18,
    title: 'Keystone Commercial Real Estate Reviews',
    category: 'Reviews & Verification',
    description: "Looking for Keystone Commercial Real Estate reviews? Explore genuine customer feedback and available business information to evaluate the company's communication, property assistance, and service experience. Verify property details and terms independently before making a commercial real estate decision.",
    link: '/contact',
    linkText: 'Commercial Due Diligence'
  },
  {
    id: 19,
    title: 'Keystone Homes for Sale',
    category: 'Properties for Sale',
    description: 'Searching for homes for sale? Keystone Realty Advisor helps clients explore residential properties according to their preferred location, budget, property configuration, and lifestyle requirements. Review available listings and enquire about suitable homes before arranging a property visit.',
    link: '/properties',
    linkText: 'Explore Homes for Sale'
  },
  {
    id: 20,
    title: 'Keystone Real Estate Email',
    category: 'Reviews & Verification',
    description: 'Need the Keystone Real Estate email address? Visit the official Keystone Realty Advisor website and its Contact page to find the available business contact details. Use the official contact channel to enquire about property listings, residential homes, commercial spaces, and real estate services.',
    link: '/contact',
    linkText: 'Email: keystonexhelpdesk@gmail.com'
  },
  {
    id: 21,
    title: 'Keystone Real Estate for Sale',
    category: 'Properties for Sale',
    description: 'Explore Keystone real estate for sale, including residential and commercial property opportunities. Compare available properties based on location, price, features, and intended use, and contact Keystone Realty Advisor to discuss your requirements and enquire about relevant listings.',
    link: '/properties',
    linkText: 'Real Estate for Sale'
  }
];

export default function HomePage() {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [searchTab, setSearchTab] = useState('properties');
  const [searchParams, setSearchParams] = useState({
    query: '',
    listingType: '',
    propertyType: '',
  });
  const [selectedKeywordCategory, setSelectedKeywordCategory] = useState('All');
  const [keywordQuery, setKeywordQuery] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    async function loadFeatured() {
      try {
        const [propRes, projData] = await Promise.allSettled([
          propertyService.getFeaturedProperties(),
          projectService.getFeaturedProjects(),
        ]);

        if (propRes.status === 'fulfilled' && propRes.value?.success && Array.isArray(propRes.value.data) && propRes.value.data.length > 0) {
          setFeaturedProperties(propRes.value.data);
        } else {
          try {
            const allProps = await propertyService.searchProperties({ size: 6 });
            if (allProps?.success && allProps.data?.content && allProps.data.content.length > 0) {
              setFeaturedProperties(allProps.data.content);
            }
          } catch (fallbackErr) {
            console.error('Failed to load recent properties:', fallbackErr);
          }
        }

        if (projData.status === 'fulfilled' && projData.value) {
          const pList = projData.value.data || (Array.isArray(projData.value) ? projData.value : []);
          setFeaturedProjects(pList);
        }
      } catch (err) {
        console.error('Error loading featured listings:', err);
      } finally {
        setLoading(false);
        setLoadingProjects(false);
      }
    }
    loadFeatured();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const rawQuery = (searchParams.query || '').trim().toLowerCase();

    if (rawQuery.includes('rent') && (rawQuery.includes('gurugram') || rawQuery.includes('gurgaon'))) {
      navigate('/flats-for-rent-in-gurugram');
      return;
    }

    const query = new URLSearchParams();
    if (searchParams.query) query.append('query', searchParams.query);
    if (searchParams.listingType) query.append('listingType', searchParams.listingType);
    if (searchParams.propertyType) query.append('propertyType', searchParams.propertyType);
    navigate(`/properties?${query.toString()}`);
  };

  return (
    <div>
      <SEO
        title="Property Advisory in Delhi NCR | Keystone Realty Advisor"
        description="Find verified flats and residential properties in Delhi, Gurugram and Dwarka with dedicated advisor support from first enquiry to site visit."
        canonicalUrl="/"
      />
      {/* Hero Section */}
      <section
        style={{
          backgroundColor: 'var(--color-dark-950)',
          color: '#FFFFFF',
          paddingTop: '5rem',
          paddingBottom: '5rem',
          position: 'relative',
          borderBottom: '1px solid #1E293B',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center' }}>
            <h1
              style={{
                fontSize: 'clamp(1.85rem, 5vw, 2.75rem)',
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                marginBottom: '1.25rem',
                color: '#FFFFFF',
              }}
            >
              Property Advisory for Buyers, Tenants and Investors in Delhi NCR
            </h1>

            <p
              style={{
                fontSize: '1.125rem',
                color: '#94A3B8',
                lineHeight: 1.65,
                marginBottom: '2.5rem',
              }}
            >
              Find verified society flats and apartments across Dwarka (Delhi) and Gurugram, or talk directly with a Keystone property advisor for expert consultation and site visits.
            </p>

            {/* Hero Search Box */}
            <form
              onSubmit={handleSearchSubmit}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '0.875rem',
                boxShadow: 'var(--shadow-xl)',
                display: 'grid',
                gridTemplateColumns: '2fr 1.2fr 1.2fr auto',
                gap: '0.75rem',
                alignItems: 'center',
                textAlign: 'left',
              }}
              className="hero-search-form"
            >
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Location, sector, or keyword..."
                  aria-label="Search properties by location or keywords"
                  value={searchParams.query}
                  onChange={(e) => setSearchParams({ ...searchParams, query: e.target.value })}
                  style={{ height: '48px', fontSize: '0.875rem' }}
                />
              </div>

              <select
                className="form-control"
                aria-label="Filter by listing type"
                value={searchParams.listingType}
                onChange={(e) => setSearchParams({ ...searchParams, listingType: e.target.value })}
                style={{ height: '48px', fontSize: '0.875rem' }}
              >
                <option value="">All Listing Types</option>
                <option value="SALE">For Sale</option>
                <option value="RENT">For Rent</option>
                <option value="LEASE">Commercial Lease</option>
              </select>

              <select
                className="form-control"
                aria-label="Filter by property type"
                value={searchParams.propertyType}
                onChange={(e) => setSearchParams({ ...searchParams, propertyType: e.target.value })}
                style={{ height: '48px', fontSize: '0.875rem' }}
              >
                <option value="">All Property Types</option>
                <option value="APARTMENT">Apartment</option>
                <option value="STUDIO">Studio</option>
                <option value="INDEPENDENT_HOUSE">Independent House</option>
                <option value="DUPLEX">Duplex</option>
                <option value="INDEPENDENT_FLOOR">Independent Floor</option>
                <option value="VILLA">Villa</option>
                <option value="FARM_HOUSE">Farm House</option>
                <option value="PENTHOUSE">Penthouse</option>
                <option value="RETAIL_SHOP">Retail Shop</option>
                <option value="PLOT">Plot / Land</option>
              </select>

              <button type="submit" className="btn btn-primary" aria-label="Search properties" style={{ height: '48px', padding: '0 1.5rem', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 600, borderRadius: 'var(--radius-md)', whiteSpace: 'nowrap' }}>
                <Search size={16} />
                <span>Search Properties</span>
              </button>
            </form>

            {/* Quick Links & Above-the-fold CTA */}
            <div
              style={{
                marginTop: '1.5rem',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                fontSize: '0.875rem',
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.625rem', color: '#94A3B8' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: '#64748B' }}>Popular:</span>
                <Link
                  to="/flats-for-sale-in-dwarka"
                  style={{
                    color: '#E5C058',
                    textDecoration: 'none',
                    fontWeight: 600,
                    padding: '0.25rem 0.625rem',
                    backgroundColor: 'rgba(229, 192, 88, 0.1)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(229, 192, 88, 0.25)',
                  }}
                >
                  Flats in Dwarka (18)
                </Link>
                <Link
                  to="/properties-in-gurugram"
                  style={{
                    color: '#F8FAFC',
                    textDecoration: 'none',
                    fontWeight: 500,
                    padding: '0.25rem 0.625rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  Properties in Gurugram
                </Link>
                <Link
                  to="/properties-in-delhi"
                  style={{
                    color: '#F8FAFC',
                    textDecoration: 'none',
                    fontWeight: 500,
                    padding: '0.25rem 0.625rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  Properties in Delhi
                </Link>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <a
                  href="tel:+919911956274"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    color: '#F8FAFC',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                  }}
                >
                  <Phone size={14} color="#E5C058" />
                  <span>+91 9911956274</span>
                </a>
                <Link
                  to="/advisory"
                  className="btn btn-outline"
                  style={{
                    borderColor: 'rgba(229, 192, 88, 0.5)',
                    color: '#E5C058',
                    padding: '0.375rem 0.875rem',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                  }}
                >
                  Advisory Services
                </Link>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 860px) {
            .hero-search-form {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* Property Categories exploration */}
      <section className="section-sm" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))', gap: '0.75rem' }}>
            {[
              { type: 'APARTMENT', label: 'Luxury Apartments', icon: Building2 },
              { type: 'VILLA', label: 'Villas & Mansions', icon: Landmark },
              { type: 'PENTHOUSE', label: 'Penthouses', icon: Layers },
              { type: 'COMMERCIAL', label: 'Commercial Spaces', icon: TrendingUp },
              { type: 'PLOT', label: 'Plots & Land', icon: Compass },
            ].map((item) => (
              <Link
                key={item.type}
                to={`/properties?propertyType=${item.type}`}
                className="card"
                style={{
                  padding: '1.25rem 1rem',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                  border: '1px solid var(--border-color)',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-gold-50)',
                    color: 'var(--color-gold-600)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <item.icon size={20} />
                </div>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Us & The Keystone Advantage Section */}
      <section className="section" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '1140px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: '2.5rem', alignItems: 'center' }} className="about-grid">
            <div>
              <span className="section-subtitle">About Keystone Realty Advisor</span>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
                How Keystone Realty Advisor Works
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                <strong>Keystone Realty Advisor</strong> advises buyers, tenants and investors on residential and commercial property in Delhi NCR, from shortlisting to site visits.
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
                For any listing, ask the advisor which documents are available (for projects, the RERA registration; for resale, ownership papers and society dues) and check them yourself or with your lawyer before you pay.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle2 size={20} color="var(--color-gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-primary)' }}>Shortlisting support</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Narrow options by budget, BHK and area</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <Lock size={20} color="var(--color-gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-primary)' }}>Direct advisor contact</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Enquiries go straight to an advisor</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <FileCheck2 size={20} color="var(--color-gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-primary)' }}>Document checklist</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Know which papers to ask for</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <TrendingUp size={20} color="var(--color-gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-primary)' }}>Site visits</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Arrange viewings through the desk</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Credibility & Metrics Showcase Card */}
            <div
              style={{
                backgroundColor: 'var(--color-dark-950)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                padding: '2.25rem',
                border: '1px solid #1E293B',
                boxShadow: 'var(--shadow-xl)',
                position: 'relative',
              }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-gold-400)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.04em', marginBottom: '1rem' }}>
                <Award size={16} />
                <span>What to expect</span>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1.25rem', lineHeight: 1.35 }}>
                Advice from first enquiry to site visit
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem', borderTop: '1px solid rgba(212, 175, 55, 0.4)', paddingTop: '1.25rem' }}>
                <div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-gold-400)', fontFamily: 'var(--font-display)' }}>Buy</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '6px' }}>Residential and commercial purchases</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-gold-400)', fontFamily: 'var(--font-display)' }}>Rent</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '6px' }}>Flats, floors and villas</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-gold-400)', fontFamily: 'var(--font-display)' }}>Lease</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '6px' }}>Office and retail space</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-gold-400)', fontFamily: 'var(--font-display)' }}>Advise</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '6px' }}>Consultations by appointment</div>
                </div>
              </div>

              <Link to="/contact" className="btn btn-primary btn-block" style={{ justifyContent: 'center', height: '46px', marginTop: '0.5rem' }}>
                Schedule a Confidential Consultation
              </Link>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .about-grid {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
            }
          }
        `}</style>
      </section>

      {/* Featured Real Estate Projects Section */}
      {featuredProjects && featuredProjects.length > 0 && (
        <section className="section" style={{ backgroundColor: 'var(--bg-main)', borderBottom: '1px solid var(--border-color)' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="section-subtitle">Development Portfolio</span>
                <h2 className="section-title" style={{ marginBottom: 0 }}>Featured Real Estate Projects</h2>
              </div>
              <Link to="/projects" className="btn btn-outline" style={{ gap: '0.5rem' }}>
                <span>Explore All Projects</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Properties Section - Only displayed when properties exist */}
      {featuredProperties && featuredProperties.length > 0 && (
        <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="section-subtitle">Portfolio Showcase</span>
                <h2 className="section-title" style={{ marginBottom: 0 }}>Available Properties</h2>
              </div>
              <Link to="/properties" className="btn btn-outline" style={{ gap: '0.5rem' }}>
                <span>View All Properties</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <PropertyGrid
              properties={featuredProperties}
              loading={loading}
              columns={3}
            />
          </div>
        </section>
      )}

      {/* Core Advisory Practice Section */}
      <section className="section" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">Practice Areas</span>
            <h2 className="section-title">Advisory Services</h2>
            <p className="section-description">
              Property advisory for residential buyers, tenants, investors and commercial occupiers.
            </p>
          </div>

          <div className="grid-3">
            <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', border: '1px solid var(--border-color)', backgroundColor: '#FFFFFF' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-dark-900)',
                  color: 'var(--color-gold-400)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <Landmark size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem', minHeight: '3.25rem', color: 'var(--text-primary)' }}>
                Bespoke Acquisition & Representation
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Discreet property identification, comprehensive title search audits, transaction structuring, and contract negotiation for high-value residences and penthouses.
              </p>
              <Link to="/advisory" style={{ marginTop: 'auto', color: 'var(--color-gold-600)', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <span>Learn about acquisition</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', border: '1px solid var(--border-color)', backgroundColor: '#FFFFFF' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-dark-900)',
                  color: 'var(--color-gold-400)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <TrendingUp size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem', minHeight: '3.25rem', color: 'var(--text-primary)' }}>
                Commercial Leasing & Corporate Strategy
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Strategic positioning for income-generating assets, commercial leasing advisory, tenancy optimization, and yield evaluation across prime commercial corridors.
              </p>
              <Link to="/advisory" style={{ marginTop: 'auto', color: 'var(--color-gold-600)', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <span>Learn about leasing</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', border: '1px solid var(--border-color)', backgroundColor: '#FFFFFF' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-dark-900)',
                  color: 'var(--color-gold-400)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <ShieldCheck size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem', minHeight: '3.25rem', color: 'var(--text-primary)' }}>
                Asset Valuation & Feasibility Studies
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Data-driven market comparative assessments, land development feasibility studies, risk profiling, and structured exit planning for capital preservation.
              </p>
              <Link to="/advisory" style={{ marginTop: 'auto', color: 'var(--color-gold-600)', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <span>Learn about valuation</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Keystone Real Estate Directory & Property Search Guide */}
      <section
        id="property-search-guide"
        style={{
          backgroundColor: '#FFFFFF',
          padding: '4.5rem 0 5rem',
          borderTop: '1px solid var(--border-color)',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto 2.5rem', textAlign: 'center' }}>
            <span className="section-subtitle">Real Estate Advisory & Search Directory</span>
            <h2 className="section-title" style={{ fontSize: '2.25rem', marginBottom: '0.75rem' }}>
              Keystone Real Estate Directory & Search Guide
            </h2>
            <p className="section-description" style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
              Explore residential properties, houses for sale and rent, commercial spaces, and professional real estate advisory services with Keystone Realty Advisor across Delhi NCR.
            </p>

            {/* Filter Tabs & Search */}
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                {['All', 'Advisory & Consultancy', 'Properties for Sale', 'Rentals & Commercial', 'Reviews & Verification'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedKeywordCategory(cat)}
                    style={{
                      padding: '0.45rem 1rem',
                      borderRadius: '9999px',
                      fontSize: '0.84375rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: selectedKeywordCategory === cat ? '1px solid var(--color-gold-500)' : '1px solid var(--border-color)',
                      backgroundColor: selectedKeywordCategory === cat ? 'var(--color-dark-950)' : '#F8FAFC',
                      color: selectedKeywordCategory === cat ? 'var(--color-gold-400)' : 'var(--text-secondary)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {cat} {cat === 'All' ? `(${BRAND_KEYWORDS_DIRECTORY.length})` : ''}
                  </button>
                ))}
              </div>

              <div style={{ width: '100%', maxWidth: '420px', position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Filter keywords, services, or locations..."
                  value={keywordQuery}
                  onChange={(e) => setKeywordQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 1rem 0.55rem 2.25rem',
                    fontSize: '0.84375rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: '#FFFFFF',
                    outline: 'none',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Directory Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {BRAND_KEYWORDS_DIRECTORY
              .filter((item) => {
                const matchesCategory = selectedKeywordCategory === 'All' || item.category === selectedKeywordCategory;
                const matchesQuery = !keywordQuery.trim() ||
                  item.title.toLowerCase().includes(keywordQuery.toLowerCase()) ||
                  item.description.toLowerCase().includes(keywordQuery.toLowerCase());
                return matchesCategory && matchesQuery;
              })
              .map((item) => (
                <article
                  key={item.id}
                  className="card"
                  style={{
                    padding: '1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid var(--border-color)',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-md)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span
                      style={{
                        fontSize: '0.71875rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '4px',
                        backgroundColor: 'var(--color-gold-50)',
                        color: 'var(--color-gold-700)',
                      }}
                    >
                      {item.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      #{item.id}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: '0.625rem',
                      lineHeight: 1.35,
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: '1.25rem',
                      flexGrow: 1,
                    }}
                  >
                    {item.description}
                  </p>

                  <Link
                    to={item.link}
                    style={{
                      marginTop: 'auto',
                      color: 'var(--color-gold-600)',
                      fontWeight: 600,
                      fontSize: '0.84375rem',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>{item.linkText}</span>
                    <ArrowRight size={14} />
                  </Link>
                </article>
              ))}
          </div>

          {BRAND_KEYWORDS_DIRECTORY.filter((item) => {
            const matchesCategory = selectedKeywordCategory === 'All' || item.category === selectedKeywordCategory;
            const matchesQuery = !keywordQuery.trim() ||
              item.title.toLowerCase().includes(keywordQuery.toLowerCase()) ||
              item.description.toLowerCase().includes(keywordQuery.toLowerCase());
            return matchesCategory && matchesQuery;
          }).length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <p>No matching keywords or services found for "{keywordQuery}".</p>
              <button
                type="button"
                onClick={() => { setKeywordQuery(''); setSelectedKeywordCategory('All'); }}
                className="btn btn-secondary"
                style={{ marginTop: '0.75rem', fontSize: '0.8125rem' }}
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Developer Projects Ticker Strip - Just Above Footer */}
      <DeveloperTicker />
    </div>
  );
}
