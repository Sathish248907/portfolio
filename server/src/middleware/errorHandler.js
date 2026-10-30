import { ZodError } from 'zod';

export function errorHandler(err, req, res, next) {
  console.error(`[Error] ${req.method} ${req.url} - ${err.message}`);

  // Handle Zod Validation Errors
  if (err instanceof ZodError) {
    const formatted = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: formatted,
    });
  }

  // Handle MongoDB Duplicate Key (E11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'record';
    return res.status(409).json({
      success: false,
      error: `A resource with that ${field} already exists.`,
    });
  }

  // Handle CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: `Invalid format for identifier: ${err.value}`,
    });
  }

  // Default Internal Server Error
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    success: false,
    error: err.message || 'Internal Server Error',
  });
}
