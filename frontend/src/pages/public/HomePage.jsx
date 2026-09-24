import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { propertyService } from '../../services/propertyService';
import projectService from '../../services/projectService';
import PropertyGrid from '../../components/property/PropertyGrid';
import ProjectCard from '../../components/project/ProjectCard';
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
    const query = new URLSearchParams();
    if (searchParams.query) query.append('query', searchParams.query);
    if (searchParams.listingType) query.append('listingType', searchParams.listingType);
    if (searchParams.propertyType) query.append('propertyType', searchParams.propertyType);
    navigate(`/properties?${query.toString()}`);
  };

  return (
    <div>
      <SEO
        title="Keystone Realty Advisor | Trusted Real Estate Consultancy & Luxury Property Advisors"
        description="Discover verified residential homes, high-yield commercial investments, and strategic real estate advisory with Keystone Realty Advisor. Honest market valuations and end-to-end transaction integrity."
        keywords="Keystone Realty Advisor, buy residential property, luxury apartments, commercial property advisory, verified real estate, property investment India, real estate consultancy"
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
          paddingTop: '5.5rem',
          paddingBottom: '5.5rem',
          position: 'relative',
          borderBottom: '1px solid #1E293B',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.8125rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-gold-400)',
                backgroundColor: 'rgba(194, 155, 56, 0.1)',
                border: '1px solid rgba(194, 155, 56, 0.25)',
                padding: '0.375rem 1rem',
                borderRadius: 'var(--radius-full)',
                marginBottom: '1.5rem',
              }}
            >
              <ShieldCheck size={14} />
              <span>Institutional Real Estate Advisory</span>
            </span>

            <h1
              style={{
                fontSize: 'clamp(1.85rem, 5vw, 3rem)',
                fontWeight: 700,
                lineHeight: 1.18,
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
                padding: '1rem',
                boxShadow: 'var(--shadow-xl)',
                display: 'grid',
                gridTemplateColumns: '1.5fr 1fr 1fr auto',
                gap: '0.75rem',
                alignItems: 'center',
                textAlign: 'left',
              }}
              className="hero-search-form"
            >
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Location or keywords..."
                  aria-label="Search properties by location or keywords"
                  value={searchParams.query}
                  onChange={(e) => setSearchParams({ ...searchParams, query: e.target.value })}
                  style={{ paddingLeft: '2.25rem' }}
                />
                <Search size={16} color="var(--color-light-400)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>

              <select
                className="form-control"
                aria-label="Filter by listing type"
                value={searchParams.listingType}
                onChange={(e) => setSearchParams({ ...searchParams, listingType: e.target.value })}
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

              <button type="submit" className="btn btn-primary" aria-label="Search properties" style={{ padding: '0.6875rem 1.5rem', gap: '0.5rem' }}>
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
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '3.5rem', alignItems: 'center' }} className="about-grid">
            <div>
              <span className="section-subtitle">About Keystone Realty Advisor</span>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
                Uncompromising Due Diligence. Absolute Discretion.
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                At <strong>Keystone Realty Advisor</strong>, we re-engineer property acquisition and real estate advisory through institutional-grade governance. Unlike volume brokers, our practice operates with complete fiduciary transparency, representing discerning buyers, private investors, and corporate occupiers.
              </p>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
                Every asset in our portfolio undergoes rigorous legal screening, physical on-site audits, RERA regulatory compliance validation, and fair-market price benchmarking before representation.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle2 size={20} color="var(--color-gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.9375rem', color: 'var(--text-primary)' }}>100% Title Verified</strong>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Pre-screened legal titles & approvals</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <Lock size={20} color="var(--color-gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.9375rem', color: 'var(--text-primary)' }}>Zero Spam & Direct Desk</strong>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Strict privacy with senior advisor contact</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <FileCheck2 size={20} color="var(--color-gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.9375rem', color: 'var(--text-primary)' }}>RERA & Builder Audits</strong>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Proven developer delivery track records</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <TrendingUp size={20} color="var(--color-gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.9375rem', color: 'var(--text-primary)' }}>Yield Optimization</strong>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Data-driven micro-market analytics</span>
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
                padding: '2.5rem',
                border: '1px solid #1E293B',
                boxShadow: 'var(--shadow-xl)',
                position: 'relative',
              }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-gold-400)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1.5rem' }}>
                <Award size={16} />
                <span>The Keystone Standard</span>
              </div>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1.5rem', lineHeight: 1.3 }}>
                Strategic Property Advisory Designed for Long-Term Capital Preservation
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem', borderTop: '1px solid #1E293B', paddingTop: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-gold-400)', fontFamily: 'var(--font-display)' }}>100%</div>
                  <div style={{ fontSize: '0.8125rem', color: '#94A3B8', marginTop: '2px' }}>Verified Legal Due Diligence</div>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-gold-400)', fontFamily: 'var(--font-display)' }}>RERA</div>
                  <div style={{ fontSize: '0.8125rem', color: '#94A3B8', marginTop: '2px' }}>Approved Partner Projects</div>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-gold-400)', fontFamily: 'var(--font-display)' }}>₹0</div>
                  <div style={{ fontSize: '0.8125rem', color: '#94A3B8', marginTop: '2px' }}>Hidden Transaction Markups</div>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-gold-400)', fontFamily: 'var(--font-display)' }}>NDA</div>
                  <div style={{ fontSize: '0.8125rem', color: '#94A3B8', marginTop: '2px' }}>Confidential Client Representation</div>
                </div>
              </div>

              <Link to="/contact" className="btn btn-primary btn-block" style={{ justifyContent: 'center' }}>
                Schedule a Confidential Consultation
              </Link>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .about-grid {
              grid-template-columns: 1fr !important;
              gap: 2.5rem !important;
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

      {/* Featured Properties Section */}
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
            emptyTitle="No properties available at the moment."
            emptyDescription="New verified real estate listings are being prepared. Check back soon or contact our advisory office for private placement opportunities."
            columns={3}
          />
        </div>
      </section>

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
            <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
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
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                Bespoke Acquisition & Representation
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Discreet property identification, comprehensive title search audits, transaction structuring, and contract negotiation for high-value residences and penthouses.
              </p>
              <Link to="/advisory" style={{ marginTop: 'auto', color: 'var(--color-gold-600)', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <span>Learn about acquisition</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
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
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                Commercial Leasing & Corporate Strategy
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Strategic positioning for income-generating assets, commercial leasing advisory, tenancy optimization, and yield evaluation across prime commercial corridors.
              </p>
              <Link to="/advisory" style={{ marginTop: 'auto', color: 'var(--color-gold-600)', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <span>Learn about leasing</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
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
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                Asset Valuation & Feasibility Studies
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
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

      {/* Direct Advisory CTA Section */}
      <section
        style={{
          backgroundColor: 'var(--color-dark-900)',
          color: '#FFFFFF',
          paddingTop: '4.5rem',
          paddingBottom: '4.5rem',
          borderTop: '1px solid #1E293B',
        }}
      >
        <div className="container" style={{ textAlign: 'center', maxWidth: '680px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-gold-400)', fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
            <Lock size={14} />
            <span>Confidential Client Engagement</span>
          </span>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1rem', letterSpacing: '-0.01em' }}>
            Looking for Strategic Real Estate Guidance?
          </h2>
          <p style={{ fontSize: '1.0625rem', color: '#94A3B8', marginBottom: '2rem', lineHeight: 1.6 }}>
            Connect with our advisory desk for private consultations regarding premium acquisitions, commercial representation, or independent asset valuation.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary btn-lg">
              Book Confidential Consultation
            </Link>
            <Link to="/properties" className="btn btn-outline-gold btn-lg">
              Explore Verified Properties
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
