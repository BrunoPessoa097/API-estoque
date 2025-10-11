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
9. [Licença](#licenca)

## Informações Sobre o Projeto 
- **Versão:** 1.0.0
- **Status:** Concluído
- **Licensa:** Proprietário 

## Funcionabilidade
- `GET /` - Rota principal.
- `GET /login`- Rota login.
- `GET /categoria`- Rota categoria.
- `GET /marca`- Rota marca.
- `GET /nivel`- Rota nivel.
- `GET /pessoa`- Rota pessoa.
- `api-docs` - Rota para documentação da _API_.
- `404` - Rota não encontrada.

## Códigos _HTTP_ da _API_
- `200` - Sucesso.
- `201` - Sucesso e inserido.
- `203` - Sucesso sem retorno.
- `204` - Atualizado ou deletado.
- `404` - Não encontrado.
- `409` - Existente e/ou conflito.
- `500` - Server error

## Tecnologias Usadas
- [Node.Js](https://nodejs.org/pt) - Ambiente de desenvolvimento Javascript.
- [Express.Js](https://expressjs.com/) - _Framework web_ Javascript.
- [Typescript](https://www.typescriptlang.org/) - Liguagem de programação para adicionar tipagem ao Javascript.
- [Swagger](https://swagger.io/) - Ferramenta para documentar _API_.
- [MongoDB](https://www.mongodb.com/) - Banco de dados NoSql.
- [MongooseJs](https://mongoosejs.com/) - Falicitador de interação com o banco de dados mongodb.
- [Json Web Token](https://www.jwt.io/) - Criador de token.

## Dependências
- `cors` - (versão: ^2.8.5) - Mecanismo de segurança para acessar requisição de origem.
- `dotenv` - (versão: ^17.2.1) - Carrega variáveis de ambientes.
- `express` - (versão: ^5.1.0) - _Framework web_ JavaScript.
- `helmet` - (versão: ^8.1.0) - _middleware_ para segurança.
- `ts-node-dev` - (versão: ^2.0.0) - Utilitário para agilizar processo de desenvolvimento.
- `swagger-jsdoc` (versão: ^6.2.8) - JsDoc voltado para interação com o _Swagger_.
- `swagger-ui-express` - (versão: ^5.0.1) - Biblioteca para parte visual com interações com o _Express_.
- `ts-node` - (versão: ^10.9.2) - Interpretador Typescript.
- `joi` - (versão: ^18.0.1) - Biblioteca para validação de entradas.
- `mongoose` - (versão: ^8.18.1) - Falicitador para interação com o MongoDB.
- `winston` - (versão: ^3.18.3) - Logger para registro de saida.
- `bcrypt` - (versão: ^6.0.0) - Biblioteca para hash de senha.
- `jsonwebtoken` - (versão: ^9.0.2) - Criar um token para login e senha

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
3. Crie um arquivo .env com as seguintes variaveis
  ``` dotenv
      PORT=<porta da sua escolha>
      MONGO_DB_DATABASE=<nome da database>
      MONGO_BD_URI=<endereço do banco de dados>
      HASH=<numero de hash recomendado minimo 10>
  ```


4. Execute o _script_.
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
      "message": "Rota principal de API estoque",
      "autor": "Bruno Pessoa",
      "licensa": "MIT"
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
      "message": "Rota não encontrada"
    }
  ```
### _Endpoint_ `/categoria`
* **Descrição**: Adicionar categoria
* **Método**: POST
* **Exemplo da requisição**
  ```shell
     POST /categoria
  ```
* **Exemplo de entrada**
  ```json
      {
        "nome": "string",
        "descricao": "string"
      }
  ```  
* **Saida da requisição**:
  - Sucesso
  ```json
     {
       "message": "Adicionado categoria"
     }
  ```
  
  - Error
  ```json
     {
       "message": "Erro ao adicionar"
     }
  ```
### _Endpoint_ `/marca`
* **Descrição**: Adicionar marca
* **Método**: POST
* **Exemplo da requisição**
  ```shell
     POST /marca
  ```
* **Exemplo de entrada**
  ```json
      {
        "nome": "string",
        "nomeSocial": "string",
        "cnpj": "string"
      }
  ```  
* **Saida da requisição**:
  - Sucesso
  ```json
     {
       "message": "Adicionado categoria"
     }
  ```
  
  - Error
  ```json
     {
       "message": "Erro ao adicionar"
     }
  ```
### _Endpoint_ `/nivel`
* **Descrição**: Adicionar marca
* **Método**: POST
* **Exemplo da requisição**
  ```shell
     POST /marca
  ```
* **Exemplo de entrada**
  ```json
      {
        "sigla": "string",
        "descricao": "string"
      }
  ```  
* **Saida da requisição**:
  - Sucesso
  ```json
     {
       "message": "Adicionado nível"
     }
  ```
  
  - Error
  ```json
     {
       "message": "Erro ao adicionar"
     }
  ```
### _Endpoint_ `/produtos`
* **Descrição**: Adicionar produto
* **Método**: POST
* **Exemplo da requisição**
  ```shell
     POST /produto
  ```
* **Exemplo de entrada**
  ```json
      {
        "nome": "string",
        "quantidade": 0,
        "preco": 0,
        "id_marca": "string",
        "id_categoria": "string"
      }
  ``` 
* **Saida da requisição**:
  - Sucesso
  ```json
     {
       "message": "Adicionado"
     }
  ```
  
  - Error
  ```json
     {
       "message": "Erro ao adicionar"
     }
  ```

### _Endpoint_ `/pessoa`
* **Descrição**: Adicionar pessoa
* **Método**: POST
* **Exemplo da requisição**
  ```shell
     POST /produto
  ```
* **Exemplo de entrada**
  ```json
      {
        "nome": "string",
        "email": "string",
        "senha": "string",
        "endereco": "string",
        "dt_nasc": "string",
        "nivel": "string"
      }
  ``` 
* **Saida da requisição**:
  - Sucesso
  ```json
     {
       "message": "Adicionado pessoa"
     }
  ```

  - Error
  ```json
     {
       "message": "Erro ao adicionar"
     }
  ```
### _Endpoint_ `/login`
* **Descrição**: Login
* **Método**: POST
* **Exemplo da requisição**
  ```shell
     POST /produto
  ```
* **Exemplo de entrada**
  ```json
      {
        "email": "string",
        "senha": "string"
      }
  ``` 
* **Saida da requisição**:
  - Sucesso
  ```json
     {
       "token": "saida do token criado"
     }
  ```

  - Error
  ```json
     {
       "message": "Usuário não encontrado"
     }

### _Endpoint_ `api-docs`
* **Descrição:** Documentação de todas as rotas contidas na _API_.

## Criado Por
* **Nome**: Bruno Pessoa
* **Área**: Desenvolvedor NodeJs|Typescript|Javascript
* **Formado**: UNIGRANDE - Centro Universitário da Grande Fortaleza.
* **Curso**: Sistemas para _Internet_.
* **Git Hub**: [github.com/BrunoPessoa097](https://github.com/BrunoPessoa097/api-agenda.git)
* **LinkedIn**: [www.linkedin.com/in/bruno-pessoa-097](https://www.linkedin.com/in/bruno-pessoa-097/)

## Licença

Este projeto é **proprietário**.  
O código está disponível **apenas para fins de visualização e demonstração em portfólio**.  

- **Não é permitido** copiar, modificar, redistribuir ou utilizar em projetos pessoais, acadêmicos ou comerciais.  
- Para obter permissão de uso, entre em contato: [bruno-pessoa009@outlook.com](mailto:bruno-pessoa009@outlook.com).  

Texto completo da licença em: [LICENSE](./LICENSE)