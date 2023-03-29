import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectDB = async () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const conn = await mongoose.connect(process.env.MONGODB_URI!);
    if (conn.connection.readyState === 1) {
      console.log('DB connection is successfully! 👏');
    } else {
      console.log('DB connecting ❓');
    }
  } catch (error: any) {
    console.log('DB connection is failed ❌');
    throw new Error(error);
  }
};

export default connectDB;
