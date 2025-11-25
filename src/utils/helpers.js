// Utility functions for common operations

/**
 * Filter FAQ items by search query
 * @param {Array} items - FAQ items to filter
 * @param {String} query - Search query
 * @returns {Array} Filtered items
 */
export const filterFAQItems = (items, query) => {
  if (!query) return items;
  const q = query.toLowerCase();
  return items.filter(
    (item) =>
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q)
  );
};

/**
 * Debounce function for search
 * @param {Function} func - Function to debounce
 * @param {Number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Truncate text to specified length
 * @param {String} text - Text to truncate
 * @param {Number} length - Max length
 * @returns {String} Truncated text
 */
export const truncateText = (text, length) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
};

/**
 * Format date to readable string
 * @param {Date} date - Date object
 * @returns {String} Formatted date
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
