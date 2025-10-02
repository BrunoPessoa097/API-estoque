import { Router } from "express";
// imports locais
import pessoaPipAdd from "../pipelines/pessoaPipeline";

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
 */

pessoaRouter.route("/pessoa")
  .post(pessoaPipAdd);

// export
export default pessoaRouter;
