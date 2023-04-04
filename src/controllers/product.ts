import asyncHandler from 'express-async-handler';
import Product from './../models/product';

export const getAllProduct = asyncHandler(async (req: any, res: any) => {
  const products = await Product.find({}).limit(12);

  if (products) {
    res.status(200).json({
      status: products ? true : false,
      message: 'All products ⬇️',
      data: products
    });
  } else {
    res.status(500);
    throw new Error('products not found!');
  }
});

export const addProduct = asyncHandler(async (req: any, res: any) => {
  const { title, slug, image, price, category, brand, quantity, description } = req.body;
  const product = new Product({
    title,
    slug,
    image,
    price,
    brand,
    quantity,
    description
  });
  console.log(product);
  if (product) {
    const newProduct = await Product.create(req.body);
    res.status(200).json({
      status: product ? true : false,
      message: 'Great, you just have add 1 product ❤️',
      data: newProduct
    });
  } else {
    res.status(500);
    throw new Error('products not found!');
  }
});
