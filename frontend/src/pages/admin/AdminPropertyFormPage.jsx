import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { propertyService } from '../../services/propertyService';
import { useToast } from '../../hooks/useToast';
import ImageUploader from '../../components/admin/ImageUploader';
import FurnishingModal from '../../components/admin/FurnishingModal';
import {
  ArrowLeft, Save, Building2, Home, Layers, CheckCircle2,
  Plus, Check, Sparkles, MapPin, IndianRupee, ShieldCheck, Car, Key, FileText, Camera, Sliders,
  Trash2, Wifi, Tv, Coffee, Utensils, Shirt, Dumbbell, ArrowUpDown, Droplets, Waves, Zap, BatteryCharging,
  Shield, Fingerprint, Lock, Eye
} from 'lucide-react';


export default function AdminPropertyFormPage() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { success, error } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyCategory: '', // unselected ('Residential' | 'Commercial')
    listingType: '', // unselected ('RENT' | 'SALE' | 'PG_CO_LIVING')
    propertyType: '', // unselected ('APARTMENT', 'STUDIO', etc.)
    societyName: '',
    city: '',
    location: '',
    builtUpArea: '',
    carpetArea: '',
    transactionType: '',
    constructionStatus: '',
    propertyAge: '',
    bedrooms: '',
    bathrooms: '',
    balconies: '',
    floorNo: '',
    totalFloors: '',
    furnished: '',
    coveredParking: '',
    openParking: '',
    preferredTenant: [],
    bachelorPreference: '',
    petFriendly: null,
    price: '',
    availableFrom: '',
    maintenanceCharges: '',
    maintenanceAmount: '',
    securityDeposit: '',
    securityDepositCustom: '',
    lockInPeriod: '',
    lockInPeriodCustom: '',
    brokerage: '',
    brokerageCustom: '',
    status: 'AVAILABLE',
    amenities: [],
    furnishingDetails: '',
    pgName: '',
    totalBeds: '',
    pgFor: 'Girls',
    bestSuitedFor: 'Students',
    mealsAvailable: true,
    noticePeriod: '30',
    pgRules: {
      nonVegAllowed: false,
      oppositeSexAllowed: false,
      anyTimeAllowed: true,
      visitorsAllowed: true,
      guardianAllowed: true,
      drinkingAllowed: false,
      smokingAllowed: false,
    },
    commonAreas: [],
    propertyManagedBy: 'Landlord',
    managerStaysAtProperty: true,
    pgRooms: [
      {
        id: 1,
        roomType: 'Private Room',
        totalBeds: '',
        rent: '',
        securityDeposit: '',
        facilities: ['AC', 'Attached Bathroom']
      }
    ],
    pgSecurityAmenities: [],
    pgFurnishings: [],
    pgServices: [],
    pgTopAmenities: [],
    onetimeMoveInCharges: '',
    mealChargesPerMonth: '',
    electricityChargesPerMonth: '',
    additionalInfo: '',
  });

  const [existingImages, setExistingImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [showMoreBhk, setShowMoreBhk] = useState(false);
  const [showMoreCoveredParking, setShowMoreCoveredParking] = useState(false);
  const [showMoreOpenParking, setShowMoreOpenParking] = useState(false);
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

            let loadedTenants = [];
            if (p.preferredTenant) {
              loadedTenants = p.preferredTenant.split(',').map((s) => s.trim()).filter(Boolean);
              if (loadedTenants.includes('Any')) {
                loadedTenants = ['Family', 'Bachelors', 'Company'];
              }
            }

            const parseJsonOrArray = (val) => {
              if (!val) return [];
              if (Array.isArray(val)) return val;
              try { return JSON.parse(val); } catch (e) { return val.split(',').map((s) => s.trim()).filter(Boolean); }
            };

            let loadedPgRooms = [
              {
                id: 1,
                roomType: 'Private Room',
                totalBeds: '',
                rent: '',
                securityDeposit: '',
                facilities: ['AC', 'Attached Bathroom']
              }
            ];
            if (p.pgRooms) {
              try {
                const parsed = typeof p.pgRooms === 'string' ? JSON.parse(p.pgRooms) : p.pgRooms;
                if (Array.isArray(parsed) && parsed.length > 0) {
                  loadedPgRooms = parsed;
                }
              } catch (e) {}
            }

            setFormData({
              title: p.title || '',
              description: p.description || '',
              propertyCategory: p.propertyCategory || '',
              listingType: p.listingType || '',
              propertyType: p.propertyType || '',
              societyName: p.societyName || '',
              city: p.city || '',
              location: p.location || '',
              builtUpArea: p.builtUpArea || p.area || '',
              carpetArea: p.carpetArea || '',
              transactionType: p.transactionType || (p.listingType === 'SALE' ? 'Resale' : ''),
              constructionStatus: p.constructionStatus || (p.listingType === 'SALE' ? 'Ready to Move' : ''),
              propertyAge: p.propertyAge || '',
              bedrooms: p.bedrooms != null ? String(p.bedrooms) : '',
              bathrooms: p.bathrooms != null ? String(p.bathrooms) : '',
              balconies: p.balconies != null ? String(p.balconies) : '',
              floorNo: p.floorNo || '',
              totalFloors: p.totalFloors != null ? String(p.totalFloors) : '',
              furnished: p.furnished || '',
              coveredParking: p.coveredParking != null ? String(p.coveredParking) : '',
              openParking: p.openParking != null ? String(p.openParking) : '',
              preferredTenant: loadedTenants,
              bachelorPreference: p.bachelorPreference || '',
              petFriendly: p.petFriendly != null ? Boolean(p.petFriendly) : null,
              price: p.price != null ? String(p.price) : '',
              availableFrom: p.availableFrom || '',
              maintenanceCharges: p.maintenanceCharges?.startsWith('Separate') ? 'Separate' : (p.maintenanceCharges || ''),
              maintenanceAmount: p.maintenanceCharges?.startsWith('Separate') ? p.maintenanceCharges.replace('Separate: ₹', '').replace('/mo', '').replace('Separate: ', '') : '',
              securityDeposit: ['None', '1 month', '2 month'].includes(p.securityDeposit) ? p.securityDeposit : (p.securityDeposit ? 'Custom' : ''),
              securityDepositCustom: !['None', '1 month', '2 month'].includes(p.securityDeposit) ? (p.securityDeposit || '') : '',
              lockInPeriod: ['None', '15 Days', '30 Days', '1 month', '6 month', '11 month'].includes(p.lockInPeriod) ? p.lockInPeriod : (p.lockInPeriod ? 'Custom' : ''),
              lockInPeriodCustom: !['None', '15 Days', '30 Days', '1 month', '6 month', '11 month'].includes(p.lockInPeriod) ? (p.lockInPeriod || '') : '',
              brokerage: ['None', '15 Days', '30 Days'].includes(p.brokerage) ? p.brokerage : (p.brokerage ? 'Custom' : ''),
              brokerageCustom: !['None', '15 Days', '30 Days'].includes(p.brokerage) ? (p.brokerage || '') : '',
              status: p.status || 'AVAILABLE',
              amenities: loadedAmenities,
              furnishingDetails: p.furnishingDetails || '',
              pgName: p.pgName || '',
              totalBeds: p.totalBeds != null ? String(p.totalBeds) : '',
              pgFor: p.pgFor || 'Girls',
              bestSuitedFor: p.bestSuitedFor || 'Students',
              mealsAvailable: p.mealsAvailable != null ? p.mealsAvailable : true,
              noticePeriod: p.noticePeriod || '30',
              pgRules: p.pgRules ? (typeof p.pgRules === 'object' ? p.pgRules : JSON.parse(p.pgRules || '{}')) : {
                nonVegAllowed: false,
                oppositeSexAllowed: false,
                anyTimeAllowed: true,
                visitorsAllowed: true,
                guardianAllowed: true,
                drinkingAllowed: false,
                smokingAllowed: false,
              },
              commonAreas: parseJsonOrArray(p.commonAreas),
              propertyManagedBy: p.propertyManagedBy || 'Landlord',
              managerStaysAtProperty: p.managerStaysAtProperty != null ? p.managerStaysAtProperty : true,
              pgRooms: loadedPgRooms,
              pgSecurityAmenities: parseJsonOrArray(p.pgSecurityAmenities),
              pgFurnishings: parseJsonOrArray(p.pgFurnishings),
              pgServices: parseJsonOrArray(p.pgServices),
              pgTopAmenities: parseJsonOrArray(p.pgTopAmenities),
              onetimeMoveInCharges: p.onetimeMoveInCharges != null ? String(p.onetimeMoveInCharges) : '',
              mealChargesPerMonth: p.mealChargesPerMonth != null ? String(p.mealChargesPerMonth) : '',
              electricityChargesPerMonth: p.electricityChargesPerMonth != null ? String(p.electricityChargesPerMonth) : '',
              additionalInfo: p.additionalInfo || '',
            });
            if (p.bedrooms && Number(p.bedrooms) > 5) {
              setShowMoreBhk(true);
            }
            if (p.coveredParking && Number(p.coveredParking) >= 4) {
              setShowMoreCoveredParking(true);
            }
            if (p.openParking && Number(p.openParking) >= 4) {
              setShowMoreOpenParking(true);
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


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.propertyCategory) {
      error('Please select Property Type (Residential or Commercial).');
      return;
    }
    if (!formData.listingType) {
      error('Please select Looking To (Rent, Sell, or PG / Co-living).');
      return;
    }
    if (formData.listingType !== 'PG_CO_LIVING' && !formData.propertyType) {
      error('Please select a Property Category.');
      return;
    }
    if (!formData.city || !formData.societyName) {
      error('Please fill in City and Building/Project/Society Name.');
      return;
    }
    if (formData.listingType === 'PG_CO_LIVING' && !formData.pgName) {
      error('Please fill in PG Name.');
      return;
    }

    const readableType = (formData.propertyType || 'Property').replace(/_/g, ' ');
    const bhkPrefix = Number(formData.bedrooms) > 0 ? `${formData.bedrooms} BHK ` : '';
    const intentText = formData.listingType === 'RENT' ? 'Rent' : formData.listingType === 'PG_CO_LIVING' ? 'PG' : formData.listingType === 'SALE' ? 'Sale' : 'Listing';
    let autoTitle;
    if (formData.listingType === 'PG_CO_LIVING') {
      autoTitle = `${formData.pgName || 'Luxury PG'} (${formData.pgFor || 'Co-living'}) in ${formData.societyName || formData.location || formData.city}, ${formData.city}`;
    } else {
      autoTitle = `${bhkPrefix}${readableType} for ${intentText} in ${formData.societyName}, ${formData.city}`;
    }
    const titleToSave = formData.title?.trim() || autoTitle;
    const locationToSave = formData.location ? `${formData.societyName}, ${formData.location}, ${formData.city}` : (formData.societyName ? `${formData.societyName}, ${formData.city}` : formData.city);
    const areaVal = Number(formData.builtUpArea) || Number(formData.carpetArea) || 1000;

    let maintenanceFinal = formData.maintenanceCharges;
    if (formData.listingType === 'SALE') {
      maintenanceFinal = formData.maintenanceAmount
        ? `₹${formData.maintenanceAmount}/mo`
        : (formData.maintenanceCharges ? (formData.maintenanceCharges.startsWith('₹') ? formData.maintenanceCharges : `₹${formData.maintenanceCharges}/mo`) : null);
    } else if (formData.maintenanceCharges === 'Separate' && formData.maintenanceAmount) {
      maintenanceFinal = `Separate: ₹${formData.maintenanceAmount}/mo`;
    }

    let securityFinal = formData.securityDeposit === 'Custom' ? formData.securityDepositCustom : formData.securityDeposit;
    let lockInFinal = formData.lockInPeriod === 'Custom' ? formData.lockInPeriodCustom : formData.lockInPeriod;
    let brokerageFinal = formData.brokerage === 'Custom' ? formData.brokerageCustom : formData.brokerage;

    const payload = {
      title: titleToSave,
      description: formData.description || '',
      area: areaVal,
      builtUpArea: Number(formData.builtUpArea) || null,
      carpetArea: Number(formData.carpetArea) || null,
      bedrooms: Number(formData.bedrooms) || 0,
      bathrooms: Number(formData.bathrooms) || 0,
      balconies: Number(formData.balconies) || 0,
      city: formData.city,
      location: formData.location || locationToSave,
      price: Number(formData.price) || 0,
      propertyCategory: formData.propertyCategory || 'Residential',
      propertyType: formData.listingType === 'PG_CO_LIVING' ? 'APARTMENT' : (formData.propertyType || 'APARTMENT'),
      listingType: formData.listingType || 'RENT',
      transactionType: formData.listingType === 'SALE' ? (formData.transactionType || 'Resale') : null,
      constructionStatus: formData.listingType === 'SALE' ? (formData.constructionStatus || 'Ready to Move') : null,
      societyName: formData.societyName,
      propertyAge: formData.propertyAge || null,
      floorNo: formData.floorNo || '',
      totalFloors: Number(formData.totalFloors) || null,
      furnished: formData.furnished || 'UNFURNISHED',
      coveredParking: Number(formData.coveredParking) || 0,
      openParking: Number(formData.openParking) || 0,
      preferredTenant: formData.listingType === 'SALE'
        ? null
        : (Array.isArray(formData.preferredTenant)
          ? (formData.preferredTenant.length > 0 ? formData.preferredTenant.join(', ') : null)
          : (formData.preferredTenant || null)),
      bachelorPreference: formData.listingType === 'SALE'
        ? null
        : (Array.isArray(formData.preferredTenant) && formData.preferredTenant.includes('Bachelors')
          ? (formData.bachelorPreference || 'Open for both')
          : null),
      petFriendly: formData.listingType === 'SALE' ? false : Boolean(formData.petFriendly),
      availableFrom: formData.listingType === 'SALE' ? null : (formData.availableFrom || ''),
      maintenanceCharges: maintenanceFinal || null,
      securityDeposit: formData.listingType === 'SALE' ? null : (securityFinal || null),
      lockInPeriod: formData.listingType === 'PG_CO_LIVING' ? (formData.lockInPeriod || null) : (formData.listingType === 'SALE' ? null : (lockInFinal || null)),
      brokerage: brokerageFinal || null,
      status: formData.status || 'AVAILABLE',
      amenities: JSON.stringify(formData.amenities || []),
      furnishingDetails: typeof formData.furnishingDetails === 'object'
        ? JSON.stringify(formData.furnishingDetails)
        : (formData.furnishingDetails || ''),
      pgName: formData.listingType === 'PG_CO_LIVING' ? (formData.pgName || null) : null,
      totalBeds: formData.listingType === 'PG_CO_LIVING' ? (Number(formData.totalBeds) || null) : null,
      pgFor: formData.listingType === 'PG_CO_LIVING' ? (formData.pgFor || 'Girls') : null,
      bestSuitedFor: formData.listingType === 'PG_CO_LIVING' ? (formData.bestSuitedFor || 'Students') : null,
      mealsAvailable: formData.listingType === 'PG_CO_LIVING' ? Boolean(formData.mealsAvailable) : null,
      noticePeriod: formData.listingType === 'PG_CO_LIVING' ? (formData.noticePeriod || null) : null,
      pgRules: formData.listingType === 'PG_CO_LIVING' ? JSON.stringify(formData.pgRules || {}) : null,
      commonAreas: formData.listingType === 'PG_CO_LIVING' ? JSON.stringify(formData.commonAreas || []) : null,
      propertyManagedBy: formData.listingType === 'PG_CO_LIVING' ? (formData.propertyManagedBy || 'Landlord') : null,
      managerStaysAtProperty: formData.listingType === 'PG_CO_LIVING' ? Boolean(formData.managerStaysAtProperty) : null,
      pgRooms: formData.listingType === 'PG_CO_LIVING' ? JSON.stringify(formData.pgRooms || []) : null,
      pgSecurityAmenities: formData.listingType === 'PG_CO_LIVING' ? JSON.stringify(formData.pgSecurityAmenities || []) : null,
      pgFurnishings: formData.listingType === 'PG_CO_LIVING' ? JSON.stringify(formData.pgFurnishings || []) : null,
      pgServices: formData.listingType === 'PG_CO_LIVING' ? JSON.stringify(formData.pgServices || []) : null,
      pgTopAmenities: formData.listingType === 'PG_CO_LIVING' ? JSON.stringify(formData.pgTopAmenities || []) : null,
      onetimeMoveInCharges: formData.listingType === 'PG_CO_LIVING' ? (Number(formData.onetimeMoveInCharges) || null) : null,
      mealChargesPerMonth: formData.listingType === 'PG_CO_LIVING' ? (Number(formData.mealChargesPerMonth) || null) : null,
      electricityChargesPerMonth: formData.listingType === 'PG_CO_LIVING' ? (Number(formData.electricityChargesPerMonth) || null) : null,
      additionalInfo: formData.listingType === 'PG_CO_LIVING' ? (formData.additionalInfo || null) : null,
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

  const handleRoomChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedRooms = [...(prev.pgRooms || [])];
      updatedRooms[index] = { ...updatedRooms[index], [field]: value };
      return { ...prev, pgRooms: updatedRooms };
    });
  };

  const handleRoomFacilityToggle = (roomIndex, facility) => {
    setFormData((prev) => {
      const updatedRooms = [...(prev.pgRooms || [])];
      const currentFacilities = Array.isArray(updatedRooms[roomIndex]?.facilities) ? updatedRooms[roomIndex].facilities : [];
      const isSelected = currentFacilities.includes(facility);
      updatedRooms[roomIndex] = {
        ...updatedRooms[roomIndex],
        facilities: isSelected
          ? currentFacilities.filter((f) => f !== facility)
          : [...currentFacilities, facility]
      };
      return { ...prev, pgRooms: updatedRooms };
    });
  };

  const handleAddRoom = () => {
    setFormData((prev) => ({
      ...prev,
      pgRooms: [
        ...(prev.pgRooms || []),
        {
          id: Date.now(),
          roomType: 'Double Sharing',
          totalBeds: '',
          rent: '',
          securityDeposit: '',
          facilities: ['AC', 'Attached Bathroom']
        }
      ]
    }));
  };

  const handleDeleteRoom = (index) => {
    if ((formData.pgRooms || []).length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      pgRooms: prev.pgRooms.filter((_, i) => i !== index)
    }));
  };

  const handleToggleAmenityItem = (field, item) => {
    setFormData((prev) => {
      const currentList = Array.isArray(prev[field]) ? prev[field] : [];
      const exists = currentList.includes(item);
      return {
        ...prev,
        [field]: exists ? currentList.filter((i) => i !== item) : [...currentList, item]
      };
    });
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
              {formData.listingType === 'RENT' ? 'Rental Listing' : formData.listingType === 'PG_CO_LIVING' ? 'PG / Co-Living' : formData.listingType === 'SALE' ? 'Resale / Sale' : 'New Listing'}
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
                    setFormData({
                      ...formData,
                      listingType: item.value,
                      propertyType: nextPropType,
                      transactionType: item.value === 'SALE' ? (formData.transactionType || 'Resale') : formData.transactionType,
                      constructionStatus: item.value === 'SALE' ? (formData.constructionStatus || 'Ready to Move') : formData.constructionStatus
                    });
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* City, Building / Project / Society Name, Locality */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }} className="form-triplegrid">
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
              <label className="form-label" htmlFor="prop-society">Building / Project / Society *</label>
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

            <div className="form-group">
              <label className="form-label" htmlFor="prop-loc">Locality *</label>
              <input
                id="prop-loc"
                type="text"
                required
                className="form-control"
                placeholder="e.g. Sector 54, Golf Course Road"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>

          {/* PG / Co-living Specific Details */}
          {formData.listingType === 'PG_CO_LIVING' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {/* PG Details Section */}
              <div className="card" style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--color-navy-900)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                  PG DETAILS
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* PG Name */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="pg-name">PG Name *</label>
                    <input
                      id="pg-name"
                      type="text"
                      required
                      className="form-control"
                      placeholder="e.g. Oxford Luxury PG / Zolo Stays"
                      value={formData.pgName}
                      onChange={(e) => setFormData({ ...formData, pgName: e.target.value })}
                    />
                  </div>

                  {/* Total Beds */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="pg-beds">Total Beds *</label>
                    <input
                      id="pg-beds"
                      type="number"
                      min="1"
                      required
                      className="form-control"
                      placeholder="e.g. 24"
                      value={formData.totalBeds}
                      onChange={(e) => setFormData({ ...formData, totalBeds: e.target.value })}
                    />
                  </div>

                  {/* PG is for & Best suited for */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }} className="form-subgrid">
                    <div>
                      <label className="form-label">PG is for *</label>
                      <div style={{ display: 'flex', gap: '0.5rem', height: '44px' }}>
                        {['Girls', 'Boys', 'Co-ed / Anyone'].map((item) => (
                          <button
                            key={item}
                            type="button"
                            style={{
                              ...pillSelectStyle((formData.pgFor || 'Girls') === item),
                              flex: 1,
                              padding: '0.5rem 0.25rem',
                              fontSize: '0.875rem',
                              fontWeight: 600,
                              justifyContent: 'center',
                              display: 'flex',
                              alignItems: 'center',
                              borderRadius: 'var(--radius-sm)',
                            }}
                            onClick={() => setFormData({ ...formData, pgFor: item })}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="form-label">Best suited for *</label>
                      <div style={{ display: 'flex', gap: '0.5rem', height: '44px' }}>
                        {['Students', 'Professionals', 'Both'].map((item) => (
                          <button
                            key={item}
                            type="button"
                            style={{
                              ...pillSelectStyle((formData.bestSuitedFor || 'Students') === item),
                              flex: 1,
                              padding: '0.5rem 0.25rem',
                              fontSize: '0.875rem',
                              fontWeight: 600,
                              justifyContent: 'center',
                              display: 'flex',
                              alignItems: 'center',
                              borderRadius: 'var(--radius-sm)',
                            }}
                            onClick={() => setFormData({ ...formData, bestSuitedFor: item })}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Meals Available */}
                  <div>
                    <label className="form-label">Meals Available *</label>
                    <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '320px', height: '44px' }}>
                      {[
                        { label: 'Yes', val: true },
                        { label: 'No', val: false }
                      ].map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          style={{
                            ...pillSelectStyle(formData.mealsAvailable === item.val),
                            flex: 1,
                            padding: '0.5rem 0.25rem',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            justifyContent: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: 'var(--radius-sm)',
                          }}
                          onClick={() => setFormData({ ...formData, mealsAvailable: item.val })}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notice Period & Lock in Period */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-subgrid">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" htmlFor="pg-notice">Notice Period (Days) *</label>
                      <input
                        id="pg-notice"
                        type="text"
                        required
                        className="form-control"
                        placeholder="e.g. 15 or 30"
                        value={formData.noticePeriod}
                        onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" htmlFor="pg-lockin">Lock in Period (Days) *</label>
                      <input
                        id="pg-lockin"
                        type="text"
                        required
                        className="form-control"
                        placeholder="e.g. 30 or 60"
                        value={formData.lockInPeriod}
                        onChange={(e) => setFormData({ ...formData, lockInPeriod: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* PG Rules Section */}
              <div className="card" style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--color-navy-900)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                  PG RULES
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }} className="form-subgrid">
                  {[
                    { key: 'nonVegAllowed', label: 'Non Veg Allowed *' },
                    { key: 'oppositeSexAllowed', label: 'Opposite Sex Allowed *' },
                    { key: 'anyTimeAllowed', label: 'Any Time Allowed *' },
                    { key: 'visitorsAllowed', label: 'Visitors Allowed *' },
                    { key: 'guardianAllowed', label: 'Guardian Allowed *' },
                    { key: 'drinkingAllowed', label: 'Drinking Allowed *' },
                    { key: 'smokingAllowed', label: 'Smoking Allowed *' },
                  ].map((rule) => {
                    const isYes = Boolean(formData.pgRules?.[rule.key]);
                    return (
                      <div key={rule.key}>
                        <label className="form-label" style={{ fontSize: '0.875rem' }}>{rule.label}</label>
                        <div style={{ display: 'flex', gap: '0.5rem', height: '42px' }}>
                          <button
                            type="button"
                            style={{
                              ...pillSelectStyle(isYes === true),
                              flex: 1,
                              justifyContent: 'center',
                              display: 'flex',
                              alignItems: 'center',
                              fontWeight: 600,
                              borderRadius: 'var(--radius-sm)'
                            }}
                            onClick={() => setFormData({
                              ...formData,
                              pgRules: { ...formData.pgRules, [rule.key]: true }
                            })}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            style={{
                              ...pillSelectStyle(isYes === false),
                              flex: 1,
                              justifyContent: 'center',
                              display: 'flex',
                              alignItems: 'center',
                              fontWeight: 600,
                              borderRadius: 'var(--radius-sm)'
                            }}
                            onClick={() => setFormData({
                              ...formData,
                              pgRules: { ...formData.pgRules, [rule.key]: false }
                            })}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Common Areas Section */}
              <div className="card" style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                <label className="form-label" style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', display: 'block' }}>
                  Common Areas *
                </label>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {[
                    'Living Room',
                    'Kitchen',
                    'Dining Hall',
                    'Study Room / Library',
                    'Breakout Room'
                  ].map((area) => {
                    const selectedList = Array.isArray(formData.commonAreas) ? formData.commonAreas : [];
                    const isSelected = selectedList.includes(area);
                    return (
                      <button
                        key={area}
                        type="button"
                        style={{
                          ...pillSelectStyle(isSelected),
                          padding: '0.625rem 1rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.375rem',
                          fontSize: '0.875rem',
                          borderRadius: 'var(--radius-sm)'
                        }}
                        onClick={() => {
                          const updated = isSelected
                            ? selectedList.filter((item) => item !== area)
                            : [...selectedList, area];
                          setFormData({ ...formData, commonAreas: updated });
                        }}
                      >
                        {isSelected && <Check size={14} color="var(--color-gold-700)" strokeWidth={3} />}
                        <span>{area}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Owner / Caretaker Details Section */}
              <div className="card" style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--color-navy-900)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                  OWNER / CARETAKER DETAILS
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label className="form-label">Property Managed By *</label>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {['Landlord', 'Caretaker', 'Dedicated Professional'].map((item) => (
                        <button
                          key={item}
                          type="button"
                          style={{
                            ...pillSelectStyle((formData.propertyManagedBy || 'Landlord') === item),
                            padding: '0.625rem 1rem',
                            fontWeight: 600,
                            borderRadius: 'var(--radius-sm)'
                          }}
                          onClick={() => setFormData({ ...formData, propertyManagedBy: item })}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Property Manager stays at Property *</label>
                    <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '320px', height: '44px' }}>
                      {[
                        { label: 'Yes', val: true },
                        { label: 'No', val: false }
                      ].map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          style={{
                            ...pillSelectStyle(formData.managerStaysAtProperty === item.val),
                            flex: 1,
                            justifyContent: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 600,
                            borderRadius: 'var(--radius-sm)'
                          }}
                          onClick={() => setFormData({ ...formData, managerStaysAtProperty: item.val })}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ROOM DETAILS SECTION (Images 1 & 2) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-navy-900)', margin: 0, textTransform: 'uppercase' }}>
                    ROOM DETAILS
                  </h3>
                </div>

                {(formData.pgRooms || []).map((room, index) => (
                  <div
                    key={room.id || index}
                    className="card"
                    style={{
                      padding: '1.5rem',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: '#FFFFFF',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.25rem'
                    }}
                  >
                    {/* Room Header with Delete Button */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.5rem' }}>
                      <h4 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--color-navy-900)', margin: 0 }}>
                        Room {index + 1}
                      </h4>
                      {(formData.pgRooms || []).length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleDeleteRoom(index)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#EF4444',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}
                        >
                          <Trash2 size={15} />
                          <span>Delete</span>
                        </button>
                      )}
                    </div>

                    {/* Room Type */}
                    <div>
                      <label className="form-label">Room Type *</label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.625rem' }}>
                        {['Private Room', 'Double Sharing', 'Triple Sharing', '3+ Sharing'].map((type) => (
                          <button
                            key={type}
                            type="button"
                            style={{
                              ...pillSelectStyle((room.roomType || 'Private Room') === type),
                              padding: '0.75rem 0.5rem',
                              justifyContent: 'center',
                              fontWeight: 600,
                              borderRadius: 'var(--radius-sm)'
                            }}
                            onClick={() => handleRoomChange(index, 'roomType', type)}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Total Beds in this Room (Optional) */}
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" htmlFor={`room-beds-${index}`}>Total Beds in this Room (Optional)</label>
                      <input
                        id={`room-beds-${index}`}
                        type="number"
                        min="1"
                        className="form-control"
                        placeholder="e.g. 2"
                        value={room.totalBeds || ''}
                        onChange={(e) => handleRoomChange(index, 'totalBeds', e.target.value)}
                      />
                    </div>

                    {/* Rent & Security Deposit */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-subgrid">
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" htmlFor={`room-rent-${index}`}>Rent (₹) *</label>
                        <input
                          id={`room-rent-${index}`}
                          type="number"
                          required
                          min="1"
                          className="form-control"
                          placeholder="e.g. 12000"
                          value={room.rent || ''}
                          onChange={(e) => {
                            handleRoomChange(index, 'rent', e.target.value);
                            if (index === 0 && (!formData.price || formData.price === room.rent)) {
                              setFormData((prev) => ({ ...prev, price: e.target.value }));
                            }
                          }}
                        />
                      </div>

                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" htmlFor={`room-sec-${index}`}>Security Deposit (₹) *</label>
                        <input
                          id={`room-sec-${index}`}
                          type="number"
                          required
                          min="0"
                          className="form-control"
                          placeholder="e.g. 12000"
                          value={room.securityDeposit || ''}
                          onChange={(e) => handleRoomChange(index, 'securityDeposit', e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Facilities Offered in Room */}
                    <div>
                      <label className="form-label" style={{ marginBottom: '0.625rem' }}>Facilities Offered</label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.625rem' }}>
                        {[
                          { id: 'AC', label: 'AC' },
                          { id: 'TV in Room', label: 'TV in Room' },
                          { id: 'Personal Cupboard', label: 'Personal Cupboard' },
                          { id: 'Table Chair', label: 'Table Chair' },
                          { id: 'Attached Balcony', label: 'Attached Balcony' },
                          { id: 'Attached Bathroom', label: 'Attached Bathroom' },
                          { id: 'Meals Included', label: 'Meals Included' },
                        ].map((fac) => {
                          const isSelected = Array.isArray(room.facilities) && room.facilities.includes(fac.id);
                          return (
                            <button
                              key={fac.id}
                              type="button"
                              style={{
                                ...pillSelectStyle(isSelected),
                                padding: '0.625rem 0.875rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.625rem',
                                justifyContent: 'flex-start',
                                borderRadius: 'var(--radius-sm)'
                              }}
                              onClick={() => handleRoomFacilityToggle(index, fac.id)}
                            >
                              <span
                                style={{
                                  width: '16px',
                                  height: '16px',
                                  borderRadius: '50%',
                                  border: isSelected ? '5px solid var(--color-gold-500)' : '2px solid #CBD5E1',
                                  backgroundColor: '#FFFFFF',
                                  display: 'inline-block',
                                  flexShrink: 0
                                }}
                              />
                              <span style={{ fontSize: '0.875rem' }}>{fac.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}

                {/* + Add Another Room Button */}
                <button
                  type="button"
                  onClick={handleAddRoom}
                  style={{
                    width: '100%',
                    padding: '0.875rem',
                    backgroundColor: '#FFFFFF',
                    border: '2px dashed #10B981',
                    color: '#059669',
                    fontWeight: 700,
                    fontSize: '0.9375rem',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Plus size={18} />
                  <span>+ Add Another Room</span>
                </button>
              </div>

              {/* PG AMENITIES SECTION (Images 3 & 4) */}
              <div className="card" style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-navy-900)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', margin: 0, textTransform: 'uppercase' }}>
                  AMENITIES & SERVICES
                </h3>

                {/* Security Amenities */}
                <div>
                  <label className="form-label" style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.75rem', display: 'block' }}>
                    Security Amenities
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.75rem' }}>
                    {[
                      { label: 'CCTV', icon: Camera },
                      { label: 'Gated Community', icon: Lock },
                      { label: 'Security', icon: ShieldCheck },
                      { label: 'Biometric', icon: Fingerprint }
                    ].map((item) => {
                      const isSelected = Array.isArray(formData.pgSecurityAmenities) && formData.pgSecurityAmenities.includes(item.label);
                      const IconComponent = item.icon;
                      return (
                        <button
                          key={item.label}
                          type="button"
                          style={{
                            ...pillSelectStyle(isSelected),
                            padding: '1rem 0.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            borderRadius: 'var(--radius-md)',
                            minHeight: '85px',
                            textAlign: 'center'
                          }}
                          onClick={() => handleToggleAmenityItem('pgSecurityAmenities', item.label)}
                        >
                          <IconComponent size={22} color={isSelected ? 'var(--color-gold-700)' : '#64748B'} />
                          <span style={{ fontSize: '0.8125rem' }}>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Furnishings in Property */}
                <div>
                  <label className="form-label" style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.75rem', display: 'block' }}>
                    Furnishings in Property
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.75rem' }}>
                    {[
                      { label: 'Fridge', icon: Home },
                      { label: 'Washing Machine', icon: Layers },
                      { label: 'Microwave', icon: Zap },
                      { label: 'Water Purifier', icon: Droplets },
                      { label: 'TT Table', icon: Sliders },
                      { label: 'TV', icon: Tv },
                      { label: 'Coffee Machine', icon: Coffee },
                      { label: 'Snacks Machine', icon: Utensils }
                    ].map((item) => {
                      const isSelected = Array.isArray(formData.pgFurnishings) && formData.pgFurnishings.includes(item.label);
                      const IconComponent = item.icon;
                      return (
                        <button
                          key={item.label}
                          type="button"
                          style={{
                            ...pillSelectStyle(isSelected),
                            padding: '1rem 0.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            borderRadius: 'var(--radius-md)',
                            minHeight: '85px',
                            textAlign: 'center'
                          }}
                          onClick={() => handleToggleAmenityItem('pgFurnishings', item.label)}
                        >
                          <IconComponent size={22} color={isSelected ? 'var(--color-gold-700)' : '#64748B'} />
                          <span style={{ fontSize: '0.8125rem' }}>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Services */}
                <div>
                  <label className="form-label" style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.75rem', display: 'block' }}>
                    Services
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem' }}>
                    {[
                      { label: 'Laundry', icon: Shirt },
                      { label: 'Housekeeping', icon: Sparkles },
                      { label: 'Internet/Wi-Fi Connectivity', icon: Wifi }
                    ].map((item) => {
                      const isSelected = Array.isArray(formData.pgServices) && formData.pgServices.includes(item.label);
                      const IconComponent = item.icon;
                      return (
                        <button
                          key={item.label}
                          type="button"
                          style={{
                            ...pillSelectStyle(isSelected),
                            padding: '1rem 0.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            borderRadius: 'var(--radius-md)',
                            minHeight: '85px',
                            textAlign: 'center'
                          }}
                          onClick={() => handleToggleAmenityItem('pgServices', item.label)}
                        >
                          <IconComponent size={22} color={isSelected ? 'var(--color-gold-700)' : '#64748B'} />
                          <span style={{ fontSize: '0.8125rem' }}>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Top Amenities */}
                <div>
                  <label className="form-label" style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.75rem', display: 'block' }}>
                    Top Amenities
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.75rem' }}>
                    {[
                      { label: 'Gym', icon: Dumbbell },
                      { label: 'Lift', icon: ArrowUpDown },
                      { label: 'Regular Water Supply', icon: Droplets },
                      { label: 'Swimming Pool', icon: Waves },
                      { label: 'Reserved Parking', icon: Car },
                      { label: 'Power Backup', icon: BatteryCharging }
                    ].map((item) => {
                      const isSelected = Array.isArray(formData.pgTopAmenities) && formData.pgTopAmenities.includes(item.label);
                      const IconComponent = item.icon;
                      return (
                        <button
                          key={item.label}
                          type="button"
                          style={{
                            ...pillSelectStyle(isSelected),
                            padding: '1rem 0.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            borderRadius: 'var(--radius-md)',
                            minHeight: '85px',
                            textAlign: 'center'
                          }}
                          onClick={() => handleToggleAmenityItem('pgTopAmenities', item.label)}
                        >
                          <IconComponent size={22} color={isSelected ? 'var(--color-gold-700)' : '#64748B'} />
                          <span style={{ fontSize: '0.8125rem' }}>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* OTHER PG DETAILS SECTION (Image 5) */}
              <div className="card" style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-navy-900)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', margin: 0, textTransform: 'uppercase' }}>
                  OTHER PG DETAILS
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }} className="form-triplegrid">
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="pg-movein">Onetime Move in Charges (Optional)</label>
                    <input
                      id="pg-movein"
                      type="number"
                      min="0"
                      className="form-control"
                      placeholder="e.g. 2000"
                      value={formData.onetimeMoveInCharges}
                      onChange={(e) => setFormData({ ...formData, onetimeMoveInCharges: e.target.value })}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="pg-mealcharge">Meal Charges per Month (Optional)</label>
                    <input
                      id="pg-mealcharge"
                      type="number"
                      min="0"
                      className="form-control"
                      placeholder="e.g. 3000"
                      value={formData.mealChargesPerMonth}
                      onChange={(e) => setFormData({ ...formData, mealChargesPerMonth: e.target.value })}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="pg-eleccharge">Electricity Charges per Month (Optional)</label>
                    <input
                      id="pg-eleccharge"
                      type="number"
                      min="0"
                      className="form-control"
                      placeholder="e.g. 1000"
                      value={formData.electricityChargesPerMonth}
                      onChange={(e) => setFormData({ ...formData, electricityChargesPerMonth: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
                    <label className="form-label" htmlFor="pg-addinfo" style={{ margin: 0 }}>Add Additional Information (Optional)</label>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {(formData.additionalInfo || '').length} / 1500
                    </span>
                  </div>
                  <textarea
                    id="pg-addinfo"
                    rows={3}
                    maxLength={1500}
                    className="form-control"
                    placeholder="Any special house rules, gate timings, nearby metro stations, meal timings, or special facilities..."
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Residential Specifics (Hidden for PG / Co-living) */}
          {formData.listingType !== 'PG_CO_LIVING' && (
            <>
              {/* Property Category Selection & BHK Options */}
              <div>
                <label className="form-label">Property Category *</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: !['PLOT', 'RETAIL_SHOP'].includes(formData.propertyType) && Boolean(formData.propertyType) ? '1.25rem' : '0' }}>
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

                {/* BHK Selection directly below Property Category (Hidden only for Plot, Retail Shop) */}
                {!['PLOT', 'RETAIL_SHOP'].includes(formData.propertyType) && Boolean(formData.propertyType) && (
                  <div>
                    <label className="form-label">BHK Configuration *</label>

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

              {/* Area & Listing Specifics */}
              {formData.listingType === 'SALE' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
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

                  {/* Transaction Type */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Transaction Type *</label>
                    <div style={{ display: 'flex', gap: '0.75rem', height: '44px' }}>
                      {[
                        { value: 'New Booking', label: 'New Booking' },
                        { value: 'Resale', label: 'Resale' }
                      ].map((item) => (
                        <button
                          key={item.value}
                          type="button"
                          style={{
                            ...pillSelectStyle((formData.transactionType || 'Resale') === item.value),
                            flex: 1,
                            padding: '0.625rem 0.5rem',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            justifyContent: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: 'var(--radius-sm)'
                          }}
                          onClick={() => setFormData({ ...formData, transactionType: item.value })}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Construction Status */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Construction Status *</label>
                    <div style={{ display: 'flex', gap: '0.75rem', height: '44px' }}>
                      {[
                        { value: 'Ready to Move', label: 'Ready to Move' },
                        { value: 'Under Construction', label: 'Under Construction' }
                      ].map((item) => (
                        <button
                          key={item.value}
                          type="button"
                          style={{
                            ...pillSelectStyle((formData.constructionStatus || 'Ready to Move') === item.value),
                            flex: 1,
                            padding: '0.625rem 0.5rem',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            justifyContent: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: 'var(--radius-sm)',
                            whiteSpace: 'nowrap'
                          }}
                          onClick={() => {
                            const newStatus = item.value;
                            setFormData({
                              ...formData,
                              constructionStatus: newStatus,
                              propertyAge: newStatus === 'Under Construction' ? 'Under Construction' : (formData.propertyAge === 'Under Construction' ? '' : formData.propertyAge)
                            });
                          }}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Age of Property - appears below when Ready to Move */}
                  {(formData.constructionStatus || 'Ready to Move') === 'Ready to Move' && (
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" htmlFor="prop-age">Age of Property (in years) *</label>
                      <select
                        id="prop-age"
                        className="form-control"
                        value={formData.propertyAge === 'Under Construction' ? '' : formData.propertyAge}
                        onChange={(e) => setFormData({ ...formData, propertyAge: e.target.value })}
                      >
                        <option value="">Select Age of Property</option>
                        <option value="0-1 Years">0-1 Years (Brand New / Ready)</option>
                        <option value="1-5 Years">1-5 Years</option>
                        <option value="5-10 Years">5-10 Years</option>
                        <option value="10+ Years">10+ Years</option>
                      </select>
                    </div>
                  )}
                </div>
              ) : (
                /* Area Grid for Rent */
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
                      <option value="">Select Age of Property</option>
                      <option value="Under Construction">Under Construction</option>
                      <option value="0-1 Years">0-1 Years (Brand New)</option>
                      <option value="1-5 Years">1-5 Years</option>
                      <option value="5-10 Years">5-10 Years</option>
                      <option value="10+ Years">10+ Years</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Bathrooms & Balconies */}
              {!['PLOT', 'RETAIL_SHOP'].includes(formData.propertyType) && (() => {
                const bhkNum = parseInt(formData.bedrooms, 10);
                const maxOptions = !isNaN(bhkNum) && bhkNum > 0 ? bhkNum + 1 : 4;
                const optionList = Array.from({ length: maxOptions + 1 }, (_, i) => String(i));

                return (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }} className="form-subgrid">
                    {/* Bathrooms */}
                    <div>
                      <label className="form-label">Bathrooms *</label>
                      <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                        {optionList.map((n) => (
                          <button
                            key={n}
                            type="button"
                            style={chipBoxStyle(formData.bathrooms === n)}
                            onClick={() => setFormData({ ...formData, bathrooms: n })}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Balconies */}
                    <div>
                      <label className="form-label">Balconies *</label>
                      <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                        {optionList.map((n) => (
                          <button
                            key={n}
                            type="button"
                            style={chipBoxStyle(formData.balconies === n)}
                            onClick={() => setFormData({ ...formData, balconies: n })}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Furnishing & Floors */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '1rem' }} className="form-triplegrid">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                    <label className="form-label" style={{ margin: 0 }}>Furnish Type *</label>
                    {formData.furnished && formData.furnished !== 'UNFURNISHED' && (
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
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.375rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <label className="form-label" style={{ margin: 0 }}>Covered Parking Slots *</label>
                    {showMoreCoveredParking && (
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        style={{ padding: '0.1rem 0.4rem', fontSize: '0.75rem', color: 'var(--color-gold-600)', fontWeight: 600 }}
                        onClick={() => setShowMoreCoveredParking(false)}
                      >
                        ← Standard (0-4)
                      </button>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                    {['0', '1', '2', '3'].map((n) => (
                      <button
                        key={n}
                        type="button"
                        style={chipBoxStyle(formData.coveredParking === n)}
                        onClick={() => setFormData({ ...formData, coveredParking: n })}
                      >
                        {n}
                      </button>
                    ))}

                    {!showMoreCoveredParking && (
                      <button
                        type="button"
                        style={chipBoxStyle(Number(formData.coveredParking) >= 4)}
                        onClick={() => {
                          setShowMoreCoveredParking(true);
                          if (!formData.coveredParking || Number(formData.coveredParking) < 4) {
                            setFormData({ ...formData, coveredParking: '4' });
                          }
                        }}
                      >
                        {Number(formData.coveredParking) >= 4 ? `${formData.coveredParking} (4+)` : '4+'}
                      </button>
                    )}

                    {showMoreCoveredParking && ['4', '5', '6', '7', '8', '9'].map((n) => (
                      <button
                        key={n}
                        type="button"
                        style={chipBoxStyle(formData.coveredParking === n)}
                        onClick={() => setFormData({ ...formData, coveredParking: n })}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Open Parking */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.375rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <label className="form-label" style={{ margin: 0 }}>Open Parking Slots *</label>
                    {showMoreOpenParking && (
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        style={{ padding: '0.1rem 0.4rem', fontSize: '0.75rem', color: 'var(--color-gold-600)', fontWeight: 600 }}
                        onClick={() => setShowMoreOpenParking(false)}
                      >
                        ← Standard (0-4)
                      </button>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                    {['0', '1', '2', '3'].map((n) => (
                      <button
                        key={n}
                        type="button"
                        style={chipBoxStyle(formData.openParking === n)}
                        onClick={() => setFormData({ ...formData, openParking: n })}
                      >
                        {n}
                      </button>
                    ))}

                    {!showMoreOpenParking && (
                      <button
                        type="button"
                        style={chipBoxStyle(Number(formData.openParking) >= 4)}
                        onClick={() => {
                          setShowMoreOpenParking(true);
                          if (!formData.openParking || Number(formData.openParking) < 4) {
                            setFormData({ ...formData, openParking: '4' });
                          }
                        }}
                      >
                        {Number(formData.openParking) >= 4 ? `${formData.openParking} (4+)` : '4+'}
                      </button>
                    )}

                    {showMoreOpenParking && ['4', '5', '6', '7', '8', '9'].map((n) => (
                      <button
                        key={n}
                        type="button"
                        style={chipBoxStyle(formData.openParking === n)}
                        onClick={() => setFormData({ ...formData, openParking: n })}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preferred Tenants & Pet Friendly (Rent only) */}
              {formData.listingType === 'RENT' && (
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', alignItems: 'center' }} className="form-subgrid">
                  <div>
                    <label className="form-label">Preferred Tenant Type</label>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {['Family', 'Bachelors', 'Company'].map((t) => {
                        const currentList = Array.isArray(formData.preferredTenant)
                          ? formData.preferredTenant
                          : (formData.preferredTenant ? formData.preferredTenant.split(',').map((s) => s.trim()).filter(Boolean) : []);
                        const isSelected = currentList.includes(t);
                        return (
                          <button
                            key={t}
                            type="button"
                            style={{
                              ...pillSelectStyle(isSelected),
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.375rem',
                            }}
                            onClick={() => {
                              const exists = currentList.includes(t);
                              const updated = exists
                                ? currentList.filter((item) => item !== t)
                                : [...currentList, t];
                              setFormData({ ...formData, preferredTenant: updated });
                            }}
                          >
                            {isSelected && <Check size={14} color="var(--color-gold-700)" strokeWidth={3} />}
                            <span>{t}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Bachelor Preference Options */}
                    {(Array.isArray(formData.preferredTenant) ? formData.preferredTenant.includes('Bachelors') : (formData.preferredTenant || '').includes('Bachelors')) && (
                      <div style={{ marginTop: '0.875rem' }}>
                        <label className="form-label" style={{ fontSize: '0.8125rem', marginBottom: '0.375rem', color: 'var(--text-secondary)' }}>
                          Select your preference for bachelors
                        </label>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {[
                            { id: 'Open for both', label: 'Open for both' },
                            { id: 'Men Only', label: 'Men Only' },
                            { id: 'Women Only', label: 'Women Only' },
                          ].map((b) => (
                            <button
                              key={b.id}
                              type="button"
                              style={{
                                ...pillSelectStyle(formData.bachelorPreference === b.id),
                                padding: '0.5rem 0.875rem',
                                fontSize: '0.8125rem',
                              }}
                              onClick={() => setFormData({ ...formData, bachelorPreference: b.id })}
                            >
                              {b.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
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
              )}
            </>
          )}

          {/* Pricing & Commercials */}
          {formData.listingType === 'SALE' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-subgrid">
                {/* Expected Sale Price */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="prop-price">Expected Sale Price (₹) *</label>
                  <input
                    id="prop-price"
                    type="number"
                    required
                    min="1"
                    step="any"
                    className="form-control"
                    placeholder="e.g. 15000000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>

                {/* Maintenance Charges Input Box */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="prop-maint">Maintenance Charges (₹)</label>
                  <input
                    id="prop-maint"
                    type="number"
                    min="0"
                    className="form-control"
                    placeholder="e.g. 3500 (Monthly Maintenance)"
                    value={formData.maintenanceAmount || ''}
                    onChange={(e) => setFormData({ ...formData, maintenanceAmount: e.target.value, maintenanceCharges: e.target.value })}
                  />
                </div>
              </div>

              {/* Brokerage for Sale */}
              <div>
                <label className="form-label">Do you charge brokerage? *</label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: formData.brokerage === 'Custom' ? '0.5rem' : '0' }}>
                  {['None', '1%', '2%', 'Custom'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      style={pillSelectStyle(formData.brokerage === b)}
                      onClick={() => setFormData({ ...formData, brokerage: formData.brokerage === b ? '' : b })}
                    >
                      {b}
                    </button>
                  ))}
                </div>
                {formData.brokerage === 'Custom' && (
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. 1.5% or ₹50,000"
                    value={formData.brokerageCustom}
                    onChange={(e) => setFormData({ ...formData, brokerageCustom: e.target.value })}
                  />
                )}
              </div>
            </div>
          ) : formData.listingType === 'PG_CO_LIVING' ? (
            /* PG / Co-living Pricing */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-subgrid">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="prop-price">Monthly Rent / Starting Bed Price (₹) *</label>
                  <input
                    id="prop-price"
                    type="number"
                    required
                    min="1"
                    step="any"
                    className="form-control"
                    placeholder="e.g. 12000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="prop-maint-pg">Maintenance Charges</label>
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
                      id="prop-maint-pg"
                      type="number"
                      className="form-control"
                      placeholder="Monthly Maintenance Amount (₹)"
                      value={formData.maintenanceAmount}
                      onChange={(e) => setFormData({ ...formData, maintenanceAmount: e.target.value })}
                    />
                  )}
                </div>
              </div>

              {/* Security Deposit & Brokerage for PG */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="form-subgrid">
                <div>
                  <label className="form-label">Security Deposit *</label>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: formData.securityDeposit === 'Custom' ? '0.5rem' : '0' }}>
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
                      placeholder="e.g. ₹15,000"
                      value={formData.securityDepositCustom}
                      onChange={(e) => setFormData({ ...formData, securityDepositCustom: e.target.value })}
                    />
                  )}
                </div>

                <div>
                  <label className="form-label">Do you charge brokerage? *</label>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: formData.brokerage === 'Custom' ? '0.5rem' : '0' }}>
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
                  {formData.brokerage === 'Custom' && (
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. ₹5,000"
                      value={formData.brokerageCustom}
                      onChange={(e) => setFormData({ ...formData, brokerageCustom: e.target.value })}
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Rent Commercials */
            <>
              {/* Price & Available From */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-subgrid">
                <div className="form-group">
                  <label className="form-label" htmlFor="prop-price">Monthly Rent (₹) *</label>
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
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: formData.lockInPeriod === 'Custom' ? '0.5rem' : '0' }}>
                    {['None', '15 Days', '30 Days', '1 month', '6 month', '11 month', 'Custom'].map((l) => (
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
                  {formData.lockInPeriod === 'Custom' && (
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. 45 Days, 2 Year"
                      value={formData.lockInPeriodCustom}
                      onChange={(e) => setFormData({ ...formData, lockInPeriodCustom: e.target.value })}
                    />
                  )}
                </div>

                <div>
                  <label className="form-label">Do you charge brokerage? *</label>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: formData.brokerage === 'Custom' ? '0.5rem' : '0' }}>
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
                  {formData.brokerage === 'Custom' && (
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. 2% or 1 Month"
                      value={formData.brokerageCustom}
                      onChange={(e) => setFormData({ ...formData, brokerageCustom: e.target.value })}
                    />
                  )}
                </div>
              </div>
            </>
          )}

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
