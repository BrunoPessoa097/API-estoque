import { Router } from "express";
// imports locais
import { pessoaPipAdd, pessoaPipList, pessoaPipId, pessoaPipUpdate, pessoaPipDelete } from "../pipelines/pessoaPipeline";

// construir rota
const pessoaRouter: Router = Router();

/**
 * @swagger
 * tags: Pessoas
 * summary: Rotas de pessoa
 */

/**
 * @swagger
 * /pessoa:
 *  post:
 *    summary:  Rota para adicionar pessoa
 *    description: Criar Pessoa
 *    tags: [Pessoas]
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *           nome:
 *            type: string
 *           email:
 *            type: string
 *           senha:
 *            type: string
 *           endereco:
 *            type: string
 *           dt_nasc:
 *            type: string
 *           nivel:
 *            type: string
 *    responses:
 *      201:
 *       description: Adicionado
 *      404:
 *       description: Erro ao adicionar
 *      409:
 *       description: nome e/ou email ja existe
 *      500:
 *       description: error variados
 * 
 *  get:
 *   summary: Listar todos as pessoas
 *   tags: [Pessoas]
 *   responses:
 *    200:
 *     description: Listar todos as pessoas
 * 
 *    404:
 *     description: Não existem informações 
 *    500:
 *     description: Server Error
 */
pessoaRouter.route("/pessoa")
  .post(pessoaPipAdd)
  .get(pessoaPipList);

/**
 * @swagger
 * /pessoa/{id}:
 *  get:
 *   summary: Buscar única pessoa
 *   tags: [Pessoas]
 *   parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       schema:
 *        type: string
 *       description: ID à ser buscado
 *   responses:
 *    200:
 *     description: Listar o pessoa
 *    404:
 *     description: Pessoa não existe
 *    500:
 *     description: Server error
 *
 *  patch:
 *   summary: Atualizar um ou mais campos de pessoa
 *   tags: [Pessoas]
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      schema:
 *       type: string
 *      description: ID à ser selecionado
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        nome:
 *         type: string
 *        email:
 *         type: string
 *        senha:
 *         type: string
 *        endereco:
 *         type: string
 *        dt_nasc:
 *         type: string
 *        nivel:
 *         type: string
 *   responses:
 *    201:
 *     description: Atualizado
 *    404:
 *     description: Erro ao atualizar
 *    409:
 *     description: pessoa já existe
 *    500:
 *     description: Server error
 *
 *  delete:
 *   summary: Deletar pessoa
 *   tags: [Pessoas]
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
pessoaRouter.route('/pessoa/:id')
  .get(pessoaPipId)
  .patch(pessoaPipUpdate)
  .delete(pessoaPipDelete);

// export
export default pessoaRouter;
