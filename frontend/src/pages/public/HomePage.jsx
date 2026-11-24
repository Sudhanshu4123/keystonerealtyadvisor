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
  Sparkles,
  ShieldCheck,
  ArrowUpRight,
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

  const handleTrendingClick = (queryText, propertyType = '', listingType = '') => {
    setSearchParams((prev) => ({
      ...prev,
      query: queryText,
      propertyType: propertyType || prev.propertyType,
      listingType: listingType || prev.listingType,
    }));
    const query = new URLSearchParams();
    if (queryText) query.append('query', queryText);
    if (propertyType) query.append('propertyType', propertyType);
    if (listingType) query.append('listingType', listingType);
    navigate(`/properties?${query.toString()}`);
  };

  return (
    <div>
      <SEO
        title="Premium Real Estate & Property Advisory | Keystone Realty Advisor"
        description="Discover verified residential apartments, luxury villas, and prime commercial properties with personalized guidance from Keystone Realty Advisor."
        canonicalUrl="/"
      />
      {/* Ultra-Luxury Dynamic Hero Section */}
      <section className="hero-luxury-section">
        {/* Ambient Animated Glow Spheres */}
        <div className="hero-glow-orb hero-glow-gold" />
        <div className="hero-glow-orb hero-glow-sapphire" />
        <div className="hero-glow-orb hero-glow-emerald" />
        <div className="hero-grid-pattern" />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
            
            {/* Shimmering Trust Badge */}
            <div className="hero-trust-badge">
              <span className="live-pulse-dot" />
              <Sparkles size={14} style={{ color: '#E5C058' }} />
              <span>Curated Portfolios • Verified RERA Assets • Bespoke Advisory</span>
            </div>

            <h1 className="hero-main-title">
              Verified Real Estate Advisory &amp; <span className="gold-gradient-text">Premium Property Consultation</span>
            </h1>

            <p className="hero-main-subtitle">
              Discover curated residential apartments, luxury villas, and prime commercial spaces with personalized guidance from trusted property advisors.
            </p>

            {/* Glassmorphic Luxury Search Box */}
            <form
              onSubmit={handleSearchSubmit}
              className="hero-search-form"
            >
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="form-control hero-input"
                  placeholder="Location, sector, luxury developer, or keyword..."
                  aria-label="Search properties by location or keywords"
                  value={searchParams.query}
                  onChange={(e) => setSearchParams({ ...searchParams, query: e.target.value })}
                  style={{ height: '52px', fontSize: '0.9375rem', paddingLeft: '1rem' }}
                />
              </div>

              <select
                className="form-control hero-select"
                aria-label="Filter by listing type"
                value={searchParams.listingType}
                onChange={(e) => setSearchParams({ ...searchParams, listingType: e.target.value })}
                style={{ height: '52px', fontSize: '0.9375rem' }}
              >
                <option value="">All Listing Types</option>
                <option value="SALE">For Sale</option>
                <option value="RENT">For Rent</option>
                <option value="LEASE">Commercial Lease</option>
              </select>

              <select
                className="form-control hero-select"
                aria-label="Filter by property type"
                value={searchParams.propertyType}
                onChange={(e) => setSearchParams({ ...searchParams, propertyType: e.target.value })}
                style={{ height: '52px', fontSize: '0.9375rem' }}
              >
                <option value="">All Property Types</option>
                <option value="APARTMENT">Luxury Apartments</option>
                <option value="VILLA">Villas &amp; Mansions</option>
                <option value="PENTHOUSE">Exclusive Penthouses</option>
                <option value="INDEPENDENT_FLOOR">Independent Floors</option>
                <option value="COMMERCIAL">Commercial &amp; Offices</option>
                <option value="PLOT">Residential / Land Plots</option>
              </select>

              <button
                type="submit"
                className="btn btn-primary hero-submit-btn"
                aria-label="Search properties"
              >
                <Search size={18} />
                <span>Search Properties</span>
              </button>
            </form>

            {/* Trending Quick-Filter Chips */}
            <div className="hero-trending-bar">
              <span className="trending-label">Trending:</span>
              <button type="button" onClick={() => handleTrendingClick('Dwarka Expressway')} className="trending-chip">
                Dwarka Expressway
              </button>
              <button type="button" onClick={() => handleTrendingClick('Golf Course Road')} className="trending-chip">
                Golf Course Road
              </button>
              <button type="button" onClick={() => handleTrendingClick('', 'PENTHOUSE')} className="trending-chip">
                Luxury Penthouses
              </button>
              <button type="button" onClick={() => handleTrendingClick('', 'VILLA')} className="trending-chip">
                Private Villas
              </button>
              <button type="button" onClick={() => handleTrendingClick('', 'COMMERCIAL')} className="trending-chip">
                Grade-A Commercial
              </button>
            </div>

            {/* Interactive Live Value & Trust Ribbon (Compels visitors to stay & explore) */}
            <div className="hero-metrics-grid">
              <div className="hero-metric-card">
                <div className="metric-icon-box">
                  <Building2 size={20} style={{ color: '#E5C058' }} />
                </div>
                <div>
                  <div className="metric-val">₹1,200+ Cr</div>
                  <div className="metric-lbl">Curated Portfolio Value</div>
                </div>
              </div>

              <div className="hero-metric-card">
                <div className="metric-icon-box">
                  <ShieldCheck size={20} style={{ color: '#10B981' }} />
                </div>
                <div>
                  <div className="metric-val">100% Legal</div>
                  <div className="metric-lbl">RERA &amp; Title Audited</div>
                </div>
              </div>

              <div className="hero-metric-card">
                <div className="metric-icon-box">
                  <Award size={20} style={{ color: '#E5C058' }} />
                </div>
                <div>
                  <div className="metric-val">0% Brokerage</div>
                  <div className="metric-lbl">On Select Developer Units</div>
                </div>
              </div>

              <div className="hero-metric-card">
                <div className="metric-icon-box">
                  <Sparkles size={20} style={{ color: '#60A5FA' }} />
                </div>
                <div>
                  <div className="metric-val">24-48 Hours</div>
                  <div className="metric-lbl">Private VIP Site Tours</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <style>{`
          .hero-luxury-section {
            background: radial-gradient(ellipse at 50% 15%, #131E3A 0%, #080D1A 50%, #030712 100%);
            color: #FFFFFF;
            padding-top: 5.5rem;
            padding-bottom: 5.5rem;
            position: relative;
            overflow: hidden;
            border-bottom: 1px solid rgba(229, 192, 88, 0.2);
          }

          /* Ambient Floating Glowing Orbs */
          .hero-glow-orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(100px);
            pointer-events: none;
            opacity: 0.65;
            transition: all 1s ease;
          }

          .hero-glow-gold {
            width: 440px;
            height: 440px;
            background: radial-gradient(circle, rgba(229, 192, 88, 0.25) 0%, rgba(212, 175, 55, 0.05) 70%, transparent 100%);
            top: -120px;
            left: 8%;
            animation: floatGlow1 14s ease-in-out infinite alternate;
          }

          .hero-glow-sapphire {
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(37, 99, 235, 0.22) 0%, rgba(30, 58, 138, 0.06) 70%, transparent 100%);
            top: 20%;
            right: 5%;
            animation: floatGlow2 18s ease-in-out infinite alternate;
          }

          .hero-glow-emerald {
            width: 380px;
            height: 380px;
            background: radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%);
            bottom: -80px;
            left: 35%;
            animation: floatGlow3 20s ease-in-out infinite alternate;
          }

          @keyframes floatGlow1 {
            0% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(60px, 40px) scale(1.15); }
            100% { transform: translate(-40px, 70px) scale(0.95); }
          }

          @keyframes floatGlow2 {
            0% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-70px, -50px) scale(1.1); }
            100% { transform: translate(30px, 40px) scale(1.05); }
          }

          @keyframes floatGlow3 {
            0% { transform: translate(0, 0); }
            100% { transform: translate(-50px, -30px); }
          }

          /* Architectural Blueprint Grid Pattern */
          .hero-grid-pattern {
            position: absolute;
            inset: 0;
            background-image: 
              radial-gradient(rgba(229, 192, 88, 0.14) 1px, transparent 1px),
              linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
            background-size: 38px 38px, 120px 120px;
            pointer-events: none;
            opacity: 0.85;
          }

          /* Shimmering Trust Badge */
          .hero-trust-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(19, 27, 46, 0.8);
            border: 1px solid rgba(229, 192, 88, 0.4);
            padding: 0.45rem 1.15rem;
            border-radius: 9999px;
            font-size: 0.8125rem;
            font-weight: 600;
            color: #F8FAFC;
            margin-bottom: 1.5rem;
            backdrop-filter: blur(12px);
            box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          }

          .live-pulse-dot {
            width: 8px;
            height: 8px;
            background-color: #10B981;
            border-radius: 50%;
            display: inline-block;
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
            animation: pulseDot 2s infinite;
          }

          @keyframes pulseDot {
            0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.8); }
            70% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
            100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
          }

          /* Main Title & Gold Gradient */
          .hero-main-title {
            font-size: clamp(2rem, 5.2vw, 3.15rem);
            font-weight: 800;
            line-height: 1.18;
            letter-spacing: -0.025em;
            margin-bottom: 1.25rem;
            color: #FFFFFF;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          }

          .gold-gradient-text {
            background: linear-gradient(135deg, #FFFFFF 20%, #F5DE93 45%, #E5C058 75%, #D4AF37 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            display: inline-block;
          }

          .hero-main-subtitle {
            font-size: 1.125rem;
            color: #CBD5E1;
            line-height: 1.7;
            margin-bottom: 2.25rem;
            max-width: 740px;
            margin-left: auto;
            margin-right: auto;
            font-weight: 400;
          }

          /* Glassmorphic Search Form */
          .hero-search-form {
            background: rgba(255, 255, 255, 0.98);
            border-radius: 14px;
            padding: 0.85rem;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(229, 192, 88, 0.35);
            display: grid;
            grid-template-columns: 2fr 1.25fr 1.25fr auto;
            gap: 0.75rem;
            align-items: center;
            text-align: left;
            backdrop-filter: blur(20px);
          }

          .hero-submit-btn {
            height: 52px;
            padding: 0 1.75rem;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9375rem;
            font-weight: 700;
            border-radius: 10px;
            white-space: nowrap;
            background: linear-gradient(135deg, #E5C058 0%, #C29B38 100%);
            border: none;
            color: #070A11;
            box-shadow: 0 4px 14px rgba(229, 192, 88, 0.4);
            transition: all 0.25s ease;
          }

          .hero-submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(229, 192, 88, 0.55);
            background: linear-gradient(135deg, #F3D378 0%, #D4AF37 100%);
          }

          /* Trending Quick Filter Pills */
          .hero-trending-bar {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-top: 1.25rem;
            margin-bottom: 2.75rem;
          }

          .trending-label {
            font-size: 0.8125rem;
            color: #94A3B8;
            font-weight: 600;
            margin-right: 0.25rem;
          }

          .trending-chip {
            background: rgba(30, 41, 59, 0.65);
            border: 1px solid rgba(255, 255, 255, 0.12);
            color: #E2E8F0;
            font-size: 0.78125rem;
            font-weight: 500;
            padding: 0.35rem 0.85rem;
            border-radius: 9999px;
            cursor: pointer;
            transition: all 0.2s ease;
            backdrop-filter: blur(8px);
          }

          .trending-chip:hover {
            background: rgba(229, 192, 88, 0.2);
            border-color: #E5C058;
            color: #FFFFFF;
            transform: translateY(-1px);
          }

          /* Interactive Metric Ribbon */
          .hero-metrics-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1rem;
            margin-top: 1.5rem;
          }

          .hero-metric-card {
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 1rem 1.15rem;
            display: flex;
            align-items: center;
            gap: 0.875rem;
            text-align: left;
            backdrop-filter: blur(14px);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }

          .hero-metric-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, rgba(229, 192, 88, 0.6), transparent);
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .hero-metric-card:hover {
            transform: translateY(-3px);
            background: rgba(24, 35, 64, 0.85);
            border-color: rgba(229, 192, 88, 0.4);
            box-shadow: 0 12px 28px -6px rgba(0, 0, 0, 0.5);
          }

          .hero-metric-card:hover::before {
            opacity: 1;
          }

          .metric-icon-box {
            width: 42px;
            height: 42px;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.05);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          .metric-val {
            font-size: 1.1875rem;
            font-weight: 700;
            color: #FFFFFF;
            letter-spacing: -0.01em;
            line-height: 1.2;
          }

          .metric-lbl {
            font-size: 0.75rem;
            color: #94A3B8;
            margin-top: 0.15rem;
            line-height: 1.3;
          }

          @media (max-width: 960px) {
            .hero-metrics-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 860px) {
            .hero-search-form {
              grid-template-columns: 1fr !important;
            }
            .hero-luxury-section {
              padding-top: 3.5rem;
              padding-bottom: 3.5rem;
            }
          }

          @media (max-width: 540px) {
            .hero-metrics-grid {
              grid-template-columns: 1fr;
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
