import asyncHandler from 'express-async-handler';
import WishList from '../models/wishlist';

export const getAllWishList = asyncHandler(async (req: any, res: any) => {
  const wishList = await WishList.find();
  if (wishList) {
    return res.status(200).json({
      status: wishList ? true : false,
      message: 'All wishList ⬇️',
      data: wishList
    });
  } else {
    res.status(500);
    throw new Error('wishLists not found!');
  }
});

export const deleteWishList = asyncHandler(async (req: any, res: any) => {
  const wishList = await WishList.findById(req.params.id);
  if (wishList) {
    await wishList.deleteOne();
    return res.status(200).json({
      success: wishList ? true : false,
      message: `wishList has been deleted 🙆`
    });
  } else {
    res.status(400);
    throw new Error(`category not found!🙈`);
  }
});

export const addWishList = asyncHandler(async (req: any, res: any) => {
  const { title } = req.body;
  //   if (Object.keys(req.body).length === 0) {
  //     throw new Error('Missing input');
  //   }
  const wishList = new WishList(req.body);
  if (wishList) {
    const newwishList = await WishList.create(req.body);
    res.status(200).json({
      success: wishList ? true : false,
      message: 'Great, you just have add 1 wishList ❤️',
      data: newwishList ? newwishList : `Cannot create a new category 🤦‍♂️`
    });
  } else {
    res.status(500);
    throw new Error('wishList not found!');
  }
});
