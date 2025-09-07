import express, { Application, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';

// Import local
import swaggerSpecs from '../config/swagger/swaggerJsDoc';

// iniciando o express 
const app: Application = express();
//configurações dos middlewares.
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

/**
 * @swagger
 * tags: Rotas Padrão
 * description: Rotas Padrao da API
 */


/**
 * @swagger
 *  /:
 *   get:
 *    summary: Rota Principal
 *    description: Rota base de toda a API estoque
 *    tags: [Rotas Padrão]
 *    responses:
 *     200:
 *      description: Rota principal da API estoque
 *      
 */
app.get('/',(req: Request, res: Response) => {
  res.status(200).json({
    message: 'Rota principal de API estoque',
    autor: 'Bruno Pessoa',
    licensa: 'MIT'
  });
});

/**
 * @swagger
 *  /achar:
 *   get:
 *    summary: Rota não encontrada
 *    tags: [Rotas Padrão]
 *    responses:
 *     404:
 *      description: Rota não encontrada
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: 'Rota não encontrada'
  });
});

export default app;