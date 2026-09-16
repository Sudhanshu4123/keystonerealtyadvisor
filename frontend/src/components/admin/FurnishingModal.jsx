import React, { useState, useEffect } from 'react';
import {
  X, Check, Plus, Minus, Tv, Bed, Lightbulb, Fan, Wind,
  Flame, Utensils, Refrigerator, Disc, Waves,
  Dumbbell, PhoneCall, Trees, Trophy, Video, Shield,
  Building2, Landmark, Droplets, Sun, ShieldCheck, Car,
  AlertCircle, Wrench, Sparkles, ChefHat, Armchair,
  Box, GitCommit, Blinds, DoorClosed, Archive
} from 'lucide-react';

// Custom SVG Icons for authentic Real Estate UI line-art look
const Icons = {
  DiningTable: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8h16M4 8v10M20 8v10M8 8v6M16 8v6M6 4h12" />
    </svg>
  ),
  WashingMachine: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <circle cx="12" cy="13" r="5" />
      <path d="M12 10a3 3 0 0 0-3 3M7 6h.01M10 6h.01" />
    </svg>
  ),
  Cupboard: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M12 2v20M8 12h.01M16 12h.01" />
    </svg>
  ),
  Sofa: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9zM2 13v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4M4 19v2M20 19v2" />
    </svg>
  ),
  Microwave: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="15" rx="2" />
      <rect x="6" y="8" width="9" height="7" rx="1" />
      <path d="M18 8v.01M18 11v.01M18 14v.01" />
    </svg>
  ),
  Stove: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8" cy="11" r="2.5" />
      <circle cx="16" cy="11" r="2.5" />
      <path d="M6 17h.01M10 17h.01M14 17h.01M18 17h.01" />
    </svg>
  ),
  Fridge: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M5 10h14M8 6v2M8 14v3" />
    </svg>
  ),
  WaterPurifier: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12v12a6 6 0 0 1-12 0V3z" />
      <path d="M12 9a2 2 0 0 0-2 2c0 1.5 2 3 2 3s2-1.5 2-3a2 2 0 0 0-2-2zM9 20h6" />
    </svg>
  ),
  GasPipeline: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 18h4v-6a4 4 0 0 1 8 0v6h4M12 4v4M10 6h4" />
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  ),
  Chimney: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3h8v6l5 6H3l5-6V3zM7 21h10M12 15v3" />
    </svg>
  ),
  ModularKitchen: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="8" rx="1" />
      <rect x="3" y="13" width="18" height="8" rx="1" />
      <path d="M9 7h6M7 17h4M15 17h2" />
    </svg>
  ),
  Fan: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2" />
      <path d="M12 10C12 5 15 3 17 5s0 5-5 5zM14 12c5 0 7 3 5 5s-5 0-5-5zM12 14c0 5-3 7-5 5s0-5 5-5zM10 12c-5 0-7-3-5-5s5 0 5 5z" />
    </svg>
  ),
  Light: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  AC: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="10" rx="2" />
      <path d="M6 10h12M7 17c.5 1 2 2 3.5 2M12 17c.5 1 2 2 3.5 2M17 17c.5 1 2 2 3.5 2" />
    </svg>
  ),
  Wardrobe: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M12 3v18M9 11v2M15 11v2M4 17h16" />
    </svg>
  ),
  TV: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M8 21h8M12 18v3" />
    </svg>
  ),
  Bed: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7v13M21 7v13M3 13h18M6 7v6M18 7v6M7 10h10" />
    </svg>
  ),
  Geyser: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="3" width="12" height="18" rx="6" />
      <circle cx="12" cy="10" r="2.5" />
      <path d="M10 18v3M14 18v3" />
    </svg>
  ),
  Lift: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M9 10l3-3 3 3M9 14l3 3 3-3M12 7v10" />
    </svg>
  ),
  SwimmingPool: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 18c2 0 3-1 5-1s3 1 5 1 3-1 5-1 3 1 5 1M2 21c2 0 3-1 5-1s3 1 5 1 3-1 5-1 3 1 5 1M6 5v8M10 5v8M6 8h4M10 5a3 3 0 0 1 3 3" />
    </svg>
  ),
  Gym: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 5v14M18 5v14M2 9v6M22 9v6M6 12h12" />
    </svg>
  ),
  Intercom: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <circle cx="12" cy="8" r="2" />
      <path d="M9 14h6M9 17h6" />
    </svg>
  ),
  Garden: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 10a4 4 0 0 0-4 4c0 3 4 7 4 7s4-4 4-7a4 4 0 0 0-4-4zM6 14a3 3 0 0 0-3 3c0 2 3 4 3 4s3-2 3-4a3 3 0 0 0-3-3zM18 14a3 3 0 0 0-3 3c0 2 3 4 3 4s3-2 3-4a3 3 0 0 0-3-3z" />
    </svg>
  ),
  KidsArea: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20l4-14 4 14M8 12h4M16 8l4 12M14 14h6" />
    </svg>
  ),
  CCTV: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8l14-4 4 6-14 4zM10 14l-4 7M14 13l-2 8" />
    </svg>
  ),
  GatedCommunity: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M8 5v14M16 5v14M4 12h16" />
    </svg>
  ),
  ClubHouse: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10z" />
      <path d="M9 21v-6h6v6M12 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
    </svg>
  ),
  CommunityHall: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M4 18h16M5 18V9l7-5 7 5v9M9 13v5M15 13v5" />
    </svg>
  ),
  RegularWaterSupply: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 12h8a4 4 0 0 1 4 4v2M4 9h4v6H4zM18 18v3" />
      <circle cx="18" cy="22" r="1" />
    </svg>
  ),
  AttachedBalcony: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="6" width="16" height="14" rx="1" />
      <path d="M7 6v14M11 6v14M15 6v14M4 14h16" />
    </svg>
  ),
  PowerBackup: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <path d="M7 4v3M17 4v3M10 13h4M12 11v4" />
    </svg>
  ),
  Sports: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 12 6-12M6 9a6 6 0 0 1 12 0M6 9h12" />
    </svg>
  )
};

