import { Router } from 'express';
// Imports locais.
import { categoriaValidar, categoriaPadronizar} from '../middlewares/categoriaMiddleware';
import {categoriaAdd, categoriaAll, categoriaUnico, categoriaUpdate, categoriaDelete} from '../controllers/categoriaControllers'

const categoriaRouter: Router = Router();

/**
 * @swagger
 * tags: Categoria
 * description: Categoria de produtos.
 */

/**
* @swagger
* /categoria:
*  post:
*    summary: Adicionar nova categoria
*    description: Cria uma nova categoria.
*    tags: [Categoria]
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            type: object
*            properties:
*              nome:
*                type: string
*              descricao:
*                type: string
*    responses:
*      201:
*        description: Categoria criada com sucesso
*      409:
*        description: Categoria já existe
*      500:
*        description: Erro no servidor
*  get:
*   summary: Listar todas as categorias.
*   tags: [Categoria]
*   responses:
*    200:
*     description: Todas as categorias.
*    500:
*     description: Error no servidor.
*/
categoriaRouter.route('/categoria')
  .post(categoriaValidar, categoriaPadronizar, categoriaAdd)
  .get(categoriaAll);

/**
 * @swagger
 * /categoria/{id}:
 *  get:
 *   summary: Buscar univa categoria
 *   tags: [Categoria]
 *   parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       schema:
 *        type: string
 *       description: ID à ser buscado
 *   responses:
 *    200:
 *     description: Categoria
 *    404:
 *     description: Categoria não encontrada
 *    500:
 *     description: Servidor Error
 *  put:
 *   summary: Atualizar Categoria
 *   tags: [Categoria]
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
 *        descricao:
 *         type: string
 *   responses:
 *    204:
 *     description: Atualizado.
 *    404:
 *     description: Erro
 *    500:
 *     description: Servidor error
 * 
 *  delete:
 *   summary: Deletar categoria.
 *   tags: [Categoria]
 *   parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       schema:
 *        type: string
 *       description: Informe um ID de categoria válido.
 *   responses:
 *    204:
 *     description: Deletado
 *    404:
 *     description: Não encontrado.
 *    500:
 *     description: Server Error
 */
categoriaRouter.route('/categoria/:id')
  .get(categoriaUnico)
  .put(categoriaValidar, categoriaPadronizar, categoriaUpdate)
  .delete(categoriaDelete);

export default categoriaRouter;