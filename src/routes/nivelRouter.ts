import {Router} from 'express';
import {nivelVerificar, nivelPadronizar} from '../middlewares/nivelMiddleares';

const nivelRouter: Router = Router();

nivelRouter.route('/nivel')
  .post(nivelVerificar, nivelPadronizar);

export default nivelRouter;