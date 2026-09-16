import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { propertyService } from '../../services/propertyService';
import { useToast } from '../../hooks/useToast';
import ImageUploader from '../../components/admin/ImageUploader';
import FurnishingModal from '../../components/admin/FurnishingModal';
import {
  ArrowLeft, Save, Building2, Home, Layers, CheckCircle2,
  Plus, Check, Sparkles, MapPin, IndianRupee, ShieldCheck, Car, Key, FileText, Camera, Sliders
} from 'lucide-react';

const COMMON_AMENITIES = [
  'Lift', 'Power Backup', '24x7 Security', 'CCTV Surveillance',
  'Gated Society', 'Reserved Parking', 'Visitor Parking', 'Gymnasium',
  'Club House', 'Swimming Pool', 'Park / Garden', 'Children Play Area',
  'Gas Pipeline', 'Water Storage', 'Intercom Facility', 'Fire Safety',
  'Maintenance Staff', 'Rain Water Harvesting', 'Waste Disposal'
];

export default function AdminPropertyFormPage() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { success, error } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyCategory: 'Residential', // 'Residential' | 'Commercial'
    listingType: 'RENT', // 'RENT' | 'SALE' | 'PG_CO_LIVING'
    propertyType: 'APARTMENT',
    societyName: '',
    city: 'Gurgaon',
    location: '',
    builtUpArea: '',
    carpetArea: '',
    propertyAge: '1-5 Years',
    bedrooms: '3',
    bathrooms: '3',
    balconies: '3',
    floorNo: '3',
    totalFloors: '10',
    furnished: 'FULLY_FURNISHED',
    coveredParking: '1',
    openParking: '1',
    preferredTenant: 'Family',
    petFriendly: false,
    price: '',
    availableFrom: 'Immediate',
    maintenanceCharges: 'Include in rent',
    maintenanceAmount: '',
    securityDeposit: '2 month',
    securityDepositCustom: '',
    lockInPeriod: '6 month',
    brokerage: 'None',
    status: 'AVAILABLE',
    amenities: ['Lift', '24x7 Security', 'Power Backup', 'Gated Society', 'Reserved Parking'],
    furnishingDetails: '',
  });

  const [existingImages, setExistingImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [showMoreBhk, setShowMoreBhk] = useState(false);
  const [isFurnishModalOpen, setIsFurnishModalOpen] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      async function loadProperty() {
        setLoading(true);
        try {
          const res = await propertyService.getPropertyById(id);
          if (res.success && res.data) {
            const p = res.data;
            let loadedAmenities = [];
            if (p.amenities) {
              try {
                loadedAmenities = JSON.parse(p.amenities);
              } catch (e) {
                loadedAmenities = p.amenities.split(',').map((s) => s.trim()).filter(Boolean);
              }
            }

            setFormData({
              title: p.title || '',
              description: p.description || '',
              propertyCategory: p.propertyCategory || 'Residential',
              listingType: p.listingType || 'RENT',
              propertyType: p.propertyType || 'APARTMENT',
              societyName: p.societyName || '',
              city: p.city || 'Gurgaon',
              location: p.location || '',
              builtUpArea: p.builtUpArea || p.area || '',
              carpetArea: p.carpetArea || '',
              propertyAge: p.propertyAge || '1-5 Years',
              bedrooms: String(p.bedrooms || 3),
              bathrooms: String(p.bathrooms || 3),
              balconies: String(p.balconies || 1),
              floorNo: p.floorNo || '1',
              totalFloors: String(p.totalFloors || 4),
              furnished: p.furnished || 'FULLY_FURNISHED',
              coveredParking: String(p.coveredParking || 1),
              openParking: String(p.openParking || 1),
              preferredTenant: p.preferredTenant || 'Family',
              petFriendly: Boolean(p.petFriendly),
              price: String(p.price || ''),
              availableFrom: p.availableFrom || 'Immediate',
              maintenanceCharges: p.maintenanceCharges?.startsWith('Separate') ? 'Separate' : (p.maintenanceCharges || 'Include in rent'),
              maintenanceAmount: p.maintenanceCharges?.startsWith('Separate') ? p.maintenanceCharges.replace('Separate: ', '') : '',
              securityDeposit: ['None', '1 month', '2 month'].includes(p.securityDeposit) ? p.securityDeposit : (p.securityDeposit ? 'Custom' : '2 month'),
              securityDepositCustom: !['None', '1 month', '2 month'].includes(p.securityDeposit) ? (p.securityDeposit || '') : '',
              lockInPeriod: ['None', '1 month', '6 month', '11 month'].includes(p.lockInPeriod) ? p.lockInPeriod : (p.lockInPeriod ? 'Custom' : '6 month'),
              brokerage: p.brokerage || 'None',
              status: p.status || 'AVAILABLE',
              amenities: loadedAmenities.length > 0 ? loadedAmenities : ['Lift', '24x7 Security', 'Power Backup'],
              furnishingDetails: p.furnishingDetails || '',
            });
            if (p.bedrooms && Number(p.bedrooms) > 5) {
              setShowMoreBhk(true);
            }
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

  const toggleAmenity = (amenity) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.city || !formData.societyName || !formData.price) {
      error('Please fill in City, Building/Society Name, and Price.');
      return;
    }

    const readableType = (formData.propertyType || 'Property').replace(/_/g, ' ');
    const bhkPrefix = Number(formData.bedrooms) > 0 ? `${formData.bedrooms} BHK ` : '';
    const intentText = formData.listingType === 'RENT' ? 'Rent' : formData.listingType === 'PG_CO_LIVING' ? 'PG' : 'Sale';
    const autoTitle = `${bhkPrefix}${readableType} for ${intentText} in ${formData.societyName}, ${formData.city}`;
    const titleToSave = formData.title?.trim() || autoTitle;
    const locationToSave = formData.societyName ? `${formData.societyName}, ${formData.city}` : formData.city;
    const areaVal = Number(formData.builtUpArea) || Number(formData.carpetArea) || 1000;

    let maintenanceFinal = formData.maintenanceCharges;
    if (formData.maintenanceCharges === 'Separate' && formData.maintenanceAmount) {
      maintenanceFinal = `Separate: ₹${formData.maintenanceAmount}/mo`;
    }

    let securityFinal = formData.securityDeposit === 'Custom' ? formData.securityDepositCustom : formData.securityDeposit;

    const payload = {
      title: titleToSave,
      description: formData.description,
      area: areaVal,
      builtUpArea: Number(formData.builtUpArea) || null,
      carpetArea: Number(formData.carpetArea) || null,
      bedrooms: Number(formData.bedrooms) || 0,
      bathrooms: Number(formData.bathrooms) || 0,
      balconies: Number(formData.balconies) || 0,
      city: formData.city,
      location: locationToSave,
      price: Number(formData.price),
      propertyCategory: formData.propertyCategory,
      propertyType: formData.propertyType,
      listingType: formData.listingType,
      societyName: formData.societyName,
      propertyAge: formData.propertyAge,
      floorNo: formData.floorNo,
      totalFloors: Number(formData.totalFloors) || null,
      furnished: formData.furnished,
      coveredParking: Number(formData.coveredParking) || 0,
      openParking: Number(formData.openParking) || 0,
      preferredTenant: formData.preferredTenant,
      petFriendly: formData.petFriendly,
      availableFrom: formData.availableFrom,
      maintenanceCharges: maintenanceFinal,
      securityDeposit: securityFinal,
      lockInPeriod: formData.lockInPeriod,
      brokerage: formData.brokerage,
      status: formData.status,
      amenities: JSON.stringify(formData.amenities),
      furnishingDetails: typeof formData.furnishingDetails === 'object'
        ? JSON.stringify(formData.furnishingDetails)
        : (formData.furnishingDetails || ''),
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
        <p style={{ color: 'var(--text-muted)' }}>Loading property specifications...</p>
      </div>
    );
  }

  const pillSelectStyle = (isSelected) => ({
    padding: '0.625rem 1.25rem',
    borderRadius: 'var(--radius-md)',
    border: isSelected ? '2px solid var(--color-gold-500)' : '1px solid var(--border-color)',
    backgroundColor: isSelected ? '#FDF8EA' : '#FFFFFF',
    color: isSelected ? 'var(--color-gold-700)' : 'var(--text-primary)',
    fontWeight: isSelected ? 700 : 500,
    cursor: 'pointer',
    fontSize: '0.875rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s ease',
    userSelect: 'none',
  });

  const chipBoxStyle = (isSelected) => ({
    minWidth: '48px',
    height: '42px',
    padding: '0 0.75rem',
    borderRadius: 'var(--radius-sm)',
    border: isSelected ? '2px solid var(--color-gold-500)' : '1px solid var(--border-color)',
    backgroundColor: isSelected ? '#FDF8EA' : '#FFFFFF',
    color: isSelected ? 'var(--color-gold-700)' : 'var(--text-primary)',
    fontWeight: isSelected ? 700 : 500,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s ease',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1080px', margin: '0 auto' }}>
      {/* Top Back Navigation */}
      <div>
        <Link to="/admin/properties" className="btn btn-ghost btn-sm" style={{ paddingLeft: 0, gap: '0.375rem' }}>
          <ArrowLeft size={16} />
          <span>Back to property listings</span>
        </Link>
      </div>

      {/* SINGLE UNIFIED WHITE CARD CONTAINER */}
      <div className="card" style={{ padding: '2.5rem', backgroundColor: '#FFFFFF', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', borderRadius: 'var(--radius-lg)' }}>
        
        {/* Header Title */}
        <div style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ color: 'var(--color-gold-600)', fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Property Listing Form
              </span>
              <h1 style={{ fontSize: '1.625rem', fontWeight: 700, margin: '0.25rem 0 0' }}>
                {isEditMode ? `Edit Property #${id}` : 'Post Real Estate Property Listing'}
              </h1>
            </div>
            <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '0.375rem 0.875rem', borderRadius: 'var(--radius-full)', fontSize: '0.8125rem', fontWeight: 600 }}>
              {formData.listingType === 'RENT' ? 'Rental Listing' : formData.listingType === 'PG_CO_LIVING' ? 'PG / Co-Living' : 'Resale / Sale'}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Property Type (Residential / Commercial) */}
          <div>
            <label className="form-label">Property Type *</label>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {['Residential', 'Commercial'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  style={pillSelectStyle(formData.propertyCategory === cat)}
                  onClick={() => setFormData({ ...formData, propertyCategory: cat })}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Looking to */}
          <div>
            <label className="form-label">Looking To *</label>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {[
                { value: 'RENT', label: 'Rent' },
                { value: 'SALE', label: 'Sell' },
                { value: 'PG_CO_LIVING', label: 'PG / Co-living' }
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  style={pillSelectStyle(formData.listingType === item.value)}
                  onClick={() => {
                    let nextPropType = formData.propertyType;
                    if (item.value === 'RENT' && formData.propertyType === 'PLOT') {
                      nextPropType = 'APARTMENT';
                    }
                    if (item.value === 'PG_CO_LIVING') {
                      nextPropType = 'APARTMENT';
                    }
                    setFormData({ ...formData, listingType: item.value, propertyType: nextPropType });
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* City & Building / Society Name */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-subgrid">
            <div className="form-group">
              <label className="form-label" htmlFor="prop-city">City *</label>
              <input
                id="prop-city"
                type="text"
                required
                className="form-control"
                placeholder="e.g. Gurgaon, Delhi, Noida"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="prop-society">Building / Apartment / Society Name *</label>
              <input
                id="prop-society"
                type="text"
                required
                className="form-control"
                placeholder="e.g. Swami Dayanand Apartment, DLF Phase 5"
                value={formData.societyName}
                onChange={(e) => setFormData({ ...formData, societyName: e.target.value })}
              />
            </div>
          </div>

          {/* Property Category Selection & BHK Options */}
          {formData.listingType !== 'PG_CO_LIVING' && (
            <div>
              <label className="form-label">Property Category *</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: !['APARTMENT', 'PLOT', 'RETAIL_SHOP'].includes(formData.propertyType) ? '1.25rem' : '0' }}>
                {[
                  { id: 'APARTMENT', label: 'Apartment' },
                  { id: 'STUDIO', label: 'Studio' },
                  { id: 'INDEPENDENT_HOUSE', label: 'Independent House' },
                  { id: 'DUPLEX', label: 'Duplex' },
                  { id: 'INDEPENDENT_FLOOR', label: 'Independent Floor' },
                  { id: 'VILLA', label: 'Villa' },
                  { id: 'FARM_HOUSE', label: 'Farm House' },
                  { id: 'PENTHOUSE', label: 'Penthouse' },
                  { id: 'RETAIL_SHOP', label: 'Retail Shop' },
                  ...(formData.listingType === 'SALE' ? [{ id: 'PLOT', label: 'Plot / Land' }] : [])
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    style={{
                      ...pillSelectStyle(formData.propertyType === type.id),
                      textAlign: 'center',
                      padding: '0.75rem 0.5rem',
                      height: 'auto',
                    }}
                    onClick={() => {
                      let nextBedrooms = formData.bedrooms;
                      if (type.id === 'STUDIO' && (!formData.bedrooms || formData.bedrooms === '3')) {
                        nextBedrooms = '1';
                      }
                      setFormData({ ...formData, propertyType: type.id, bedrooms: nextBedrooms });
                    }}
                  >
                    {type.label}
                  </button>
                ))}
              </div>

              {/* BHK Selection directly below Property Category (Hidden for Apartment, Plot, Retail Shop) */}
              {!['APARTMENT', 'PLOT', 'RETAIL_SHOP'].includes(formData.propertyType) && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.375rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <label className="form-label" style={{ margin: 0 }}>BHK Configuration *</label>
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', color: 'var(--color-gold-600)', fontWeight: 600 }}
                      onClick={() => setShowMoreBhk(!showMoreBhk)}
                    >
                      {showMoreBhk ? '← Show standard (1-5 BHK)' : 'Show more options (up to 12 BHK) →'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap' }}>
                    {[
                      { val: '1', label: '1 BHK' },
                      { val: '2', label: '2 BHK' },
                      { val: '3', label: '3 BHK' },
                      { val: '4', label: '4 BHK' },
                      { val: '5', label: '5 BHK' },
                    ].map((bhk) => (
                      <button
                        key={bhk.val}
                        type="button"
                        style={pillSelectStyle(formData.bedrooms === bhk.val)}
                        onClick={() => setFormData({ ...formData, bedrooms: bhk.val })}
                      >
                        {bhk.label}
                      </button>
                    ))}

                    {/* 5+ BHK expand trigger when not expanded */}
                    {!showMoreBhk && (
                      <button
                        type="button"
                        style={pillSelectStyle(Number(formData.bedrooms) > 5)}
                        onClick={() => {
                          setShowMoreBhk(true);
                          if (Number(formData.bedrooms) <= 5) {
                            setFormData({ ...formData, bedrooms: '6' });
                          }
                        }}
                      >
                        {Number(formData.bedrooms) > 5 ? `${formData.bedrooms} BHK (5+)` : '5+ BHK'}
                      </button>
                    )}

                    {/* Expanded 6 BHK to 12 BHK */}
                    {showMoreBhk && [
                      { val: '6', label: '6 BHK' },
                      { val: '7', label: '7 BHK' },
                      { val: '8', label: '8 BHK' },
                      { val: '9', label: '9 BHK' },
                      { val: '10', label: '10 BHK' },
                      { val: '11', label: '11 BHK' },
                      { val: '12', label: '12 BHK' },
                    ].map((bhk) => (
                      <button
                        key={bhk.val}
                        type="button"
                        style={pillSelectStyle(formData.bedrooms === bhk.val)}
                        onClick={() => setFormData({ ...formData, bedrooms: bhk.val })}
                      >
                        {bhk.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Area Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }} className="form-triplegrid">
            <div className="form-group">
              <label className="form-label" htmlFor="prop-builtup">Built-Up Area (Sq. ft.) *</label>
              <input
                id="prop-builtup"
                type="number"
                required
                min="1"
                className="form-control"
                placeholder="e.g. 1850"
                value={formData.builtUpArea}
                onChange={(e) => setFormData({ ...formData, builtUpArea: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="prop-carpet">Carpet Area (Sq. ft.)</label>
              <input
                id="prop-carpet"
                type="number"
                min="1"
                className="form-control"
                placeholder="e.g. 1500"
                value={formData.carpetArea}
                onChange={(e) => setFormData({ ...formData, carpetArea: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="prop-age">Age of Property</label>
              <select
                id="prop-age"
                className="form-control"
                value={formData.propertyAge}
                onChange={(e) => setFormData({ ...formData, propertyAge: e.target.value })}
              >
                <option value="Under Construction">Under Construction</option>
                <option value="0-1 Years">0-1 Years (Brand New)</option>
                <option value="1-5 Years">1-5 Years</option>
                <option value="5-10 Years">5-10 Years</option>
                <option value="10+ Years">10+ Years</option>
              </select>
            </div>
          </div>

          {/* Bathrooms & Balconies */}
          {!['PLOT', 'RETAIL_SHOP'].includes(formData.propertyType) && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }} className="form-subgrid">
              {/* Bathrooms */}
              <div>
                <label className="form-label">Bathrooms *</label>
                <div style={{ display: 'flex', gap: '0.375rem' }}>
                  {['1', '2', '3', '4', '5'].map((n) => (
                    <button
                      key={n}
                      type="button"
                      style={chipBoxStyle(formData.bathrooms === n)}
                      onClick={() => setFormData({ ...formData, bathrooms: n })}
                    >
                      {n}{n === '5' ? '+' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Balconies */}
              <div>
                <label className="form-label">Balconies *</label>
                <div style={{ display: 'flex', gap: '0.375rem' }}>
                  {['0', '1', '2', '3', '4'].map((n) => (
                    <button
                      key={n}
                      type="button"
                      style={chipBoxStyle(formData.balconies === n)}
                      onClick={() => setFormData({ ...formData, balconies: n })}
                    >
                      {n}{n === '4' ? '+' : ''}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Furnishing & Floors */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '1rem' }} className="form-triplegrid">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                <label className="form-label" style={{ margin: 0 }}>Furnish Type *</label>
                {formData.furnished !== 'UNFURNISHED' && (
                  <button
                    type="button"
                    onClick={() => setIsFurnishModalOpen(true)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#4F46E5',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      padding: 0
                    }}
                  >
                    <Sparkles size={12} />
                    <span>Configure Items</span>
                  </button>
                )}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[
                  { id: 'FULLY_FURNISHED', label: 'Fully Furnished' },
                  { id: 'SEMI_FURNISHED', label: 'Semi Furnished' },
                  { id: 'UNFURNISHED', label: 'Unfurnished' }
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    style={{ ...pillSelectStyle(formData.furnished === f.id), fontSize: '0.8125rem', padding: '0.5rem 0.75rem' }}
                    onClick={() => {
                      setFormData({ ...formData, furnished: f.id });
                      if (f.id !== 'UNFURNISHED') {
                        setIsFurnishModalOpen(true);
                      }
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Furnishing Overview Chips */}
              {(() => {
                let parsed = formData.furnishingDetails;
                if (typeof parsed === 'string' && parsed) {
                  try { parsed = JSON.parse(parsed); } catch (e) { parsed = {}; }
                }
                if (!parsed || formData.furnished === 'UNFURNISHED') return null;
                const activeCounters = Object.entries(parsed.counters || {}).filter(([k, v]) => v > 0);
                const activeToggles = Object.entries(parsed.toggles || {}).filter(([k, v]) => Boolean(v));
                const totalCount = activeCounters.length + activeToggles.length;
                if (totalCount === 0) return null;

                return (
                  <div
                    onClick={() => setIsFurnishModalOpen(true)}
                    style={{
                      marginTop: '0.625rem',
                      padding: '0.5rem 0.75rem',
                      backgroundColor: '#F5F3FF',
                      border: '1px solid #E0E7FF',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4338CA' }}>
                        ✨ {totalCount} Furnishing Items Included (Click to edit)
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                      {activeCounters.map(([k, v]) => (
                        <span key={k} style={{ fontSize: '0.7rem', background: '#FFFFFF', padding: '1px 6px', borderRadius: '4px', border: '1px solid #C7D2FE', color: '#3730A3', fontWeight: 600 }}>
                          {v}x {k.charAt(0).toUpperCase() + k.slice(1)}
                        </span>
                      ))}
                      {activeToggles.map(([k]) => (
                        <span key={k} style={{ fontSize: '0.7rem', background: '#FFFFFF', padding: '1px 6px', borderRadius: '4px', border: '1px solid #C7D2FE', color: '#3730A3', fontWeight: 600 }}>
                          {k.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="prop-floorno">Floor No. *</label>
              <input
                id="prop-floorno"
                type="text"
                required
                className="form-control"
                placeholder="e.g. 3, Ground, Top"
                value={formData.floorNo}
                onChange={(e) => setFormData({ ...formData, floorNo: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="prop-totalfloors">Total Floors *</label>
              <input
                id="prop-totalfloors"
                type="number"
                required
                min="1"
                className="form-control"
                placeholder="e.g. 10"
                value={formData.totalFloors}
                onChange={(e) => setFormData({ ...formData, totalFloors: e.target.value })}
              />
            </div>
          </div>

          {/* Parking Slots */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }} className="form-subgrid">
            {/* Covered Parking */}
            <div>
              <label className="form-label">Covered Parking Slots *</label>
              <div style={{ display: 'flex', gap: '0.375rem' }}>
                {['0', '1', '2', '3', '4'].map((n) => (
                  <button
                    key={n}
                    type="button"
                    style={chipBoxStyle(formData.coveredParking === n)}
                    onClick={() => setFormData({ ...formData, coveredParking: n })}
                  >
                    {n}{n === '4' ? '+' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Open Parking */}
            <div>
              <label className="form-label">Open Parking Slots *</label>
              <div style={{ display: 'flex', gap: '0.375rem' }}>
                {['0', '1', '2', '3', '4'].map((n) => (
                  <button
                    key={n}
                    type="button"
                    style={chipBoxStyle(formData.openParking === n)}
                    onClick={() => setFormData({ ...formData, openParking: n })}
                  >
                    {n}{n === '4' ? '+' : ''}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preferred Tenants & Pet Friendly */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', alignItems: 'center' }} className="form-subgrid">
            <div>
              <label className="form-label">Preferred Tenant Type</label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['Family', 'Bachelors', 'Company', 'Any'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    style={pillSelectStyle(formData.preferredTenant === t)}
                    onClick={() => setFormData({ ...formData, preferredTenant: t })}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="form-label">Pet Friendly?</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[
                  { val: true, label: 'Yes' },
                  { val: false, label: 'No' }
                ].map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    style={pillSelectStyle(formData.petFriendly === p.val)}
                    onClick={() => setFormData({ ...formData, petFriendly: p.val })}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Price & Available From */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-subgrid">
            <div className="form-group">
              <label className="form-label" htmlFor="prop-price">
                {formData.listingType === 'RENT' ? 'Monthly Rent (₹) *' : 'Expected Sale Price (₹) *'}
              </label>
              <input
                id="prop-price"
                type="number"
                required
                min="1"
                step="any"
                className="form-control"
                placeholder="e.g. 55000"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="prop-avail">Available From *</label>
              <input
                id="prop-avail"
                type="text"
                required
                className="form-control"
                placeholder="e.g. Immediate, 1st of Next Month"
                value={formData.availableFrom}
                onChange={(e) => setFormData({ ...formData, availableFrom: e.target.value })}
              />
            </div>
          </div>

          {/* Maintenance & Security Deposit */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="form-subgrid">
            <div>
              <label className="form-label">Maintenance Charges *</label>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                {['Include in rent', 'Separate'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    style={pillSelectStyle(formData.maintenanceCharges === m)}
                    onClick={() => setFormData({ ...formData, maintenanceCharges: m })}
                  >
                    {m}
                  </button>
                ))}
              </div>
              {formData.maintenanceCharges === 'Separate' && (
                <input
                  type="number"
                  className="form-control"
                  placeholder="Monthly Maintenance Amount (₹)"
                  value={formData.maintenanceAmount}
                  onChange={(e) => setFormData({ ...formData, maintenanceAmount: e.target.value })}
                />
              )}
            </div>

            <div>
              <label className="form-label">Security Deposit *</label>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                {['None', '1 month', '2 month', 'Custom'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    style={pillSelectStyle(formData.securityDeposit === s)}
                    onClick={() => setFormData({ ...formData, securityDeposit: s })}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {formData.securityDeposit === 'Custom' && (
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. ₹1,50,000"
                  value={formData.securityDepositCustom}
                  onChange={(e) => setFormData({ ...formData, securityDepositCustom: e.target.value })}
                />
              )}
            </div>
          </div>

          {/* Lock-in & Brokerage */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="form-subgrid">
            <div>
              <label className="form-label">Lock-in Period *</label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['None', '1 month', '6 month', '11 month'].map((l) => (
                  <button
                    key={l}
                    type="button"
                    style={pillSelectStyle(formData.lockInPeriod === l)}
                    onClick={() => setFormData({ ...formData, lockInPeriod: l })}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="form-label">Do you charge brokerage? *</label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['None', '15 Days', '30 Days', 'Custom'].map((b) => (
                  <button
                    key={b}
                    type="button"
                    style={pillSelectStyle(formData.brokerage === b)}
                    onClick={() => setFormData({ ...formData, brokerage: b })}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="form-label" style={{ marginBottom: '0.75rem' }}>
              Society Amenities & Features ({formData.amenities.length} selected)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.625rem' }}>
              {COMMON_AMENITIES.map((amenity) => {
                const isSelected = formData.amenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.625rem 0.875rem',
                      borderRadius: 'var(--radius-sm)',
                      border: isSelected ? '1.5px solid var(--color-gold-500)' : '1px solid var(--border-color)',
                      backgroundColor: isSelected ? '#FDF8EA' : '#FFFFFF',
                      color: isSelected ? 'var(--color-gold-700)' : 'var(--text-primary)',
                      fontSize: '0.8125rem',
                      fontWeight: isSelected ? 600 : 400,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '3px',
                        border: isSelected ? '1px solid var(--color-gold-600)' : '1px solid #CBD5E1',
                        backgroundColor: isSelected ? 'var(--color-gold-500)' : '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {isSelected && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
                    </div>
                    <span>{amenity}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description & Status */}
          <div>
            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label className="form-label" htmlFor="prop-desc">Property Description & Key Highlights</label>
              <textarea
                id="prop-desc"
                rows={4}
                className="form-control"
                placeholder="Add key highlights like corner flat, road-facing, newly renovated kitchen, high-security gated compound, walking distance to metro/market..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" htmlFor="prop-status">Listing Status</label>
              <select
                id="prop-status"
                className="form-control"
                style={{ maxWidth: '300px' }}
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

          {/* Photos */}
          <div>
            <label className="form-label" style={{ marginBottom: '0.375rem' }}>Property Photos & Media Assets</label>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              Upload authentic images captured for this property. High-quality photos significantly improve client inquiries.
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

          {/* Submit Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
            <Link to="/admin/properties" className="btn btn-ghost" disabled={submitting}>
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary btn-lg" disabled={submitting}>
              <Save size={18} />
              <span>{submitting ? 'Saving Property...' : isEditMode ? 'Update Property' : 'Publish Property'}</span>
            </button>
          </div>
        </form>
      </div>

      <FurnishingModal
        isOpen={isFurnishModalOpen}
        onClose={() => setIsFurnishModalOpen(false)}
        initialFurnishings={formData.furnishingDetails}
        initialAmenities={formData.amenities}
        onSave={({ furnishingDetails, amenities }) => {
          setFormData((prev) => ({
            ...prev,
            furnishingDetails,
            amenities,
          }));
          success('Furnishings & amenities updated successfully.');
        }}
      />

      <style>{`
        @media (max-width: 768px) {
          .form-subgrid, .form-triplegrid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
