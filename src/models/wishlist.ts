import mongoose from 'mongoose';
import { Schema, model, Types } from 'mongoose';

// Declare the Schema of the Mongo model

export interface IWishlist {
  title: string;
  image: string;
}

const wishListSchema = new mongoose.Schema<IWishlist>(
  {
    title: {
      type: String,
      unique: true,
      index: true
    },
    image: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

//Export the model
const WishList = model<IWishlist>('WishList', wishListSchema);
export default WishList;
