import {Router} from 'express';
import {nivelVerificar, nivelPadronizar} from '../middlewares/nivelMiddleares';
import nivelAdd from '../controllers/nivelControllers';

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
 */
nivelRouter.route('/nivel')
  .post(nivelVerificar, nivelPadronizar, nivelAdd);

export default nivelRouter;