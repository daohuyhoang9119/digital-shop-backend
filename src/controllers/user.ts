import asyncHandler from 'express-async-handler';
import User from '../models/user';

export const register = asyncHandler(async (req: any, res: any) => {
  const { firstName, lastName, email, password } = req.body;
  if (!email || !password || !lastName || !firstName) {
    return res.status(400).json({
      success: false,
      message: 'Invalid Input🔥'
    });
  }
  const response = await User.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    message: 'Congratulation, you have just',
    data: response
  });
});
