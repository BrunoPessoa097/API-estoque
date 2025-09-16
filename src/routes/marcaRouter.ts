import { Router } from 'express';
// Import local
import {marcaVerificar, marcaPadronizar} from '../middlewares/marcaMiddleware';

const marcaRouter: Router = Router();

marcaRouter.route('/marca')
  .post(marcaVerificar, marcaPadronizar);

export default marcaRouter;