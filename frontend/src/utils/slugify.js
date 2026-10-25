/**
 * SEO-Friendly URL Slug generation utility with token deduplication.
 */

export function dedupeTokens(slug) {
  if (!slug) return '';
  const tokens = slug.split('-');
  const result = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (!token) continue;
    // Don't repeat consecutive words (e.g. gurgaon-gurgaon -> gurgaon)
    if (result.length > 0 && result[result.length - 1] === token) {
      continue;
    }
    // Avoid repeating key city/category words more than once if already present earlier
    if (result.includes(token) && ['gurgaon', 'gurugram', 'delhi', 'noida', 'dwarka', 'flat', 'flats', 'apartment', 'apartments', 'sector'].includes(token)) {
      continue;
    }
    result.push(token);
  }
  return result.join('-');
}

export function slugify(text) {
  if (!text) return '';
  const raw = text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // remove non-word chars except spaces and dashes
    .replace(/[\s_-]+/g, '-')  // replace spaces and underscores with a single dash
    .replace(/^-+|-+$/g, '');  // trim leading and trailing dashes
  return dedupeTokens(raw);
}

export function getPropertySlug(property) {
  if (!property) return '';
  if (property.slug && property.slug.trim()) {
    return dedupeTokens(property.slug.trim());
  }
  const title = (property.title || '').toLowerCase();
  const loc = (property.location || '').toLowerCase();
  const city = (property.city || '').toLowerCase();

  const parts = [
    property.bedrooms ? `${property.bedrooms}-bhk` : '',
    property.propertyType || '',
    property.title || '',
    loc && !title.includes(loc) ? property.location : '',
    city && !title.includes(city) && !loc.includes(city) ? property.city : ''
  ].filter(Boolean).join(' ');

  const generated = slugify(parts);
  return generated || property.id?.toString() || '';
}

export function getProjectSlug(project) {
  if (!project) return '';
  if (project.slug && project.slug.trim()) {
    return dedupeTokens(project.slug.trim());
  }
  const name = (project.name || '').toLowerCase();
  const loc = (project.locality || '').toLowerCase();
  const city = (project.city || '').toLowerCase();

  const parts = [
    project.name || '',
    loc && !name.includes(loc) ? project.locality : '',
    city && !name.includes(city) && !loc.includes(city) ? project.city : ''
  ].filter(Boolean).join(' ');

  const generated = slugify(parts);
  return generated || project.id?.toString() || '';
}
