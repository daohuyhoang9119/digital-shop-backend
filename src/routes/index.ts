import userRoutes from './userRoutes';

const initRoutes = (app: any) => {
  app.use('/api/user', userRoutes);
};

export default initRoutes;
