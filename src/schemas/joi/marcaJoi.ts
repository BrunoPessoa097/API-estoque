import Joi,{ ObjectSchema } from 'joi';
// Import local.
import marcaInput from '../../interfaces/marcaInterface';

// Criando o validador de marca.
const marcaJoi: ObjectSchema<marcaInput> = Joi.object({
  nome: Joi.string().min(3).max(20).required().messages({
    "string.empty": "Nome não pode estar vazio",
    "string.min": "Nome tem que ter no mínimo {#limit} caracteres",
    "string.max": "Nome só pode ter nk máximo {#limit} caracteres",
    "any.required": "Nome é obrigatório"
  }),
  nomeSocial: Joi.string().min(3).max(20).required().messages({
    "string.empty":"Nome social não pode estar vazio",
    "string.min":"Nome social tem que ter no minimo {#limit} caracteres",
    "string.max":"Nome social tem que ter no máximo {#limit} caracteres",
    "any.required": "Nome social é obrigatório"
  }),
  cnpj: Joi.string().min(11).max(14).required().messages({
    "string.empty": "CNPJ não pode estar vazio",
    "string.min": "CNPJ tem que ter no mínimo {#limit} de carácteres",
    "string.max": "CNPJ tem que ter no máximo {#limit} de caracteres",
    "any.required": "CNPJ é obrigatório"
  })
});

// exportando.
export default marcaJoi;