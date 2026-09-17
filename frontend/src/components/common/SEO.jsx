import React, { useEffect } from 'react';

/**
 * SEO Component for Dynamic Meta Tag, Canonical URL, and JSON-LD Schema Management
 *
 * Provides authentic, high-trust SEO signals for public client-facing pages
 * and ensures total exclusion (noindex, nofollow, nosnippet) for administrative
 * and private backend dashboard routes.
 */
export default function SEO({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = '/keystone-logo.png',
  ogType = 'website',
  noIndex = false,
  schema = null,
  geoRegion = 'IN-HR',
  geoPlacename = 'Gurgaon, Delhi NCR, India',
  geoPosition = '28.4595;77.0266',
  locality = 'Gurgaon',
  regionName = 'Haryana',
}) {
  const siteName = 'Keystone Realty Advisor';
  const defaultTitle = 'Keystone Realty Advisor | Trusted Real Estate Consultancy & Property Advisory';
  const defaultDescription =
    'Keystone Realty Advisor provides expert real estate consultancy, verified residential acquisitions, prime commercial leasing, and asset valuation with complete integrity and due diligence.';
  const defaultKeywords =
    'Keystone Realty Advisor, real estate advisory, buy property, luxury apartments, commercial property investment, verified properties, real estate consultancy, property valuation, RERA approved projects';

  const fullTitle = title
    ? title.includes(siteName)
      ? title
      : `${title} | ${siteName}`
    : defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || defaultKeywords;

  useEffect(() => {
    // 1. Update Document Title
    document.title = fullTitle;

    // Helper to update or create a <meta> tag
    const setMetaTag = (attribute, attrValue, content) => {
      let element = document.querySelector(`meta[${attribute}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to remove a <meta> tag if present
    const removeMetaTag = (attribute, attrValue) => {
      const element = document.querySelector(`meta[${attribute}="${attrValue}"]`);
      if (element) element.remove();
    };

    // Helper to update or create a <link> tag
    const setLinkTag = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute(rel, rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    const removeLinkTag = (rel) => {
      const element = document.querySelector(`link[rel="${rel}"]`);
      if (element) element.remove();
    };

    // If noIndex is true (e.g. Admin Panel, Dashboard), completely hide from search engines
    if (noIndex) {
      setMetaTag('name', 'robots', 'noindex, nofollow, noarchive, nosnippet');
      removeMetaTag('name', 'description');
      removeMetaTag('name', 'keywords');
      removeMetaTag('name', 'geo.region');
      removeMetaTag('name', 'geo.placename');
      removeMetaTag('name', 'geo.position');
      removeMetaTag('name', 'ICBM');
      removeMetaTag('name', 'target_country');
      removeMetaTag('property', 'og:title');
      removeMetaTag('property', 'og:description');
      removeMetaTag('property', 'og:image');
      removeMetaTag('property', 'og:url');
      removeMetaTag('property', 'og:type');
      removeMetaTag('property', 'og:latitude');
      removeMetaTag('property', 'og:longitude');
      removeMetaTag('property', 'og:locality');
      removeMetaTag('property', 'og:region');
      removeMetaTag('property', 'og:country-name');
      removeMetaTag('name', 'twitter:title');
      removeMetaTag('name', 'twitter:description');
      removeMetaTag('name', 'twitter:image');
      removeLinkTag('canonical');

      const existingSchemaScript = document.getElementById('keystone-jsonld-schema');
      if (existingSchemaScript) {
        existingSchemaScript.remove();
      }
      return;
    }

    // Standard Public Meta Tags
    setMetaTag('name', 'description', metaDescription);
    setMetaTag('name', 'keywords', metaKeywords);
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large');
    setMetaTag('name', 'author', 'Keystone Realty Advisor');

    // Geo-targeting Meta Tags
    const cleanPosition = geoPosition || '28.4595;77.0266';
    const coords = cleanPosition.split(/[,;]\s*/);
    const lat = coords[0] || '28.4595';
    const lng = coords[1] || '77.0266';

    setMetaTag('name', 'geo.region', geoRegion || 'IN-HR');
    setMetaTag('name', 'geo.placename', geoPlacename || 'Gurgaon, Delhi NCR, India');
    setMetaTag('name', 'geo.position', `${lat};${lng}`);
    setMetaTag('name', 'ICBM', `${lat}, ${lng}`);
    setMetaTag('name', 'target_country', 'IN');

    // OpenGraph / Social Meta Tags
    setMetaTag('property', 'og:site_name', siteName);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', metaDescription);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', canonicalUrl || window.location.href);

    const absoluteImage = ogImage.startsWith('http')
      ? ogImage
      : `${window.location.origin}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`;
    setMetaTag('property', 'og:image', absoluteImage);
    setMetaTag('property', 'og:image:alt', fullTitle);
    setMetaTag('property', 'og:locale', 'en_IN');

    // OpenGraph Geo Location Tags
    setMetaTag('property', 'og:latitude', lat);
    setMetaTag('property', 'og:longitude', lng);
    setMetaTag('property', 'og:locality', locality || 'Gurgaon');
    setMetaTag('property', 'og:region', regionName || 'Haryana');
    setMetaTag('property', 'og:country-name', 'India');

    // Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', metaDescription);
    setMetaTag('name', 'twitter:image', absoluteImage);
    setMetaTag('name', 'twitter:image:alt', fullTitle);

    // Canonical Tag
    const currentCanonical = canonicalUrl || window.location.href.split('?')[0];
    setLinkTag('canonical', currentCanonical);

    // Inject JSON-LD Schema
    const existingSchemaScript = document.getElementById('keystone-jsonld-schema');
    if (existingSchemaScript) {
      existingSchemaScript.remove();
    }

    if (schema) {
      const script = document.createElement('script');
      script.id = 'keystone-jsonld-schema';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    // Cleanup on unmount or change
    return () => {
      const scriptToRemove = document.getElementById('keystone-jsonld-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [fullTitle, metaDescription, metaKeywords, canonicalUrl, ogImage, ogType, noIndex, schema, geoRegion, geoPlacename, geoPosition, locality, regionName]);

  return null;
}
