import React, { useRef } from 'react';
import { UploadCloud, Trash2, Star, Film, Video, Camera } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export default function ImageUploader({
  existingImages = [],
  onFilesSelected,
  onDeleteExisting,
  onSetPrimary,
  uploading = false,
  title = "Managed Media Assets"
}) {
  const fileInputRef = useRef(null);
  const { error } = useToast();

  const isVideoMedia = (item) => {
    if (!item) return false;
    if (item instanceof File) {
      return item.type?.startsWith('video/') || /\.(mp4|mov|webm|mkv|avi|m4v)$/i.test(item.name || '');
    }
    const url = item.imagePath || item.imageUrl || item.url || (typeof item === 'string' ? item : '');
    return /\.(mp4|mov|webm|mkv|avi|m4v)(\?.*)?$/i.test(url) || url.includes('/video/upload/');
  };

  const getMediaUrl = (img) => {
    if (!img) return '';
    if (typeof img === 'string') return img;
    return img.imagePath || img.imageUrl || img.url || '';
  };

  const validateAndFilterFiles = (rawFiles) => {
    const validImageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'avif'];
    const validVideoExtensions = ['mp4', 'mov', 'webm', 'mkv', 'avi', 'm4v'];
    const validFiles = [];
    let hasInvalid = false;

    for (const file of rawFiles) {
      const ext = file.name ? file.name.split('.').pop().toLowerCase() : '';
      const isImg = file.type.startsWith('image/') || validImageExtensions.includes(ext);
      const isVid = file.type.startsWith('video/') || validVideoExtensions.includes(ext);

      if (isImg || isVid) {
        validFiles.push(file);
      } else {
        hasInvalid = true;
      }
    }

    if (hasInvalid) {
      error('Unsupported file format. Please upload JPG, PNG, WEBP photos or MP4, MOV, WEBM videos.');
    }

    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndFilterFiles(Array.from(e.target.files));
      e.target.value = '';
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndFilterFiles(Array.from(e.dataTransfer.files));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Upload Dropzone */}
      <div
        style={{
          border: '2px dashed var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '2.25rem 1.5rem',
          textAlign: 'center',
          backgroundColor: 'var(--bg-secondary)',
          cursor: 'pointer',
          transition: 'border-color var(--transition-fast)',
        }}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*,.jpg,.jpeg,.png,.webp,.mp4,.mov,.webm,.mkv,.avi"
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
          Click to upload photos or videos, or drag & drop
        </p>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          JPG, PNG, WEBP photos or MP4, MOV, WEBM videos (up to 100MB each)
        </p>
      </div>

      {uploading && (
        <div style={{ fontSize: '0.875rem', color: 'var(--color-gold-600)', fontWeight: 500, textAlign: 'center' }}>
          Uploading and processing media assets...
        </div>
      )}

      {/* Existing Images / Videos Gallery List */}
      {existingImages && existingImages.length > 0 && (
        <div>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
            {title} ({existingImages.length})
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}>
            {existingImages.map((img) => {
              const isVideo = isVideoMedia(img);
              const mediaUrl = getMediaUrl(img);
              const isCoverOrPrimary = Boolean(img.isPrimary || img.isCover);

              return (
                <div
                  key={img.id || mediaUrl}
                  style={{
                    position: 'relative',
                    height: '110px',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    backgroundColor: '#0F172A',
                    border: isCoverOrPrimary ? '2px solid var(--color-gold-500)' : '1px solid var(--border-color)',
                  }}
                >
                  {isVideo ? (
                    <video
                      src={mediaUrl}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      muted
                      preload="metadata"
                      playsInline
                    />
                  ) : (
                    <img
                      src={mediaUrl}
                      alt="Media Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/keystone-logo.png';
                      }}
                    />
                  )}

                  {/* Video Type Badge */}
                  {isVideo && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '6px',
                        right: '6px',
                        backgroundColor: 'rgba(15, 23, 42, 0.8)',
                        color: '#FFFFFF',
                        fontSize: '0.625rem',
                        fontWeight: 600,
                        padding: '2px 5px',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px',
                      }}
                    >
                      <Film size={10} />
                      <span>Video</span>
                    </span>
                  )}

                  {/* Primary / Cover Badge */}
                  {isCoverOrPrimary && (
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
                      Cover
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
                    {!isCoverOrPrimary && onSetPrimary && !isVideo && (
                      <button
                        type="button"
                        onClick={() => onSetPrimary(img.id)}
                        title="Set as Cover Image"
                        style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}
                      >
                        <Star size={14} />
                      </button>
                    )}

                    {onDeleteExisting && (
                      <button
                        type="button"
                        onClick={() => onDeleteExisting(img.id)}
                        title="Delete Media"
                        style={{ background: 'none', border: 'none', color: '#F43F5E', cursor: 'pointer' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
