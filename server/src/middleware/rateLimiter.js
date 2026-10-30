import rateLimit from 'express-rate-limit';

export const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests from this IP. Please retry after 15 minutes.',
  },
});

export const inquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30, // max 30 inquiries per 15 minutes per IP to prevent spam
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Inquiry rate limit exceeded. Please wait a few minutes before submitting another project.',
  },
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15, // max 15 attempts per 15 minutes to prevent brute-force
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many failed login attempts. Please wait 15 minutes before retrying.',
  },
});
