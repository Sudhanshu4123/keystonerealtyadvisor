import React, { useRef } from 'react';
import { UploadCloud, Trash2, Star, CheckCircle } from 'lucide-react';

export default function ImageUploader({
  existingImages = [],
  onFilesSelected,
  onDeleteExisting,
  onSetPrimary,
  uploading = false,
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(Array.from(e.target.files));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Upload Dropzone */}
      <div
        style={{
          border: '2px dashed var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '2.5rem 1.5rem',
          textAlign: 'center',
          backgroundColor: 'var(--bg-secondary)',
          cursor: 'pointer',
          transition: 'border-color var(--transition-fast)',
        }}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onFilesSelected(Array.from(e.dataTransfer.files));
          }
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.75rem',
            color: 'var(--color-gold-500)',
          }}
        >
          <UploadCloud size={24} />
        </div>
        <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
          Click to upload property images or drag and drop
        </p>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          JPG, JPEG, PNG, or WEBP up to 15MB each
        </p>
      </div>

      {uploading && (
        <div style={{ fontSize: '0.875rem', color: 'var(--color-gold-600)', fontWeight: 500, textAlign: 'center' }}>
          Uploading and processing image assets...
        </div>
      )}

      {/* Existing Images Gallery List */}
      {existingImages && existingImages.length > 0 && (
        <div>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
            Managed Property Images ({existingImages.length})
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}>
            {existingImages.map((img) => (
              <div
                key={img.id}
                style={{
                  position: 'relative',
                  height: '110px',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  border: img.isPrimary ? '2px solid var(--color-gold-500)' : '1px solid var(--border-color)',
                }}
              >
                <img
                  src={img.imagePath || img.imageUrl || img.url || (typeof img === 'string' ? img : '')}
                  alt="Property Preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/keystone-logo.png';
                  }}
                />

                {img.isPrimary && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '6px',
                      left: '6px',
                      backgroundColor: 'var(--color-gold-500)',
                      color: '#FFFFFF',
                      fontSize: '0.625rem',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: 'var(--radius-sm)',
                      textTransform: 'uppercase',
                    }}
                  >
                    Primary
                  </span>
                )}

                {/* Actions overlay */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(15, 23, 42, 0.85)',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                  }}
                >
                  {!img.isPrimary && onSetPrimary && (
                    <button
                      type="button"
                      onClick={() => onSetPrimary(img.id)}
                      title="Set as Primary Image"
                      style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}
                    >
                      <Star size={14} />
                    </button>
                  )}

                  {onDeleteExisting && (
                    <button
                      type="button"
                      onClick={() => onDeleteExisting(img.id)}
                      title="Delete Image"
                      style={{ background: 'none', border: 'none', color: '#F43F5E', cursor: 'pointer' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
