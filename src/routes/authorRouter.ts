import { Router } from 'express';
// import local
import { loginPip, logadoPip } from '../pipelines/authorPipelines';

// contruindo as rotas
const authorRouter: Router = Router();

authorRouter.route('/login')
  .post(loginPip);
authorRouter.route('/login/autorizado')
  .get(logadoPip);

// exports
export default authorRouter;