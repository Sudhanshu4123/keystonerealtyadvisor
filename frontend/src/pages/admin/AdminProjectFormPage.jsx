import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Building2, Save, ArrowLeft, Plus, Trash2, Check,
  MapPin, IndianRupee, ShieldCheck, FileText, Camera,
  Sparkles, Layers, Video, FileCheck, CheckCircle2, Star,
  Lock, Fingerprint, Dumbbell, ArrowUpDown, Droplets,
  Waves, Car, BatteryCharging, Zap, Shield, Home,
  Wifi, Coffee, Sliders, Activity, Sun, Heart
} from 'lucide-react';
import { projectService } from '../../services/projectService';
import { useToast } from '../../hooks/useToast';
import ImageUploader from '../../components/admin/ImageUploader';

const AMENITY_SECTIONS = [
  {
    title: 'Security Amenities',
    items: [
      { label: 'CCTV', icon: Camera },
      { label: 'Gated Community', icon: Lock },
      { label: 'Security', icon: ShieldCheck },
      { label: 'Biometric', icon: Fingerprint },
      { label: 'Intercom', icon: Shield },
    ]
  },
  {
    title: 'Top Amenities',
    items: [
      { label: 'Gym', icon: Dumbbell },
      { label: 'Lift', icon: ArrowUpDown },
      { label: 'Regular Water Supply', icon: Droplets },
      { label: 'Swimming Pool', icon: Waves },
      { label: 'Reserved Parking', icon: Car },
      { label: 'Power Backup', icon: BatteryCharging },
      { label: 'Clubhouse', icon: Building2 },
      { label: 'Park / Garden', icon: Sparkles },
      { label: 'Kids Play Area', icon: Home },
      { label: 'Jogging Track', icon: Activity },
    ]
  },
  {
    title: 'Recreation & Sports',
    items: [
      { label: 'Tennis Court', icon: Sliders },
      { label: 'Badminton Court', icon: Activity },
      { label: 'TT Table', icon: Sliders },
      { label: 'Party Hall', icon: Sparkles },
      { label: 'Spa & Wellness', icon: Heart },
      { label: 'Yoga Deck', icon: Sun },
    ]
  },
  {
    title: 'Services & Infrastructure',
    items: [
      { label: 'EV Charging', icon: BatteryCharging },
      { label: 'Rainwater Harvesting', icon: Droplets },
      { label: 'Solar Lighting', icon: Sun },
      { label: 'Internet/Wi-Fi Connectivity', icon: Wifi },
      { label: 'Cafeteria & Lounge', icon: Coffee },
    ]
  }
];

