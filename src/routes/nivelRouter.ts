import {Router} from 'express';
import nivelVerificar from '../middlewares/nivelMiddleares';

const nivelRouter: Router = Router();

nivelRouter.route('/nivel')
  .post(nivelVerificar);

export default nivelRouter;