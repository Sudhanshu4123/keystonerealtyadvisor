import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

export default function ImageGallery({ images = [], title = 'Property Image' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const getImgSrc = (img) => {
    if (!img) return '';
    if (typeof img === 'string') return img;
    return img.imagePath || img.imageUrl || img.url || '';
  };

  const validImages = Array.isArray(images)
    ? images.filter((img) => Boolean(getImgSrc(img)))
    : [];

  // If no images were uploaded, don't render anything (no default/placeholder images)
  if (validImages.length === 0) {
    return null;
  }

  const currentImage = validImages[currentIndex] || validImages[0];
  const currentSrc = getImgSrc(currentImage);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div>
      {/* Main Image Container */}
      <div
        style={{
          position: 'relative',
          height: '460px',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          backgroundColor: '#0B0F19',
          cursor: 'pointer',
        }}
        onClick={() => setLightboxOpen(true)}
      >
        <img
          src={currentSrc}
          alt={`${title} - View ${currentIndex + 1}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Fullscreen Trigger */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setLightboxOpen(true);
          }}
          className="btn btn-dark btn-sm"
          style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            gap: '0.375rem',
            backgroundColor: 'rgba(11, 15, 25, 0.8)',
            backdropFilter: 'blur(4px)',
          }}
          aria-label="Open Fullscreen Gallery"
        >
          <Maximize2 size={15} />
          <span>View Gallery ({validImages.length})</span>
        </button>

        {/* Carousel Navigation Arrows */}
        {validImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              style={{
                position: 'absolute',
                top: '50%',
                left: '16px',
                transform: 'translateY(-50%)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(11, 15, 25, 0.75)',
                color: '#FFFFFF',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              style={{
                position: 'absolute',
                top: '50%',
                right: '16px',
                transform: 'translateY(-50%)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(11, 15, 25, 0.75)',
                color: '#FFFFFF',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              aria-label="Next image"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {validImages.length > 1 && (
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            marginTop: '1rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
          }}
        >
          {validImages.map((img, idx) => {
            const thumbSrc = getImgSrc(img);
            return (
              <button
                key={img.id || idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                style={{
                  width: '84px',
                  height: '64px',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  border: idx === currentIndex ? '2px solid var(--color-gold-500)' : '2px solid transparent',
                  opacity: idx === currentIndex ? 1 : 0.65,
                  flexShrink: 0,
                  cursor: 'pointer',
                  padding: 0,
                  background: 'none',
                }}
              >
                <img
                  src={thumbSrc}
                  alt={`Thumbnail ${idx + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            zIndex: 3000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              background: 'none',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
            }}
            aria-label="Close Lightbox"
          >
            <X size={32} />
          </button>

          <img
            src={currentSrc}
            alt={title}
            style={{
              maxWidth: '90vw',
              maxHeight: '80vh',
              objectFit: 'contain',
              borderRadius: 'var(--radius-sm)',
            }}
            onClick={(e) => e.stopPropagation()}
          />

          <div style={{ marginTop: '1.25rem', color: '#94A3B8', fontSize: '0.875rem' }}>
            {currentIndex + 1} of {validImages.length}
          </div>
        </div>
      )}
    </div>
  );
}
