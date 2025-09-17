import { Router } from 'express';
// Import local
import {marcaVerificar, marcaPadronizar} from '../middlewares/marcaMiddleware';
import marcaAdd from '../controllers/marcaControllers';

const marcaRouter: Router = Router();

/**
 * @swagger
 * tags: Marca
 * summary: Rotas de marcas
 */

/**
 * @swagger
 * /marca:
 *  post:
 *    summary:  Rota para adicionar marca
 *    description: Criar marca
 *    tags: [Marca]
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *           nome:
 *            type: string
 *           nomeSocial:
 *            type: string
 *           cnpj:
 *            rype: string
 *    responses:
 *     201:
 *      description: Marca criada
 *     409:
 *      description: Nome e/ou CNPJ existentes
 *     500:
 *      description: Erro no servidor
 */
marcaRouter.route('/marca')
  .post(marcaVerificar, marcaPadronizar,marcaAdd);

export default marcaRouter;