import asyncHandler from 'express-async-handler';
import Order from '../models/order';
import User from '../models/user';
import { model } from 'mongoose';
import Product from '../models/product';

export const getAllOrder = asyncHandler(async (req: any, res: any) => {
  const orders = await Order.find({});
  if (orders) {
    return res.status(200).json({
      status: orders ? true : false,
      message: 'All orders ⬇️',
      data: orders
    });
  } else {
    res.status(500);
    throw new Error('orders not found!');
  }
});

export const getOrderById = asyncHandler(async (req: any, res: any) => {
  const categories = await Order.findById(req.params?.id);
  if (categories) {
    return res.status(200).json({
      status: categories ? true : false,
      message: 'All categories ⬇️',
      data: categories
    });
  } else {
    res.status(500);
    throw new Error(`Order with ${req.params?.id} not found!`);
  }
});

export const updateOrderStatus = asyncHandler(async (req: any, res: any) => {
  const { id } = req.params;
  console.log(id);
  const { status } = req.body;
  if (!status) {
    throw new Error('Missing input status');
  }
  const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
  console.log(order);
  if (order) {
    return res.json({
      success: order ? true : false,
      data: order ? order : `Oops, can't update Order 🤦‍♂️`
    });
  } else {
    throw new Error('Order not found!');
  }
});

export const deleteOrder = asyncHandler(async (req: any, res: any) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    await order.deleteOne();
    return res.status(200).json({
      success: order ? true : false,
      message: `Order has been deleted 🙆`
    });
  } else {
    res.status(400);
    throw new Error(`Order not found!🙈`);
  }
});

export const addOrder = asyncHandler(async (req: any, res: any) => {
  const { id } = req.user;
  console.log('id user:', id);
  const { coupon } = req.body;
  const userCart = await User.findById(id)
    .select('cart')
    .populate({ path: 'cart.product', select: 'title price slug address', model: Product });

  const cartItems = userCart?.cart?.map((el: any) => ({
    _id: el.product._id,
    name: el.product?.title,
    price: el.product.price,
    slug: el.product.slug,
    color: el.color,
    qty: el.qty
  }));
  console.log('cart item', cartItems);
  let totalMoney: any = userCart?.cart?.reduce((sum, el: any) => el?.product?.price * el.qty + sum, 0);
  console.log(`total price:`, totalMoney);

  if (coupon && totalMoney) {
    totalMoney = Math.round((totalMoney * (1 - coupon / 100)) / 1000) * 1000;
  }

  const response = await Order.create({
    title: `Order by ${id}`,
    orderBy: id,
    totalPrice: totalMoney,
    coupon,
    cartItems
  });
  console.log('response order completed:', response);
  return res.status(200).json({
    success: response ? true : false,
    message: 'Great, you just have add 1 Order ❤️',
    data: response ? response : `Cannot create a new Order 🤦‍♂️`
  });
});
