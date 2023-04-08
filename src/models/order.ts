import mongoose from 'mongoose';
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
  title: string;
  status: EnumDeclaration;
  orderBy: Types.ObjectId;
  cartItems: CartItems[];
  totalPrice: number;
  isPaid: boolean;
}

const orderSchema = new mongoose.Schema<IOrder>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

//Export the model
const Order = model<IOrder>('Order', orderSchema);
export default Order;
