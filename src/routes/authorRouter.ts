import { Router } from 'express';
// import local
import { loginPip, logadoPip } from '../pipelines/authorPipelines';

// contruindo as rotas
const authorRouter: Router = Router();

/**
 * @swagger
 * tags: Login
 * description: Login.
 */
/**
* @swagger
* /login:
*  post:
*    summary: Login para fazer acesso a rotas
*    description: Login.
*    tags: [Login]
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            type: object
*            properties:
*              email:
*                type: string
*              senha:
*                type: string
*    responses:
*      200:
*        description: Login
*      409:
*        description: Não existe informações repassadas
*/
authorRouter.route('/login')
  .post(loginPip);
authorRouter.route('/login/autorizado')
  .get(logadoPip);

// exports
export default authorRouter;