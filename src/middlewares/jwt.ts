import jwt from 'jsonwebtoken';

export const generateToken = (userId: string, role: string) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET!, {
    expiresIn: '3d'
  });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
    expiresIn: '7d'
  });
};
