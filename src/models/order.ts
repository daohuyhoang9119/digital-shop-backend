import mongoose, { Mongoose } from 'mongoose';
import { Schema, model, Types } from 'mongoose';
import { EnumDeclaration } from 'typescript';

// Declare the Schema of the Mongo model
type CartItems = {
  name: string;
  qty: number;
  image: string;
  id: Types.ObjectId;
  color: string;
};

export interface IOrder {
  // title: string;
  status: string;
  orderBy: Types.ObjectId;
  cartItems: CartItems[];
  totalPrice: number;
  isPaid: boolean;
  coupon: string[];
}

const orderSchema = new mongoose.Schema<IOrder>(
  {
    // title: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   index: true
    // },
    status: {
      type: String,
      default: 'Processing',
      enum: ['Cancelled', 'Processing', 'Success']
    },
    orderBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    cartItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        _id: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Product'
        }
      }
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    coupon: [{ type: [{ type: mongoose.Types.ObjectId, ref: 'Coupon' }] }],
    isPaid: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true
  }
);

//Export the model
const Order = model<IOrder>('Order', orderSchema);
export default Order;
