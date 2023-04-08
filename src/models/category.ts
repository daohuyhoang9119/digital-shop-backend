import mongoose from 'mongoose';
import { Schema, model, Types } from 'mongoose';

// Declare the Schema of the Mongo model

export interface ICategory {
  title: string;
}

const categorySchema = new mongoose.Schema<ICategory>(
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
const Category = model<ICategory>('Category', categorySchema);
export default Category;
