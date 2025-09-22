import { Router } from 'express';
import prodPipAdd from '../pipelines/produtoPipelines';

const produtoRouter: Router = Router();

produtoRouter.route('/produtos')
  .post(prodPipAdd);

export default produtoRouter;