/**
 * Validate email address
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (basic validation)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid phone
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[\d\s()+-]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

/**
 * Validate required field
 * @param {string} value - Value to validate
 * @returns {boolean} True if value is not empty
 */
export const isRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== '';
};

/**
 * Validate postal code
 * @param {string} postalCode - Postal code to validate
 * @returns {boolean} True if valid postal code
 */
export const isValidPostalCode = (postalCode) => {
  return isRequired(postalCode) && postalCode.trim().length >= 4;
};

/**
 * Validate quantity (must be positive integer)
 * @param {number} quantity - Quantity to validate
 * @returns {boolean} True if valid quantity
 */
export const isValidQuantity = (quantity) => {
  return Number.isInteger(quantity) && quantity > 0;
};



