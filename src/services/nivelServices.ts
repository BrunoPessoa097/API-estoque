//import nivelInput, { nivelDocument } from '../interface/nivelInterface';
import nivelMongo from '../schemas/mongoose/nivelSchema';

/** 
 * @description Verificar se existe nome já registrado
 * @async
 * @function existSigla
 * @returns {Promise<boolean> } Retorna uma Promise de verdadeiro ou falso.
 * @author Bruno Pessoa
 */
const existSigla = async(sigla: string): Promise<boolean> => {
  const exist: boolean = !!(await nivelMongo.exists({sigla}));
  if(exist){ throw new Error('Sigla já existe')}
  return false;
}

export default existSigla;