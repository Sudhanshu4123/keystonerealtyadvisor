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
        title="Premium Real Estate & Property Advisory | Keystone Realty Advisor"
        description="Discover verified residential apartments, luxury villas, and prime commercial properties with personalized guidance from Keystone Realty Advisor."
        canonicalUrl="/"
      />
      {/* Hero Section with Animated Hand & Holographic City Formation */}
      <section
        className="hero-section-motion"
        style={{
          position: 'relative',
          paddingTop: '6rem',
          paddingBottom: '6rem',
          overflow: 'hidden',
          backgroundColor: '#070A11',
          borderBottom: '1px solid #1E293B',
          minHeight: '580px',
        }}
      >
        {/* Layer 1: Base City Night Backdrop */}
        <div className="hero-layer-base" />

        {/* Layer 2: The Hand entering from the side/bottom-left */}
        <div className="hero-hand-container">
          <div className="hero-layer-hand" />
          {/* Luminous Palm Energy Flare */}
          <div className="hero-palm-flare" />
        </div>

        {/* Layer 3: The Holographic Buildings constructing upward from the hand */}
        <div className="hero-hologram-container">
          <div className="hero-layer-hologram" />
          {/* Hologram Construction Scanline */}
          <div className="hero-hologram-scanner" />
          {/* Neon Light Rings */}
          <div className="hero-hologram-ring ring-1" />
          <div className="hero-hologram-ring ring-2" />
        </div>

        {/* Layer 4: Foreground Content (Text & Search Form) */}
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center' }}>
            <h1
              style={{
                fontSize: 'clamp(1.85rem, 5vw, 2.75rem)',
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                marginBottom: '1.25rem',
                color: '#FFFFFF',
                textShadow: '0 2px 14px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 30, 80, 0.6)',
              }}
            >
              Verified Real Estate Advisory &amp; Premium Property Consultation
            </h1>

            <p
              style={{
                fontSize: '1.125rem',
                color: '#E2E8F0',
                lineHeight: 1.65,
                marginBottom: '2.5rem',
                textShadow: '0 1px 6px rgba(0, 0, 0, 0.8)',
              }}
            >
              Discover curated residential apartments, luxury villas, and prime commercial spaces with personalized guidance from trusted property advisors.
            </p>

            {/* Hero Search Box */}
            <form
              onSubmit={handleSearchSubmit}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                borderRadius: 'var(--radius-md)',
                padding: '0.875rem',
                boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(0, 195, 255, 0.25)',
                display: 'grid',
                gridTemplateColumns: '2fr 1.2fr 1.2fr auto',
                gap: '0.75rem',
                alignItems: 'center',
                textAlign: 'left',
                backdropFilter: 'blur(16px)',
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

              <button
                type="submit"
                className="btn btn-primary"
                aria-label="Search properties"
                style={{
                  height: '48px',
                  padding: '0 1.5rem',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-md)',
                  whiteSpace: 'nowrap',
                }}
              >
                <Search size={16} />
                <span>Search Properties</span>
              </button>
            </form>

          </div>
        </div>

        <style>{`
          /* Layer 1: Base City Night Backdrop */
          .hero-layer-base {
            position: absolute;
            inset: 0;
            background-image: url('/hero-hand-city.jpg');
            background-size: cover;
            background-position: left center;
            z-index: 1;
          }

          /* Layer 2: The Hand entering from the side/bottom-left */
          .hero-hand-container {
            position: absolute;
            inset: 0;
            z-index: 2;
            pointer-events: none;
            animation: handSlideIn 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          .hero-layer-hand {
            position: absolute;
            inset: 0;
            background-image: url('/hero-hand-city.jpg');
            background-size: cover;
            background-position: left center;
            clip-path: polygon(0% 48%, 54% 48%, 54% 100%, 0% 100%);
          }

          @keyframes handSlideIn {
            0% {
              transform: translate(-100px, 80px) scale(0.94);
              opacity: 0;
            }
            60% {
              opacity: 1;
            }
            100% {
              transform: translate(0, 0) scale(1);
              opacity: 1;
            }
          }

          /* Luminous Palm Energy Flare */
          .hero-palm-flare {
            position: absolute;
            left: 36%;
            top: 55%;
            width: 90px;
            height: 90px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(0, 210, 255, 0.9) 35%, rgba(0, 140, 255, 0) 70%);
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
            animation: palmPulse 1.2s ease-out 1.2s forwards;
            pointer-events: none;
          }

          @keyframes palmPulse {
            0% {
              transform: translate(-50%, -50%) scale(0);
              opacity: 0;
            }
            50% {
              transform: translate(-50%, -50%) scale(2);
              opacity: 1;
            }
            100% {
              transform: translate(-50%, -50%) scale(1.2);
              opacity: 0.8;
            }
          }

          /* Layer 3: Holographic Buildings Constructing Upward */
          .hero-hologram-container {
            position: absolute;
            inset: 0;
            z-index: 3;
            pointer-events: none;
            clip-path: polygon(10% 0%, 54% 0%, 54% 56%, 10% 56%);
            animation: hologramConstruct 2s cubic-bezier(0.2, 0.8, 0.25, 1) forwards 1.4s;
            opacity: 0;
          }

          .hero-layer-hologram {
            position: absolute;
            inset: 0;
            background-image: url('/hero-hand-city.jpg');
            background-size: cover;
            background-position: left center;
            filter: drop-shadow(0 0 15px rgba(0, 200, 255, 0.7));
          }

          @keyframes hologramConstruct {
            0% {
              clip-path: polygon(10% 56%, 54% 56%, 54% 56%, 10% 56%);
              opacity: 0;
              filter: brightness(2.5) contrast(1.5);
            }
            20% {
              opacity: 1;
            }
            100% {
              clip-path: polygon(10% 0%, 54% 0%, 54% 56%, 10% 56%);
              opacity: 1;
              filter: brightness(1) contrast(1);
            }
          }

          /* Hologram Construction Scanline */
          .hero-hologram-scanner {
            position: absolute;
            left: 12%;
            width: 40%;
            height: 3px;
            background: linear-gradient(90deg, transparent, #FFFFFF 40%, #00F0FF 60%, transparent);
            box-shadow: 0 0 15px #00F0FF, 0 0 30px #00B4D8;
            opacity: 0;
            top: 55%;
            animation: scanlineSweep 2s cubic-bezier(0.2, 0.8, 0.25, 1) 1.4s forwards;
          }

          @keyframes scanlineSweep {
            0% {
              top: 55%;
              opacity: 1;
            }
            95% {
              top: 3%;
              opacity: 1;
            }
            100% {
              top: 0%;
              opacity: 0;
            }
          }

          /* Neon Light Rings */
          .hero-hologram-ring {
            position: absolute;
            left: 33%;
            border-radius: 50%;
            border: 1.5px solid rgba(0, 220, 255, 0.6);
            box-shadow: 0 0 10px rgba(0, 220, 255, 0.4);
            transform: translate(-50%, -50%) rotateX(70deg);
            opacity: 0;
            pointer-events: none;
          }

          .ring-1 {
            top: 36%;
            width: 260px;
            height: 80px;
            animation: ringAppear 1s ease-out 2.8s forwards, ringPulse 4s ease-in-out 3.8s infinite alternate;
          }

          .ring-2 {
            top: 42%;
            width: 320px;
            height: 95px;
            animation: ringAppear 1s ease-out 3s forwards, ringPulse 4s ease-in-out 4s infinite alternate-reverse;
          }

          @keyframes ringAppear {
            0% { opacity: 0; transform: translate(-50%, -50%) rotateX(70deg) scale(0.6); }
            100% { opacity: 0.85; transform: translate(-50%, -50%) rotateX(70deg) scale(1); }
          }

          @keyframes ringPulse {
            0% { opacity: 0.5; transform: translate(-50%, -50%) rotateX(70deg) scale(0.97); }
            100% { opacity: 0.95; transform: translate(-50%, -50%) rotateX(70deg) scale(1.03); }
          }

          @media (max-width: 860px) {
            .hero-search-form {
              grid-template-columns: 1fr !important;
            }
            .hero-section-motion {
              padding-top: 4rem !important;
              padding-bottom: 4rem !important;
            }
            .hero-hologram-ring {
              display: none;
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
                <strong>Keystone Realty Advisor</strong> advises buyers, tenants and investors on premier residential and commercial properties, from initial shortlisting to private viewings.
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
