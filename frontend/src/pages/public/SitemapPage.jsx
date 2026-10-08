import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Home,
  Building2,
  Building,
  MapPin,
  FileText,
  ShieldCheck,
  Search,
  ChevronRight,
  ArrowRight,
  Briefcase,
  Layers,
  Phone,
  Mail,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import SEO from '../../components/common/SEO';
import { projectService } from '../../services/projectService';

export default function SitemapPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [liveProjects, setLiveProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchProjects = async () => {
      try {
        const response = await projectService.searchProjects({ size: 50 });
        const list = response?.content || response?.data?.content || response || [];
        if (isMounted && Array.isArray(list)) {
          setLiveProjects(list);
        }
      } catch (err) {
        console.error('Error fetching sitemap projects:', err);
      } finally {
        if (isMounted) setLoadingProjects(false);
      }
    };
    fetchProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  // Static Directory Structure
  const sitemapSections = [
    {
      id: 'main-pages',
      title: 'Main & Corporate Pages',
      icon: Home,
      description: 'Core navigational pages and official portals of Keystone Realty Advisor.',
      links: [
        { title: 'Home Page', path: '/', badge: 'Primary' },
        { title: 'All Properties', path: '/properties', badge: 'Inventory' },
        { title: 'Real Estate Projects', path: '/projects', badge: 'Developments' },
        { title: 'Real Estate Advisory Services', path: '/advisory', badge: 'Services' },
        { title: 'Insights & Research Guides Hub', path: '/insights', badge: 'Knowledge' },
        { title: 'Semantic Entity Map & Knowledge Graph', path: '/entity-map', badge: 'Schema' },
        { title: 'Contact Us & Enquiries', path: '/contact', badge: 'Support' },
        { title: 'Terms & Conditions', path: '/terms', badge: 'Legal' },
        { title: 'Privacy Policy', path: '/privacy', badge: 'Governance' },
        { title: 'User Login Portal', path: '/login', badge: 'Account' },
        { title: 'Client Registration', path: '/register', badge: 'Join' },
      ],
    },
    {
      id: 'topical-guides',
      title: 'Topical Research Guides & Corridor Analyses',
      icon: BookOpen,
      description: 'Institutional research papers, corridor deep-dives, and RERA/NRI legal guides.',
      links: [
        { title: 'Dwarka Expressway Investment Guide', path: '/insights/dwarka-expressway-investment-guide', badge: 'Gurugram' },
        { title: 'Golf Course Extension Road Luxury Hub', path: '/insights/golf-course-extension-road-luxury-hub', badge: 'Gurugram' },
        { title: 'South Delhi Builder Floors vs Gurgaon Condos', path: '/insights/south-delhi-vs-gurgaon-luxury-living', badge: 'Delhi' },
        { title: 'Noida Expressway vs Yamuna Expressway', path: '/insights/noida-expressway-vs-yamuna-expressway-investment', badge: 'Noida' },
        { title: 'Haryana RERA (HRERA) Verification Guide', path: '/insights/hrera-gurugram-property-verification-guide', badge: 'Legal' },
        { title: 'NRI Real Estate Investment Guide (FEMA & Tax)', path: '/insights/nri-real-estate-investment-india-fema-tax', badge: 'NRI' },
      ],
    },
    {
      id: 'residential-subcategories',
      title: 'Residential Property Categories',
      icon: Building2,
      description: 'Handpicked residential asset classes and luxury living segments.',
      links: [
        { title: 'Flats & Apartments', path: '/properties?category=RESIDENTIAL_PROPERTY&type=FLATS_AND_APARTMENTS' },
        { title: 'Luxury Villas', path: '/properties?category=RESIDENTIAL_PROPERTY&type=VILLA' },
        { title: 'Builder Floors', path: '/properties?category=RESIDENTIAL_PROPERTY&type=BUILDER_FLOOR' },
        { title: 'Penthouses', path: '/properties?category=RESIDENTIAL_PROPERTY&type=PENTHOUSE' },
        { title: 'Independent Houses', path: '/properties?category=RESIDENTIAL_PROPERTY&type=INDEPENDENT_HOUSE' },
        { title: 'Residential Plots', path: '/properties?category=RESIDENTIAL_PROPERTY&type=RESIDENTIAL_PLOT' },
        { title: 'Studio Apartments', path: '/properties?category=RESIDENTIAL_PROPERTY&type=STUDIO_APARTMENTS' },
        { title: 'Farm Houses & Estates', path: '/properties?category=RESIDENTIAL_PROPERTY&type=FARM_HOUSE' },
      ],
    },
    {
      id: 'commercial-subcategories',
      title: 'Commercial Real Estate & Institutional Assets',
      icon: Building,
      description: 'High-yield commercial spaces, retail destinations, and industrial plots.',
      links: [
        { title: 'Grade-A Office Spaces', path: '/properties?category=COMMERCIAL_PROPERTY&type=OFFICE_SPACE' },
        { title: 'Commercial Shops & Retail Outlets', path: '/properties?category=COMMERCIAL_PROPERTY&type=COMMERCIAL_SHOPS' },
        { title: 'Commercial Showrooms', path: '/properties?category=COMMERCIAL_PROPERTY&type=SHOWROOMS' },
        { title: 'Business Centers', path: '/properties?category=COMMERCIAL_PROPERTY&type=BUSINESS_CENTER' },
        { title: 'Industrial Lands / Plots', path: '/properties?category=COMMERCIAL_PROPERTY&type=INDUSTRIAL_LAND_PLOT' },
        { title: 'Warehouses & Godowns', path: '/properties?category=COMMERCIAL_PROPERTY&type=WAREHOUSE_GODOWN' },
        { title: 'Commercial & Institutional Lands', path: '/properties?category=COMMERCIAL_PROPERTY&type=COMMERCIAL_LANDS_INST_LAND' },
        { title: 'Hotels & Restaurants', path: '/properties?category=COMMERCIAL_PROPERTY&type=HOTEL_RESTAURANT' },
        { title: 'Banquet Halls & Guest Houses', path: '/properties?category=COMMERCIAL_PROPERTY&type=BANQUET_HALL_GUEST_HOUSE' },
        { title: 'Factory / Industrial Buildings', path: '/properties?category=COMMERCIAL_PROPERTY&type=FACTORY_INDUSTRIAL_BUILDING' },
        { title: 'Agricultural / Farm Land', path: '/properties?category=COMMERCIAL_PROPERTY&type=AGRICULTURAL_FARM_LAND' },
      ],
    },
    {
      id: 'regional-portals',
      title: 'City Portals & Geographic Landing Pages',
      icon: MapPin,
      description: 'Targeted property discovery across prime micro-markets in Delhi NCR.',
      links: [
        { title: 'Properties in Gurugram (Gurgaon)', path: '/properties-in-gurugram', badge: 'Popular' },
        { title: 'Properties in Delhi', path: '/properties-in-delhi', badge: 'Capital' },
        { title: 'Properties in Noida', path: '/properties-in-noida', badge: 'Hub' },
        { title: 'Flats for Rent in Gurugram', path: '/flats-for-rent-in-gurugram', badge: 'Rental' },
        { title: 'Flats in Gurugram', path: '/flats-in-gurugram' },
        { title: 'Flats in Delhi', path: '/flats-in-delhi' },
        { title: 'Flats in Noida', path: '/flats-in-noida' },
      ],
    },
    {
      id: 'programmatic-seo',
      title: 'High-Intent Property Search Pages',
      icon: Layers,
      description: 'Quick links to configuration-specific and curated search corridors.',
      links: [
        { title: '2 BHK Flats in Gurgaon', path: '/2-bhk-flats-in-gurgaon' },
        { title: '3 BHK Flats in Gurgaon', path: '/3-bhk-flats-in-gurgaon' },
        { title: '4 BHK Flats in Gurgaon', path: '/4-bhk-flats-in-gurgaon' },
        { title: 'Luxury Villas in Gurgaon', path: '/luxury-villas-in-gurgaon' },
        { title: 'Luxury Villas in Delhi', path: '/luxury-villas-in-delhi' },
        { title: 'Builder Floors in Delhi', path: '/builder-floors-in-delhi' },
        { title: 'Builder Floors in Gurgaon', path: '/builder-floors-in-gurgaon' },
        { title: 'Commercial Properties in Gurgaon', path: '/commercial-properties-in-gurgaon' },
        { title: 'Commercial Properties in Delhi', path: '/commercial-properties-in-delhi' },
        { title: 'Flats for Sale in Gurugram', path: '/flats-for-sale-in-gurugram' },
        { title: 'Flats for Sale in Delhi', path: '/flats-for-sale-in-delhi' },
        { title: 'Flats for Sale in Noida', path: '/flats-for-sale-in-noida' },
        { title: 'Flats for Rent in Delhi', path: '/flats-for-rent-in-delhi' },
        { title: 'Flats for Rent in Noida', path: '/flats-for-rent-in-noida' },
      ],
    },
    {
      id: 'advisory-services',
      title: 'Advisory Practices & Strategic Services',
      icon: Briefcase,
      description: 'Institutional real estate advisory and consulting capabilities.',
      links: [
        { title: 'Residential Acquisition & Portfolio Advisory', path: '/advisory#residential' },
        { title: 'Commercial Leasing & Corporate Mandates', path: '/advisory#commercial' },
        { title: 'Institutional Land & Asset Valuation', path: '/advisory#valuation' },
        { title: 'NRI Property Investment Desk', path: '/advisory#nri' },
        { title: 'Legal & RERA Due Diligence Advisory', path: '/advisory#legal' },
      ],
    },
  ];

  // Filter sections based on search
  const normalizedQuery = searchTerm.toLowerCase().trim();

  const filteredSections = sitemapSections.map((section) => {
    const matchingLinks = section.links.filter(
      (link) =>
        link.title.toLowerCase().includes(normalizedQuery) ||
        link.path.toLowerCase().includes(normalizedQuery)
    );
    const sectionMatches =
      section.title.toLowerCase().includes(normalizedQuery) ||
      section.description.toLowerCase().includes(normalizedQuery);

    return {
      ...section,
      matches: sectionMatches || matchingLinks.length > 0,
      links: sectionMatches ? section.links : matchingLinks,
    };
  }).filter((section) => section.matches);

  const matchingLiveProjects = liveProjects.filter(
    (p) =>
      p.name?.toLowerCase().includes(normalizedQuery) ||
      p.developerName?.toLowerCase().includes(normalizedQuery) ||
      p.location?.toLowerCase().includes(normalizedQuery) ||
      p.city?.toLowerCase().includes(normalizedQuery)
  );

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - var(--header-height))', paddingBottom: '5rem' }}>
      <SEO
        title="HTML Sitemap | Keystone Realty Advisor - Website Directory"
        description="Comprehensive HTML sitemap and directory of Keystone Realty Advisor. Easily navigate through residential properties, commercial investments, advisory services, and verified developments across Delhi NCR."
        canonicalUrl="/sitemap"
        keywords="Keystone sitemap, HTML sitemap, real estate sitemap, Delhi NCR property directory, Gurugram real estate directory, Keystone Realty Advisor pages"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Sitemap', path: '/sitemap' },
        ]}
      />

      {/* Hero Banner */}
      <section
        style={{
          backgroundColor: 'var(--color-dark-950)',
          color: '#FFFFFF',
          padding: '4rem 0 3.5rem',
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
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(229, 192, 88, 0.08) 0%, rgba(15, 23, 42, 0) 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '840px' }}>
          {/* Breadcrumb Header */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--color-gold-400)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '0.75rem',
            }}
          >
            <Compass size={16} />
            <span>Website Architecture & Directory</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            HTML Sitemap
          </h1>

          <p style={{ fontSize: '1.0625rem', color: '#CBD5E1', lineHeight: 1.6, maxWidth: '700px', margin: '0 auto 2rem' }}>
            A complete navigational index of all verified properties, prime residential & commercial developments, regional portals, and real estate advisory services on Keystone Realty Advisor.
          </p>

          {/* Quick Real-Time Search Filter */}
          <div
            style={{
              maxWidth: '560px',
              margin: '0 auto',
              position: 'relative',
            }}
          >
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#94A3B8',
              }}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search sitemap (e.g., Gurgaon, Villas, Advisory, Office, Conscient)..."
              style={{
                width: '100%',
                padding: '0.875rem 1rem 0.875rem 2.875rem',
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
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{
                  position: 'absolute',
                  right: '1rem',
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

      {/* Main Sitemap Content Directory */}
      <div className="container" style={{ maxWidth: '1180px', marginTop: '3.5rem' }}>
        {/* Directory Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2rem',
          }}
        >
          {filteredSections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-lg, 12px)',
                  border: '1px solid var(--border-color, #E2E8F0)',
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                {/* Section Header */}
                <div
                  style={{
                    padding: '1.5rem 1.75rem',
                    borderBottom: '1px solid var(--border-color, #E2E8F0)',
                    backgroundColor: '#FAFAFC',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                  }}
                >
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
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <h2
                      style={{
                        fontSize: '1.125rem',
                        fontWeight: 700,
                        color: 'var(--text-primary, #0F172A)',
                        marginBottom: '0.25rem',
                        lineHeight: 1.3,
                      }}
                    >
                      {section.title}
                    </h2>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary, #64748B)', margin: 0, lineHeight: 1.4 }}>
                      {section.description}
                    </p>
                  </div>
                </div>

                {/* Section Links */}
                <div style={{ padding: '1.25rem 1.75rem', flex: 1 }}>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                    {section.links.map((link, idx) => (
                      <li key={idx}>
                        <Link
                          to={link.path}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.5rem 0.75rem',
                            borderRadius: '8px',
                            color: 'var(--text-primary, #1E293B)',
                            textDecoration: 'none',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            transition: 'all 0.15s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(229, 192, 88, 0.08)';
                            e.currentTarget.style.color = 'var(--color-gold-700, #B48C28)';
                            e.currentTarget.style.transform = 'translateX(4px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = 'var(--text-primary, #1E293B)';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <ChevronRight size={14} style={{ color: 'var(--color-gold-500, #D4AF37)', flexShrink: 0 }} />
                            <span>{link.title}</span>
                          </span>
                          {link.badge && (
                            <span
                              style={{
                                fontSize: '0.6875rem',
                                fontWeight: 600,
                                padding: '0.125rem 0.5rem',
                                borderRadius: '9999px',
                                backgroundColor: 'rgba(15, 23, 42, 0.06)',
                                color: '#475569',
                                textTransform: 'uppercase',
                                letterSpacing: '0.04em',
                              }}
                            >
                              {link.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Projects Section */}
        <div
          style={{
            marginTop: '3.5rem',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg, 12px)',
            border: '1px solid var(--border-color, #E2E8F0)',
            boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)',
            padding: '2.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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
                <Sparkles size={20} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary, #0F172A)', margin: 0 }}>
                  Active Developments & Verified Projects
                </h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary, #64748B)', margin: '0.25rem 0 0' }}>
                  Direct project links to prime institutional residential and commercial master-plans.
                </p>
              </div>
            </div>

            <Link
              to="/projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--color-gold-700, #B48C28)',
                textDecoration: 'none',
              }}
            >
              <span>View All Projects</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {loadingProjects ? (
            <div style={{ padding: '2rem 0', textAlign: 'center', color: '#94A3B8', fontSize: '0.875rem' }}>
              Loading verified real estate projects...
            </div>
          ) : matchingLiveProjects.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1rem',
              }}
            >
              {matchingLiveProjects.map((project) => {
                const projectUrl = project.slug ? `/projects/slug/${project.slug}` : `/projects/${project.id}`;
                return (
                  <Link
                    key={project.id}
                    to={projectUrl}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.875rem 1rem',
                      borderRadius: '8px',
                      backgroundColor: '#FAFAFC',
                      border: '1px solid #F1F5F9',
                      color: 'var(--text-primary, #0F172A)',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                      e.currentTarget.style.borderColor = 'var(--color-gold-400)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(229, 192, 88, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FAFAFC';
                      e.currentTarget.style.borderColor = '#F1F5F9';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div>
                      <div style={{ color: '#0F172A', fontWeight: 600 }}>{project.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 400, marginTop: '0.125rem' }}>
                        {project.location ? `${project.location}, ${project.city || 'Delhi NCR'}` : (project.city || 'Delhi NCR')}
                      </div>
                    </div>
                    <ChevronRight size={16} color="#94A3B8" />
                  </Link>
                );
              })}
            </div>
          ) : (
            <div style={{ padding: '2rem 0', textAlign: 'center', color: '#64748B', fontSize: '0.875rem' }}>
              No projects matched "{searchTerm}".
            </div>
          )}
        </div>

        {/* XML Sitemap & Webmaster Resource Card */}
        <div
          style={{
            marginTop: '3.5rem',
            padding: '2rem 2.5rem',
            backgroundColor: 'var(--color-dark-950, #0B1120)',
            borderRadius: 'var(--radius-lg, 12px)',
            border: '1px solid #1E293B',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div style={{ maxWidth: '650px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-gold-400)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
              <ShieldCheck size={14} />
              <span>Search Engine Indexation & Crawler Protocol</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', margin: '0 0 0.5rem' }}>
              XML Sitemaps for Search Engines
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#94A3B8', margin: 0, lineHeight: 1.6 }}>
              In addition to this human-navigable HTML Sitemap, Keystone Realty Advisor maintains live XML protocol feeds for Google Search Console, Bing Webmaster Tools, and automated indexation crawlers.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.25rem',
                borderRadius: '8px',
                backgroundColor: 'var(--color-gold-500, #D4AF37)',
                color: '#0F172A',
                fontWeight: 600,
                fontSize: '0.875rem',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E5C058')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#D4AF37')}
            >
              <span>View XML Sitemap</span>
              <ExternalLink size={14} />
            </a>

            <Link
              to="/contact"
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
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#334155')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1E293B')}
            >
              <span>Contact Advisory Desk</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
