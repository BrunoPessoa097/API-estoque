import { Router } from 'express';
// import local
import loginPip from '../pipelines/authorPipelines';

// contruindo as rotas
const authorRouter: Router = Router();

authorRouter.route('/login')
  .post(loginPip);

// exports
export default authorRouter;