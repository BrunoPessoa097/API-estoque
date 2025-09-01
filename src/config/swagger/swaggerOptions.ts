import dotenv from 'dotenv';

dotenv.config();
//const baseURL: string = 'https://c6d5aae5-aae5-41f8-be09-ce6a639444e0-00-3ouvmf73kq0ic.worf.replit.dev'

// Definindo as opções do swagger.
const swaggerOptions: object = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Estoque',
      version: '1.0.0',
      description:`_API_ de desenvolvimento 
        \n **Desenvolvido:** Bruno Pessoa
        \n **Licensa:** MIT`
    },
     /* servers: [
      {
        url: `0.0.0.0:${process.env.PORT}`,
        description: 'Servidor local'
      }
    ],*/
  },
  apis: ['./src/routes/*.ts']
}

// Importando as Opções do swagger.
export default swaggerOptions;