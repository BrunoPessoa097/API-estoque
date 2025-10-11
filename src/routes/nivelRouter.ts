import { Router } from 'express';
// import local
import { nivelPipAdd, nivelPipList, nivelPipId, nivelPipUpdate, nivelPipDelete} from '../pipelines/nivelPipelines';

const nivelRouter: Router = Router();
/**
 * @swagger
 * tags: Nivel
 * summary: Rotas dos niveis
 */

/**
 * @swagger
 * /nivel:
 *  post:
 *    summary:  Rota para adicionar nivel
 *    description: Criar nivel
 *    tags: [Nivel]
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *           sigla:
 *            type: string
 *           descricao:
 *            type: string
 *    responses:
 *     201:
 *      description: Adicionado nivel
 *     404:
 *      description: Erro ao adicionar
 *     409:
 *      description: Informação ja existe
 *     500:
 *      description: Servidor error
 * 
 *  get:
 *   summary: Listar todos os níveis 
 *   tags: [Nivel]
 *   security:
 *       - bearerAuth: []
 *   responses:
 *    200:
 *     description: Listar todos os nivels
 *    404:
 *     description: Não existem informações 
 *    500:
 *     description: Server Error
 */
nivelRouter.route('/nivel')
  .post(nivelPipAdd)
  .get(nivelPipList);

/**
 * @swagger
 * /nivel/{id}:
 *  get:
 *   summary: Buscar único nivel
 *   tags: [Nivel]
 *   security:
 *       - bearerAuth: []
 *   parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       schema:
 *        type: string
 *       description: ID à ser buscado
 *   responses:
 *    200:
 *     description: nivel
 *    404:
 *     description: Informação não encontrada
 *    500:
 *     description: Servidor Error
 * 
 *  put:
 *   summary: Atualizar nivel
 *   tags: [Nivel]
 *   security:
 *       - bearerAuth: []
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
 *        sigla:
 *         type: string
 *        descricao:
 *         type: string
 *   responses:
 *    203:
 *     description: Atualizado
 *    404:
 *     desceiption: Erro ao atualizar
 *    409:
 *     description: Sigla ja existe
 *    500:
 *     description: Servidor error
 *
 *  delete:
 *   summary: Deletar nível 
 *   tags: [Nivel]
 *   security:
 *       - bearerAuth: []
 *   parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       schema:
 *        type: string
 *       description: Informe um ID válido.
 *   responses:
 *    203:
 *     description: Deletado
 *    404:
 *     description: Não encontrado.
 *    500:
 *     description: Server Error
 */
nivelRouter.route('/nivel/:id')
  .get(nivelPipId)
  .put(nivelPipUpdate)
  .delete(nivelPipDelete);
export default nivelRouter;