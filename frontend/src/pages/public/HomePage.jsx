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
  Users
} from 'lucide-react';

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
        title="Real Estate Advisory & Property Consultants | Keystone Realty"
        description="Discover verified residential homes, luxury apartments, and commercial investments in Delhi NCR with complete due diligence and expert advisory."
        keywords="flat for rent in gurugram, properties in delhi, properties in gurugram, properties in noida, buy luxury apartments, real estate advisory, Keystone Realty"
        canonicalUrl="/"
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'RealEstateAgent',
              '@id': 'https://keystonerealtyadvisor.com/#organization',
              name: 'Keystone Realty Advisor',
              url: 'https://keystonerealtyadvisor.com',
              logo: 'https://keystonerealtyadvisor.com/favicon-512x512.png',
              image: 'https://keystonerealtyadvisor.com/keystone-logo.png',
              description: 'Keystone Realty Advisor delivers institutional-grade property strategy, strategic acquisition guidance, and verified real estate transaction execution.',
              telephone: '+919911956274',
              email: 'keystonerealtyhepldesk@gmail.com',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'IN'
              },
              areaServed: {
                '@type': 'Country',
                name: 'India'
              },
              priceRange: '₹₹ - ₹₹₹₹₹',
              openingHours: 'Mo-Sa 09:30-19:00'
            },
            {
              '@type': 'FAQPage',
              '@id': 'https://keystonerealtyadvisor.com/#faq',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'How does Keystone Realty Advisor verify properties and projects?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Every listing on Keystone Realty Advisor undergoes comprehensive title search verification, RERA approval confirmation, builder track record review, and physical on-site inspection.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'What real estate advisory services are offered?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'We provide end-to-end luxury residential acquisition advisory, commercial real estate leasing, property valuation analysis, and private portfolio consultations.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'How can I schedule a confidential consultation or site visit?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'You can directly connect with our senior advisors via phone at +91 9911956274, chat instantly on WhatsApp, or submit an online inquiry on any property listing.'
                  }
                }
              ]
            }
          ]
        }}
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
              Institutional Real Estate Advisory & Luxury Property Representation
            </h1>

            <p
              style={{
                fontSize: '1.125rem',
                color: '#94A3B8',
                lineHeight: 1.65,
                marginBottom: '2.5rem',
              }}
            >
              Guiding discerning homeowners, family offices, and commercial operators with verified property acquisitions, transparent valuation models, and complete transaction governance.
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem' }}>
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
                Uncompromising Due Diligence. Absolute Discretion.
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                At <strong>Keystone Realty Advisor</strong>, we re-engineer property acquisition and real estate advisory through institutional-grade governance. Unlike volume brokers, our practice operates with complete fiduciary transparency, representing discerning buyers, private investors, and corporate occupiers.
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
                Every asset in our portfolio undergoes rigorous legal screening, physical on-site audits, RERA regulatory compliance validation, and fair-market price benchmarking before representation.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle2 size={20} color="var(--color-gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-primary)' }}>100% Title Verified</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Pre-screened legal titles & approvals</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <Lock size={20} color="var(--color-gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-primary)' }}>Zero Spam & Direct Desk</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Strict privacy with senior advisor contact</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <FileCheck2 size={20} color="var(--color-gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-primary)' }}>RERA & Builder Audits</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Proven developer delivery track records</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <TrendingUp size={20} color="var(--color-gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-primary)' }}>Yield Optimization</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Data-driven micro-market analytics</span>
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
                <span>The Keystone Standard</span>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1.25rem', lineHeight: 1.35 }}>
                Strategic Property Advisory Designed for Long-Term Capital Preservation
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem', borderTop: '1px solid rgba(212, 175, 55, 0.4)', paddingTop: '1.25rem' }}>
                <div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-gold-400)', fontFamily: 'var(--font-display)' }}>100%</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '6px' }}>Verified Legal Due Diligence</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-gold-400)', fontFamily: 'var(--font-display)' }}>RERA</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '6px' }}>Approved Partner Projects</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-gold-400)', fontFamily: 'var(--font-display)' }}>₹0</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '6px' }}>Hidden Transaction Markups</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-gold-400)', fontFamily: 'var(--font-display)' }}>NDA</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '6px' }}>Confidential Client Representation</div>
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
            <h2 className="section-title">Institutional Real Estate Advisory</h2>
            <p className="section-description">
              Keystone Realty Advisor operates with complete discretion, delivering rigorous market intelligence and strategic advisory for discerning clients and commercial operators.
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

      {/* Developer Projects Ticker Strip - Just Above Footer */}
      <DeveloperTicker />
    </div>
  );
}