// Quantity/Counter items
const FLAT_COUNTER_ITEMS = [
  { id: 'fan', label: 'Fan', icon: Icons.Fan, max: 20 },
  { id: 'light', label: 'Light', icon: Icons.Light, max: 50 },
  { id: 'ac', label: 'AC', icon: Icons.AC, max: 20 },
  { id: 'wardrobe', label: 'Wardrobe', icon: Icons.Wardrobe, max: 20 },
  { id: 'tv', label: 'TV', icon: Icons.TV, max: 10 },
  { id: 'bed', label: 'Bed', icon: Icons.Bed, max: 10 },
  { id: 'geyser', label: 'Geyser', icon: Icons.Geyser, max: 10 },
];

// Single toggle / boolean items
const FLAT_TOGGLE_ITEMS = [
  { id: 'chimney', label: 'Chimney', icon: Icons.Chimney },
  { id: 'modularKitchen', label: 'Modular Kitchen', icon: Icons.ModularKitchen },
  { id: 'diningTable', label: 'Dining Table', icon: Icons.DiningTable },
  { id: 'washingMachine', label: 'Washing Machine', icon: Icons.WashingMachine },
  { id: 'cupboard', label: 'Cupboard', icon: Icons.Cupboard },
  { id: 'sofa', label: 'Sofa', icon: Icons.Sofa },
  { id: 'microwave', label: 'Microwave', icon: Icons.Microwave },
  { id: 'stove', label: 'Stove', icon: Icons.Stove },
  { id: 'fridge', label: 'Fridge', icon: Icons.Fridge },
  { id: 'waterPurifier', label: 'Water Purifier', icon: Icons.WaterPurifier },
  { id: 'gasPipeline', label: 'Gas Pipeline', icon: Icons.GasPipeline },
  { id: 'exhaustFan', label: 'Exhaust Fan', icon: Icons.Fan },
  { id: 'curtains', label: 'Curtains', icon: Icons.AttachedBalcony },
];

