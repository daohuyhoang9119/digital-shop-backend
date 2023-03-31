import express from 'express';
import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import cookieParser from 'cookie-parser';

import connectDB from './config/dbconnect';
import initRoutes from './routes';

const app = express();
app.use(cookieParser());
const port = process.env.PORT || 8888;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();
initRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
