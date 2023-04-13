import { errorHandler, notFound } from '../middlewares/errorHandler';
import categoryRoutes from './categoryRoutes';
import couponRoutes from './couponRoutes';
import orderRoutes from './orderRoutes';
import productRoutes from './productRoutes';
import userRoutes from './userRoutes';

const initRoutes = (app: any) => {
  app.use('/api/user', userRoutes);
  app.use('/api/product', productRoutes);
  app.use('/api/category', categoryRoutes);
  app.use('/api/order', orderRoutes);
  app.use('/api/coupon', couponRoutes);
  app.use('/api/wishlist', couponRoutes);
  app.use(notFound);
  app.use(errorHandler);
};

export default initRoutes;
