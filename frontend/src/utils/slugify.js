/**
 * SEO-Friendly URL Slug generation utility.
 */

export function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // remove non-word chars except spaces and dashes
    .replace(/[\s_-]+/g, '-')  // replace spaces and underscores with a single dash
    .replace(/^-+|-+$/g, '');  // trim leading and trailing dashes
}

export function getPropertySlug(property) {
  if (!property) return '';
  if (property.slug && property.slug.trim()) {
    return property.slug.trim();
  }
  const parts = [
    property.bedrooms ? `${property.bedrooms}-bhk` : '',
    property.propertyType || '',
    property.title || '',
    property.location || '',
    property.city || ''
  ].filter(Boolean).join(' ');

  const generated = slugify(parts);
  return generated || property.id?.toString() || '';
}

export function getProjectSlug(project) {
  if (!project) return '';
  if (project.slug && project.slug.trim()) {
    return project.slug.trim();
  }
  const parts = [
    project.name || '',
    project.locality || '',
    project.city || ''
  ].filter(Boolean).join(' ');

  const generated = slugify(parts);
  return generated || project.id?.toString() || '';
}
