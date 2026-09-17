import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, X, Check } from 'lucide-react';

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('keystone_cookie_consent');
      if (!consent) {
        // Show after a subtle 1s delay for smooth page load
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1000);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // Ignore localStorage access errors (e.g. in restricted iframe/browser)
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('keystone_cookie_consent', 'accepted');
    } catch (e) {}

    // Send Google Consent Mode v2 update to granted
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'analytics_storage': 'granted'
      });
    }

    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('keystone_cookie_consent', 'declined');
    } catch (e) {}

    // Send Google Consent Mode v2 update to denied
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied'
      });
    }

    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie and Privacy Consent"
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        maxWidth: '440px',
        width: 'calc(100% - 40px)',
        backgroundColor: 'rgba(11, 19, 43, 0.96)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(212, 175, 55, 0.35)',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.45)',
        padding: '1.25rem',
        zIndex: 9990,
        color: '#FFFFFF',
        animation: 'cookieSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
        {/* Icon */}
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            backgroundColor: 'rgba(212, 175, 55, 0.15)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            color: '#D4AF37',
            marginTop: '2px',
          }}
        >
          <ShieldCheck size={20} />
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
            <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, margin: 0, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
              We Value Your Privacy & Cookies
            </h4>
            <button
              type="button"
              onClick={handleDecline}
              aria-label="Close cookie banner"
              style={{
                background: 'none',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.15s ease',
              }}
            >
              <X size={16} />
            </button>
          </div>

          <p style={{ fontSize: '0.8125rem', color: '#CBD5E1', lineHeight: '1.45', margin: '0 0 0.875rem 0' }}>
            We use essential cookies and anonymous analytics to enhance your experience, analyze site performance, and offer personalized real estate advisory.{' '}
            <Link
              to="/privacy"
              style={{
                color: '#D4AF37',
                textDecoration: 'underline',
                fontWeight: 600,
              }}
            >
              Learn more
            </Link>
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleAccept}
              style={{
                flex: 1,
                minWidth: '120px',
                padding: '0.5rem 1rem',
                backgroundColor: '#D4AF37',
                color: '#0B132B',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.8125rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.375rem',
                boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)',
                transition: 'all 0.15s ease',
              }}
            >
              <Check size={14} strokeWidth={3} />
              <span>Accept All</span>
            </button>

            <button
              type="button"
              onClick={handleDecline}
              style={{
                padding: '0.5rem 0.875rem',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#E2E8F0',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              Necessary Only
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes cookieSlideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @media (max-width: 480px) {
          aside[aria-label="Cookie and Privacy Consent"] {
            bottom: 12px !important;
            left: 12px !important;
            width: calc(100% - 24px) !important;
            padding: 1rem !important;
          }
        }
      `}</style>
    </aside>
  );
}
