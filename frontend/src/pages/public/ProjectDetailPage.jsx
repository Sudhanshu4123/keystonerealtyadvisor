import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Building2, MapPin, Calendar, ShieldCheck, CheckCircle2,
  FileText, Download, Play, Eye, Phone, Mail, ChevronRight,
  Layers, Sparkles, Compass, Shield, Maximize2, X, MessageCircle
} from 'lucide-react';
import projectService from '../../services/projectService';
import { enquiryService } from '../../services/enquiryService';
import { useToast } from '../../hooks/useToast';
import { useAuth } from '../../hooks/useAuth';
import Badge from '../../components/common/Badge';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import NoImagePlaceholder from '../../components/common/NoImagePlaceholder';
import Modal from '../../components/common/Modal';
import SEO from '../../components/common/SEO';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const { success, error, info } = useToast();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [lightboxImage, setLightboxImage] = useState(null);

  // Enquiry Modal State
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [submittingEnquiry, setSubmittingEnquiry] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    message: '',
  });

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const res = await projectService.getProjectById(id);
        const data = res?.data || res;
        setProject(data);
        if (data?.name) {
          document.title = `${data.name} | Keystone Realty Advisor`;
        }
      } catch (err) {
        error('Project details not found or project is not currently published.');
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    if (!enquiryForm.name || !enquiryForm.email || !enquiryForm.phone) {
      error('Please fill in your name, email, and contact phone number.');
      return;
    }

    setSubmittingEnquiry(true);
    try {
      const payload = {
        name: enquiryForm.name,
        email: enquiryForm.email,
        phone: enquiryForm.phone,
        message: enquiryForm.message || `Inquiry for project: ${project.name}`,
        propertyId: null, // Project-level inquiry
      };

      await enquiryService.createEnquiry(payload);
      success('Your consultation inquiry has been transmitted to Keystone Realty Advisor. Our senior associate will contact you shortly.');
      setEnquiryModalOpen(false);
      setEnquiryForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      error('Failed to submit consultation request. Please reach us at +91 9911956274.');
    } finally {
      setSubmittingEnquiry(false);
    }
  };

  const formatPrice = (min, max, priceType) => {
    if (!min && !max) return priceType || 'Price on Request';
    const formatValue = (num) => {
      if (!num) return '';
      if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
      if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);
    };

    if (min && max && min !== max) return `${formatValue(min)} - ${formatValue(max)}`;
    if (min) return `From ${formatValue(min)}`;
    if (max) return `Up to ${formatValue(max)}`;
    return priceType || 'Price on Request';
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh', padding: '3rem 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <LoadingSkeleton height="380px" borderRadius="12px" />
          <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <LoadingSkeleton height="40px" width="70%" />
              <LoadingSkeleton height="20px" width="40%" />
              <LoadingSkeleton height="150px" />
            </div>
            <LoadingSkeleton height="300px" />
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '500px' }}>
          <Building2 size={48} color="var(--color-gold-500)" style={{ margin: '0 auto 1.5rem auto' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>Project Not Found</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9375rem' }}>
            The requested real estate project is either unavailable or has not been published yet.
          </p>
          <Link to="/projects" className="btn btn-primary">
            Explore All Projects
          </Link>
        </div>
      </div>
    );
  }

  // Group Amenities by Category
  const amenitiesByCategory = (project.amenities || []).reduce((acc, item) => {
    const cat = item.category || 'OTHER';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  // Group Specifications by Category
  const specsByCategory = (project.specifications || []).reduce((acc, item) => {
    const cat = item.category || 'OTHER';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh', paddingBottom: '5rem' }}>
      <SEO
        title={`${project.name}${project.city ? ` in ${project.city}` : ''} | Keystone Realty Advisor`}
        description={
          project.shortDescription ||
          (project.description
            ? `${project.description.slice(0, 150)}... Contact Keystone Realty Advisor for verified master plans and booking assistance.`
            : `${project.name} by ${project.builderName || 'reputed developers'} located in ${project.locality ? `${project.locality}, ` : ''}${project.city || ''}. Verified floor plans, RERA compliance, and official pricing details.`)
        }
        keywords={`${project.name}, ${project.builderName || ''}, real estate projects in ${project.city || ''}, ${project.locality || ''}, buy flat in ${project.name}, Keystone Realty Advisor`}
        ogImage={project.coverImageUrl || project.galleryImages?.[0]?.imageUrl || '/keystone-logo.png'}
        geoPlacename={project.locality && project.city ? `${project.locality}, ${project.city}, India` : (project.city ? `${project.city}, India` : (project.locality ? `${project.locality}, India` : null))}
        locality={project.city || project.locality || null}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
          { name: project.name, path: `/projects/${project.id}` },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'RealEstateListing',
          name: project.name,
          description: project.description || project.name,
          url: window.location.href,
          image: project.coverImageUrl || 'https://keystonerealtyadvisor.com/keystone-logo.png',
          address: {
            '@type': 'PostalAddress',
            addressLocality: project.locality || project.city || '',
            addressRegion: project.state || '',
            addressCountry: 'IN'
          }
        }}
      />
      {/* 1. Breadcrumb & Navigation */}
      <div style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
        <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0.875rem 1.5rem', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={14} />
          <Link to="/projects" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Projects</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{project.name}</span>
        </div>
      </div>

      {/* 2. Hero Header Banner */}
      <div style={{ backgroundColor: '#0B0F19', color: '#FFFFFF', padding: '3.5rem 0 3rem 0', position: 'relative', overflow: 'hidden' }}>
        {project.coverImageUrl && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${project.coverImageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.18,
              filter: 'blur(8px)',
            }}
          />
        )}
        
        <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
            
            {/* Title & Metadata */}
            <div style={{ flex: '1 1 550px' }}>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <Badge variant="gold">{project.status?.replace(/_/g, ' ')}</Badge>
                <Badge variant="dark">{project.projectType?.replace(/_/g, ' ')}</Badge>
                {project.reraNumber && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', backgroundColor: 'rgba(194, 155, 56, 0.15)', border: '1px solid rgba(194, 155, 56, 0.4)', borderRadius: '4px', color: '#E5C065', fontSize: '0.75rem', fontWeight: 600 }}>
                    <ShieldCheck size={14} />
                    <span>RERA: {project.reraNumber}</span>
                  </span>
                )}
              </div>

              <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: '0 0 0.5rem 0', letterSpacing: '-0.02em', color: '#FFFFFF' }}>
                {project.name}
              </h1>

              {project.builderName && (
                <div style={{ fontSize: '1rem', color: '#94A3B8', marginBottom: '0.75rem' }}>
                  Developed by <strong style={{ color: '#F1F5F9' }}>{project.builderName}</strong>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#CBD5E1', fontSize: '0.9375rem' }}>
                <MapPin size={16} color="var(--color-gold-400)" style={{ flexShrink: 0 }} />
                <span>{project.address ? `${project.address}, ` : ''}{project.locality}, {project.city}, {project.state || ''}</span>
              </div>
            </div>

            {/* Price & Primary Consultation Box */}
            <div
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(194, 155, 56, 0.35)',
                borderRadius: '12px',
                padding: '1.75rem',
                minWidth: '280px',
                flex: '0 1 340px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pricing Overview</span>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-gold-400)', fontFamily: 'var(--font-display)', marginTop: '2px' }}>
                  {formatPrice(project.minPrice, project.maxPrice, project.priceType)}
                </div>
                {project.pricePerSqft && (
                  <div style={{ fontSize: '0.8125rem', color: '#94A3B8', marginTop: '2px' }}>
                    ₹{project.pricePerSqft.toLocaleString('en-IN')} / sq ft
                  </div>
                )}
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setEnquiryModalOpen(true)}
                style={{ width: '100%', justifyContent: 'center', padding: '0.875rem 1.25rem', fontSize: '0.9375rem' }}
              >
                Request Project Consultation
              </button>

              <a
                href={`https://wa.me/919911956274?text=${encodeURIComponent(`Hello Keystone Realty Advisor, I would like to inquire about the project: ${project.name}${project.locality || project.city ? ` located in ${project.locality ? `${project.locality}, ` : ''}${project.city || ''}` : ''}. Please share the brochure and current pricing.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '0.75rem 1.25rem',
                  fontSize: '0.9375rem',
                  backgroundColor: '#25D366',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <MessageCircle size={18} />
                <span>Chat on WhatsApp</span>
              </a>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', fontSize: '0.8125rem', color: '#CBD5E1', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.75rem' }}>
                <a href="tel:+919911956274" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#CBD5E1', textDecoration: 'none' }}>
                  <Phone size={14} color="var(--color-gold-400)" />
                  <span style={{ fontWeight: 600 }}>+91 9911956274</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Sticky Quick-Nav Tabs */}
      <div style={{ backgroundColor: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 0, zIndex: 20 }}>
        <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', gap: '1.5rem', overflowX: 'auto' }}>
          {[
            { id: 'overview', label: 'Overview' },
            ...(project.configurations?.length > 0 ? [{ id: 'configurations', label: `Configurations (${project.configurations.length})` }] : []),
            ...(project.amenities?.length > 0 ? [{ id: 'amenities', label: `Amenities (${project.amenities.length})` }] : []),
            ...(project.specifications?.length > 0 ? [{ id: 'specifications', label: `Specifications` }] : []),
            ...(project.highlights?.length > 0 ? [{ id: 'highlights', label: 'Highlights' }] : []),
            ...(project.images?.length > 0 ? [{ id: 'gallery', label: `Gallery (${project.images.length})` }] : []),
            ...(project.floorPlans?.length > 0 ? [{ id: 'floorplans', label: `Floor Plans (${project.floorPlans.length})` }] : []),
            { id: 'location', label: 'Location & Map' },
            ...(project.documents?.length > 0 ? [{ id: 'documents', label: `Documents (${project.documents.length})` }] : []),
            ...(project.videos?.length > 0 ? [{ id: 'videos', label: 'Video Tour' }] : []),
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                const el = document.getElementById(tab.id);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              style={{
                padding: '1rem 0.25rem',
                border: 'none',
                background: 'transparent',
                color: activeTab === tab.id ? 'var(--color-gold-600)' : 'var(--text-secondary)',
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontSize: '0.875rem',
                cursor: 'pointer',
                borderBottom: activeTab === tab.id ? '2px solid var(--color-gold-600)' : '2px solid transparent',
                whiteSpace: 'nowrap',
                transition: 'all 150ms ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Main Page Body Container */}
      <div className="container" style={{ maxWidth: '1240px', margin: '2.5rem auto 0 auto', padding: '0 1.5rem', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '2.5rem', alignItems: 'start' }}>
        
        {/* Left Column: Rich Detail Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          
          {/* Section: Overview */}
          <section id="overview" className="card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building2 size={20} color="var(--color-gold-500)" />
              <span>Project Overview</span>
            </h2>

            {/* Key Facts Matrix */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', padding: '1.25rem', backgroundColor: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Possession Date</span>
                <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
                  {project.possessionDate || 'Under Consultation'}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Launch Date</span>
                <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
                  {project.launchDate || 'Announced'}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Project Type</span>
                <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
                  {project.projectType?.replace(/_/g, ' ')}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Booking Amount</span>
                <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
                  {project.bookingAmount || 'On Request'}
                </div>
              </div>
            </div>

            {project.shortDescription && (
              <p style={{ fontSize: '1.0625rem', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                {project.shortDescription}
              </p>
            )}

            {project.description && (
              <div style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                {project.description}
              </div>
            )}
          </section>

          {/* Section: Configurations */}
          {project.configurations && project.configurations.length > 0 && (
            <section id="configurations" className="card" style={{ padding: '2rem' }}>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={20} color="var(--color-gold-500)" />
                <span>Available Configurations</span>
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                {project.configurations.map((cfg) => (
                  <div
                    key={cfg.id}
                    style={{
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      padding: '1.25rem',
                      backgroundColor: 'var(--bg-main)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <h4 style={{ fontSize: '1.0625rem', fontWeight: 700, margin: 0 }}>{cfg.name}</h4>
                      {cfg.availabilityStatus && (
                        <Badge variant="gold">{cfg.availabilityStatus}</Badge>
                      )}
                    </div>

                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
                      {cfg.bedrooms && <span><strong>{cfg.bedrooms}</strong> Beds</span>}
                      {cfg.bathrooms && <span><strong>{cfg.bathrooms}</strong> Baths</span>}
                      {cfg.area && <span><strong>{cfg.area}</strong> {cfg.areaUnit}</span>}
                    </div>

                    {cfg.price && (
                      <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-gold-600)', marginTop: 'auto', paddingTop: '0.5rem' }}>
                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(cfg.price)}
                      </div>
                    )}

                    {cfg.description && (
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>
                        {cfg.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section: Amenities */}
          {project.amenities && project.amenities.length > 0 && (
            <section id="amenities" className="card" style={{ padding: '2rem' }}>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={20} color="var(--color-gold-500)" />
                <span>Project Amenities & Lifestyle</span>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {Object.entries(amenitiesByCategory).map(([category, items]) => (
                  <div key={category}>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-gold-600)', marginBottom: '0.75rem' }}>
                      {category.replace(/_/g, ' ')}
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
                      {items.map((amenity) => (
                        <div
                          key={amenity.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '0.625rem 0.875rem',
                            backgroundColor: 'var(--bg-main)',
                            borderRadius: '6px',
                            border: '1px solid var(--border-color)',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            color: 'var(--text-primary)',
                          }}
                        >
                          <CheckCircle2 size={15} color="var(--color-gold-500)" style={{ flexShrink: 0 }} />
                          <span>{amenity.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section: Specifications */}
          {project.specifications && project.specifications.length > 0 && (
            <section id="specifications" className="card" style={{ padding: '2rem' }}>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Compass size={20} color="var(--color-gold-500)" />
                <span>Technical Specifications</span>
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {Object.entries(specsByCategory).map(([category, items]) => (
                  <div
                    key={category}
                    style={{
                      padding: '1.25rem',
                      backgroundColor: 'var(--bg-main)',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <h3 style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-gold-600)', marginBottom: '0.75rem' }}>
                      {category.replace(/_/g, ' ')}
                    </h3>
                    <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      {items.map((spec) => (
                        <li key={spec.id}>
                          <strong style={{ color: 'var(--text-primary)' }}>{spec.title}: </strong>
                          {spec.details}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section: Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <section id="highlights" className="card" style={{ padding: '2rem' }}>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={20} color="var(--color-gold-500)" />
                <span>Key Project Highlights</span>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {project.highlights.map((hl) => (
                  <div
                    key={hl.id}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '1rem',
                      backgroundColor: 'var(--bg-main)',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <CheckCircle2 size={18} color="var(--color-gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, margin: '0 0 2px 0', color: 'var(--text-primary)' }}>
                        {hl.title}
                      </h4>
                      {hl.description && (
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0 }}>
                          {hl.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section: Gallery */}
          {project.images && project.images.length > 0 && (
            <section id="gallery" className="card" style={{ padding: '2rem' }}>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Eye size={20} color="var(--color-gold-500)" />
                <span>Media & Architectural Gallery</span>
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
                {project.images.map((img) => (
                  <div
                    key={img.id}
                    onClick={() => setLightboxImage(img.imageUrl)}
                    style={{
                      height: '180px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      position: 'relative',
                      cursor: 'pointer',
                      border: '1px solid var(--border-color)',
                      backgroundColor: '#0B0F19',
                    }}
                  >
                    <img
                      src={img.imageUrl}
                      alt={img.caption || project.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 300ms ease' }}
                      onMouseEnter={(e) => (e.target.style.transform = 'scale(1.06)')}
                      onMouseLeave={(e) => (e.target.style.transform = 'scale(1.0)')}
                    />
                    {img.imageType && img.imageType !== 'GALLERY' && (
                      <span style={{ position: 'absolute', bottom: '8px', left: '8px', padding: '2px 6px', backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: '4px', fontSize: '0.6875rem', color: '#FFF' }}>
                        {img.imageType.replace(/_/g, ' ')}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section: Floor Plans */}
          {project.floorPlans && project.floorPlans.length > 0 && (
            <section id="floorplans" className="card" style={{ padding: '2rem' }}>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={20} color="var(--color-gold-500)" />
                <span>Floor Plans & Unit Layouts</span>
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                {project.floorPlans.map((fp) => (
                  <div
                    key={fp.id}
                    style={{
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      backgroundColor: 'var(--bg-main)',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {fp.imageUrl ? (
                      <div
                        onClick={() => setLightboxImage(fp.imageUrl)}
                        style={{ height: '200px', cursor: 'pointer', overflow: 'hidden', backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--border-color)' }}
                      >
                        <img
                          src={fp.imageUrl}
                          alt={fp.title}
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      </div>
                    ) : (
                      <div style={{ height: '160px', backgroundColor: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                        Plan document available below
                      </div>
                    )}

                    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, margin: 0 }}>{fp.title}</h4>
                      {fp.area && (
                        <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                          Area: <strong>{fp.area} {fp.areaUnit}</strong>
                        </div>
                      )}
                      {fp.description && (
                        <p style={{ fontSize: '0.78125rem', color: 'var(--text-muted)', margin: 0 }}>
                          {fp.description}
                        </p>
                      )}
                      {fp.documentUrl && (
                        <a
                          href={fp.documentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary"
                          style={{ marginTop: '0.5rem', padding: '0.375rem 0.75rem', fontSize: '0.75rem', justifyContent: 'center' }}
                        >
                          <Download size={13} />
                          <span>Download Layout Document</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section: Location & Map */}
          <section id="location" className="card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={20} color="var(--color-gold-500)" />
              <span>Location & Connectivity</span>
            </h2>

            <div style={{ marginBottom: '1.25rem', fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
              <strong>Address: </strong>
              {project.address ? `${project.address}, ` : ''}{project.locality}, {project.city}, {project.state || ''} {project.pincode ? `- ${project.pincode}` : ''}
            </div>

            {project.latitude && project.longitude ? (
              <div style={{ height: '320px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                <iframe
                  title="Project Location Map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://maps.google.com/maps?q=${project.latitude},${project.longitude}&hl=en&z=14&output=embed`}
                  allowFullScreen
                />
              </div>
            ) : project.mapUrl ? (
              <div style={{ marginTop: '1rem' }}>
                <a
                  href={project.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <MapPin size={15} />
                  <span>Open Location in Google Maps</span>
                </a>
              </div>
            ) : (
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: '6px', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Precise GPS coordinates are available upon consultation with your Keystone advisor.
              </div>
            )}
          </section>

          {/* Section: Documents Vault */}
          {project.documents && project.documents.length > 0 && (
            <section id="documents" className="card" style={{ padding: '2rem' }}>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={20} color="var(--color-gold-500)" />
                <span>Official Project Documentation</span>
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                {project.documents.map((doc) => (
                  <div
                    key={doc.id}
                    style={{
                      padding: '1rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-main)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.75rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                      <FileText size={24} color="var(--color-gold-500)" style={{ flexShrink: 0 }} />
                      <div style={{ overflow: 'hidden' }}>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {doc.documentName}
                        </div>
                        <div style={{ fontSize: '0.71875rem', color: 'var(--text-muted)' }}>
                          {doc.documentType?.replace(/_/g, ' ')} {doc.fileSize ? `• ${formatFileSize(doc.fileSize)}` : ''}
                        </div>
                      </div>
                    </div>

                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                      style={{ padding: '0.375rem 0.625rem', flexShrink: 0 }}
                      title="Download document"
                    >
                      <Download size={14} />
                    </a>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section: Video Tour */}
          {project.videos && project.videos.length > 0 && (
            <section id="videos" className="card" style={{ padding: '2rem' }}>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Play size={20} color="var(--color-gold-500)" />
                <span>Project Video Tour</span>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {project.videos.map((vid) => {
                  // Safe YouTube embed parsing
                  let embedUrl = vid.videoUrl;
                  if (embedUrl.includes('youtube.com/watch?v=')) {
                    embedUrl = embedUrl.replace('watch?v=', 'embed/');
                  } else if (embedUrl.includes('youtu.be/')) {
                    embedUrl = embedUrl.replace('youtu.be/', 'www.youtube.com/embed/');
                  }

                  return (
                    <div key={vid.id}>
                      <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.5rem' }}>{vid.title}</h4>
                      <div style={{ height: '360px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#000' }}>
                        <iframe
                          title={vid.title}
                          src={embedUrl}
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

        </div>

        {/* Right Column: Sticky Advisory Desk Box */}
        <aside style={{ position: 'sticky', top: '5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="card" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Keystone Advisory Desk
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              Direct consultation, institutional floor plan review, and verified pricing insights for <strong>{project.name}</strong>.
            </p>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setEnquiryModalOpen(true)}
              style={{ width: '100%', justifyContent: 'center', marginBottom: '1rem', padding: '0.75rem' }}
            >
              Request Site Visit / Brochure
            </button>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8125rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={15} color="var(--color-gold-500)" />
                <a href="tel:+919911956274" style={{ color: 'var(--text-primary)', fontWeight: 600, textDecoration: 'none' }}>
                  +91 9911956274
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={15} color="var(--color-gold-500)" />
                <a href="mailto:keystonerealtyhepldesk@gmail.com" style={{ color: 'var(--text-secondary)', textDecoration: 'none', wordBreak: 'break-all' }}>
                  keystonerealtyhepldesk@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* RERA Certification Note */}
          {project.reraNumber && (
            <div className="card" style={{ padding: '1.25rem', backgroundColor: 'rgba(194, 155, 56, 0.04)', border: '1px solid rgba(194, 155, 56, 0.25)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-gold-600)', fontWeight: 700, fontSize: '0.8125rem', marginBottom: '0.25rem' }}>
                <ShieldCheck size={16} />
                <span>RERA Compliant Development</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                Registered under Real Estate Regulatory Authority with registration number: <strong>{project.reraNumber}</strong>.
              </p>
            </div>
          )}

        </aside>
      </div>

      {/* Lightbox Modal for Images/Floor Plans */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.92)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'transparent',
              border: 'none',
              color: '#FFF',
              cursor: 'pointer',
            }}
          >
            <X size={28} />
          </button>
          <img
            src={lightboxImage}
            alt="Enlarged view"
            style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: '4px' }}
          />
        </div>
      )}

      {/* Direct Consultation Enquiry Modal */}
      <Modal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        title={`Inquire about ${project.name}`}
      >
        <form onSubmit={handleEnquirySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
            Connect with our advisory team for private pricing, availability details, or to book an exclusive site visit.
          </p>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
              Full Name *
            </label>
            <input
              type="text"
              required
              className="input-field"
              placeholder="e.g. Rahul Sharma"
              value={enquiryForm.name}
              onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
              Email Address *
            </label>
            <input
              type="email"
              required
              className="input-field"
              placeholder="e.g. rahul@example.com"
              value={enquiryForm.email}
              onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
              Contact Phone Number *
            </label>
            <input
              type="tel"
              required
              className="input-field"
              placeholder="e.g. +91 9876543210"
              value={enquiryForm.phone}
              onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
              Message / Specific Requirements
            </label>
            <textarea
              rows={3}
              className="input-field"
              placeholder="Please specify unit size preference, budget, or preferred site visit dates..."
              value={enquiryForm.message}
              onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', justifyContent: 'flex-end' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setEnquiryModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submittingEnquiry}
            >
              {submittingEnquiry ? 'Transmitting...' : 'Submit Consultation Request'}
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
