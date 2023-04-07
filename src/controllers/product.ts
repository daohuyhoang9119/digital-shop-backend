import asyncHandler from 'express-async-handler';
import Product from './../models/product';
import slugify from 'slugify';
import { query } from 'express';

export const getAllProduct = asyncHandler(async (req: any, res: any) => {
  const products = await Product.find();
  const queries = { ...req.queries };

  const excludeFields = ['limit', 'sort', 'page', 'fields'];
  excludeFields.forEach((el) => delete queries[el]);
  const queryString = JSON.stringify(queries);
  queryString.replace(/\b(gte|gt|lte|lt)\b/g, (el) => `$${el}`);

  const formatedQueries = JSON.parse(queryString);

  //filtering
  if (queries?.title) {
    formatedQueries.title = { $regex: queries.title, $options: 'i' };
  }
  const queryCommand = await Product.find(formatedQueries);

  // queryCommand.exec();
  //Execute querry
  // queryCommand.exec(async (err: any, res: any) => {

  // });

  if (products) {
    return res.status(200).json({
      status: products ? true : false,
      message: 'All products ⬇️',
      data: products
    });
  } else {
    res.status(500);
    throw new Error('products not found!');
  }
});

export const getProductSearch = asyncHandler(async (req: any, res: any, next: any) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const products = await Product.find({ ...req.query })

      .limit(limit * 1)
      .skip((page - 1) * limit)

      .sort({ createdAt: -1 });

    const count = await Product.countDocuments();
    return res.status(200).json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    next(err);
  }
});

export const addProduct = asyncHandler(async (req: any, res: any) => {
  const { title, slug, image, price, category, brand, quantity, description } = req.body;
  if (Object.keys(req.body).length === 0) {
    throw new Error('Missing input');
  }
  req.body.slug = slugify(req.body.title);
  const product = new Product(req.body);
  console.log(product);
  if (product) {
    const newProduct = await Product.create(req.body);
    res.status(200).json({
      success: product ? true : false,
      message: 'Great, you just have add 1 product ❤️',
      data: newProduct ? newProduct : `Cannot create a new product 🤦‍♂️`
    });
  } else {
    res.status(500);
    throw new Error('products not found!');
  }
});

export const getProductById = asyncHandler(async (req: any, res: any) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.status(200).json({
      success: product ? true : false,
      data: product
    });
  } else {
    res.status(400);
    throw new Error(`product not found!🙈`);
  }
});

export const deleteProductById = asyncHandler(async (req: any, res: any) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.deleteOne();
    return res.status(200).json({
      success: product ? true : false,
      message: `Product has been deleted 🙆`
    });
  } else {
    res.status(400);
    throw new Error(`product not found!🙈`);
  }
});

export const updateProductById = asyncHandler(async (req: any, res: any) => {
  if (Object.keys(req.body).length === 0) {
    throw new Error('Missing input');
  }
  req.body.slug = slugify(req.body.title);
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (product) {
    await product.save();
    return res.status(200).json({
      success: product ? true : false,
      data: product ? product : `Oops, can't update product 🤦‍♂️`
    });
  } else {
    res.status(400);
    throw new Error('product not found!');
  }
});

//filtering, sorting, pagination
