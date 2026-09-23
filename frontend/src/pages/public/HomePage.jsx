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
  Award
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
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
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
              <span>Keystone Realty Advisor</span>
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
              Strategic Real Estate Advisory & Property Representation
            </h1>

            <p
              style={{
                fontSize: '1.125rem',
                color: '#94A3B8',
                lineHeight: 1.65,
                marginBottom: '2.5rem',
              }}
            >
              Providing institutional-quality guidance, premium residential acquisitions, and commercial real estate portfolio advisory.
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

              <button type="submit" className="btn btn-primary" aria-label="Search properties" style={{ padding: '0.6875rem 1.5rem' }}>
                <Search size={16} />
                <span>Search</span>
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
              { type: 'APARTMENT', label: 'Apartments', icon: Building2 },
              { type: 'VILLA', label: 'Villas & Mansions', icon: Landmark },
              { type: 'PENTHOUSE', label: 'Penthouses', icon: Layers },
              { type: 'COMMERCIAL', label: 'Commercial Spaces', icon: TrendingUp },
              { type: 'LAND', label: 'Development Land', icon: Compass },
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
            <div className="card" style={{ padding: '2rem' }}>
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
                Acquisition & Representation
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
                Comprehensive due diligence, property identification, transaction structuring, and negotiation for high-value residential and commercial assets.
              </p>
            </div>

            <div className="card" style={{ padding: '2rem' }}>
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
                Portfolio Strategy & Leasing
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
                Strategic positioning for income-generating assets, commercial leasing advisory, tenancy optimization, and yield evaluation across prime sectors.
              </p>
            </div>

            <div className="card" style={{ padding: '2rem' }}>
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
                Asset Valuation & Feasibility
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
                Data-driven market comparative assessments, land development feasibility studies, and strategic exit structuring.
              </p>
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
        <div className="container" style={{ textAlign: 'center', maxWidth: '640px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1rem' }}>
            Looking for Strategic Real Estate Guidance?
          </h2>
          <p style={{ fontSize: '1rem', color: '#94A3B8', marginBottom: '2rem' }}>
            Connect with our advisory desk for private consultations regarding property acquisition, listings, or market evaluation.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary btn-lg">
              Contact Advisory Desk
            </Link>
            <Link to="/properties" className="btn btn-outline-gold btn-lg">
              Browse Listings
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
