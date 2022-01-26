const cache = require("memory-cache");

const isInCache = (key) => {
  const keys = cache.keys();
  return keys.includes(key);
};

module.exports = { isInCache };
