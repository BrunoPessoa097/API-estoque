import { Router } from 'express';
// Imports locais.
import { categoriaValidar, categoriaPadronizar} from '../middlewares/categoriaMiddleware';
import categoriaAdd from '../controllers/categoriaControllers'

const categoriaRouter: Router = Router();

categoriaRouter.route('/categoria')
  .post(categoriaValidar, categoriaPadronizar,categoriaAdd);

export default categoriaRouter;