export default function AdminProjectFormPage() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { success, error, info } = useToast();

  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);

  // Core Form Data
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    projectType: 'RESIDENTIAL',
    status: 'UNDER_CONSTRUCTION',
    shortDescription: '',
    description: '',
    builderName: '',
    reraNumber: '',
    possessionDate: '',
    launchDate: '',
    // Location
    address: '',
    locality: '',
    city: '',
    state: 'Haryana',
    country: 'India',
    pincode: '',
    latitude: '',
    longitude: '',
    mapUrl: '',
    // Pricing
    minPrice: '',
    maxPrice: '',
    pricePerSqft: '',
    priceType: 'Base Price',
    maintenanceCharges: '',
    bookingAmount: '',
    // Media & SEO
    coverImageUrl: '',
    seoTitle: '',
    seoDescription: '',
    isFeatured: false,
  });

  const [projectCategory, setProjectCategory] = useState('Residential Property');

  // Images state
  const [existingImages, setExistingImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Selected Amenities (names)
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [customAmenityInput, setCustomAmenityInput] = useState('');

  // Highlights list
  const [highlightsList, setHighlightsList] = useState([]);
  const [newHighlightTitle, setNewHighlightTitle] = useState('');
  const [newHighlightDesc, setNewHighlightDesc] = useState('');

  // Configurations list
  const [configurationsList, setConfigurationsList] = useState([]);
  const [newConfig, setNewConfig] = useState({
    name: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    areaUnit: 'SQFT',
    price: '',
    availabilityStatus: 'Available'
  });

  // Videos
  const [videoList, setVideoList] = useState([]);
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newVideoTitle, setNewVideoTitle] = useState('');

  // Brochure
  const [brochureFile, setBrochureFile] = useState(null);
  const [existingDocuments, setExistingDocuments] = useState([]);

  // Pill button styling helper
  const pillSelectStyle = (isActive) => ({
    padding: '0.5rem 1.25rem',
    borderRadius: 'var(--radius-full)',
    border: isActive ? '1.5px solid var(--color-gold-500)' : '1px solid var(--border-color)',
    backgroundColor: isActive ? '#FEF3C7' : '#FFFFFF',
    color: isActive ? 'var(--color-gold-700)' : 'var(--text-primary)',
    fontWeight: isActive ? 600 : 500,
    fontSize: '0.875rem',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
  });

  // Load project details if in Edit Mode
  useEffect(() => {
    if (isEditMode) {
      const fetchProjectDetails = async () => {
        setLoading(true);
        try {
          const res = await projectService.getAdminProjectById(id);
          const data = res?.data || res;
          if (data) {
            setFormData({
              name: data.name || '',
              slug: data.slug || '',
              projectType: data.projectType || 'RESIDENTIAL',
              status: data.status || 'UNDER_CONSTRUCTION',
              shortDescription: data.shortDescription || '',
              description: data.description || '',
              builderName: data.builderName || '',
              reraNumber: data.reraNumber || '',
              possessionDate: data.possessionDate || '',
              launchDate: data.launchDate || '',
              address: data.address || '',
              locality: data.locality || '',
              city: data.city || '',
              state: data.state || 'Haryana',
              country: data.country || 'India',
              pincode: data.pincode || '',
              latitude: data.latitude != null ? String(data.latitude) : '',
              longitude: data.longitude != null ? String(data.longitude) : '',
              mapUrl: data.mapUrl || '',
              minPrice: data.minPrice != null ? String(data.minPrice) : '',
              maxPrice: data.maxPrice != null ? String(data.maxPrice) : '',
              pricePerSqft: data.pricePerSqft != null ? String(data.pricePerSqft) : '',
              priceType: data.priceType || 'Base Price',
              maintenanceCharges: data.maintenanceCharges || '',
              bookingAmount: data.bookingAmount || '',
              coverImageUrl: data.coverImageUrl || '',
              seoTitle: data.seoTitle || '',
              seoDescription: data.seoDescription || '',
              isFeatured: Boolean(data.isFeatured),
            });

            const currentType = data.projectType || 'RESIDENTIAL';
            if (['COMMERCIAL', 'MIXED_USE', 'INDUSTRIAL'].includes(currentType)) {
              setProjectCategory('Commercial Property');
            } else {
              setProjectCategory('Residential Property');
            }

            setExistingImages(data.images || []);
            setExistingDocuments(data.documents || []);
            setVideoList(data.videos || []);
            setConfigurationsList(data.configurations || []);
            setHighlightsList(data.highlights || []);

            // Set amenities
            if (data.amenities && Array.isArray(data.amenities)) {
              setSelectedAmenities(data.amenities.map(a => a.name));
            }
          }
        } catch (err) {
          error('Failed to load project details.');
        } finally {
          setLoading(false);
        }
      };

      fetchProjectDetails();
    }
  }, [id, isEditMode]);

  // Handle image deletions
  const handleDeleteImage = async (imageId) => {
    if (!id) return;
    try {
      await projectService.deleteProjectImage(imageId);
      setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
      success('Image removed.');
    } catch (err) {
      error('Failed to delete image.');
    }
  };

  // Handle set primary/cover image
  const handleSetPrimary = async (imageId) => {
    if (!id) return;
    try {
      await projectService.setProjectCoverImage(id, imageId);
      setExistingImages((prev) =>
        prev.map((img) => ({
          ...img,
          isPrimary: img.id === imageId || img.isCover,
          isCover: img.id === imageId,
        }))
      );
      success('Cover image updated.');
    } catch (err) {
      error('Failed to set cover image.');
    }
  };

  // Amenities toggle
  const toggleAmenity = (name) => {
    setSelectedAmenities((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]
    );
  };

  const handleAddCustomAmenity = () => {
    if (!customAmenityInput.trim()) return;
    const name = customAmenityInput.trim();
    if (!selectedAmenities.includes(name)) {
      setSelectedAmenities((prev) => [...prev, name]);
    }
    setCustomAmenityInput('');
  };

  // Highlights handlers
  const handleAddHighlightItem = () => {
    if (!newHighlightTitle.trim()) return;
    setHighlightsList((prev) => [
      ...prev,
      { title: newHighlightTitle.trim(), description: newHighlightDesc.trim() }
    ]);
    setNewHighlightTitle('');
    setNewHighlightDesc('');
  };

  const handleRemoveHighlightItem = async (index, highlightObj) => {
    if (highlightObj?.id && isEditMode) {
      try {
        await projectService.deleteHighlight(highlightObj.id);
      } catch (e) {
        error('Failed to delete highlight.');
        return;
      }
    }
    setHighlightsList((prev) => prev.filter((_, i) => i !== index));
  };

  // Configurations handlers
  const handleAddConfigItem = () => {
    if (!newConfig.name.trim()) {
      error('Configuration name (e.g. 3 BHK Luxury) is required.');
      return;
    }
    setConfigurationsList((prev) => [...prev, { ...newConfig }]);
    setNewConfig({
      name: '',
      bedrooms: '',
      bathrooms: '',
      area: '',
      areaUnit: 'SQFT',
      price: '',
      availabilityStatus: 'Available'
    });
  };

  const handleRemoveConfigItem = async (index, configObj) => {
    if (configObj?.id && isEditMode) {
      try {
        await projectService.deleteConfiguration(configObj.id);
      } catch (e) {
        error('Failed to delete configuration.');
        return;
      }
    }
    setConfigurationsList((prev) => prev.filter((_, i) => i !== index));
  };

  // Video handlers
  const handleAddVideoItem = () => {
    if (!newVideoUrl.trim()) return;
    setVideoList((prev) => [
      ...prev,
      { title: newVideoTitle.trim() || 'Project Video Walkthrough', videoUrl: newVideoUrl.trim(), videoType: 'YOUTUBE' }
    ]);
    setNewVideoUrl('');
    setNewVideoTitle('');
  };

  const handleRemoveVideoItem = async (index, videoObj) => {
    if (videoObj?.id && isEditMode) {
      try {
        await projectService.deleteVideo(videoObj.id);
      } catch (e) {
        error('Failed to delete video.');
        return;
      }
    }
    setVideoList((prev) => prev.filter((_, i) => i !== index));
  };

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      error('Please enter the Project Name.');
      return;
    }
    if (!formData.locality.trim() || !formData.city.trim()) {
      error('Please enter City and Locality.');
      return;
    }

    const payload = {
      ...formData,
      name: formData.name.trim(),
      slug: formData.slug.trim() || undefined,
      minPrice: formData.minPrice ? parseFloat(formData.minPrice) : null,
      maxPrice: formData.maxPrice ? parseFloat(formData.maxPrice) : null,
      pricePerSqft: formData.pricePerSqft ? parseFloat(formData.pricePerSqft) : null,
      latitude: formData.latitude ? parseFloat(formData.latitude) : null,
      longitude: formData.longitude ? parseFloat(formData.longitude) : null,
    };

    setSubmitting(true);
    try {
      let projectId = id;

      if (isEditMode) {
        await projectService.updateProject(id, payload);
        success('Project updated successfully.');
      } else {
        const res = await projectService.createProject(payload);
        const created = res?.data || res;
        projectId = created.id;
        success('Project created successfully.');
      }

      // Upload Images if any selected
      if (selectedFiles.length > 0 && projectId) {
        setUploadingImages(true);
        try {
          await projectService.uploadProjectImages(projectId, selectedFiles, 'GALLERY', true);
          success('Images uploaded successfully.');
        } catch (imgErr) {
          error('Project saved, but some images failed to upload.');
        }
      }

      // Upload Brochure Document if selected
      if (brochureFile && projectId) {
        try {
          const docData = new FormData();
          docData.append('file', brochureFile);
          docData.append('documentName', `${formData.name} Brochure`);
          docData.append('documentType', 'BROCHURE');
          docData.append('isPublic', true);
          await projectService.uploadProjectDocument(projectId, docData);
        } catch (docErr) {
          // non-critical
        }
      }

      // Save Amenities if new project
      if (!isEditMode && projectId && selectedAmenities.length > 0) {
        for (const amenName of selectedAmenities) {
          try {
            await projectService.addAmenity(projectId, { name: amenName, category: 'RECREATION' });
          } catch (e) {
            // ignore item error
          }
        }
      }

      // Save Highlights if new project
      if (!isEditMode && projectId && highlightsList.length > 0) {
        for (const hl of highlightsList) {
          try {
            await projectService.addHighlight(projectId, hl);
          } catch (e) {
            // ignore
          }
        }
      }

      // Save Configurations if new project
      if (!isEditMode && projectId && configurationsList.length > 0) {
        for (const cfg of configurationsList) {
          try {
            await projectService.addConfiguration(projectId, {
              ...cfg,
              bedrooms: cfg.bedrooms ? parseInt(cfg.bedrooms, 10) : null,
              bathrooms: cfg.bathrooms ? parseInt(cfg.bathrooms, 10) : null,
              area: cfg.area ? parseFloat(cfg.area) : null,
              price: cfg.price ? parseFloat(cfg.price) : null,
            });
          } catch (e) {
            // ignore
          }
        }
      }

      // Save Videos if new project
      if (!isEditMode && projectId && videoList.length > 0) {
        for (const v of videoList) {
          try {
            await projectService.addVideo(projectId, v);
          } catch (e) {
            // ignore
          }
        }
      }

      navigate('/admin/projects');
    } catch (err) {
      error(err.response?.data?.message || err.message || 'Failed to save project.');
    } finally {
      setSubmitting(false);
      setUploadingImages(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div style={{ fontSize: '1.125rem', color: 'var(--text-secondary)' }}>
          Loading project data...
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1.5rem 1rem 4rem' }}>
      
      {/* Top Back Navigation */}
      <div style={{ marginBottom: '1.5rem' }}>
        <Link
          to="/admin/projects"
          className="btn btn-outline btn-sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <ArrowLeft size={16} />
          <span>Back to Projects</span>
        </Link>
      </div>

      {/* SINGLE UNIFIED WHITE CARD CONTAINER */}
      <div
        className="card"
        style={{
          padding: '2.5rem',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          borderRadius: 'var(--radius-lg)'
        }}
      >
        {/* Header Title */}
        <div style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ color: 'var(--color-gold-600)', fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Project Management
              </span>
              <h1 style={{ fontSize: '1.625rem', fontWeight: 700, margin: '0.25rem 0 0' }}>
                {isEditMode ? `Edit Project: ${formData.name || `#${id}`}` : 'Create Real Estate Project'}
              </h1>
            </div>
            <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '0.375rem 0.875rem', borderRadius: 'var(--radius-full)', fontSize: '0.8125rem', fontWeight: 600 }}>
              {formData.status?.replace(/_/g, ' ') || 'UNDER CONSTRUCTION'}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          {/* 1. PROJECT CATEGORY & SUB CATEGORY */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div>
              <label className="form-label" style={{ fontWeight: 600, marginBottom: '0.5rem', display: 'block', color: 'var(--text-primary)' }}>
                Project Category : *
              </label>
              <select
                className="form-control"
                value={projectCategory}
                onChange={(e) => {
                  const cat = e.target.value;
                  setProjectCategory(cat);
                  if (cat === 'Commercial Property') {
                    setFormData({ ...formData, projectType: 'COMMERCIAL' });
                  } else if (cat === 'Residential Property') {
                    setFormData({ ...formData, projectType: 'RESIDENTIAL' });
                  } else {
                    setFormData({ ...formData, projectType: '' });
                  }
                }}
                style={{
                  width: '100%',
                  padding: '0.6875rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: '#FFFFFF',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                <option value="">Select Category</option>
                <option value="Residential Property">Residential Property</option>
                <option value="Commercial Property">Commercial Property</option>
              </select>
            </div>

            <div>
              <label className="form-label" style={{ fontWeight: 600, marginBottom: '0.5rem', display: 'block', color: 'var(--text-primary)' }}>
                Project Sub Category : *
              </label>
              <select
                className="form-control"
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                disabled={!projectCategory}
                style={{
                  width: '100%',
                  padding: '0.6875rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: !projectCategory ? 'var(--bg-secondary)' : '#FFFFFF',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: !projectCategory ? 'not-allowed' : 'pointer',
                  outline: 'none',
                }}
              >
                <option value="">Select Sub Category</option>
                {projectCategory === 'Residential Property' && (
                  <>
                    <option value="BUILDER_FLOOR">Builder Floor</option>
                    <option value="FARM_HOUSE">Farm House</option>
                    <option value="FLATS_APARTMENTS">Flats & Apartments</option>
                    <option value="INDEPENDENT_HOUSE">Independent House</option>
                    <option value="PENTHOUSE">Penthouse</option>
                    <option value="RESIDENTIAL_PLOT">Residential Plot</option>
                    <option value="STUDIO_APARTMENT">Studio Apartments</option>
                    <option value="VILLA">Villa</option>
                  </>
                )}
                {projectCategory === 'Commercial Property' && (
                  <>
                    <option value="AGRICULTURAL_LAND">Agricultural/Farm Land</option>
                    <option value="BANQUET_HALL">Banquet Hall & Guest House</option>
                    <option value="BUSINESS_CENTER">Business Center</option>
                    <option value="COMMERCIAL_LAND">Commercial Lands /Inst. Land</option>
                    <option value="COMMERCIAL_SHOPS">Commercial Shops</option>
                    <option value="FACTORY_INDUSTRIAL">Factory / Industrial Building</option>
                    <option value="HOTEL_RESTAURANT">Hotel & Restaurant</option>
                    <option value="INDUSTRIAL_LAND">Industrial Land / Plot</option>
                    <option value="OFFICE_SPACE">Office Space</option>
                    <option value="SHOWROOMS">Showrooms</option>
                    <option value="WAREHOUSE_GODOWN">Warehouse/Godown</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* 2. PROJECT STATUS */}
          <div>
            <label className="form-label" style={{ fontWeight: 600, marginBottom: '0.5rem', display: 'block', color: 'var(--text-primary)' }}>
              Construction & Launch Status : *
            </label>
            <select
              className="form-control"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              style={{
                width: '100%',
                maxWidth: '400px',
                padding: '0.6875rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: '#FFFFFF',
                fontSize: '0.875rem',
                fontWeight: 500,
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              <option value="UNDER_CONSTRUCTION">Under Construction</option>
              <option value="UPCOMING">New Launch / Upcoming</option>
              <option value="READY_TO_MOVE">Ready to Move</option>
            </select>
          </div>

          {/* 3. BASIC & DEVELOPER DETAILS */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Building2 size={18} color="var(--color-gold-600)" />
              <span>Project & Developer Details</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="proj-name">Project Name *</label>
                <input
                  id="proj-name"
                  type="text"
                  required
                  className="form-control"
                  placeholder="e.g. Keystone Skyvillas, Godrej Aristocrat"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="proj-builder">Builder / Developer Name</label>
                <input
                  id="proj-builder"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Keystone Developers, DLF, Godrej"
                  value={formData.builderName}
                  onChange={(e) => setFormData({ ...formData, builderName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="proj-rera">RERA Registration Number</label>
                <input
                  id="proj-rera"
                  type="text"
                  className="form-control"
                  placeholder="e.g. RC/REP/HARERA/GGM/2024/01"
                  value={formData.reraNumber}
                  onChange={(e) => setFormData({ ...formData, reraNumber: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="proj-launch">Launch Date</label>
                <input
                  id="proj-launch"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Q1 2024 or Jan 2024"
                  value={formData.launchDate}
                  onChange={(e) => setFormData({ ...formData, launchDate: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="proj-possession">Possession Date</label>
                <input
                  id="proj-possession"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Dec 2027 or Ready to Move"
                  value={formData.possessionDate}
                  onChange={(e) => setFormData({ ...formData, possessionDate: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Featured on Homepage?</label>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
                  <button
                    type="button"
                    style={pillSelectStyle(formData.isFeatured === true)}
                    onClick={() => setFormData({ ...formData, isFeatured: true })}
                  >
                    ⭐ Yes, Featured
                  </button>
                  <button
                    type="button"
                    style={pillSelectStyle(formData.isFeatured === false)}
                    onClick={() => setFormData({ ...formData, isFeatured: false })}
                  >
                    Standard
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 4. LOCATION DETAILS */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <MapPin size={18} color="var(--color-gold-600)" />
              <span>Location & Connectivity</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="proj-city">City *</label>
                <input
                  id="proj-city"
                  type="text"
                  required
                  className="form-control"
                  placeholder="e.g. Gurgaon, Delhi, Noida, Mumbai"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="proj-locality">Locality / Sector *</label>
                <input
                  id="proj-locality"
                  type="text"
                  required
                  className="form-control"
                  placeholder="e.g. Sector 54, Golf Course Extension Road"
                  value={formData.locality}
                  onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="proj-address">Full Address / Landmark</label>
                <input
                  id="proj-address"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Opp. Horizon Center, Golf Course Road"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="proj-state">State</label>
                <input
                  id="proj-state"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Haryana, Delhi NCR, Maharashtra"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="proj-pincode">Pincode</label>
                <input
                  id="proj-pincode"
                  type="text"
                  className="form-control"
                  placeholder="e.g. 122002"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="proj-mapurl">Google Map Link / Embed URL</label>
                <input
                  id="proj-mapurl"
                  type="url"
                  className="form-control"
                  placeholder="https://maps.google.com/..."
                  value={formData.mapUrl}
                  onChange={(e) => setFormData({ ...formData, mapUrl: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* 5. PRICING & FINANCIALS */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <IndianRupee size={18} color="var(--color-gold-600)" />
              <span>Pricing & Investment Range</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="proj-minprice">Starting / Minimum Price (₹)</label>
                <input
                  id="proj-minprice"
                  type="number"
                  className="form-control"
                  placeholder="e.g. 15000000 (1.5 Cr)"
                  value={formData.minPrice}
                  onChange={(e) => setFormData({ ...formData, minPrice: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="proj-maxprice">Maximum Price (₹)</label>
                <input
                  id="proj-maxprice"
                  type="number"
                  className="form-control"
                  placeholder="e.g. 45000000 (4.5 Cr)"
                  value={formData.maxPrice}
                  onChange={(e) => setFormData({ ...formData, maxPrice: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="proj-sqft">Price Per Sq.ft (₹)</label>
                <input
                  id="proj-sqft"
                  type="number"
                  className="form-control"
                  placeholder="e.g. 14500"
                  value={formData.pricePerSqft}
                  onChange={(e) => setFormData({ ...formData, pricePerSqft: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="proj-booking">Booking Amount</label>
                <input
                  id="proj-booking"
                  type="text"
                  className="form-control"
                  placeholder="e.g. 10 Lakhs or 10%"
                  value={formData.bookingAmount}
                  onChange={(e) => setFormData({ ...formData, bookingAmount: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="proj-maint">Maintenance Charges</label>
                <input
                  id="proj-maint"
                  type="text"
                  className="form-control"
                  placeholder="e.g. ₹4.5 / sqft/month"
                  value={formData.maintenanceCharges}
                  onChange={(e) => setFormData({ ...formData, maintenanceCharges: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* 6. OVERVIEW & DESCRIPTIONS */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <FileText size={18} color="var(--color-gold-600)" />
              <span>Overview & Description</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="proj-shortdesc">Short Tagline / Summary</label>
                <input
                  id="proj-shortdesc"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Ultra luxury 3 & 4 BHK residences with private terrace and panoramic Aravalli views"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="proj-desc">Detailed Project Description</label>
                <textarea
                  id="proj-desc"
                  rows={4}
                  className="form-control"
                  placeholder="Describe the architectural design, master plan, high-end specifications, neighborhood advantages, and lifestyle offerings..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* 7. PROJECT PHOTOS & VIDEOS UPLOADER */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Camera size={18} color="var(--color-gold-600)" />
              <span>Project Photos & Videos</span>
            </h3>

            <ImageUploader
              existingImages={existingImages}
              onFilesSelected={(files) => setSelectedFiles((prev) => [...prev, ...files])}
              onDeleteExisting={handleDeleteImage}
              onSetPrimary={handleSetPrimary}
              uploading={uploadingImages}
              title="Managed Project Photos & Videos"
            />

            {/* Selected new files preview badge list */}
            {selectedFiles.length > 0 && (
              <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-sm)', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>
                  Ready to upload ({selectedFiles.length} files selected):
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {selectedFiles.map((file, idx) => {
                    const isVid = file.type?.startsWith('video/') || /\.(mp4|mov|webm|mkv|avi|m4v)$/i.test(file.name);
                    return (
                      <div
                        key={idx}
                        style={{
                          fontSize: '0.75rem',
                          padding: '4px 8px',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #CBD5E1',
                          borderRadius: 'var(--radius-sm)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>{isVid ? '🎬' : '📷'} {file.name}</span>
                        <button
                          type="button"
                          onClick={() => setSelectedFiles((prev) => prev.filter((_, i) => i !== idx))}
                          style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontWeight: 700, padding: 0 }}
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 8. AMENITIES SELECTION */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                <Sparkles size={18} color="var(--color-gold-600)" />
                <span>Amenities & Lifestyle Features</span>
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>
                Select all applicable amenities and features for this development project
              </p>
            </div>

            {/* Categorized Icon Cards (Security, Top, Recreation, Infrastructure) */}
            {AMENITY_SECTIONS.map((section) => (
              <div key={section.title}>
                <label className="form-label" style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.75rem', display: 'block' }}>
                  {section.title}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.75rem' }}>
                  {section.items.map((item) => {
                    const isSelected = selectedAmenities.includes(item.label);
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={item.label}
                        type="button"
                        style={{
                          padding: '1rem 0.5rem',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          borderRadius: 'var(--radius-md)',
                          minHeight: '85px',
                          textAlign: 'center',
                          border: isSelected ? '1.5px solid var(--color-gold-500)' : '1px solid var(--border-color)',
                          backgroundColor: isSelected ? '#FEF3C7' : '#FFFFFF',
                          color: isSelected ? 'var(--color-gold-900)' : 'var(--text-primary)',
                          fontWeight: isSelected ? 600 : 500,
                          cursor: 'pointer',
                          transition: 'all var(--transition-fast)'
                        }}
                        onClick={() => toggleAmenity(item.label)}
                      >
                        <IconComponent size={24} color={isSelected ? 'var(--color-gold-700)' : '#64748B'} />
                        <span style={{ fontSize: '0.8125rem' }}>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Other / Custom Selected Amenities */}
            {selectedAmenities.filter(name => !AMENITY_SECTIONS.some(sec => sec.items.some(it => it.label === name))).length > 0 && (
              <div>
                <label className="form-label" style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'block' }}>
                  Other Selected Amenities
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {selectedAmenities
                    .filter(name => !AMENITY_SECTIONS.some(sec => sec.items.some(it => it.label === name)))
                    .map((name) => (
                      <div
                        key={name}
                        style={{
                          fontSize: '0.8125rem',
                          padding: '0.35rem 0.75rem',
                          backgroundColor: '#FEF3C7',
                          border: '1.5px solid var(--color-gold-500)',
                          borderRadius: 'var(--radius-full)',
                          color: 'var(--color-gold-900)',
                          fontWeight: 600,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>{name}</span>
                        <button
                          type="button"
                          onClick={() => toggleAmenity(name)}
                          style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontWeight: 700, padding: 0 }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Custom Amenity Adder */}
            <div>
              <label className="form-label" style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.375rem', display: 'block' }}>
                Add Custom Amenity
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '420px' }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Helipad, Golf Simulator, Infinity Pool..."
                  value={customAmenityInput}
                  onChange={(e) => setCustomAmenityInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCustomAmenity();
                    }
                  }}
                />
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={handleAddCustomAmenity}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  <Plus size={16} />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>

          {/* 9. KEY HIGHLIGHTS */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <ShieldCheck size={18} color="var(--color-gold-600)" />
              <span>Project Key Highlights</span>
            </h3>

            {highlightsList.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                {highlightsList.map((hl, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.625rem 1rem',
                      backgroundColor: '#F8FAFC',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{hl.title}</div>
                      {hl.description && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{hl.description}</div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveHighlightItem(idx, hl)}
                      style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', alignItems: 'end' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Highlight Title (e.g. 2 min to Rapid Metro)"
                  value={newHighlightTitle}
                  onChange={(e) => setNewHighlightTitle(e.target.value)}
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Short note (optional)"
                  value={newHighlightDesc}
                  onChange={(e) => setNewHighlightDesc(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={handleAddHighlightItem}
                style={{ height: '40px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
              >
                <Plus size={16} />
                <span>Add Highlight</span>
              </button>
            </div>
          </div>

          {/* 10. UNIT CONFIGURATIONS (BHK Types) */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Layers size={18} color="var(--color-gold-600)" />
              <span>Unit Configurations (BHK Variants)</span>
            </h3>

            {configurationsList.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                {configurationsList.map((cfg, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      backgroundColor: '#F8FAFC',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{cfg.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {cfg.bedrooms ? `${cfg.bedrooms} Bed` : ''} {cfg.bathrooms ? `| ${cfg.bathrooms} Bath` : ''} {cfg.area ? `| ${cfg.area} ${cfg.areaUnit || 'SQFT'}` : ''} {cfg.price ? `| ₹${Number(cfg.price).toLocaleString('en-IN')}` : ''}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveConfigItem(idx, cfg)}
                      style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem', alignItems: 'end' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Name (e.g. 3 BHK Luxury)"
                value={newConfig.name}
                onChange={(e) => setNewConfig({ ...newConfig, name: e.target.value })}
              />
              <input
                type="number"
                className="form-control"
                placeholder="BHK (Beds)"
                value={newConfig.bedrooms}
                onChange={(e) => setNewConfig({ ...newConfig, bedrooms: e.target.value })}
              />
              <input
                type="number"
                className="form-control"
                placeholder="Area (Sq.ft)"
                value={newConfig.area}
                onChange={(e) => setNewConfig({ ...newConfig, area: e.target.value })}
              />
              <input
                type="number"
                className="form-control"
                placeholder="Price (₹)"
                value={newConfig.price}
                onChange={(e) => setNewConfig({ ...newConfig, price: e.target.value })}
              />
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={handleAddConfigItem}
                style={{ height: '40px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
              >
                <Plus size={16} />
                <span>Add Unit</span>
              </button>
            </div>
          </div>

          {/* 11. BROCHURE & VIDEO WALKTHROUGH */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Video size={18} color="var(--color-gold-600)" />
              <span>Brochure & Video Walkthrough</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Project Brochure (PDF)</label>
                <input
                  type="file"
                  accept=".pdf"
                  className="form-control"
                  onChange={(e) => setBrochureFile(e.target.files?.[0] || null)}
                />
                {brochureFile && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-gold-700)', marginTop: '4px' }}>
                    Selected: {brochureFile.name}
                  </div>
                )}
                {existingDocuments.length > 0 && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Uploaded Documents: {existingDocuments.map(d => d.documentName).join(', ')}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">YouTube Video / Virtual Tour Link</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={handleAddVideoItem}
                  >
                    Add
                  </button>
                </div>
                {videoList.length > 0 && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {videoList.length} video link(s) registered
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTON BAR */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: '1rem',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '1.75rem',
              marginTop: '1rem'
            }}
          >
            <Link to="/admin/projects" className="btn btn-outline" style={{ minWidth: '100px', textAlign: 'center' }}>
              Cancel
            </Link>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting || uploadingImages}
              style={{
                minWidth: '200px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                fontSize: '0.9375rem',
                fontWeight: 600
              }}
            >
              <Save size={18} />
              <span>
                {submitting || uploadingImages
                  ? 'Saving Project...'
                  : isEditMode
                  ? 'Update Project'
                  : 'Publish Project'}
              </span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
