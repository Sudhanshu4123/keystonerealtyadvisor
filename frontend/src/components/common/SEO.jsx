import React, { useEffect } from 'react';

/**
 * Production-Ready SEO Component for Meta Tag, Canonical URL, OpenGraph, Twitter Cards,
 * Geo-targeting, and JSON-LD Structured Data Management.
 */
export default function SEO({
  title,
  description,
  keywords,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage = '/keystone-logo.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  twitterTitle,
  twitterDescription,
  twitterImage,
  noIndex = false,
  breadcrumbs = null,
  schema = null,
  geoRegion = 'IN-HR',
  geoPlacename = 'Gurgaon, Delhi NCR, India',
  geoPosition = '28.4595;77.0266',
  locality = 'Gurgaon',
  regionName = 'Haryana',
}) {
  const siteName = 'Keystone Realty Advisor';
  const defaultTitle = 'Keystone Realty Advisor | Trusted Real Estate Advisory & Property Consultants';
  const defaultDescription =
    'Keystone Realty Advisor provides expert real estate consultancy, verified residential acquisitions, prime commercial leasing, and asset valuation with complete integrity and due diligence.';
  const defaultKeywords =
    'Keystone Realty Advisor, real estate advisory, buy property Gurgaon, luxury apartments Gurgaon, commercial property investment, verified properties, real estate consultancy, property valuation, RERA approved projects';

  const fullTitle = title
    ? title.includes(siteName)
      ? title
      : `${title} | ${siteName}`
    : defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || defaultKeywords;
  const resolvedOgTitle = ogTitle || fullTitle;
  const resolvedOgDescription = ogDescription || metaDescription;
  const resolvedTwitterTitle = twitterTitle || resolvedOgTitle;
  const resolvedTwitterDescription = twitterDescription || resolvedOgDescription;

  const baseUrl = (typeof window !== 'undefined' && window.location.origin.includes('localhost'))
    ? window.location.origin
    : 'https://keystonerealtyadvisor.com';

  const normalizedCanonical = canonicalUrl
    ? (canonicalUrl.startsWith('http') ? canonicalUrl : `${baseUrl}${canonicalUrl.startsWith('/') ? canonicalUrl : `/${canonicalUrl}`}`)
    : (typeof window !== 'undefined' ? `${baseUrl}${window.location.pathname.replace(/\/+$/, '') || '/'}` : baseUrl);

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
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    const removeLinkTag = (rel) => {
      const element = document.querySelector(`link[rel="${rel}"]`);
      if (element) element.remove();
    };

    // If noIndex is true (e.g. Admin Panel, Dashboard, User Account), completely hide from search engines
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
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
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
    setMetaTag('property', 'og:title', resolvedOgTitle);
    setMetaTag('property', 'og:description', resolvedOgDescription);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', normalizedCanonical);

    const absoluteOgImage = ogImage.startsWith('http')
      ? ogImage
      : `${baseUrl}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`;
    setMetaTag('property', 'og:image', absoluteOgImage);
    setMetaTag('property', 'og:image:alt', resolvedOgTitle);
    setMetaTag('property', 'og:locale', 'en_IN');

    // OpenGraph Geo Location Tags
    setMetaTag('property', 'og:latitude', lat);
    setMetaTag('property', 'og:longitude', lng);
    setMetaTag('property', 'og:locality', locality || 'Gurgaon');
    setMetaTag('property', 'og:region', regionName || 'Haryana');
    setMetaTag('property', 'og:country-name', 'India');

    // Twitter Card Tags
    setMetaTag('name', 'twitter:card', twitterCard);
    setMetaTag('name', 'twitter:title', resolvedTwitterTitle);
    setMetaTag('name', 'twitter:description', resolvedTwitterDescription);
    const absoluteTwitterImage = twitterImage
      ? (twitterImage.startsWith('http') ? twitterImage : `${baseUrl}${twitterImage.startsWith('/') ? twitterImage : `/${twitterImage}`}`)
      : absoluteOgImage;
    setMetaTag('name', 'twitter:image', absoluteTwitterImage);
    setMetaTag('name', 'twitter:image:alt', resolvedTwitterTitle);

    // Canonical Tag
    setLinkTag('canonical', normalizedCanonical);

    // Construct and Inject JSON-LD Schema
    const schemasToInject = [];

    // Add BreadcrumbList Schema if breadcrumbs array is provided
    if (Array.isArray(breadcrumbs) && breadcrumbs.length > 0) {
      schemasToInject.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((b, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: b.name || b.label,
          item: b.url || b.item || (b.path ? (b.path.startsWith('http') ? b.path : `${baseUrl}${b.path.startsWith('/') ? b.path : `/${b.path}`}`) : undefined),
        })),
      });
    }

    // Add Custom Page Schema
    if (schema) {
      if (Array.isArray(schema)) {
        schemasToInject.push(...schema);
      } else {
        schemasToInject.push(schema);
      }
    }

    const existingSchemaScript = document.getElementById('keystone-jsonld-schema');
    if (existingSchemaScript) {
      existingSchemaScript.remove();
    }

    if (schemasToInject.length > 0) {
      const script = document.createElement('script');
      script.id = 'keystone-jsonld-schema';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schemasToInject.length === 1 ? schemasToInject[0] : {
        '@context': 'https://schema.org',
        '@graph': schemasToInject,
      });
      document.head.appendChild(script);
    }

    // Cleanup on unmount or route change
    return () => {
      const scriptToRemove = document.getElementById('keystone-jsonld-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [
    fullTitle, metaDescription, metaKeywords, normalizedCanonical,
    resolvedOgTitle, resolvedOgDescription, ogImage, ogType,
    twitterCard, resolvedTwitterTitle, resolvedTwitterDescription, twitterImage,
    noIndex, schema, breadcrumbs, geoRegion, geoPlacename, geoPosition, locality, regionName, baseUrl
  ]);

  return null;
}
