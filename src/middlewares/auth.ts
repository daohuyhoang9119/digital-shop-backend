import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

export const verifyAccessToken = asyncHandler(async (req: any, res: any, next) => {
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith('Bearer')) {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET!, (err: any, decode: any) => {
      if (err)
        return res.status(401).json({
          success: false,
          mes: 'Invalid access token'
        });
      req.user = decode;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      mes: 'Require authentication!!!'
    });
  }
});

export const isAdmin = asyncHandler((req: any, res: any, next) => {
  const { role } = req.user;
  if (role !== 'admin')
    return res.status(401).json({
      success: false,
      mes: ' REQUIRE ADMIN ROLE'
    });
  next();
});