// Society Amenities items
const SOCIETY_AMENITIES_LIST = [
  { id: 'Power Backup', label: 'Power Backup', icon: Icons.PowerBackup },
  { id: 'AC', label: 'AC', icon: Icons.AC },
  { id: 'TV', label: 'TV', icon: Icons.TV },
  { id: 'Geyser', label: 'Geyser', icon: Icons.Geyser },
  { id: 'Swimming Pool', label: 'Swimming Pool', icon: Icons.SwimmingPool },
  { id: 'Lift', label: 'Lift', icon: Icons.Lift },
  { id: 'Gym', label: 'Gym', icon: Icons.Gym },
  { id: 'Intercom', label: 'Intercom', icon: Icons.Intercom },
  { id: 'Garden', label: 'Garden', icon: Icons.Garden },
  { id: 'Sports', label: 'Sports', icon: Icons.Sports },
  { id: 'Kids Area', label: 'Kids Area', icon: Icons.KidsArea },
  { id: 'CCTV', label: 'CCTV', icon: Icons.CCTV },
  { id: 'Gated Community', label: 'Gated Community', icon: Icons.GatedCommunity },
  { id: 'Club House', label: 'Club House', icon: Icons.ClubHouse },
  { id: 'Community Hall', label: 'Community Hall', icon: Icons.CommunityHall },
  { id: 'Regular Water Supply', label: 'Regular Water Supply', icon: Icons.RegularWaterSupply },
  { id: 'Attached Balcony', label: 'Attached Balcony', icon: Icons.AttachedBalcony },
  { id: '24x7 Security', label: '24x7 Security', icon: Icons.GatedCommunity },
  { id: 'Visitor Parking', label: 'Visitor Parking', icon: Car },
  { id: 'Fire Safety', label: 'Fire Safety', icon: AlertCircle },
  { id: 'Maintenance Staff', label: 'Maintenance Staff', icon: Wrench },
];

