import { errorHandler, notFound } from '../middlewares/errorHandler';
import userRoutes from './userRoutes';

const initRoutes = (app: any) => {
  app.use('/api/user', userRoutes);
  app.use(notFound);
  app.use(errorHandler);
};

export default initRoutes;
