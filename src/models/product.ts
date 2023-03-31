// Declare the Schema of the Mongo model
import mongoose, { Types, model } from 'mongoose';
type Review = {
  name: string;
  rating: number;
  comment: string;
  user: Types.ObjectId;
};
interface IProduct {
  title: string;
  slug: string;
  image: string;
  price: number;
  category: string;
  brand: string;
  description: string;
  quantity?: number;
  reviews: Review[];
  // _id: string;
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
    category: {
      type: String,
      required: true
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
      type: String
    },
    reviews: [
      {
        name: String,
        rating: Number,
        comment: String,
        user: Types.ObjectId
      }
    ]
  },
  {
    timestamps: true
  }
);

//Export the model

const Product = model<IProduct>('Product', productSchema);

export default Product;
