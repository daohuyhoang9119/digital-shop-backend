import { errorHandler, notFound } from '../middlewares/errorHandler';
import productRoutes from './productRoutes';
import userRoutes from './userRoutes';

const initRoutes = (app: any) => {
  app.use('/api/user', userRoutes);
  app.use('/api/product', productRoutes);
  app.use(notFound);
  app.use(errorHandler);
};

export default initRoutes;
