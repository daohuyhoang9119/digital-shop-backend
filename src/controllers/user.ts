import asyncHandler from 'express-async-handler';
import User from '../models/user';
import bcrypt from 'bcrypt';
import { generateRefreshToken, generateToken } from '../middlewares/jwt';

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
      const accessToken = generateToken(user.id, role);
      const refreshToken = generateRefreshToken(user.id);
      await User.findByIdAndUpdate(user.id, { refreshToken }, { new: true });

      //save refresh token to cookie
      const timeRefreshToken = 7 * 24 * 60 * 60 * 1000;
      res.cookie('refreshToken', refreshToken, {
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
  const users = await User.find();
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
