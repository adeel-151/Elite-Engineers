const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

/**
 * Clean data recursively
 */
const clean = (data) => {
  let isObject = false;
  if (typeof data === 'object') {
    isObject = true;
  }

  let cleanedData = isObject ? { ...data } : data;

  if (typeof cleanedData === 'string') {
    // Basic mongo sanitization by removing $ and . from start of keys
    // And XSS sanitization
    return DOMPurify.sanitize(cleanedData).trim();
  }

  if (isObject && cleanedData !== null) {
    for (const key in cleanedData) {
      if (Object.prototype.hasOwnProperty.call(cleanedData, key)) {
        // Prevent NoSQL injection by checking keys
        if (key.startsWith('$') || key.includes('.')) {
           delete cleanedData[key];
           continue; // Or throw error
        }
        cleanedData[key] = clean(cleanedData[key]);
      }
    }
  }

  return cleanedData;
};

/**
 * Express middleware to sanitize body, query and params
 */
const xssAndMongoSanitizer = () => {
  return (req, res, next) => {
    if (req.body) req.body = clean(req.body);
    if (req.query) req.query = clean(req.query);
    if (req.params) req.params = clean(req.params);
    next();
  };
};

module.exports = xssAndMongoSanitizer;
