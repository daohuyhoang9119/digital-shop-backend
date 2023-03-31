import mongoose from 'mongoose';
import { Schema, model, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import { getEffectiveTypeParameterDeclarations } from 'typescript';

// Declare the Schema of the Mongo model

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  address: string[];
  role: string;
  cart: CartItems[];
  wishList: string[];
  createdAt: Date;
  updatedAt: Date;
  isBlocked: boolean;
  refreshToken: string;
  passwordChangedAt: string;
  passwordResetToken: string;
  passwordResetExpires: string;
}
type CartItems = {
  name: string;
  qty: number;
  image: string;
};

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    mobile: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: 'user'
    },
    cart: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true }
      }
    ],
    address: [{ type: mongoose.Types.ObjectId, ref: 'Address' }],
    wishList: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
    isBlocked: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date
    },
    updatedAt: {
      type: Date
    },
    refreshToken: {
      type: String
    },
    //reset password
    passwordChangedAt: {
      type: String
    },
    passwordResetToken: {
      type: String
    },
    passwordResetExpires: {
      type: String
    }
  },
  {
    timestamps: true
  }
);
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Export the model
const User = model<IUser>('User', userSchema);
export default User;
