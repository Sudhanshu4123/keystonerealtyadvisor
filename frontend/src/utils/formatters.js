/**
 * Formats a numeric value into Indian currency shorthand (e.g. ₹2 Lakh, ₹3.1 Cr).
 * - >= 1 Cr (10,000,000): e.g. ₹3.1 Cr, ₹4.21 Cr, ₹2 Cr
 * - >= 1 Lakh (100,000): e.g. ₹2 Lakh, ₹20 Lakh, ₹85.5 Lakh
 * - < 1 Lakh: e.g. ₹25,000, ₹5,000
 */
export function formatIndianCurrency(val) {
  if (val === null || val === undefined || val === '') return '';
  const num = Number(val);
  if (isNaN(num)) return String(val);
  if (num === 0) return '₹0';

  const sign = num < 0 ? '-' : '';
  const abs = Math.abs(num);

  if (abs >= 10000000) {
    // 1 Crore = 10,000,000
    const cr = abs / 10000000;
    // Format up to 2 decimals and strip redundant trailing zeros (e.g. 2 instead of 2.00, 3.1 instead of 3.10)
    const formatted = Number(cr.toFixed(2));
    return `${sign}₹${formatted} Cr`;
  } else if (abs >= 100000) {
    // 1 Lakh = 100,000
    const lk = abs / 100000;
    const formatted = Number(lk.toFixed(2));
    return `${sign}₹${formatted} Lakh`;
  } else {
    return `${sign}${new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(abs)}`;
  }
}

/**
 * Formats a property price with its listing type suffix if applicable.
 */
export function formatPrice(val, listingType, emptyLabel = 'Price on Enquiry') {
  if (val === null || val === undefined || val === '' || Number(val) === 0) {
    return emptyLabel;
  }
  const formatted = formatIndianCurrency(val);
  return (listingType === 'RENT' || listingType === 'PG_CO_LIVING') ? `${formatted}/mo` : formatted;
}

/**
 * Formats min and max price range for projects.
 */
export function formatPriceRange(min, max, priceType = 'Price on Request') {
  if (!min && !max) return priceType || 'Price on Request';

  if (min && max && Number(min) !== Number(max)) {
    return `${formatIndianCurrency(min)} - ${formatIndianCurrency(max)}`;
  }
  if (min) return `From ${formatIndianCurrency(min)}`;
  if (max) return `Up to ${formatIndianCurrency(max)}`;
  return priceType || 'Price on Request';
}

export function formatDate(dateString) {
  if (!dateString) return 'N/A';
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch (e) {
    return dateString;
  }
}

