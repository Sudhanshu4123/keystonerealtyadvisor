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
        {/* Layer 1: Base Clean City Skyline & Waterfront (Completely empty on the left) */}
        <div className="hero-skyline-bg" />

        {/* Layer 2: Interactive Motion Stage (Left Side) */}
        <div className="hero-stage-container">
          {/* Hologram Buildings (Constructs upward from palm) */}
          <div className="hero-buildings-stage">
            <img
              src="/hero-buildings.png"
              alt="Holographic City"
              className="hero-buildings-img"
            />
            {/* Holographic Laser Construction Scanline */}
            <div className="hero-buildings-scanline" />
          </div>

          {/* Hand with Suit (Slides in from the left) */}
          <div className="hero-hand-stage">
            <img
              src="/hero-hand.png"
              alt="Advisory Hand"
              className="hero-hand-img"
            />
            {/* Luminous Palm Flare */}
            <div className="hero-palm-beam" />
          </div>
        </div>

        {/* Layer 4: Foreground Content (Text & Search Form) */}
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="hero-content-wrapper" style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center' }}>
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
                marginBottom: '2rem',
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
                padding: '1rem',
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
          /* Layer 1: Clean Night City Skyline & Waterfront */
          .hero-skyline-bg {
            position: absolute;
            inset: 0;
            background-image: url('/hero-bg-skyline.jpg');
            background-size: cover;
            background-position: center bottom;
            z-index: 1;
          }

          /* Stage container pinned to the left-bottom corner */
          .hero-stage-container {
            position: absolute;
            bottom: 0;
            left: 0;
            width: clamp(380px, 48vw, 680px);
            aspect-ratio: 1024 / 700;
            z-index: 2;
            pointer-events: none;
          }

          /* Hand Stage: Starts off-screen to the left, slides in */
          .hero-hand-stage {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            animation: handSlideFromLeft 1.3s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.25s;
            opacity: 0;
            transform: translateX(-110%);
            will-change: transform, opacity;
          }

          .hero-hand-img {
            width: 100%;
            height: auto;
            display: block;
            filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.5));
          }

          @keyframes handSlideFromLeft {
            0% {
              transform: translateX(-110%) translateY(15px);
              opacity: 0;
            }
            35% {
              opacity: 1;
            }
            100% {
              transform: translateX(0) translateY(0);
              opacity: 1;
            }
          }

          /* Luminous Palm Flare */
          .hero-palm-beam {
            position: absolute;
            left: 55%;
            top: 57%;
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(0, 210, 255, 0.95) 40%, transparent 70%);
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
            animation: palmFlareBurst 1s ease-out 1.5s forwards;
            pointer-events: none;
          }

          @keyframes palmFlareBurst {
            0% {
              transform: translate(-50%, -50%) scale(0);
              opacity: 0;
            }
            50% {
              transform: translate(-50%, -50%) scale(2.2);
              opacity: 1;
            }
            100% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 0.8;
            }
          }

          /* Hologram Buildings Stage: Mathematically fitted right upon the palm */
          .hero-buildings-stage {
            position: absolute;
            bottom: 14%;
            left: 14%;
            width: 78%;
            z-index: 3;
            clip-path: inset(100% 0 0 0);
            opacity: 0;
            animation: buildingsEmerge 1.8s cubic-bezier(0.2, 0.8, 0.25, 1) forwards 1.6s,
                       buildingsFloat 4s ease-in-out 3.4s infinite alternate;
            will-change: clip-path, opacity, transform;
          }

          .hero-buildings-img {
            width: 100%;
            height: auto;
            display: block;
            filter: drop-shadow(0 0 20px rgba(0, 210, 255, 0.85));
          }

          @keyframes buildingsEmerge {
            0% {
              clip-path: inset(100% 0 0 0);
              opacity: 0;
              filter: brightness(2.6) drop-shadow(0 0 35px #00F0FF);
            }
            20% {
              opacity: 1;
            }
            100% {
              clip-path: inset(0% 0 0 0);
              opacity: 1;
              filter: brightness(1) drop-shadow(0 0 20px rgba(0, 210, 255, 0.85));
            }
          }

          @keyframes buildingsFloat {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-6px);
            }
          }

          /* Scanline */
          .hero-buildings-scanline {
            position: absolute;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, transparent, #FFFFFF 40%, #00F0FF 60%, transparent);
            box-shadow: 0 0 15px #00F0FF, 0 0 25px #00B4D8;
            opacity: 0;
            bottom: 0%;
            animation: scanlineRise 1.8s cubic-bezier(0.2, 0.8, 0.25, 1) 1.6s forwards;
          }

          @keyframes scanlineRise {
            0% {
              bottom: 0%;
              opacity: 1;
            }
            95% {
              bottom: 96%;
              opacity: 1;
            }
            100% {
              bottom: 100%;
              opacity: 0;
            }
          }

          /* Desktop split layout to prevent search bar from blocking holographic hand */
          @media (min-width: 1024px) {
            .hero-content-wrapper {
              margin-left: auto !important;
              margin-right: 0 !important;
              max-width: 580px !important;
              text-align: left !important;
            }
            .hero-search-form {
              grid-template-columns: 1fr 1fr !important;
            }
            .hero-search-form > div:first-child {
              grid-column: 1 / -1;
            }
            .hero-search-form > button {
              grid-column: 1 / -1;
            }
            .hero-stage-container {
              width: clamp(480px, 48vw, 680px) !important;
            }
          }

          @media (max-width: 1023px) {
            .hero-stage-container {
              opacity: 0.5;
              width: 280px;
            }
          }

          @media (max-width: 768px) {
            .hero-search-form {
              grid-template-columns: 1fr !important;
            }
            .hero-section-motion {
              padding-top: 4rem !important;
              padding-bottom: 4rem !important;
            }
            .hero-stage-container {
              opacity: 0.4;
              width: 220px;
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
