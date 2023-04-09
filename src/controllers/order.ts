import asyncHandler from 'express-async-handler';
import Order from '../models/order';

export const getAllOrder = asyncHandler(async (req: any, res: any) => {
  const orders = await Order.find();
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

export const updateOrder = asyncHandler(async (req: any, res: any) => {
  if (Object.keys(req.body).length === 0) {
    throw new Error('Missing input');
  }
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (order) {
    await order.save();
    return res.status(200).json({
      success: order ? true : false,
      data: order ? order : `Oops, can't update Order 🤦‍♂️`
    });
  } else {
    res.status(400);
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
  const { title } = req.body;
  //   if (Object.keys(req.body).length === 0) {
  //     throw new Error('Missing input');
  //   }
  const order = new Order(req.body);
  if (order) {
    const newOrder = await Order.create(req.body);
    res.status(200).json({
      success: order ? true : false,
      message: 'Great, you just have add 1 Order ❤️',
      data: newOrder ? newOrder : `Cannot create a new Order 🤦‍♂️`
    });
  } else {
    res.status(500);
    throw new Error('Orders not found!');
  }
});
