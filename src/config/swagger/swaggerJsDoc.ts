import swaggerJsdoc from 'swagger-jsdoc';
// Import local.
import swaggerOptions from './swaggerOptions';

// Recebendo as configurações do do JsDoc.
const swaggerSpecs: object = swaggerJsdoc(swaggerOptions);

// Importando o Specs definido.
export default swaggerSpecs;