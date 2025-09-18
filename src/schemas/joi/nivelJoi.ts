import Joi, {ObjectSchema} from 'joi';
// Import local
import nivelInput from '../../interfaces/nivelInterface';

// Base de validação nivelJoi
const nivelJoi: ObjectSchema<nivelInput> = Joi.object({
  sigla: Joi.string().min(2).max(20).required().messages({
    "string.empty": "A sigla não pode estar vazia",
    "string.min": "A sigla tem quer ter no mínimo {#limit} caracteres",
    "string.max": "A sigla tem que ter no máximo {#limit} caracteres",
    "any.required": "A sigla e obrigario"
  }),
  descricao: Joi.string().min(5).max(30).required().messages({
    "string.empty": "Descrição não pode estar vazia",
    "string.min": "A descrição tem que ter no mínimo {#limit} caracteres",
    "string.max": "A descrição tem que ter no máximo {#limit} caracteres",
    "any.required": "A descrição é obrigatório"
  })
});

// Export
export default nivelJoi;