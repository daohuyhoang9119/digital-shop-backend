import asyncHandler from 'express-async-handler';
import Coupon from '../models/coupon';

export const getAllCoupon = asyncHandler(async (req: any, res: any) => {
  const coupons = await Coupon.find();
  if (coupons) {
    return res.status(200).json({
      success: coupons ? true : false,
      data: coupons ? coupons : `🤦‍♂️ Can't get coupon list`
    });
  } else {
    res.status(500);
    throw new Error('😬Coupons not found!');
  }
});

export const addCoupon = asyncHandler(async (req: any, res: any) => {
  const { name, discount, expiry } = req.body;
  if (!name || !discount || !expiry) {
    throw new Error('Mising inputs');
  }
  const response = await Coupon.create({
    ...req.body,
    expiry: Date.now() + expiry * 24 * 60 * 60 * 1000
  });
  return res.json({
    success: response ? true : false,
    data: response ? response : ` 🤦‍♂️Can't create a coupon`
  });
});

export const deleteCoupon = asyncHandler(async (req: any, res: any) => {
  const coupon = await Coupon.findById(req.params.id);
  if (coupon) {
    await coupon.deleteOne();
    return res.status(200).json({
      success: coupon ? true : false,
      message: `coupon has been deleted 🙆`
    });
  } else {
    res.status(400);
    throw new Error(`coupon not found!🙈`);
  }
});

export const updateCoupon = asyncHandler(async (req: any, res: any) => {
  if (Object.keys(req.body).length === 0) {
    throw new Error('Missing input');
  }
  const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (coupon) {
    await coupon.save();
    return res.status(200).json({
      success: coupon ? true : false,
      data: coupon ? coupon : `Oops, can't update coupon 🤦‍♂️`
    });
  } else {
    res.status(400);
    throw new Error('coupon not found!');
  }
});
