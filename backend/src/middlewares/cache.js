const NodeCache = require('node-cache');

// StdTTL is the default time-to-live for cache entries in seconds (e.g., 5 minutes = 300)
const cache = new NodeCache({ stdTTL: 300, checkperiod: 320 });

const cacheMiddleware = (req, res, next) => {
  // Only cache GET requests
  if (req.method !== 'GET') {
    return next();
  }

  // Use the requested URL as the cache key
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    return res.status(200).json(cachedResponse);
  }

  // Override res.json to cache the response before sending it
  const originalJson = res.json;
  res.json = function (body) {
    // Only cache successful responses
    if (res.statusCode === 200) {
      cache.set(key, body);
    }
    // Call the original res.json
    originalJson.call(this, body);
  };

  next();
};

module.exports = { cache, cacheMiddleware };
