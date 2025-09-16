import { Router } from 'express';
// Import local
import marcaVerificar from '../middlewares/marcaMiddleware';

const marcaRouter: Router = Router();

marcaRouter.route('/marca')
  .post(marcaVerificar);

export default marcaRouter;