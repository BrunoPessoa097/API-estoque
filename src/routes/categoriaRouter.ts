import { Router } from 'express';
import categoriaValidar from '../middlewares/categoriaMiddleware';

const categoriaRouter: Router = Router();

categoriaRouter.route('/categoria')
  .post(categoriaValidar);

export default categoriaRouter;