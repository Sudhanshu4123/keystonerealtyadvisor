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
  TrendingUp,
  Compass,
  ArrowRight,
  Landmark,
  Layers,
  Award,
  CheckCircle2,
  Lock,
  FileCheck2,
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
              Verified Real Estate Advisory &amp; Premium Property Consultation
            </h1>

            <p
              style={{
                fontSize: '1.125rem',
                color: '#94A3B8',
                lineHeight: 1.65,
                marginBottom: '2.5rem',
              }}
            >
              Discover curated residential apartments, luxury villas, and prime commercial spaces with personalized guidance from trusted property advisors.
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


      {/* Developer Projects Ticker Strip - Just Above Footer */}
      <DeveloperTicker />
    </div>
  );
}
