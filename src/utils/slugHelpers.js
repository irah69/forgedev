// Generate SEO-friendly slug from product name and ID
export const generateSlug = (productName, productId) => {
  return `${productName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-${productId}`;
};

// Extract product ID from slug
export const extractIdFromSlug = (slug) => {
  if (!slug) return null;
  const parts = slug.split('-');
  return parseInt(parts[parts.length - 1], 10);
};

// Generate category slug
export const generateCategorySlug = (categoryName) => {
  return categoryName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};
