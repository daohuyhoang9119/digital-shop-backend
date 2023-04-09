import mongoose from 'mongoose';
import { Schema, model, Types } from 'mongoose';

// Declare the Schema of the Mongo model

export interface ICoupon {
  name: string;
  discount: number;
  expiry: Date;
}

const couponSchema = new mongoose.Schema<ICoupon>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
      uppercase: true
    },
    discount: {
      type: Number,
      required: true
    },
    expiry: {
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
