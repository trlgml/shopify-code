import { Router, Application } from 'express';
import productRouter from './product'
import shopifyRouter from './shopify'
import uploadRouter from './upload'

const setRoutes = (app: Application): void => {
  const router = Router();

  router.use('/', shopifyRouter);
  router.use('/product', productRouter);
  router.use('/upload', uploadRouter);

  app.use('/', router);
  app.use('/ping', (req, res) => {
    res.json({ code: 0 })
  });

};

export default setRoutes;