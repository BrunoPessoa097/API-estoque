import express, { Application, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import helmet from 'helmet';
// Import local
import swaggerSpecs from '../config/swagger/swaggerJsDoc';
import categoriaRouter from './categoriaRouter';
import marcaRouter from './marcaRouter';
// iniciando o express 
const app: Application = express();
//configurações dos middlewares.
app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: 'http://localhost',
  methods: ['GET','POST','PUT','DELETE']
}));

// inicia de rotas.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use(categoriaRouter);
app.use(marcaRouter);

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