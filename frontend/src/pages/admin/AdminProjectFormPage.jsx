import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Building2, Save, ArrowLeft, Eye, Upload, Trash2, Plus,
  Layers, Sparkles, Compass, MapPin, DollarSign, FileText,
  Play, ShieldCheck, CheckCircle2, AlertCircle, X, Check
} from 'lucide-react';
import projectService from '../../services/projectService';
import { useToast } from '../../hooks/useToast';
import Badge from '../../components/common/Badge';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';

export default function AdminProjectFormPage() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { success, error, info } = useToast();

  const [activeTab, setActiveTab] = useState('basic');
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);

  // Core Project Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    projectType: 'RESIDENTIAL',
    status: 'DRAFT',
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
    state: '',
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

  // Sub-entities state (loaded in edit mode)
  const [configurations, setConfigurations] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [specifications, setSpecifications] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [images, setImages] = useState([]);
  const [floorPlans, setFloorPlans] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [videos, setVideos] = useState([]);

  // Sub-forms local states for adding items
  const [newConfig, setNewConfig] = useState({ name: '', bedrooms: '', bathrooms: '', area: '', areaUnit: 'SQFT', price: '', availabilityStatus: 'Available', description: '' });
  const [newAmenity, setNewAmenity] = useState({ name: '', category: 'RECREATION' });
  const [newSpec, setNewSpec] = useState({ category: 'STRUCTURE', title: '', details: '' });
  const [newHighlight, setNewHighlight] = useState({ title: '', description: '' });
  const [newFloorPlan, setNewFloorPlan] = useState({ title: '', configurationName: '', area: '', areaUnit: 'SQFT', description: '' });
  const [floorPlanFile, setFloorPlanFile] = useState(null);
  const [newDoc, setNewDoc] = useState({ documentName: '', documentType: 'BROCHURE', isPublic: true });
  const [docFile, setDocFile] = useState(null);
  const [newVideo, setNewVideo] = useState({ title: '', videoUrl: '', videoType: 'YOUTUBE' });

  // Fetch project details in edit mode
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
              status: data.status || 'DRAFT',
              shortDescription: data.shortDescription || '',
              description: data.description || '',
              builderName: data.builderName || '',
              reraNumber: data.reraNumber || '',
              possessionDate: data.possessionDate || '',
              launchDate: data.launchDate || '',
              address: data.address || '',
              locality: data.locality || '',
              city: data.city || '',
              state: data.state || '',
              country: data.country || 'India',
              pincode: data.pincode || '',
              latitude: data.latitude || '',
              longitude: data.longitude || '',
              mapUrl: data.mapUrl || '',
              minPrice: data.minPrice || '',
              maxPrice: data.maxPrice || '',
              pricePerSqft: data.pricePerSqft || '',
              priceType: data.priceType || 'Base Price',
              maintenanceCharges: data.maintenanceCharges || '',
              bookingAmount: data.bookingAmount || '',
              coverImageUrl: data.coverImageUrl || '',
              seoTitle: data.seoTitle || '',
              seoDescription: data.seoDescription || '',
              isFeatured: Boolean(data.isFeatured),
            });

            setConfigurations(data.configurations || []);
            setAmenities(data.amenities || []);
            setSpecifications(data.specifications || []);
            setHighlights(data.highlights || []);
            setImages(data.images || []);
            setFloorPlans(data.floorPlans || []);
            setDocuments(data.documents || []);
            setVideos(data.videos || []);
          }
        } catch (err) {
          error('Failed to load project details for editing.');
        } finally {
          setLoading(false);
        }
      };

      fetchProjectDetails();
    }
  }, [id, isEditMode]);

  // Handle Main Form Input Changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Save Main Project (Create or Update)
  const handleSaveProject = async (targetStatus = null) => {
    if (!formData.name || !formData.locality || !formData.city) {
      error('Project Name, Locality, and City are required fields.');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...formData,
        minPrice: formData.minPrice ? parseFloat(formData.minPrice) : null,
        maxPrice: formData.maxPrice ? parseFloat(formData.maxPrice) : null,
        pricePerSqft: formData.pricePerSqft ? parseFloat(formData.pricePerSqft) : null,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
        status: targetStatus || formData.status,
      };

      if (isEditMode) {
        const res = await projectService.updateProject(id, payload);
        const updated = res?.data || res;
        success('Project details updated successfully.');
        setFormData((prev) => ({ ...prev, status: updated.status }));
      } else {
        const res = await projectService.createProject(payload);
        const created = res?.data || res;
        success('Project created successfully. You can now configure amenities, media, and floor plans.');
        navigate(`/admin/projects/edit/${created.id}`);
      }
    } catch (err) {
      error(err.response?.data?.message || 'Failed to save project.');
    } finally {
      setSaving(false);
    }
  };

  // Upload Images
  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (!isEditMode) {
      info('Please save the basic project information first before uploading images.');
      return;
    }

    const uploadData = new FormData();
    for (let i = 0; i < files.length; i++) {
      uploadData.append('files', files[i]);
    }

    try {
      const uploaded = await projectService.uploadProjectImages(id, uploadData, 'GALLERY', images.length === 0);
      success(`${uploaded.length} image(s) uploaded successfully.`);
      setImages((prev) => [...prev, ...uploaded]);
    } catch (err) {
      error('Failed to upload images. Ensure files are valid JPG/PNG/WEBP.');
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      await projectService.deleteProjectImage(imageId);
      setImages((prev) => prev.filter((img) => img.id !== imageId));
      success('Image removed from gallery.');
    } catch (err) {
      error('Failed to delete image.');
    }
  };

  const handleSetCover = async (imageId) => {
    try {
      await projectService.setProjectCoverImage(id, imageId);
      setImages((prev) =>
        prev.map((img) => ({ ...img, isCover: img.id === imageId }))
      );
      success('Cover image updated.');
    } catch (err) {
      error('Failed to set cover image.');
    }
  };

  // Configurations CRUD
  const handleAddConfiguration = async (e) => {
    e.preventDefault();
    if (!isEditMode) {
      info('Please save the project first.');
      return;
    }
    if (!newConfig.name) {
      error('Configuration name is required (e.g. 3 BHK Luxury).');
      return;
    }

    try {
      const payload = {
        ...newConfig,
        bedrooms: newConfig.bedrooms ? parseInt(newConfig.bedrooms, 10) : null,
        bathrooms: newConfig.bathrooms ? parseInt(newConfig.bathrooms, 10) : null,
        area: newConfig.area ? parseFloat(newConfig.area) : null,
        price: newConfig.price ? parseFloat(newConfig.price) : null,
      };
      const res = await projectService.addConfiguration(id, payload);
      const created = res?.data || res;
      setConfigurations((prev) => [...prev, created]);
      setNewConfig({ name: '', bedrooms: '', bathrooms: '', area: '', areaUnit: 'SQFT', price: '', availabilityStatus: 'Available', description: '' });
      success('Unit configuration added.');
    } catch (err) {
      error('Failed to add configuration.');
    }
  };

  const handleDeleteConfig = async (configId) => {
    try {
      await projectService.deleteConfiguration(configId);
      setConfigurations((prev) => prev.filter((c) => c.id !== configId));
      success('Configuration removed.');
    } catch (err) {
      error('Failed to delete configuration.');
    }
  };

  // Amenities CRUD
  const handleAddAmenity = async (e) => {
    e.preventDefault();
    if (!isEditMode) return info('Please save the project first.');
    if (!newAmenity.name) return error('Amenity name is required.');

    try {
      const res = await projectService.addAmenity(id, newAmenity);
      const created = res?.data || res;
      setAmenities((prev) => [...prev, created]);
      setNewAmenity({ name: '', category: 'RECREATION' });
      success('Amenity added.');
    } catch (err) {
      error('Failed to add amenity.');
    }
  };

  const handleDeleteAmenity = async (amenityId) => {
    try {
      await projectService.deleteAmenity(amenityId);
      setAmenities((prev) => prev.filter((a) => a.id !== amenityId));
      success('Amenity removed.');
    } catch (err) {
      error('Failed to delete amenity.');
    }
  };

  // Specifications CRUD
  const handleAddSpecification = async (e) => {
    e.preventDefault();
    if (!isEditMode) return info('Please save the project first.');
    if (!newSpec.title || !newSpec.details) return error('Both title and details are required.');

    try {
      const res = await projectService.addSpecification(id, newSpec);
      const created = res?.data || res;
      setSpecifications((prev) => [...prev, created]);
      setNewSpec({ category: 'STRUCTURE', title: '', details: '' });
      success('Specification entry added.');
    } catch (err) {
      error('Failed to add specification.');
    }
  };

  const handleDeleteSpecification = async (specId) => {
    try {
      await projectService.deleteSpecification(specId);
      setSpecifications((prev) => prev.filter((s) => s.id !== specId));
      success('Specification removed.');
    } catch (err) {
      error('Failed to delete specification.');
    }
  };

  // Highlights CRUD
  const handleAddHighlight = async (e) => {
    e.preventDefault();
    if (!isEditMode) return info('Please save the project first.');
    if (!newHighlight.title) return error('Highlight title is required.');

    try {
      const res = await projectService.addHighlight(id, newHighlight);
      const created = res?.data || res;
      setHighlights((prev) => [...prev, created]);
      setNewHighlight({ title: '', description: '' });
      success('Highlight added.');
    } catch (err) {
      error('Failed to add highlight.');
    }
  };

  const handleDeleteHighlight = async (hlId) => {
    try {
      await projectService.deleteHighlight(hlId);
      setHighlights((prev) => prev.filter((h) => h.id !== hlId));
      success('Highlight removed.');
    } catch (err) {
      error('Failed to delete highlight.');
    }
  };

  // Floor Plans CRUD
  const handleAddFloorPlan = async (e) => {
    e.preventDefault();
    if (!isEditMode) return info('Please save the project first.');
    if (!newFloorPlan.title) return error('Floor plan title is required.');

    const uploadData = new FormData();
    const planDataBlob = new Blob([JSON.stringify({
      ...newFloorPlan,
      area: newFloorPlan.area ? parseFloat(newFloorPlan.area) : null,
    })], { type: 'application/json' });

    uploadData.append('data', planDataBlob);
    if (floorPlanFile) {
      uploadData.append('image', floorPlanFile);
    }

    try {
      const res = await projectService.addFloorPlan(id, uploadData);
      const created = res?.data || res;
      setFloorPlans((prev) => [...prev, created]);
      setNewFloorPlan({ title: '', configurationName: '', area: '', areaUnit: 'SQFT', description: '' });
      setFloorPlanFile(null);
      success('Floor plan added successfully.');
    } catch (err) {
      error('Failed to add floor plan.');
    }
  };

  const handleDeleteFloorPlan = async (fpId) => {
    try {
      await projectService.deleteFloorPlan(fpId);
      setFloorPlans((prev) => prev.filter((f) => f.id !== fpId));
      success('Floor plan removed.');
    } catch (err) {
      error('Failed to delete floor plan.');
    }
  };

  // Documents CRUD
  const handleAddDocument = async (e) => {
    e.preventDefault();
    if (!isEditMode) return info('Please save the project first.');
    if (!docFile) return error('Please select a PDF/document file to upload.');

    const uploadData = new FormData();
    uploadData.append('file', docFile);
    uploadData.append('documentName', newDoc.documentName || docFile.name);
    uploadData.append('documentType', newDoc.documentType);
    uploadData.append('isPublic', newDoc.isPublic);

    try {
      const res = await projectService.uploadProjectDocument(id, uploadData);
      const created = res?.data || res;
      setDocuments((prev) => [...prev, created]);
      setNewDoc({ documentName: '', documentType: 'BROCHURE', isPublic: true });
      setDocFile(null);
      success('Document uploaded to vault.');
    } catch (err) {
      error('Failed to upload document.');
    }
  };

  const handleDeleteDocument = async (docId) => {
    try {
      await projectService.deleteProjectDocument(docId);
      setDocuments((prev) => prev.filter((d) => d.id !== docId));
      success('Document deleted.');
    } catch (err) {
      error('Failed to delete document.');
    }
  };

  // Videos CRUD
  const handleAddVideo = async (e) => {
    e.preventDefault();
    if (!isEditMode) return info('Please save the project first.');
    if (!newVideo.title || !newVideo.videoUrl) return error('Title and Video URL are required.');

    try {
      const res = await projectService.addVideo(id, newVideo);
      const created = res?.data || res;
      setVideos((prev) => [...prev, created]);
      setNewVideo({ title: '', videoUrl: '', videoType: 'YOUTUBE' });
      success('Video link registered.');
    } catch (err) {
      error('Failed to add video link.');
    }
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      await projectService.deleteVideo(videoId);
      setVideos((prev) => prev.filter((v) => v.id !== videoId));
      success('Video link removed.');
    } catch (err) {
      error('Failed to delete video.');
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '3rem 0' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
          <LoadingSkeleton height="60px" />
          <div style={{ marginTop: '1.5rem' }}>
            <LoadingSkeleton height="400px" />
          </div>
        </div>
      </div>
    );
  }

  const navTabs = [
    { id: 'basic', label: '1. Basic Information', icon: Building2 },
    { id: 'location', label: '2. Location & Map', icon: MapPin },
    { id: 'pricing', label: '3. Pricing & Booking', icon: DollarSign },
    { id: 'configurations', label: `4. Configurations (${configurations.length})`, icon: Layers },
    { id: 'amenities', label: `5. Amenities (${amenities.length})`, icon: Sparkles },
    { id: 'specifications', label: `6. Specifications (${specifications.length})`, icon: Compass },
    { id: 'highlights', label: `7. Highlights (${highlights.length})`, icon: CheckCircle2 },
    { id: 'gallery', label: `8. Media & Gallery (${images.length})`, icon: Upload },
    { id: 'floorplans', label: `9. Floor Plans (${floorPlans.length})`, icon: Layers },
    { id: 'documents', label: `10. Documents (${documents.length})`, icon: FileText },
    { id: 'videos', label: `11. Video Tours (${videos.length})`, icon: Play },
    { id: 'publish', label: '12. Review & Publish', icon: ShieldCheck },
  ];

  return (
    <div style={{ padding: '2rem 0 5rem 0', backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Header Navigation Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link to="/admin/projects" className="btn btn-secondary" style={{ padding: '8px' }}>
              <ArrowLeft size={16} />
            </Link>
            <div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Project CMS Editor</div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>
                {isEditMode ? (formData.name || 'Edit Project') : 'Create New Development'}
              </h1>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isEditMode && (
              <Link
                to={`/projects/${id}`}
                target="_blank"
                className="btn btn-secondary"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Eye size={15} />
                <span>Live Preview</span>
              </Link>
            )}

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => handleSaveProject('DRAFT')}
              disabled={saving}
            >
              Save Draft
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleSaveProject(formData.status === 'DRAFT' ? 'PUBLISHED' : formData.status)}
              disabled={saving}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Save size={15} />
              <span>{saving ? 'Saving...' : formData.status === 'PUBLISHED' ? 'Save Changes' : 'Save & Publish'}</span>
            </button>
          </div>
        </div>

        {/* Tab Stepper Navigation */}
        <div className="card" style={{ padding: '0.5rem', marginBottom: '2rem', display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '0.625rem 1rem',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: isActive ? 'var(--color-gold-600)' : 'transparent',
                  color: isActive ? '#0B0F19' : 'var(--text-secondary)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.8125rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 150ms ease',
                }}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: BASIC INFORMATION */}
        {/* ========================================================================= */}
        {activeTab === 'basic' && (
          <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Basic Project Information</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label className="label">Project Name *</label>
                <input
                  type="text"
                  required
                  className="input-field"
                  placeholder="e.g. Keystone Sky Villas"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>

              <div>
                <label className="label">Project Type *</label>
                <select
                  className="input-field"
                  value={formData.projectType}
                  onChange={(e) => handleInputChange('projectType', e.target.value)}
                >
                  <option value="RESIDENTIAL">Residential</option>
                  <option value="COMMERCIAL">Commercial</option>
                  <option value="VILLA">Villa & Independent Houses</option>
                  <option value="PLOTTED_DEVELOPMENT">Plotted Development</option>
                  <option value="MIXED_USE">Mixed Use</option>
                  <option value="INDUSTRIAL">Industrial</option>
                </select>
              </div>

              <div>
                <label className="label">Developer / Builder Name</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Keystone Realty Infrastructure"
                  value={formData.builderName}
                  onChange={(e) => handleInputChange('builderName', e.target.value)}
                />
              </div>

              <div>
                <label className="label">RERA Number</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. UPRERAPRJ123456"
                  value={formData.reraNumber}
                  onChange={(e) => handleInputChange('reraNumber', e.target.value)}
                />
              </div>

              <div>
                <label className="label">Possession Date</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Ready to Move, Dec 2026, Q3 2027"
                  value={formData.possessionDate}
                  onChange={(e) => handleInputChange('possessionDate', e.target.value)}
                />
              </div>

              <div>
                <label className="label">Launch Date</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. January 2025"
                  value={formData.launchDate}
                  onChange={(e) => handleInputChange('launchDate', e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="label">Short Summary Description</label>
              <input
                type="text"
                className="input-field"
                placeholder="High-level 1-sentence value proposition for card listings..."
                value={formData.shortDescription}
                onChange={(e) => handleInputChange('shortDescription', e.target.value)}
              />
            </div>

            <div>
              <label className="label">Comprehensive Project Description</label>
              <textarea
                rows={6}
                className="input-field"
                placeholder="Detailed architectural concept, master layout highlights, construction standards..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label className="label">SEO Meta Title</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Custom SEO Title Tag..."
                  value={formData.seoTitle}
                  onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                />
              </div>
              <div>
                <label className="label">SEO Meta Description</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Meta description for search engines..."
                  value={formData.seoDescription}
                  onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                id="isFeatured"
                checked={formData.isFeatured}
                onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                style={{ width: '16px', height: '16px' }}
              />
              <label htmlFor="isFeatured" style={{ fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>
                Feature this development on homepage showcase
              </label>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: LOCATION & MAP */}
        {/* ========================================================================= */}
        {activeTab === 'location' && (
          <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Location & Geographical Details</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label className="label">Street Address</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Sector 65, Golf Course Extension Road"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </div>

              <div>
                <label className="label">Locality / Sector *</label>
                <input
                  type="text"
                  required
                  className="input-field"
                  placeholder="e.g. Sector 65"
                  value={formData.locality}
                  onChange={(e) => handleInputChange('locality', e.target.value)}
                />
              </div>

              <div>
                <label className="label">City *</label>
                <input
                  type="text"
                  required
                  className="input-field"
                  placeholder="e.g. Gurgaon"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                />
              </div>

              <div>
                <label className="label">State</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Haryana"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                />
              </div>

              <div>
                <label className="label">Pincode</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. 122001"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                />
              </div>

              <div>
                <label className="label">GPS Latitude (Optional)</label>
                <input
                  type="number"
                  step="any"
                  className="input-field"
                  placeholder="e.g. 28.4089"
                  value={formData.latitude}
                  onChange={(e) => handleInputChange('latitude', e.target.value)}
                />
              </div>

              <div>
                <label className="label">GPS Longitude (Optional)</label>
                <input
                  type="number"
                  step="any"
                  className="input-field"
                  placeholder="e.g. 77.0678"
                  value={formData.longitude}
                  onChange={(e) => handleInputChange('longitude', e.target.value)}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label className="label">Google Maps URL (Optional)</label>
                <input
                  type="url"
                  className="input-field"
                  placeholder="https://maps.google.com/..."
                  value={formData.mapUrl}
                  onChange={(e) => handleInputChange('mapUrl', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: PRICING & BOOKING */}
        {/* ========================================================================= */}
        {activeTab === 'pricing' && (
          <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Pricing Structure & Terms</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label className="label">Minimum / Starting Price (₹)</label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="e.g. 15000000 (1.5 Cr)"
                  value={formData.minPrice}
                  onChange={(e) => handleInputChange('minPrice', e.target.value)}
                />
              </div>

              <div>
                <label className="label">Maximum Price (₹)</label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="e.g. 45000000 (4.5 Cr)"
                  value={formData.maxPrice}
                  onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                />
              </div>

              <div>
                <label className="label">Price Per Sq Ft (₹)</label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="e.g. 12500"
                  value={formData.pricePerSqft}
                  onChange={(e) => handleInputChange('pricePerSqft', e.target.value)}
                />
              </div>

              <div>
                <label className="label">Price Type</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Base Price, All Inclusive, On Request"
                  value={formData.priceType}
                  onChange={(e) => handleInputChange('priceType', e.target.value)}
                />
              </div>

              <div>
                <label className="label">Booking Amount Terms</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. 10% on Booking, ₹5 Lakhs Initial Token"
                  value={formData.bookingAmount}
                  onChange={(e) => handleInputChange('bookingAmount', e.target.value)}
                />
              </div>

              <div>
                <label className="label">Maintenance Charges</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. ₹4.5 / sqft / month"
                  value={formData.maintenanceCharges}
                  onChange={(e) => handleInputChange('maintenanceCharges', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: CONFIGURATIONS */}
        {/* ========================================================================= */}
        {activeTab === 'configurations' && (
          <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Unit Configurations</h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Add specific apartment/villa types available within this development.
              </p>
            </div>

            {/* Existing Configurations Table */}
            {configurations.length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                      <th style={{ padding: '0.75rem' }}>Name</th>
                      <th style={{ padding: '0.75rem' }}>Beds / Baths</th>
                      <th style={{ padding: '0.75rem' }}>Area</th>
                      <th style={{ padding: '0.75rem' }}>Price</th>
                      <th style={{ padding: '0.75rem' }}>Status</th>
                      <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {configurations.map((cfg) => (
                      <tr key={cfg.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '0.75rem', fontWeight: 600 }}>{cfg.name}</td>
                        <td style={{ padding: '0.75rem' }}>{cfg.bedrooms || '-'} BHK / {cfg.bathrooms || '-'} Baths</td>
                        <td style={{ padding: '0.75rem' }}>{cfg.area ? `${cfg.area} ${cfg.areaUnit}` : '-'}</td>
                        <td style={{ padding: '0.75rem', color: 'var(--color-gold-600)', fontWeight: 600 }}>
                          {cfg.price ? `₹${(cfg.price / 100000).toFixed(2)} L` : 'On Request'}
                        </td>
                        <td style={{ padding: '0.75rem' }}>
                          <Badge variant="gold">{cfg.availabilityStatus || 'Available'}</Badge>
                        </td>
                        <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                          <button
                            type="button"
                            onClick={() => handleDeleteConfig(cfg.id)}
                            className="btn btn-secondary"
                            style={{ padding: '4px 8px', color: '#EF4444' }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ padding: '1.5rem', textAlign: 'center', backgroundColor: 'var(--bg-main)', borderRadius: '8px', color: 'var(--text-muted)' }}>
                No configurations added yet. Add your first unit configuration below.
              </div>
            )}

            {/* Add New Configuration Form */}
            <form onSubmit={handleAddConfiguration} style={{ padding: '1.5rem', backgroundColor: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, margin: 0 }}>Add New Unit Configuration</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                <div>
                  <label className="label">Config Name *</label>
                  <input
                    type="text"
                    required
                    className="input-field"
                    placeholder="e.g. 3 BHK Luxury"
                    value={newConfig.name}
                    onChange={(e) => setNewConfig({ ...newConfig, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Bedrooms</label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="e.g. 3"
                    value={newConfig.bedrooms}
                    onChange={(e) => setNewConfig({ ...newConfig, bedrooms: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Bathrooms</label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="e.g. 3"
                    value={newConfig.bathrooms}
                    onChange={(e) => setNewConfig({ ...newConfig, bathrooms: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Super Area</label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="e.g. 1850"
                    value={newConfig.area}
                    onChange={(e) => setNewConfig({ ...newConfig, area: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Unit</label>
                  <select
                    className="input-field"
                    value={newConfig.areaUnit}
                    onChange={(e) => setNewConfig({ ...newConfig, areaUnit: e.target.value })}
                  >
                    <option value="SQFT">SQFT</option>
                    <option value="SQYD">SQYD</option>
                    <option value="SQM">SQM</option>
                  </select>
                </div>
                <div>
                  <label className="label">Price (₹)</label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="e.g. 18000000"
                    value={newConfig.price}
                    onChange={(e) => setNewConfig({ ...newConfig, price: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Plus size={15} />
                  <span>Add Configuration</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: AMENITIES */}
        {/* ========================================================================= */}
        {activeTab === 'amenities' && (
          <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Project Amenities</h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Manage authentic lifestyle and infrastructure amenities by category.
              </p>
            </div>

            {/* List Existing Amenities */}
            {amenities.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
                {amenities.map((amenity) => (
                  <div
                    key={amenity.id}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-main)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.875rem',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600 }}>{amenity.name}</div>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--color-gold-600)', textTransform: 'uppercase' }}>
                        {amenity.category}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteAmenity(amenity.id)}
                      style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer' }}
                    >
                      <X size={15} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '1.5rem', textAlign: 'center', backgroundColor: 'var(--bg-main)', borderRadius: '8px', color: 'var(--text-muted)' }}>
                No amenities registered. Enter actual amenities below.
              </div>
            )}

            {/* Add Amenity Form */}
            <form onSubmit={handleAddAmenity} style={{ padding: '1.25rem', backgroundColor: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div style={{ flex: '1 1 200px' }}>
                <label className="label">Amenity Name *</label>
                <input
                  type="text"
                  required
                  className="input-field"
                  placeholder="e.g. Olympic Size Swimming Pool"
                  value={newAmenity.name}
                  onChange={(e) => setNewAmenity({ ...newAmenity, name: e.target.value })}
                />
              </div>

              <div style={{ minWidth: '180px' }}>
                <label className="label">Category</label>
                <select
                  className="input-field"
                  value={newAmenity.category}
                  onChange={(e) => setNewAmenity({ ...newAmenity, category: e.target.value })}
                >
                  <option value="SECURITY">Security</option>
                  <option value="RECREATION">Recreation</option>
                  <option value="FITNESS">Fitness</option>
                  <option value="PARKING">Parking</option>
                  <option value="UTILITIES">Utilities</option>
                  <option value="COMMUNITY">Community</option>
                  <option value="OUTDOOR">Outdoor</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '42px' }}>
                <Plus size={15} />
                <span>Add Amenity</span>
              </button>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: SPECIFICATIONS */}
        {/* ========================================================================= */}
        {activeTab === 'specifications' && (
          <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Technical Specifications</h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Structure, flooring, electrical, plumbing, and finish details.
              </p>
            </div>

            {/* Existing Specs */}
            {specifications.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {specifications.map((spec) => (
                  <div
                    key={spec.id}
                    style={{
                      padding: '1rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-main)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-gold-600)', textTransform: 'uppercase' }}>
                        {spec.category}
                      </div>
                      <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
                        {spec.title}
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                        {spec.details}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteSpecification(spec.id)}
                      style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '1.5rem', textAlign: 'center', backgroundColor: 'var(--bg-main)', borderRadius: '8px', color: 'var(--text-muted)' }}>
                No specifications added yet. Add structural specifications below.
              </div>
            )}

            {/* Add Spec Form */}
            <form onSubmit={handleAddSpecification} style={{ padding: '1.25rem', backgroundColor: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, margin: 0 }}>Add Specification Entry</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '1rem' }}>
                <div>
                  <label className="label">Category</label>
                  <select
                    className="input-field"
                    value={newSpec.category}
                    onChange={(e) => setNewSpec({ ...newSpec, category: e.target.value })}
                  >
                    <option value="STRUCTURE">Structure</option>
                    <option value="FLOORING">Flooring</option>
                    <option value="DOORS_WINDOWS">Doors & Windows</option>
                    <option value="ELECTRICAL">Electrical</option>
                    <option value="PLUMBING">Plumbing</option>
                    <option value="KITCHEN">Kitchen</option>
                    <option value="BATHROOM">Bathroom</option>
                    <option value="SECURITY">Security</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                <div>
                  <label className="label">Title / Item *</label>
                  <input
                    type="text"
                    required
                    className="input-field"
                    placeholder="e.g. Master Bedroom Flooring"
                    value={newSpec.title}
                    onChange={(e) => setNewSpec({ ...newSpec, title: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="label">Specification Details *</label>
                <input
                  type="text"
                  required
                  className="input-field"
                  placeholder="e.g. Imported Italian Marble with anti-skid coating"
                  value={newSpec.details}
                  onChange={(e) => setNewSpec({ ...newSpec, details: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Plus size={15} />
                  <span>Add Specification</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: HIGHLIGHTS */}
        {/* ========================================================================= */}
        {activeTab === 'highlights' && (
          <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Project Highlights</h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Key standout value propositions and location connectivity highlights.
              </p>
            </div>

            {highlights.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {highlights.map((hl) => (
                  <div
                    key={hl.id}
                    style={{
                      padding: '1rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-main)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{hl.title}</div>
                      {hl.description && (
                        <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          {hl.description}
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteHighlight(hl.id)}
                      style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '1.5rem', textAlign: 'center', backgroundColor: 'var(--bg-main)', borderRadius: '8px', color: 'var(--text-muted)' }}>
                No highlights added. Add your project highlights below.
              </div>
            )}

            {/* Add Highlight Form */}
            <form onSubmit={handleAddHighlight} style={{ padding: '1.25rem', backgroundColor: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, margin: 0 }}>Add Project Highlight</h3>
              <div>
                <label className="label">Highlight Title *</label>
                <input
                  type="text"
                  required
                  className="input-field"
                  placeholder="e.g. 5 Minutes from Rapid Metro Station"
                  value={newHighlight.title}
                  onChange={(e) => setNewHighlight({ ...newHighlight, title: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Short Description (Optional)</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Direct seamless connectivity to Cyber City and NH-8"
                  value={newHighlight.description}
                  onChange={(e) => setNewHighlight({ ...newHighlight, description: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Plus size={15} />
                  <span>Add Highlight</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 8: MEDIA & GALLERY */}
        {/* ========================================================================= */}
        {activeTab === 'gallery' && (
          <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Project Media & Gallery</h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Upload verified architectural photography and select the project cover image.
              </p>
            </div>

            {/* Image Upload Dropzone */}
            <div
              style={{
                border: '2px dashed var(--border-color)',
                borderRadius: '8px',
                padding: '2.5rem',
                textAlign: 'center',
                backgroundColor: 'var(--bg-main)',
                cursor: 'pointer',
              }}
              onClick={() => document.getElementById('projectGalleryInput').click()}
            >
              <Upload size={36} color="var(--color-gold-500)" style={{ margin: '0 auto 0.75rem auto' }} />
              <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>Click to select project images</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Supported formats: JPG, PNG, WEBP. Max 10MB per file.
              </div>
              <input
                id="projectGalleryInput"
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
            </div>

            {/* Uploaded Images Grid */}
            {images.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {images.map((img) => (
                  <div
                    key={img.id}
                    style={{
                      height: '180px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      position: 'relative',
                      border: img.isCover ? '2px solid var(--color-gold-500)' : '1px solid var(--border-color)',
                      backgroundColor: '#0B0F19',
                    }}
                  >
                    <img src={img.imageUrl} alt="Gallery" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

                    {img.isCover && (
                      <span style={{ position: 'absolute', top: '8px', left: '8px', padding: '2px 8px', backgroundColor: 'var(--color-gold-500)', color: '#000', borderRadius: '4px', fontSize: '0.6875rem', fontWeight: 700 }}>
                        COVER
                      </span>
                    )}

                    <div style={{ position: 'absolute', bottom: '8px', right: '8px', display: 'flex', gap: '4px' }}>
                      {!img.isCover && (
                        <button
                          type="button"
                          onClick={() => handleSetCover(img.id)}
                          className="btn btn-secondary"
                          style={{ padding: '4px 6px', fontSize: '0.6875rem' }}
                          title="Set as Cover Image"
                        >
                          Set Cover
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(img.id)}
                        className="btn btn-secondary"
                        style={{ padding: '4px 6px', color: '#EF4444' }}
                        title="Delete Image"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '1.5rem', textAlign: 'center', backgroundColor: 'var(--bg-main)', borderRadius: '8px', color: 'var(--text-muted)' }}>
                No gallery images uploaded yet.
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 9: FLOOR PLANS */}
        {/* ========================================================================= */}
        {activeTab === 'floorplans' && (
          <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Project Floor Plans</h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Upload verified architectural floor plans and unit layout drawings.
              </p>
            </div>

            {floorPlans.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
                {floorPlans.map((fp) => (
                  <div
                    key={fp.id}
                    style={{
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      backgroundColor: 'var(--bg-main)',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {fp.imageUrl && (
                      <div style={{ height: '160px', backgroundColor: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={fp.imageUrl} alt={fp.title} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                      </div>
                    )}
                    <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{fp.title}</div>
                        {fp.area && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{fp.area} {fp.areaUnit}</div>}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteFloorPlan(fp.id)}
                        style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '1.5rem', textAlign: 'center', backgroundColor: 'var(--bg-main)', borderRadius: '8px', color: 'var(--text-muted)' }}>
                No floor plans uploaded. Add a floor plan below.
              </div>
            )}

            {/* Add Floor Plan Form */}
            <form onSubmit={handleAddFloorPlan} style={{ padding: '1.25rem', backgroundColor: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, margin: 0 }}>Add Floor Plan</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label className="label">Plan Title *</label>
                  <input
                    type="text"
                    required
                    className="input-field"
                    placeholder="e.g. 3 BHK Unit Plan Type A"
                    value={newFloorPlan.title}
                    onChange={(e) => setNewFloorPlan({ ...newFloorPlan, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Area</label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="e.g. 1950"
                    value={newFloorPlan.area}
                    onChange={(e) => setNewFloorPlan({ ...newFloorPlan, area: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Floor Plan Image File</label>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="input-field"
                    onChange={(e) => setFloorPlanFile(e.target.files[0])}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Plus size={15} />
                  <span>Upload Floor Plan</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 10: DOCUMENTS VAULT */}
        {/* ========================================================================= */}
        {activeTab === 'documents' && (
          <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Document Vault</h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Upload official PDF brochures, price lists, and payment schedules.
              </p>
            </div>

            {documents.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    style={{
                      padding: '1rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-main)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <FileText size={20} color="var(--color-gold-500)" />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{doc.documentName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {doc.documentType} • {doc.isPublic ? 'Publicly Visible' : 'Private Admin Only'}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteDocument(doc.id)}
                      style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '1.5rem', textAlign: 'center', backgroundColor: 'var(--bg-main)', borderRadius: '8px', color: 'var(--text-muted)' }}>
                No documents uploaded. Upload brochures or price lists below.
              </div>
            )}

            {/* Upload Document Form */}
            <form onSubmit={handleAddDocument} style={{ padding: '1.25rem', backgroundColor: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, margin: 0 }}>Upload Document</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label className="label">Document Display Name</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. Official Brochure 2026"
                    value={newDoc.documentName}
                    onChange={(e) => setNewDoc({ ...newDoc, documentName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Document Type</label>
                  <select
                    className="input-field"
                    value={newDoc.documentType}
                    onChange={(e) => setNewDoc({ ...newDoc, documentType: e.target.value })}
                  >
                    <option value="BROCHURE">Brochure</option>
                    <option value="PRICE_LIST">Price List</option>
                    <option value="PAYMENT_PLAN">Payment Plan</option>
                    <option value="MASTER_PLAN">Master Plan</option>
                    <option value="FLOOR_PLAN">Floor Plan</option>
                    <option value="SPECIFICATION_SHEET">Specification Sheet</option>
                    <option value="LEGAL_APPROVALS">Legal Approvals</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div>
                  <label className="label">PDF / Document File *</label>
                  <input
                    type="file"
                    required
                    accept=".pdf,.doc,.docx,image/*"
                    className="input-field"
                    onChange={(e) => setDocFile(e.target.files[0])}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    id="isDocPublic"
                    checked={newDoc.isPublic}
                    onChange={(e) => setNewDoc({ ...newDoc, isPublic: e.target.checked })}
                  />
                  <label htmlFor="isDocPublic" style={{ fontSize: '0.8125rem', cursor: 'pointer' }}>
                    Make visible for public download
                  </label>
                </div>

                <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Upload size={14} />
                  <span>Upload to Vault</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 11: VIDEO TOURS */}
        {/* ========================================================================= */}
        {activeTab === 'videos' && (
          <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Project Video Tours</h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Embed official project walkthroughs, sample apartment tours, and drone videos.
              </p>
            </div>

            {videos.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {videos.map((vid) => (
                  <div
                    key={vid.id}
                    style={{
                      padding: '1rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-main)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{vid.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{vid.videoUrl}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteVideo(vid.id)}
                      style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '1.5rem', textAlign: 'center', backgroundColor: 'var(--bg-main)', borderRadius: '8px', color: 'var(--text-muted)' }}>
                No video tours linked yet.
              </div>
            )}

            {/* Add Video Form */}
            <form onSubmit={handleAddVideo} style={{ padding: '1.25rem', backgroundColor: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div style={{ flex: '1 1 200px' }}>
                <label className="label">Video Title *</label>
                <input
                  type="text"
                  required
                  className="input-field"
                  placeholder="e.g. 3 BHK Sample Flat Walkthrough"
                  value={newVideo.title}
                  onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                />
              </div>

              <div style={{ flex: '1 1 300px' }}>
                <label className="label">YouTube / Vimeo URL *</label>
                <input
                  type="url"
                  required
                  className="input-field"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={newVideo.videoUrl}
                  onChange={(e) => setNewVideo({ ...newVideo, videoUrl: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '42px' }}>
                <Plus size={15} />
                <span>Add Video</span>
              </button>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 12: REVIEW & PUBLISH */}
        {/* ========================================================================= */}
        {activeTab === 'publish' && (
          <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Review & Publication Status</h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Configure publication visibility and verify required sections before publishing live.
              </p>
            </div>

            {/* Status Selector Box */}
            <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <label className="label" style={{ fontSize: '0.9375rem', fontWeight: 700 }}>Current Project Status</label>
              <select
                className="input-field"
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                style={{ maxWidth: '300px', marginTop: '0.5rem', fontWeight: 600 }}
              >
                <option value="DRAFT">DRAFT (Hidden from public website)</option>
                <option value="PUBLISHED">PUBLISHED (Visible to all public visitors)</option>
                <option value="UNPUBLISHED">UNPUBLISHED</option>
                <option value="UNDER_CONSTRUCTION">UNDER CONSTRUCTION</option>
                <option value="READY_TO_MOVE">READY TO MOVE</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="SOLD_OUT">SOLD OUT</option>
              </select>
            </div>

            {/* Summary Checklist */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Configurations</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{configurations.length} Added</div>
              </div>
              <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Amenities</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{amenities.length} Added</div>
              </div>
              <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Gallery Images</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{images.length} Uploaded</div>
              </div>
              <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Floor Plans</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{floorPlans.length} Added</div>
              </div>
            </div>

            {/* Action Bar */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => handleSaveProject('DRAFT')}
                disabled={saving}
              >
                Save as Draft
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleSaveProject('PUBLISHED')}
                disabled={saving}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Check size={16} />
                <span>Publish Project Live</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
