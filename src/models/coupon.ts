import mongoose from 'mongoose';
import { Schema, model, Types } from 'mongoose';

// Declare the Schema of the Mongo model

export interface ICoupon {
  name: string;
  discount: number;
  expriry: Date;
}

const couponSchema = new mongoose.Schema<ICoupon>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    discount: {
      type: Number,
      required: true
    },
    expriry: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

//Export the model
const Coupon = model<ICoupon>('Coupon', couponSchema);
export default Coupon;
