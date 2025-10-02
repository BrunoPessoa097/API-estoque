import { Router } from "express";
// imports locais
import { pessoaPipAdd, pessoaPipList } from "../pipelines/pessoaPipeline";

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

// export
export default pessoaRouter;
