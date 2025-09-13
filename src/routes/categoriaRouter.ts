import { Router } from 'express';
// Imports locais.
import { categoriaValidar, categoriaPadronizar} from '../middlewares/categoriaMiddleware';
import {categoriaAdd, categoriaAll} from '../controllers/categoriaControllers'

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
  .post(categoriaValidar, categoriaPadronizar,categoriaAdd)
  .get(categoriaAll);

export default categoriaRouter;