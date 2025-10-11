import dotenv from 'dotenv';

dotenv.config();
//const baseURL: string = 'https://c6d5aae5-aae5-41f8-be09-ce6a639444e0-00-3ouvmf73kq0ic.worf.replit.dev'

// Definindo as opções do swagger.
const swaggerOptions: object = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Estoque',
      version: '0.4.0',
      description:`_API_ de desenvolvimento 
        \n ### Sobre o projeto
        \n * **Versão:** 0.4.0
        \n * **Licença:** MIT
        \n
        \n #### Criado por
        \n * **Nome**: Bruno Pessoa
        \n * **Área**: Desenvolvedor NodeJs|Typescript|Javascript
        \n * **Formado**: UNIGRANDE - Centro Universitário da Grande Fortaleza.
        \n * **Curso**: Sistemas para _Internet_.
        \n * **Git Hub**: [github.com/BrunoPessoa097](https://github.com/BrunoPessoa097/api-agenda.git)
        \n * **LinkedIn**: [www.linkedin.com/in/bruno-pesoa-097](https://www.linkedin.com/in/bruno-pessoa-097/)`
    },
    // adicionando seguranca as rotas
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    // seguranca
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts']
}

// Importando as Opções do swagger.
export default swaggerOptions;