// Declare the Schema of the Mongo model
import mongoose, { Schema, Types, model } from 'mongoose';
type Review = {
  name: string;
  rating: number;
  comment: string;
  postedBy: Types.ObjectId;
};
interface IProduct {
  title: string;
  slug: string;
  image: string;
  price: number;
  category: string[];
  color: string;
  brand: string;
  description: string;
  quantity?: number;
  sold: number;
  reviews: Review[];
  totalRating: number;
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    image: {
      type: String
    },
    price: {
      type: Number
    },
    category: [{ type: mongoose.Types.ObjectId, ref: 'Category' }],
    color: {
      type: String,
      enum: ['Black', 'Red', 'Blue', 'White']
    },
    brand: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    quantity: {
      type: String,
      default: 0
    },
    sold: {
      type: Number,
      default: 0
    },
    reviews: [
      {
        name: String,
        rating: Number,
        comment: String,
        postedBy: { type: Types.ObjectId, ref: 'User' }
      }
    ],
    totalRating: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

//Export the model

const Product = model<IProduct>('Product', productSchema);

export default Product;
