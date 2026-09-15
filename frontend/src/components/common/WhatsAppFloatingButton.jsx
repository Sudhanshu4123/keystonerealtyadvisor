import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

/**
 * WhatsApp Floating Instant Contact Component
 * Direct conversion booster for mobile & desktop real estate visitors
 */
export default function WhatsAppFloatingButton({
  phoneNumber = '919911956274',
  defaultMessage = 'Hello Keystone Realty Advisor, I would like to inquire about property advisory and available listings.',
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
      }}
    >
      {/* Tooltip Popup */}
      {showTooltip && (
        <div
          style={{
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            padding: '0.625rem 1rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
            fontSize: '0.8125rem',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            border: '1px solid rgba(194, 155, 56, 0.4)',
            animation: 'fadeIn 0.2s ease-in-out',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span>Chat with Senior Advisor</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
            }}
            aria-label="Close tooltip"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        aria-label="Chat with Keystone Realty Advisor on WhatsApp"
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.45)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          border: '2px solid rgba(255, 255, 255, 0.85)',
          textDecoration: 'none',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.08) translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 12px 28px rgba(37, 211, 102, 0.6)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1) translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 211, 102, 0.45)';
        }}
      >
        <MessageCircle size={30} fill="#FFFFFF" color="#25D366" />
      </a>
    </div>
  );
}
