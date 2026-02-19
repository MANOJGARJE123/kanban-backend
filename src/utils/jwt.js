import jwt from 'jsonwebtoken';

export const generateJwtToken = (payload, options = {}) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    const error = new Error('JWT secret is not configured');
    error.statusCode = 500;
    throw error;
  }

  return jwt.sign(payload, secret, {
    expiresIn: '1h',
    ...options,
  });
};
