import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/peace_haven',
  jwtSecret: process.env.JWT_SECRET || 'peace_haven_jwt_secret_super_secure_key_2026_xyz',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
    port: parseInt(process.env.SMTP_PORT || '2525', 10),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.FROM_EMAIL || '"Peace Haven Technologies" <noreply@peacehaven.tech>',
    notificationEmail: process.env.NOTIFICATION_EMAIL || 'inquiries@peacehaven.tech',
  },
  initialAdmin: {
    email: process.env.INITIAL_ADMIN_EMAIL || 'admin@peacehaven.tech',
    password: process.env.INITIAL_ADMIN_PASSWORD || 'PeaceHavenAdmin2026!',
    name: process.env.INITIAL_ADMIN_NAME || 'Executive Technical Lead',
  },
};
