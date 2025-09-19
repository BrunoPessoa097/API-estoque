import { Router } from 'express';
// Import local
import {marcaVerificar, marcaPadronizar} from '../middlewares/marcaMiddleware';
import {marcaAdd, marcaAll, marcaId, marcaUpdate, marcaDelete} from '../controllers/marcaControllers';

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
 *  get:
 *   summary: Listar todas as marcas
 *   tags: [Marca]
 *   responses:
 *    200:
 *     description: Listar todas as mascas.
 *    500:
 *     description: Server Error
 */
marcaRouter.route('/marca')
  .post(marcaVerificar, marcaPadronizar,marcaAdd)
  .get(marcaAll);

/**
 * @swagger
 * /marca/{id}:
 *  get:
 *   summary: Buscar única categoria
 *   tags: [Marca]
 *   parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       schema:
 *        type: string
 *       description: ID à ser buscado
 *   responses:
 *    200:
 *     description: Marca
 *    500:
 *     description: Servidor Error
 *  
 *  put:
 *   summary: Atualizar marca
 *   tags: [Marca]
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      schema:
 *       type: string
 *      description: ID à ser selecionado.
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        nome:
 *         type: string
 *        nomeSocial:
 *         type: string
 *        cnpj:
 *         type: string
 *   responses:
 *     200:
 *       description: Sucesso ao atualizar
 *     404:
 *       description: Erro ao atualizar
 *     409:
 *       description: Conflito.
 *     500:
 *       description: Erro no servidor.
 *
 *  delete:
 *   summary: Deletar categoria.
 *   tags: [Marca]
 *   parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       schema:
 *        type: string
 *       description: Informe um ID da Marca válido.
 *   responses:
 *    204:
 *     description: Deletado
 *    404:
 *     description: Não encontrado.
 *    500:
 *     description: Server Error
 */
marcaRouter.route('/marca/:id')
  .get(marcaId)
  .put(marcaVerificar, marcaPadronizar, marcaUpdate)
  .delete(marcaDelete);

export default marcaRouter;