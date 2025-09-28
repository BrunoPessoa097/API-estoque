import Joi, { ObjectSchema } from 'joi';
// imports locais
import pessoaInput from '../../interfaces/pessoaInterface';

// campos de validação para pessoa
const pessoaJoi: ObjectSchema<pessoaInput> = Joi.object({
  nome: Joi.string().min(2).max(50).messages({
    "string.empty": "Nome não pode estar vazio",
    "string.min": "O nome tem que ter no mínimo {#limit} caracteres",
    "string.max": "O nome tem que ter no máximo {#limit} caracteres"
  }),
  endereco: Joi.string().min(5).max().messages({
    "string.empty": "endereço não pode estar vazio",
    "string.min": "O endereço tem que ter no mínimo {#limit} caracteres",
    "string.max": "O endereço tem que ter no máximo {#limit} caracteres"
  }),
  dt_nasc: Joi.date().iso().greater("1900-01-01").less("now").messages({
    "date.format": "A data deve estar no formato ISO (YYYY-MM-DD)",
    "date.less": "A data não pode ser de hoje ou no futuro",
    "date.greater": "Data tem que ser depois de 01/01/1900"
  }),
  nivel: Joi.string().length(24).messages({
    "string.base": "Nível tem que ser um texto",
    "string.empty": "O nível não pode estar vazio",
    "string.length": "O ID tem que ter {#limit} caracteres"
  }),
  senha: Joi.string().min(3).max(40).messages({
    "string.empty": "Senha não pode estar vazia",
    "string.min": "A senha tem que ter no minimo {#limit} caracteres",
    "string.max": "A senha tem que ter {#limit} caracteres"
  })
});

// export 
export default pessoaJoi;