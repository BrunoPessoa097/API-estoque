import Joi, {ObjectSchema} from 'joi';
// Import local.
import Categoria from '../../interfaces/categoriaInterfaces';

const categoriaJoi: ObjectSchema<Categoria> = Joi.object({
  nome: Joi.string().min(3).max(50).messages({
    "string.empty": "Nome não pode estar vazio.",
    "string.min": "Nome tem que ter no mínimo {#limit} caracteres.",
    "string.max": "Nome só pode ter no máximo {#limit} caracteres.",
    "any.requerid": "Campo nome obrigatório."
  }),
  descricao: Joi.string().min(3).max(50).messages({
    "string.empty": "Descrição não pode estar vazio.",
    "string.min": "Descrição tem que ter no mínimo {#limit} caracteres.",
    "string.max": "Descrição tem que ter no máximo {#limit} caracteres.",
    "any.required": "Campo descrição obrigatório."
  })
});

export default categoriaJoi;