import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  BookOpen,
  Clock,
  MapPin,
  Calendar,
  User,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Share2,
  ShieldCheck,
  Building2,
  Phone,
  Mail,
  ExternalLink,
} from 'lucide-react';
import SEO from '../../components/common/SEO';
import { INSIGHTS_ARTICLES } from '../../data/insightsData';

export default function InsightDetailPage() {
  const { slug } = useParams();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const article = INSIGHTS_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/insights" replace />;
  }

  const relatedArticles = INSIGHTS_ARTICLES.filter(
    (a) => a.id !== article.id && (a.category === article.category || a.region === article.region)
  ).slice(0, 3);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Construct FAQ Schema
  const faqSchema = article.faqs && article.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  } : null;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.subtitle,
    author: {
      '@type': 'Organization',
      name: article.author || 'Keystone Realty Advisor',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Keystone Realty Advisor',
      logo: {
        '@type': 'ImageObject',
        url: 'https://keystonerealtyadvisor.com/keystone-logo.png',
      },
    },
    datePublished: '2026-10-01',
    dateModified: '2026-10-08',
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - var(--header-height))', paddingBottom: '5rem' }}>
      <SEO
        title={article.metaTitle || `${article.title} | Keystone Realty`}
        description={article.metaDescription || article.subtitle}
        keywords={article.keywords}
        canonicalUrl={`/insights/${article.slug}`}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Insights & Guides', path: '/insights' },
          { name: article.title, path: `/insights/${article.slug}` },
        ]}
        schema={[articleSchema, ...(faqSchema ? [faqSchema] : [])]}
      />

      {/* Hero Header */}
      <section
        style={{
          backgroundColor: 'var(--color-dark-950)',
          color: '#FFFFFF',
          padding: '4rem 0 3.5rem',
          borderBottom: '1px solid #1E293B',
          position: 'relative',
        }}
      >
        <div className="container" style={{ maxWidth: '920px' }}>
          {/* Back Link */}
          <div style={{ marginBottom: '1.5rem' }}>
            <Link
              to="/insights"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                color: 'var(--color-gold-400)',
                fontSize: '0.875rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to All Guides</span>
            </Link>
          </div>

          {/* Badges & Meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '0.25rem 0.75rem',
                borderRadius: '4px',
                backgroundColor: 'rgba(229, 192, 88, 0.2)',
                color: 'var(--color-gold-400)',
              }}
            >
              {article.categoryName}
            </span>

            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8125rem', color: '#94A3B8' }}>
              <MapPin size={14} color="var(--color-gold-400)" />
              <span>{article.regionName}</span>
            </span>

            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8125rem', color: '#94A3B8' }}>
              <Clock size={14} />
              <span>{article.readTime}</span>
            </span>
          </div>

          {/* Article Title */}
          <h1
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.2,
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
            }}
          >
            {article.title}
          </h1>

          <p style={{ fontSize: '1.125rem', color: '#CBD5E1', lineHeight: 1.6, margin: '0 0 1.5rem' }}>
            {article.subtitle}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.8125rem', color: '#64748B', borderTop: '1px solid #1E293B', paddingTop: '1.25rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <User size={14} />
              <span style={{ color: '#CBD5E1' }}>{article.author}</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Calendar size={14} />
              <span>Published {article.publishedDate}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="container" style={{ maxWidth: '920px', marginTop: '3.5rem' }}>
        {/* Key Takeaways Callout Card */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg, 12px)',
              border: '1px solid var(--border-color, #E2E8F0)',
              borderLeft: '5px solid var(--color-gold-500, #D4AF37)',
              padding: '2rem 2.25rem',
              boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
              marginBottom: '3rem',
            }}
          >
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={20} color="var(--color-gold-600, #B48C28)" />
              <span>Executive Summary & Key Takeaways</span>
            </h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {article.keyTakeaways.map((point, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.9375rem', color: '#334155', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--color-gold-600, #B48C28)', flexShrink: 0, marginTop: '3px' }} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Detailed Sections */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg, 12px)',
            border: '1px solid var(--border-color, #E2E8F0)',
            padding: '3rem',
            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
            marginBottom: '3.5rem',
          }}
        >
          {article.contentSections.map((section, idx) => (
            <div key={idx} style={{ marginBottom: idx === article.contentSections.length - 1 ? 0 : '2.5rem' }}>
              <h2
                style={{
                  fontSize: '1.375rem',
                  fontWeight: 700,
                  color: 'var(--text-primary, #0F172A)',
                  marginBottom: '1rem',
                  lineHeight: 1.3,
                }}
              >
                {section.heading}
              </h2>
              <div
                style={{
                  fontSize: '1rem',
                  color: '#334155',
                  lineHeight: 1.8,
                  whiteSpace: 'pre-line',
                }}
              >
                {section.body}
              </div>
              {idx !== article.contentSections.length - 1 && (
                <div style={{ borderTop: '1px solid #F1F5F9', marginTop: '2.5rem' }} />
              )}
            </div>
          ))}
        </div>

        {/* Interactive FAQ Section */}
        {article.faqs && article.faqs.length > 0 && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg, 12px)',
              border: '1px solid var(--border-color, #E2E8F0)',
              padding: '2.5rem',
              boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
              marginBottom: '3.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.5rem' }}>
              <HelpCircle size={22} color="var(--color-gold-600, #B48C28)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Frequently Asked Questions
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {article.faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    style={{
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '1.125rem 1.25rem',
                        backgroundColor: isOpen ? '#FAFAFC' : '#FFFFFF',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        cursor: 'pointer',
                        fontSize: '0.9375rem',
                        fontWeight: 600,
                        color: '#0F172A',
                      }}
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp size={18} color="var(--color-gold-600, #B48C28)" /> : <ChevronDown size={18} color="#94A3B8 motion" />}
                    </button>
                    {isOpen && (
                      <div
                        style={{
                          padding: '1rem 1.25rem 1.25rem',
                          backgroundColor: '#FAFAFC',
                          borderTop: '1px solid #F1F5F9',
                          fontSize: '0.9375rem',
                          color: '#475569',
                          lineHeight: 1.6,
                        }}
                      >
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Related Real Estate Routes & Deep Links */}
        {article.relatedLinks && article.relatedLinks.length > 0 && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg, 12px)',
              border: '1px solid var(--border-color, #E2E8F0)',
              padding: '2rem',
              boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
              marginBottom: '3.5rem',
            }}
          >
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
              Explore Related Properties & Regional Portals
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {article.relatedLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.path}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    color: 'var(--text-primary, #0F172A)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(229, 192, 88, 0.12)';
                    e.currentTarget.style.borderColor = 'var(--color-gold-400)';
                    e.currentTarget.style.color = 'var(--color-gold-700, #B48C28)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#F8FAFC';
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.color = 'var(--text-primary, #0F172A)';
                  }}
                >
                  <span>{link.title}</span>
                  <ExternalLink size={12} />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Advisory Consultation Form / CTA */}
        <div
          style={{
            padding: '2.5rem',
            backgroundColor: 'var(--color-dark-950)',
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
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gold-400)', marginBottom: '0.5rem' }}>
              Consult Real Estate Advisory
            </div>
            <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#FFFFFF', margin: '0 0 0.5rem' }}>
              Have questions regarding this corridor or project?
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#94A3B8', margin: 0 }}>
              Speak with a certified Keystone property advisor for impartial portfolio recommendations.
            </p>
          </div>

          <Link
            to="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.875rem 1.5rem',
              borderRadius: '8px',
              backgroundColor: 'var(--color-gold-500)',
              color: '#0F172A',
              fontWeight: 700,
              fontSize: '0.875rem',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E5C058')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-gold-500)')}
          >
            <span>Request Call Back</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
