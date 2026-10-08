import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Compass,
  MapPin,
  Search,
  ArrowRight,
  Clock,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Layers,
  Building2,
  FileCheck2,
  Globe2,
  CheckCircle2,
  Phone,
  Mail,
  HelpCircle,
} from 'lucide-react';
import SEO from '../../components/common/SEO';
import {
  INSIGHTS_ARTICLES,
  INSIGHTS_CATEGORIES,
  INSIGHTS_REGIONS,
} from '../../data/insightsData';

export default function InsightsHubPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = useMemo(() => {
    return INSIGHTS_ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategory === 'all' || article.category === selectedCategory;
      const matchesRegion =
        selectedRegion === 'all' ||
        article.region === selectedRegion ||
        article.region === 'all';

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.subtitle.toLowerCase().includes(q) ||
        article.keywords.toLowerCase().includes(q) ||
        article.regionName.toLowerCase().includes(q);

      return matchesCategory && matchesRegion && matchesQuery;
    });
  }, [selectedCategory, selectedRegion, searchQuery]);

  const featuredArticle = useMemo(() => {
    return INSIGHTS_ARTICLES.find((a) => a.featured) || INSIGHTS_ARTICLES[0];
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - var(--header-height))', paddingBottom: '5rem' }}>
      <SEO
        title="Real Estate Insights & Investment Guides | Keystone Realty Advisor"
        description="Explore comprehensive real estate guides, micro-market corridor analyses, HRERA legal due diligence, and NRI investment advisory for Delhi NCR and Gurugram."
        canonicalUrl="/insights"
        keywords="Delhi NCR real estate guides, Gurgaon property market analysis, Dwarka Expressway investment guide, HRERA verification, NRI real estate guide, Keystone Realty insights"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Insights & Guides', path: '/insights' },
        ]}
      />

      {/* Hero Header Section */}
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
            top: '-40%',
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
            <BookOpen size={16} />
            <span>Topical Intelligence & Real Estate Research</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.125rem, 4.5vw, 3rem)',
              fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: '1.25rem',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            Real Estate Knowledge & Guides Hub
          </h1>

          <p style={{ fontSize: '1.0625rem', color: '#CBD5E1', lineHeight: 1.6, maxWidth: '720px', margin: '0 auto 2.25rem' }}>
            Authoritative, data-backed guides on micro-market corridors across Gurugram, Delhi, and Noida, asset class valuations, HRERA compliance, and strategic NRI acquisitions.
          </p>

          {/* Search Bar */}
          <div style={{ maxWidth: '580px', margin: '0 auto', position: 'relative' }}>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search corridors, RERA guides, 3 BHK trends, or NRI rules..."
              style={{
                width: '100%',
                padding: '0.875rem 1rem 0.875rem 3rem',
                backgroundColor: '#0F172A',
                border: '1px solid #334155',
                borderRadius: '9999px',
                color: '#FFFFFF',
                fontSize: '0.9375rem',
                outline: 'none',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--color-gold-400)';
                e.target.style.boxShadow = '0 0 0 3px rgba(229, 192, 88, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#334155';
                e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.25)';
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '1.125rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container" style={{ maxWidth: '1200px', marginTop: '3.5rem' }}>
        {/* Filter Navigation Bar */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg, 12px)',
            border: '1px solid var(--border-color, #E2E8F0)',
            padding: '1.25rem 1.5rem',
            boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
            marginBottom: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {/* Category Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748B', marginRight: '0.5rem' }}>
              Category:
            </span>
            {INSIGHTS_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '0.45rem 0.9rem',
                  borderRadius: '9999px',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  border: '1px solid',
                  borderColor: selectedCategory === cat.id ? 'var(--color-gold-500)' : '#E2E8F0',
                  backgroundColor: selectedCategory === cat.id ? 'rgba(229, 192, 88, 0.12)' : '#FAFAFC',
                  color: selectedCategory === cat.id ? 'var(--color-gold-700, #B48C28)' : '#475569',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Region Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', borderTop: '1px solid #F1F5F9', paddingTop: '0.75rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748B', marginRight: '0.5rem' }}>
              Region / Market:
            </span>
            {INSIGHTS_REGIONS.map((reg) => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  border: '1px solid',
                  borderColor: selectedRegion === reg.id ? '#0F172A' : '#E2E8F0',
                  backgroundColor: selectedRegion === reg.id ? '#0F172A' : '#FFFFFF',
                  color: selectedRegion === reg.id ? '#FFFFFF' : '#64748B',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {reg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Pillar Article Banner (If no search query) */}
        {!searchQuery && selectedCategory === 'all' && selectedRegion === 'all' && featuredArticle && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg, 12px)',
              border: '1px solid var(--border-color, #E2E8F0)',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(15, 23, 42, 0.06)',
              marginBottom: '3.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            }}
          >
            <div
              style={{
                backgroundColor: 'var(--color-dark-950)',
                color: '#FFFFFF',
                padding: '3rem 2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-gold-400)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                <Sparkles size={14} />
                <span>Featured Pillar Guide</span>
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.25, marginBottom: '1rem' }}>
                {featuredArticle.title}
              </h2>
              <p style={{ fontSize: '0.9375rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {featuredArticle.subtitle}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.8125rem', color: '#64748B', marginBottom: '2rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Clock size={14} color="var(--color-gold-400)" />
                  <span style={{ color: '#CBD5E1' }}>{featuredArticle.readTime}</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <MapPin size={14} color="var(--color-gold-400)" />
                  <span style={{ color: '#CBD5E1' }}>{featuredArticle.regionName}</span>
                </span>
              </div>
              <div>
                <Link
                  to={`/insights/${featuredArticle.slug}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: 'var(--color-gold-500)',
                    color: '#0F172A',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E5C058')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-gold-500)')}
                >
                  <span>Read Full Master Guide</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#FAFAFC' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
                Key Strategic Takeaways
              </h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {featuredArticle.keyTakeaways.map((point, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.875rem', color: '#334155', lineHeight: 1.5 }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--color-gold-600, #B48C28)', flexShrink: 0, marginTop: '2px' }} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary, #0F172A)' }}>
              {selectedCategory === 'all' ? 'All Guides & Research Dossiers' : INSIGHTS_CATEGORIES.find((c) => c.id === selectedCategory)?.label}
            </h2>
            <span style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 500 }}>
              Showing {filteredArticles.length} guides
            </span>
          </div>

          {filteredArticles.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '2rem',
              }}
            >
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-lg, 12px)',
                    border: '1px solid var(--border-color, #E2E8F0)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(15, 23, 42, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(15, 23, 42, 0.04)';
                  }}
                >
                  <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Top Badges */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '1rem' }}>
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '4px',
                          backgroundColor: 'rgba(229, 192, 88, 0.15)',
                          color: 'var(--color-gold-700, #B48C28)',
                        }}
                      >
                        {article.categoryName}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={12} />
                        {article.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 style={{ fontSize: '1.1875rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.35, marginBottom: '0.75rem' }}>
                      <Link
                        to={`/insights/${article.slug}`}
                        style={{ color: '#0F172A', textDecoration: 'none', transition: 'color 0.15s ease' }}
                        onMouseEnter={(e) => (e.target.style.color = 'var(--color-gold-600, #B48C28)')}
                        onMouseLeave={(e) => (e.target.style.color = '#0F172A')}
                      >
                        {article.title}
                      </Link>
                    </h3>

                    {/* Subtitle / Excerpt */}
                    <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.6, marginBottom: '1.25rem', flex: 1 }}>
                      {article.subtitle}
                    </p>

                    {/* Meta Region & Read Action */}
                    <div
                      style={{
                        paddingTop: '1rem',
                        borderTop: '1px solid #F1F5F9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#64748B', fontWeight: 500 }}>
                        <MapPin size={13} color="#94A3B8" />
                        {article.regionName}
                      </span>

                      <Link
                        to={`/insights/${article.slug}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          fontSize: '0.8125rem',
                          fontWeight: 700,
                          color: 'var(--color-gold-700, #B48C28)',
                          textDecoration: 'none',
                        }}
                      >
                        <span>Read Guide</span>
                        <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg, 12px)',
                padding: '3rem',
                textAlign: 'center',
                color: '#64748B',
              }}
            >
              <HelpCircle size={36} style={{ color: '#94A3B8', marginBottom: '1rem' }} />
              <div style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0F172A', marginBottom: '0.5rem' }}>
                No research guides matched your filter
              </div>
              <p style={{ fontSize: '0.875rem', margin: 0 }}>
                Try adjusting your search query or selecting a different region/category.
              </p>
            </div>
          )}
        </div>

        {/* Micro-Market Corridor Comparative Matrix */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg, 12px)',
            border: '1px solid var(--border-color, #E2E8F0)',
            padding: '2.5rem',
            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
            marginBottom: '4rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'rgba(229, 192, 88, 0.15)',
                color: 'var(--color-gold-700, #B48C28)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Layers size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Delhi NCR Corridor Investment Heatmap
              </h2>
              <p style={{ fontSize: '0.875rem', color: '#64748B', margin: '0.25rem 0 0' }}>
                Quick comparative evaluation across prime Delhi NCR real estate micro-markets.
              </p>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #E2E8F0', color: '#0F172A' }}>
                  <th style={{ padding: '0.875rem 1rem', fontWeight: 700 }}>Corridor / Micro-Market</th>
                  <th style={{ padding: '0.875rem 1rem', fontWeight: 700 }}>Region</th>
                  <th style={{ padding: '0.875rem 1rem', fontWeight: 700 }}>Dominant Asset Class</th>
                  <th style={{ padding: '0.875rem 1rem', fontWeight: 700 }}>Avg. Price Range (₹/sq.ft)</th>
                  <th style={{ padding: '0.875rem 1rem', fontWeight: 700 }}>Rental Yield</th>
                  <th style={{ padding: '0.875rem 1rem', fontWeight: 700 }}>Growth Catalyst</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                  <td style={{ padding: '0.875rem 1rem', fontWeight: 600, color: '#0F172A' }}>Dwarka Expressway (NPR)</td>
                  <td style={{ padding: '0.875rem 1rem', color: '#64748B' }}>Gurugram / West Delhi</td>
                  <td style={{ padding: '0.875rem 1rem', color: '#334155' }}>Luxury Condominiums & SCOs</td>
                  <td style={{ padding: '0.875rem 1rem', color: '#334155' }}>₹12,500 - ₹22,000</td>
                  <td style={{ padding: '0.875rem 1rem', color: '#16A34A', fontWeight: 600 }}>3.5% - 4.5%</td>
                  <td style={{ padding: '0.875rem 1rem', color: '#64748B' }}>Airport T3 Underpass & Global City</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                  <td style={{ padding: '0.875rem 1rem', fontWeight: 600, color: '#0F172A' }}>Golf Course Ext Road / SPR</td>
                  <td style={{ padding: '0.875rem 1rem', color: '#64748B' }}>Gurugram</td>
                  <td style={{ padding: '0.875rem 1rem', color: '#334155' }}>Ultra-Luxury Residences & Grade-A Offices</td>
                  <td style={{ padding: '0.875rem 1rem', color: '#334155' }}>₹18,000 - ₹35,000</td>
                  <td style={{ padding: '0.875rem 1rem', color: '#16A34A', fontWeight: 600 }}>3.8% - 5.0%</td>
                  <td style={{ padding: '0.875rem 1rem', color: '#64748B' }}>Cyber City Extension & Rapid Metro</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                  <td style={{ padding: '0.875rem 1rem', fontWeight: 600, color: '#0F172A' }}>South Delhi (GK / Vasant Vihar)</td>
                  <td style={{ padding: '0.875rem 1rem', color: '#64748B' }}>Delhi</td>
                  <td style={{ padding: '0.875rem 1rem', color: '#334155' }}>Freehold Builder Floors & Bungalows</td>
                  <td style={{ padding: '0.875rem 1rem', color: '#334155' }}>₹30,000 - ₹65,000+</td>
                  <td style={{ padding: '0.875rem 1rem', color: '#D97706', fontWeight: 600 }}>1.8% - 2.5%</td>
                  <td style={{ padding: '0.875rem 1rem', color: '#64748B' }}>Land Scarcity & Diplomatic Prestige</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                  <td style={{ padding: '0.875rem 1rem', fontWeight: 600, color: '#0F172A' }}>Noida Expressway (Sec 128-150)</td>
                  <td style={{ padding: '0.875rem 1rem', color: '#64748B' }}>Noida</td>
                  <td style={{ padding: '0.875rem 1rem', color: '#334155' }}>Sports City Condos & IT Parks</td>
                  <td style={{ padding: '0.875rem 1rem', color: '#334155' }}>₹9,000 - ₹16,000</td>
                  <td style={{ padding: '0.875rem 1rem', color: '#16A34A', fontWeight: 600 }}>3.2% - 4.2%</td>
                  <td style={{ padding: '0.875rem 1rem', color: '#64748B' }}>FNG Expressway & Aqua Line Metro</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.875rem 1rem', fontWeight: 600, color: '#0F172A' }}>Yamuna Expressway</td>
                  <td style={{ padding: '0.875rem 1rem', color: '#64748B' }}>Greater Noida / YEIDA</td>
                  <td style={{ padding: '0.875rem 1rem', color: '#334155' }}>Plots, Industrial & Hospitality</td>
                  <td style={{ padding: '0.875rem 1rem', color: '#334155' }}>₹5,500 - ₹9,500</td>
                  <td style={{ padding: '0.875rem 1rem', color: '#D97706', fontWeight: 600 }}>2.5% - 3.5%</td>
                  <td style={{ padding: '0.875rem 1rem', color: '#64748B' }}>Noida International Airport (DXN)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Advisory Consultation Call-to-Action */}
        <div
          style={{
            padding: '3rem',
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
          <div style={{ maxWidth: '640px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-gold-400)', fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
              <ShieldCheck size={16} />
              <span>Tailored Advisory & Due Diligence</span>
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#FFFFFF', margin: '0 0 0.75rem' }}>
              Need Custom Research for Your Portfolio?
            </h2>
            <p style={{ fontSize: '0.9375rem', color: '#CBD5E1', lineHeight: 1.6, margin: 0 }}>
              Connect directly with Keystone’s senior property consultants for institutional portfolio assessment, RERA legal verification, or high-yield commercial allocations across Delhi NCR.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'var(--color-gold-500)',
                color: '#0F172A',
                padding: '0.875rem 1.5rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.9375rem',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E5C058')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-gold-500)')}
            >
              <span>Schedule Advisory Call</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/properties"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#1E293B',
                color: '#FFFFFF',
                padding: '0.875rem 1.5rem',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.9375rem',
                textDecoration: 'none',
                border: '1px solid #334155',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#334155')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1E293B')}
            >
              <span>Explore Verified Properties</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
