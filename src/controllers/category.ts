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
  if (Object.keys(req.body).length === 0) {
    throw new Error('Missing input');
  }
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (category) {
    await category.save();
    return res.status(200).json({
      success: category ? true : false,
      data: category ? category : `Oops, can't update category 🤦‍♂️`
    });
  } else {
    res.status(400);
    throw new Error('category not found!');
  }
});

export const deleteCategory = asyncHandler(async (req: any, res: any) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    await category.deleteOne();
    return res.status(200).json({
      success: category ? true : false,
      message: `category has been deleted 🙆`
    });
  } else {
    res.status(400);
    throw new Error(`category not found!🙈`);
  }
});
export const addCategory = asyncHandler(async (req: any, res: any) => {
  const { title } = req.body;
  //   if (Object.keys(req.body).length === 0) {
  //     throw new Error('Missing input');
  //   }
  const category = new Category(req.body);
  if (category) {
    const newcategory = await Category.create(req.body);
    res.status(200).json({
      success: category ? true : false,
      message: 'Great, you just have add 1 category ❤️',
      data: newcategory ? newcategory : `Cannot create a new category 🤦‍♂️`
    });
  } else {
    res.status(500);
    throw new Error('categorys not found!');
  }
});
