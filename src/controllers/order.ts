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
// title: string;
//   status: string;
//   orderBy: Types.ObjectId;
//   cartItems: CartItems[];
//   totalPrice: number;
//   isPaid: boolean;
//   coupon: string[];

export const addOrder = asyncHandler(async (req: any, res: any) => {
  const { id } = req.user;
  const { coupon } = req.body;
  const userCart = await User.findById(id)
    .select('cart')
    .populate({ path: 'cart.product', select: 'title price slug address', model: Product });
  console.log(userCart);
  // const product = userCart
  // _id: new ObjectId("6425bceb49b4b9857d331431"),
  // cart: [
  //   {
  //     qty: 2,
  //     color: 'green',
  //     product: [Object],
  //     _id: new ObjectId("6434f6888e27ee6f34ca2858")
  //   },
  // const product  = userCart?.map(el =>({
  //   product: el.product.id,

  // }))
  const cartItems = userCart?.cart?.map((el: any) => ({
    name: el.title,
    qty: el.qty
  }));
  // console.log(cartItems);

  const response = await Order.create({
    // orderBy: id,
    // totalPrice,
    // coupon,
    // cartItems,
  });
  return res.status(200).json({
    success: userCart ? true : false,
    message: 'Great, you just have add 1 Order ❤️',
    data: userCart ? userCart : `Cannot create a new Order 🤦‍♂️`
  });
});
