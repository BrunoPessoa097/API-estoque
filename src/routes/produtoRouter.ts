import { Router } from 'express';
import prodPipAdd from '../pipelines/produtoPipelines';

const produtoRouter: Router = Router();

/**
 * @swagger
 * tags: Produtos
 * summary: Rotas de produtos
 */

/**
 * @swagger
 * /produtos:
 *  post:
 *    summary:  Rota para adicionar nivel
 *    description: Criar Produto
 *    tags: [Produtos]
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *           nome:
 *            type: string
 *           quantidade:
 *            type: number
 *           preco:
 *            type: number
 *           id_marca:
 *            type: string
 *           id_categoria:
 *            type: string
 *    responses:
 *      201:
 *       description: Adicionado
 *      404:
 *       description: Erro ao adicionad
 *      409:
 *       description: Produto ja existe
 *      500:
 *       description: Server Error
 * 
*/
produtoRouter.route('/produtos')
  .post(prodPipAdd);

export default produtoRouter;