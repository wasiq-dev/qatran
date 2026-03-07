/**
 * Format price with currency symbol
 * @param {number} price - Price in smallest currency unit (e.g., cents, paise)
 * @param {string} currency - Currency code (e.g., "PKR", "USD")
 * @returns {string} Formatted price string
 */
export const formatPrice = (price, currency = 'PKR') => {
  const currencySymbols = {
    PKR: 'Rs.',
    USD: '$',
    EUR: '€',
    GBP: '£',
  };

  const symbol = currencySymbols[currency] || currency;
  const amount = (price / 100).toFixed(2);

  return `${symbol}${amount}`;
};

/**
 * Format currency amount (assumes price is already in main unit)
 * @param {number} amount - Amount in main currency unit
 * @param {string} currency - Currency code
 * @returns {string} Formatted amount string
 */
export const formatCurrency = (amount, currency = 'PKR') => {
  const currencySymbols = {
    PKR: 'Rs.',
    USD: '$',
    EUR: '€',
    GBP: '£',
  };

  const symbol = currencySymbols[currency] || currency;
  return `${symbol}${amount.toLocaleString()}`;
};

/**
 * Format date to readable string
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};



