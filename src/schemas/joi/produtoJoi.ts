import Joi,{ ObjectSchema } from 'joi';
// import local
import produtoInput from '../../interfaces/produtoInterface';

// produto joi
const produtoJoi: ObjectSchema<produtoInput> = Joi.object({
  nome: Joi.string().min(3).max(50).messages({
    "string.empty": "Nome do produto nao pode estar em branco",
    "string.min": "Nome do produto tem que ter no mínimo {#limit} caracteres",
    "string.max": "Nome do produto tem que ter no máximo {#limit} caracteres",
    "any.required": "Campo nome requerido"
  }),
  quantidade: Joi.number().integer().positive().messages({
    "number.base": "Quantidade tem que ser um número",
    "number.positive": "Quantidade não pode ser um número negativo",
    "any.required": "Quantidade é obrigatório"
  }),
  preco: Joi.number().positive().messages({
    "number.base": "Preço deve ser um número",
    "number.positive": "Preço tem que ser um valor positivo",
    "any.required":"Campo preço não pode ser vazio"
  }),
  id_marca: Joi.string().length(24).messages({
    "string base": "ID marca tem que ser um texto",
    "string.empty": "ID da marca não pode estar vazio",
    "string.length": "O ID marca tem que ter exatamente {#limit} caracteres",
    "any.required": "O ID marca e obrigatório"
  }),
  id_categoria: Joi.string().length(24).messages({
    "string.base": "O ID categoria tem que ser um texto",
    "string.empty": "O ID cateria não pode estar vazio",
    "string.length": "O ID categoria tem que ter exatamente {#limit} caracteres",
    "any.required": "O ID categoria é obrigatório"
  })
});

// export 
export default produtoJoi;