/**
 * NoSQL Injection and Parameter Sanitization Middleware
 * Recursively strips object keys prefixed with '$' or containing '.' from req.body, req.query, and req.params
 */
function sanitizeData(data) {
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      data[i] = sanitizeData(data[i]);
    }
  } else if (data !== null && typeof data === 'object') {
    for (const key of Object.keys(data)) {
      if (key.startsWith('$') || key.includes('.')) {
        delete data[key];
      } else {
        data[key] = sanitizeData(data[key]);
      }
    }
  }
  return data;
}

export function sanitizeInput(req, res, next) {
  if (req.body) sanitizeData(req.body);
  if (req.query) sanitizeData(req.query);
  if (req.params) sanitizeData(req.params);
  next();
}

