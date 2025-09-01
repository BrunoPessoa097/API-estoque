# API-estoque
Uma API para gerenciamento de um estoque.

## Índice
1. [Informações Sobre o Projeto](#informacoes-sobre-o-projeto)
2. [Funcionabilidade](#funcionabilidade)
3. [Códigos _HTTP_ da _API_](#codigos-http-da-api)
4. [Tecnologias Usadas](#tecnologias-usadas)
5. [Dependências](#dependencias)
6. [Como Iniciar o Projeto](#como-iniciar-o-projeto)
7. [_Endpoints_](#endpoints)
8. [Criado por](#criado-por)
9. [_License_](#license)

## Informações Sobre o Projeto 
- **Versão:** 1.0.0
- **Status:** Em desenvolvimento
- **Licensa:** MIT

## Funcionabilidade
- `GET /` - Rota principal.
- `api-docs` - Rota para documentação da _API_.
- `404` - Rota não encontrada.

## Códigos _HTTP_ da _API_
- `200` - Sucesso.
- `404` - Não encontrado.

## Tecnologias Usadas
- [Node.Js](https://nodejs.org/pt) - Ambiente de desenvolvimento Javascript.
- [Express.Js](https://expressjs.com/) - _Framework web_ Javascript.
- [Typescript](https://www.typescriptlang.org/) - Liguagem de programação para adicionar tipagem ao Javascript.
- [Swagger](https://swagger.io/) - Ferramenta para documentar _API_.

## Dependências
- `cors` - (versão: ^2.8.5) - Mecanismo de segurança para acessar requisição de origem.
- `dotenv` - (versão: ^17.2.1) - Carrega variáveis de ambientes.
- `express` - (versão: ^5.1.0) - _Framework web_ JavaScript.
- `helmet` - (versão: ^8.1.0) - _middleware_ para segurança.
- `nodemon` - (versão: ^3.1.10) - Utilitário para agilizar processo de desenvolvimento.
- `swagger-jsdoc` (versão: ^6.2.8) - JsDoc voltado para interação com o _Swagger_.
- `swagger-ui-express` - (versão: ^5.0.1) - Biblioteca para parte visual com interações com o _Express_.
- `ts-node` - (versão: ^10.9.2) - Interpretador Typescript.

## Como Iniciar o Projeto 
1. Clone o projeto.
   ```bash
    git clone https://github.com/BrunoPessoa097/API-estoque.git
   ```
2. Instale as dependências.
   ```bash
    npm install
    #or
    yarn install
   ```
3. Execute o _script_.
   ```bash
     npm run dev
     #or
     yarn start
   ```

## _EndPoints_
### _Endpoint_ `/`
* **Método:** `GET`
* **Descrição:** Rota Principal.
* **Exemplo de requisição:**
  ```bash
   /
  ```
* **Resposta:**
  ```json
     {
      "message": 'Rota principal de API estoque',
      "autor": 'Bruno Pessoa',
      "licensa": 'MIT'
     }
  ```
  
### _Endpoint_ `404`
* **Método:** 404
* **Descrição:** Rota não encontrada.
* **Exemplo de requisição:**
  ```bash
    /nessa
  ```
* **Resposta:**
  ```json
    {
      "message": 'Rota não encontrada'
    }
  ```

### _Endpoint_ `api-docs`
* **Descrição:** Documentação de todas as rotas contidas na _API_.

## Criado Por
* **Nome**: Bruno Pessoa
* **Área**: Desenvolver NodeJs|Typescript|Javascript
* **Formado**: UNIGRANDE - Centro Universitário da Grande Fortaleza.
* **Curso**: Sistemas para _Internet_.
* **Git Hub**: [github.com/BrunoPessoa097](https://github.com/BrunoPessoa097/api-agenda.git)
* **LinkedIn**: [www.linkedin.com/in/bruno-pesoa-097](https://www.linkedin.com/in/bruno-pessoa-097/)

## _License_
Esse projeto esta sobre a licença `MIT` ©Bruno Pessoa - 2025.