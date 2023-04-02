import asyncHandler from 'express-async-handler';
import User from '../models/user';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from '../middlewares/jwt';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../utils/interfaces/jwt_payload.interface';

export const register = asyncHandler(async (req: any, res: any) => {
  const { firstName, lastName, email, password } = req.body;
  if (!email || !password || !lastName || !firstName) {
    return res.status(400).json({
      success: false,
      message: 'Invalid Input🔥'
    });
  }
  const user = await User.findOne({ email });
  if (user) {
    throw new Error(`User has been existed 🙏`);
  } else {
    const newUser = await User.create(req.body);
    return res.status(200).json({
      success: newUser ? true : false,
      message: 'Congratulation, you have just',
      data: newUser ? 'Hura plz go log in 🌊' : 'Opps something went wrong xxx'
    });
  }
});

export const login = asyncHandler(async (req: any, res: any) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Opps something went wrong'
    });
  }
  const user = await User.findOne({ email });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const { password, role, ...response } = user.toObject();
      const accessToken = generateAccessToken(user.id, role);
      const newRefreshToken = generateRefreshToken(user.id);
      await User.findByIdAndUpdate(user.id, { refreshToken: newRefreshToken }, { new: true });

      //save refresh token to cookie
      const timeRefreshToken = 7 * 24 * 60 * 60 * 1000;
      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        maxAge: timeRefreshToken
      });

      res.status(200).json({
        success: true,
        message: 'Congratulation. Login successfully 🫶',
        data: response,
        token: accessToken
      });
    }
  } else {
    throw new Error(`Invalid credentials😣`);
  }
});

export const getAllUser = asyncHandler(async (req: any, res: any) => {
  const users = await User.find().select('-refreshToken ');
  if (users) {
    res.status(200).json({
      success: users ? true : false,
      data: users
    });
  } else {
    res.status(500);
    throw new Error('users not found!');
  }
});

export const getUserById = asyncHandler(async (req: any, res: any) => {
  const user = await User.findById(req.params.id);
  if (user) {
    return res.status(200).json({
      success: user ? true : false,
      data: user
    });
  } else {
    res.status(400);
    throw new Error(`User not found!🙈`);
  }
});

export const updateUserById = asyncHandler(async (req: any, res: any) => {
  const user = await User.findById(req.params.id);
  const { firstName, lastName, email, mobile, password, address } = req.body;
  if (user) {
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.mobile = mobile || user.mobile;
    await user.save();
    return res.status(200).json({
      message: `User has been updated ✏️`,
      data: user
    });
  } else {
    res.status(400);
    throw new Error('user not found!');
  }
});

// firstName: string;
//   lastName: string;
//   email: string;
//   mobile: string;
//   password: string;
//   address: string[];

export const deleteUser = asyncHandler(async (req: any, res: any) => {
  const user = await User.findById(req.params.id);
  //delete user
  if (user) {
    await user.deleteOne();
    res.status(200).json({
      success: user ? true : false,
      message: `User has been deleted 😬`
    });
  } else {
    res.status(400);
    throw new Error('User not found❓');
  }
});

export const refreshAccessToken = asyncHandler(async (req: any, res: any) => {
  // Lấy token từ cookies
  const cookie = req.cookies;
  console.log('cookie:', cookie.refreshToken);
  // Check xem có token hay không
  if (!cookie && !cookie.refreshToken) throw new Error('No refresh token in cookies');
  // Check token có hợp lệ hay không
  jwt.verify(cookie?.refreshToken, process.env.JWT_SECRET!, async (err: any, decode: any) => {
    const response = await User.findOne({ _id: decode.id, refreshToken: cookie.refreshToken });
    return res.status(200).json({
      success: response ? true : false,
      newAccessToken: response ? generateAccessToken(response._id, response.role) : 'Refresh token not matched'
    });
  });
  // const { id } = rs as JwtPayload;
  // console.log('user:', user);
});
