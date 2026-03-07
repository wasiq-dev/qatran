import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';

/**
 * Get all products
 * @param {Object} filters - Filter options
 * @returns {Promise<Array>} Array of products
 */
export const getProducts = async (filters = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  let products = [...productsData];

  // Apply filters
  if (filters.category) {
    products = products.filter(p => p.category === filters.category);
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    products = products.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm)
    );
  }

  if (filters.minPrice !== undefined) {
    products = products.filter(p => p.basePrice >= filters.minPrice);
  }

  if (filters.maxPrice !== undefined) {
    products = products.filter(p => p.basePrice <= filters.maxPrice);
  }

  if (filters.featured) {
    products = products.filter(p => p.featured === true);
  }

  if (filters.trending) {
    products = products.filter(p => p.trending === true);
  }

  if (filters.bestSeller) {
    products = products.filter(p => p.bestSeller === true);
  }

  return products;
};

/**
 * Get product by ID
 * @param {string} id - Product ID
 * @returns {Promise<Object|null>} Product object or null
 */
export const getProductById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return productsData.find(p => p.id === id) || null;
};

/**
 * Get product by slug
 * @param {string} slug - Product slug
 * @returns {Promise<Object|null>} Product object or null
 */
export const getProductBySlug = async (slug) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return productsData.find(p => p.slug === slug) || null;
};

/**
 * Get products by category
 * @param {string} categoryId - Category ID
 * @returns {Promise<Array>} Array of products
 */
export const getProductsByCategory = async (categoryId) => {
  return getProducts({ category: categoryId });
};

/**
 * Get featured products
 * @returns {Promise<Array>} Array of featured products
 */
export const getFeaturedProducts = async () => {
  return getProducts({ featured: true });
};

/**
 * Get trending products
 * @returns {Promise<Array>} Array of trending products
 */
export const getTrendingProducts = async () => {
  return getProducts({ trending: true });
};

/**
 * Get best seller products
 * @returns {Promise<Array>} Array of best seller products
 */
export const getBestSellerProducts = async () => {
  return getProducts({ bestSeller: true });
};

/**
 * Get related products
 * @param {string} productId - Product ID
 * @returns {Promise<Array>} Array of related products
 */
export const getRelatedProducts = async (productId) => {
  const product = await getProductById(productId);
  if (!product || !product.relatedProducts) {
    return [];
  }

  const related = await Promise.all(
    product.relatedProducts.map(id => getProductById(id))
  );

  return related.filter(p => p !== null);
};

/**
 * Get all categories
 * @returns {Promise<Array>} Array of categories
 */
export const getCategories = async () => {
  await new Promise(resolve => setTimeout(resolve, 50));
  return [...categoriesData];
};

/**
 * Get category by ID
 * @param {string} id - Category ID
 * @returns {Promise<Object|null>} Category object or null
 */
export const getCategoryById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 50));
  return categoriesData.find(c => c.id === id) || null;
};



