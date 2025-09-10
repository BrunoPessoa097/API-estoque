import { Router } from 'express';
// Imports locais.
import { categoriaValidar, categoriaPadronizar} from '../middlewares/categoriaMiddleware';

const categoriaRouter: Router = Router();

categoriaRouter.route('/categoria')
  .post(categoriaValidar, categoriaPadronizar);

export default categoriaRouter;