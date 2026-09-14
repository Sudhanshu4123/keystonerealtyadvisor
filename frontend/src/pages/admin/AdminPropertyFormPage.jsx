import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { propertyService } from '../../services/propertyService';
import { useToast } from '../../hooks/useToast';
import ImageUploader from '../../components/admin/ImageUploader';
import { ArrowLeft, Save, Building2 } from 'lucide-react';

export default function AdminPropertyFormPage() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { success, error } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    area: '',
    bathrooms: '1',
    bedrooms: '1',
    city: '',
    location: '',
    price: '',
    propertyType: 'APARTMENT',
    listingType: 'SALE',
    furnished: 'UNFURNISHED',
    status: 'AVAILABLE',
  });

  const [existingImages, setExistingImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      async function loadProperty() {
        setLoading(true);
        try {
          const res = await propertyService.getPropertyById(id);
          if (res.success && res.data) {
            const p = res.data;
            setFormData({
              title: p.title || '',
              description: p.description || '',
              area: p.area || '',
              bathrooms: String(p.bathrooms || 1),
              bedrooms: String(p.bedrooms || 1),
              city: p.city || '',
              location: p.location || '',
              price: String(p.price || ''),
              propertyType: p.propertyType || 'APARTMENT',
              listingType: p.listingType || 'SALE',
              furnished: p.furnished || 'UNFURNISHED',
              status: p.status || 'AVAILABLE',
            });
            setExistingImages(p.images || []);
          }
        } catch (err) {
          error('Failed to load property data.');
        } finally {
          setLoading(false);
        }
      }
      loadProperty();
    }
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.city || !formData.location || !formData.price || !formData.area) {
      error('Please fill in all required property fields.');
      return;
    }

    const payload = {
      ...formData,
      price: Number(formData.price),
      area: Number(formData.area),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
    };

    setSubmitting(true);
    try {
      let propertyId = id;

      if (isEditMode) {
        await propertyService.updateProperty(id, payload);
        success('Property updated successfully.');
      } else {
        const res = await propertyService.createProperty(payload);
        if (res.success && res.data) {
          propertyId = res.data.id;
          success('Property created successfully.');
        }
      }

      // Upload selected files if any
      if (selectedFiles.length > 0 && propertyId) {
        setUploadingImages(true);
        try {
          await propertyService.uploadImages(propertyId, selectedFiles);
          success('Images uploaded successfully.');
        } catch (imgErr) {
          error('Property saved, but some images failed to upload.');
        }
      }

      navigate('/admin/properties');
    } catch (err) {
      error(err.message || 'Failed to save property.');
    } finally {
      setSubmitting(false);
      setUploadingImages(false);
    }
  };

  const handleDeleteImage = async (imageId) => {
    if (!id) return;
    try {
      await propertyService.deleteImage(id, imageId);
      setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
      success('Image deleted.');
    } catch (err) {
      error('Failed to delete image.');
    }
  };

  const handleSetPrimaryImage = async (imageId) => {
    if (!id) return;
    try {
      await propertyService.setPrimaryImage(id, imageId);
      setExistingImages((prev) =>
        prev.map((img) => ({
          ...img,
          isPrimary: img.id === imageId,
        }))
      );
      success('Primary image updated.');
    } catch (err) {
      error('Failed to set primary image.');
    }
  };

  if (loading) {
    return (
      <div className="card" style={{ padding: '3rem', textAlign: 'center', backgroundColor: '#FFFFFF' }}>
        <p style={{ color: 'var(--text-muted)' }}>Loading property information...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Back button */}
      <div>
        <Link to="/admin/properties" className="btn btn-ghost btn-sm" style={{ paddingLeft: 0, gap: '0.375rem' }}>
          <ArrowLeft size={16} />
          <span>Back to property list</span>
        </Link>
      </div>

      <div className="card" style={{ padding: '2.5rem', backgroundColor: '#FFFFFF' }}>
        <div style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>
            {isEditMode ? `Edit Property: ${formData.title || `#${id}`}` : 'Create New Real Estate Listing'}
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Enter verified property specifications, pricing, location data, and upload authorized images.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Section 1: Basic info */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }} className="form-subgrid">
            <div className="form-group">
              <label className="form-label" htmlFor="prop-title">Property Title *</label>
              <input
                id="prop-title"
                type="text"
                required
                className="form-control"
                placeholder="e.g. The Sovereign Penthouse, Central Tower"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="prop-price">Price (USD) *</label>
              <input
                id="prop-price"
                type="number"
                required
                min="1"
                step="any"
                className="form-control"
                placeholder="e.g. 2500000"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
          </div>

          {/* Section 2: Types & Status */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '0.5rem' }} className="form-quadgrid">
            <div className="form-group">
              <label className="form-label" htmlFor="prop-type">Property Type *</label>
              <select
                id="prop-type"
                className="form-control"
                value={formData.propertyType}
                onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
              >
                <option value="APARTMENT">Apartment</option>
                <option value="VILLA">Villa</option>
                <option value="PENTHOUSE">Penthouse</option>
                <option value="TOWNHOUSE">Townhouse</option>
                <option value="ESTATE">Estate</option>
                <option value="COMMERCIAL">Commercial</option>
                <option value="OFFICE">Office</option>
                <option value="LAND">Land</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="prop-listing">Listing Type *</label>
              <select
                id="prop-listing"
                className="form-control"
                value={formData.listingType}
                onChange={(e) => setFormData({ ...formData, listingType: e.target.value })}
              >
                <option value="SALE">For Sale</option>
                <option value="RENT">For Rent</option>
                <option value="LEASE">Commercial Lease</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="prop-furnishing">Furnished Status</label>
              <select
                id="prop-furnishing"
                className="form-control"
                value={formData.furnished}
                onChange={(e) => setFormData({ ...formData, furnished: e.target.value })}
              >
                <option value="UNFURNISHED">Unfurnished</option>
                <option value="SEMI_FURNISHED">Semi Furnished</option>
                <option value="FULLY_FURNISHED">Fully Furnished</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="prop-status">Listing Status</label>
              <select
                id="prop-status"
                className="form-control"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="AVAILABLE">Available</option>
                <option value="UNDER_OFFER">Under Offer</option>
                <option value="SOLD">Sold</option>
                <option value="RENTED">Rented</option>
                <option value="OFF_MARKET">Off Market</option>
              </select>
            </div>
          </div>

          {/* Section 3: Location */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }} className="form-subgrid">
            <div className="form-group">
              <label className="form-label" htmlFor="prop-location">Location / Street Address *</label>
              <input
                id="prop-location"
                type="text"
                required
                className="form-control"
                placeholder="e.g. 500 Park Avenue, Upper East Side"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="prop-city">City *</label>
              <input
                id="prop-city"
                type="text"
                required
                className="form-control"
                placeholder="e.g. New York"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
          </div>

          {/* Section 4: Specifications */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '0.5rem' }} className="form-triplegrid">
            <div className="form-group">
              <label className="form-label" htmlFor="prop-area">Area (sq ft) *</label>
              <input
                id="prop-area"
                type="number"
                required
                min="1"
                step="any"
                className="form-control"
                placeholder="e.g. 3500"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="prop-beds">Bedrooms</label>
              <input
                id="prop-beds"
                type="number"
                required
                min="0"
                className="form-control"
                value={formData.bedrooms}
                onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="prop-baths">Bathrooms</label>
              <input
                id="prop-baths"
                type="number"
                required
                min="0"
                className="form-control"
                value={formData.bathrooms}
                onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
              />
            </div>
          </div>

          {/* Section 5: Description */}
          <div className="form-group" style={{ marginTop: '0.5rem' }}>
            <label className="form-label" htmlFor="prop-desc">Full Property Description</label>
            <textarea
              id="prop-desc"
              rows={6}
              className="form-control"
              placeholder="Provide comprehensive details regarding architectural features, finishes, panoramic views, parking, and building amenities..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Section 6: Image Upload Management */}
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Property Image Assets
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              Upload authentic images captured for this property. Selected files will be saved and linked directly to this property record.
            </p>

            <ImageUploader
              existingImages={existingImages}
              onFilesSelected={(files) => setSelectedFiles(files)}
              onDeleteExisting={handleDeleteImage}
              onSetPrimary={handleSetPrimaryImage}
              uploading={uploadingImages}
            />

            {selectedFiles.length > 0 && (
              <div style={{ marginTop: '0.75rem', fontSize: '0.8125rem', color: 'var(--color-gold-600)', fontWeight: 600 }}>
                {selectedFiles.length} new image{selectedFiles.length > 1 ? 's' : ''} staged for upload upon saving.
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
            <Link to="/admin/properties" className="btn btn-ghost" disabled={submitting}>
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary btn-lg" disabled={submitting}>
              <Save size={18} />
              <span>{submitting ? 'Saving Record...' : isEditMode ? 'Update Property' : 'Create Property'}</span>
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .form-subgrid, .form-quadgrid, .form-triplegrid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
