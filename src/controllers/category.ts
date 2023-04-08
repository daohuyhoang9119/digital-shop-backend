import Category from '../models/category';
import asyncHandler from 'express-async-handler';

export const getAllCategory = asyncHandler(async (req: any, res: any) => {
  const categories = await Category.find();
  if (categories) {
    return res.status(200).json({
      status: categories ? true : false,
      message: 'All categories ⬇️',
      data: categories
    });
  } else {
    res.status(500);
    throw new Error('categories not found!');
  }
});

export const getCategoryByTitle = asyncHandler(async (req: any, res: any) => {
  const categories = await Category.find();
  if (categories) {
    return res.status(200).json({
      status: categories ? true : false,
      message: 'All categories ⬇️',
      data: categories
    });
  } else {
    res.status(500);
    throw new Error('categories not found!');
  }
});

export const updateCategory = asyncHandler(async (req: any, res: any) => {
  return;
});

export const deleteCategory = asyncHandler(async (req: any, res: any) => {
  return;
});
export const addCategory = asyncHandler(async (req: any, res: any) => {
  return;
});