export default function FurnishingModal({
  isOpen,
  onClose,
  initialFurnishings = {},
  initialAmenities = [],
  onSave
}) {
  const [activeTab, setActiveTab] = useState('furnishings'); // 'furnishings' | 'amenities'
  const [counters, setCounters] = useState({});
  const [toggles, setToggles] = useState({});
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // Initialize state from props when modal opens
  useEffect(() => {
    if (isOpen) {
      // Parse furnishings
      let parsedFurnish = initialFurnishings;
      if (typeof initialFurnishings === 'string' && initialFurnishings.trim()) {
        try {
          parsedFurnish = JSON.parse(initialFurnishings);
        } catch (e) {
          parsedFurnish = {};
        }
      }

      const initialCounts = {};
      FLAT_COUNTER_ITEMS.forEach((item) => {
        initialCounts[item.id] = parsedFurnish?.counters?.[item.id] || parsedFurnish?.[item.id] || 0;
      });
      setCounters(initialCounts);

      const initialTogs = {};
      FLAT_TOGGLE_ITEMS.forEach((item) => {
        initialTogs[item.id] = Boolean(parsedFurnish?.toggles?.[item.id] ?? parsedFurnish?.[item.id]);
      });
      setToggles(initialTogs);

      // Parse amenities
      let parsedAmen = initialAmenities || [];
      if (typeof initialAmenities === 'string' && initialAmenities.trim()) {
        try {
          parsedAmen = JSON.parse(initialAmenities);
        } catch (e) {
          parsedAmen = initialAmenities.split(',').map((s) => s.trim()).filter(Boolean);
        }
      }
      setSelectedAmenities(Array.isArray(parsedAmen) ? parsedAmen : []);
    }
  }, [isOpen, initialFurnishings, initialAmenities]);

  if (!isOpen) return null;

  // Counter change handler
  const handleCounterChange = (id, delta) => {
    setCounters((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  // Toggle handler
  const handleToggle = (id) => {
    setToggles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Amenity toggle handler
  const handleAmenityToggle = (amenityId) => {
    setSelectedAmenities((prev) => {
      if (prev.includes(amenityId)) {
        return prev.filter((a) => a !== amenityId);
      } else {
        return [...prev, amenityId];
      }
    });
  };

  // Calculate selected counts
  const totalFurnishingSelected =
    Object.values(counters).filter((c) => c > 0).length +
    Object.values(toggles).filter(Boolean).length;

  const handleSave = () => {
    const furnishingData = {
      counters,
      toggles,
    };
    onSave({
      furnishingDetails: JSON.stringify(furnishingData),
      amenities: selectedAmenities,
    });
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '540px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Handle bar */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '12px', paddingBottom: '4px' }}>
          <div style={{ width: '42px', height: '4px', backgroundColor: '#E2E8F0', borderRadius: '999px' }} />
        </div>

        {/* Modal Header */}
        <div style={{ padding: '0.875rem 1.5rem 0.5rem 1.5rem', borderBottom: '1px solid #F1F5F9' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', margin: 0, letterSpacing: '-0.01em' }}>
              Add property furnishings and amenities
            </h2>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: '#F1F5F9',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#64748B',
                transition: 'all 0.15s ease',
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
            <button
              type="button"
              onClick={() => setActiveTab('furnishings')}
              style={{
                background: 'none',
                border: 'none',
                padding: '0.5rem 0.25rem 0.625rem',
                fontSize: '0.9375rem',
                fontWeight: activeTab === 'furnishings' ? 700 : 500,
                color: activeTab === 'furnishings' ? '#4F46E5' : '#64748B',
                borderBottom: activeTab === 'furnishings' ? '3px solid #4F46E5' : '3px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              Flat furnishings
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('amenities')}
              style={{
                background: 'none',
                border: 'none',
                padding: '0.5rem 0.25rem 0.625rem',
                fontSize: '0.9375rem',
                fontWeight: activeTab === 'amenities' ? 700 : 500,
                color: activeTab === 'amenities' ? '#4F46E5' : '#64748B',
                borderBottom: activeTab === 'amenities' ? '3px solid #4F46E5' : '3px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              Society amenities
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content Area */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            overflowY: 'auto',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          {activeTab === 'furnishings' ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#1E293B', margin: 0 }}>
                  Flat Furnishings
                </h3>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#64748B' }}>
                  {totalFurnishingSelected} selected
                </span>
              </div>

              {/* Grid 3 Columns */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.875rem',
                }}
              >
                {/* 1. Counter Items */}
                {FLAT_COUNTER_ITEMS.map((item) => {
                  const count = counters[item.id] || 0;
                  const isSelected = count > 0;
                  const IconComponent = item.icon;

                  return (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1.125rem 0.5rem 0.875rem',
                        borderRadius: '16px',
                        border: isSelected ? '1.5px solid #4F46E5' : '1px solid #E2E8F0',
                        backgroundColor: isSelected ? '#F5F3FF' : '#FFFFFF',
                        transition: 'all 0.15s ease',
                        boxShadow: isSelected ? '0 4px 12px rgba(79, 70, 229, 0.08)' : 'none',
                        minHeight: '130px',
                      }}
                    >
                      <div style={{ color: isSelected ? '#4F46E5' : '#475569', marginBottom: '0.5rem' }}>
                        <IconComponent />
                      </div>
                      <span
                        style={{
                          fontSize: '0.8125rem',
                          fontWeight: 600,
                          color: isSelected ? '#1E1B4B' : '#334155',
                          marginBottom: '0.625rem',
                          textAlign: 'center',
                        }}
                      >
                        {item.label}
                      </span>

                      {/* Quantity Selector */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                        <button
                          type="button"
                          onClick={() => handleCounterChange(item.id, -1)}
                          disabled={count === 0}
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '6px',
                            border: '1px solid #CBD5E1',
                            background: count > 0 ? '#FFFFFF' : '#F1F5F9',
                            color: count > 0 ? '#0F172A' : '#94A3B8',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: count > 0 ? 'pointer' : 'default',
                            padding: 0,
                            transition: 'all 0.1s ease',
                          }}
                        >
                          <Minus size={13} strokeWidth={2.5} />
                        </button>
                        <span style={{ fontSize: '0.9375rem', fontWeight: 700, minWidth: '16px', textAlign: 'center', color: '#0F172A' }}>
                          {count}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCounterChange(item.id, 1)}
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '6px',
                            border: '1px solid #CBD5E1',
                            background: '#FFFFFF',
                            color: '#0F172A',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            padding: 0,
                            transition: 'all 0.1s ease',
                          }}
                        >
                          <Plus size={13} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* 2. Toggle Cards */}
                {FLAT_TOGGLE_ITEMS.map((item) => {
                  const isSelected = Boolean(toggles[item.id]);
                  const IconComponent = item.icon;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleToggle(item.id)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1.125rem 0.5rem',
                        borderRadius: '16px',
                        border: isSelected ? '1.5px solid #4F46E5' : '1px solid #E2E8F0',
                        backgroundColor: isSelected ? '#F5F3FF' : '#FFFFFF',
                        transition: 'all 0.15s ease',
                        boxShadow: isSelected ? '0 4px 12px rgba(79, 70, 229, 0.08)' : 'none',
                        cursor: 'pointer',
                        minHeight: '130px',
                        position: 'relative',
                      }}
                    >
                      {isSelected && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            backgroundColor: '#4F46E5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Check size={11} color="#FFFFFF" strokeWidth={3} />
                        </div>
                      )}
                      <div style={{ color: isSelected ? '#4F46E5' : '#475569', marginBottom: '0.5rem' }}>
                        <IconComponent />
                      </div>
                      <span
                        style={{
                          fontSize: '0.8125rem',
                          fontWeight: 600,
                          color: isSelected ? '#1E1B4B' : '#334155',
                          textAlign: 'center',
                          lineHeight: '1.25',
                        }}
                      >
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#1E293B', margin: 0 }}>
                  Society Amenities
                </h3>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#64748B' }}>
                  {selectedAmenities.length} selected
                </span>
              </div>

              {/* Grid 3 Columns */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.875rem',
                }}
              >
                {SOCIETY_AMENITIES_LIST.map((item) => {
                  const isSelected = selectedAmenities.includes(item.id);
                  const IconComponent = item.icon;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleAmenityToggle(item.id)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1.125rem 0.5rem',
                        borderRadius: '16px',
                        border: isSelected ? '1.5px solid #4F46E5' : '1px solid #E2E8F0',
                        backgroundColor: isSelected ? '#F5F3FF' : '#FFFFFF',
                        transition: 'all 0.15s ease',
                        boxShadow: isSelected ? '0 4px 12px rgba(79, 70, 229, 0.08)' : 'none',
                        cursor: 'pointer',
                        minHeight: '120px',
                        position: 'relative',
                      }}
                    >
                      {isSelected && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            backgroundColor: '#4F46E5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Check size={11} color="#FFFFFF" strokeWidth={3} />
                        </div>
                      )}
                      <div style={{ color: isSelected ? '#4F46E5' : '#475569', marginBottom: '0.5rem' }}>
                        <IconComponent />
                      </div>
                      <span
                        style={{
                          fontSize: '0.8125rem',
                          fontWeight: 600,
                          color: isSelected ? '#1E1B4B' : '#334155',
                          textAlign: 'center',
                          lineHeight: '1.25',
                        }}
                      >
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '1rem 1.5rem',
            borderTop: '1px solid #F1F5F9',
            backgroundColor: '#FAFAFA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '0.75rem 1.25rem',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#64748B',
              fontSize: '0.9375rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'color 0.15s ease',
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            style={{
              flex: 1,
              maxWidth: '220px',
              padding: '0.8125rem 1.75rem',
              backgroundColor: '#4F46E5',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '12px',
              fontSize: '0.9375rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(79, 70, 229, 0.35)',
              transition: 'all 0.15s ease',
            }}
          >
            Save
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
