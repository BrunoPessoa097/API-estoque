import Categoria, { CategoriaDocument } from '../interfaces/categoriaInterfaces';
import categoriaMongo from '../schemas/mongoose/categoriaSchema';

/** 
 * @description Verificar se ja existe Nome
 * @async
 * @function nomeCatExist
 * @returns {Promise<boolean> } Retorna uma Promise de verdadeiro ou falso.
 * @author Bruno Pessoa
 */
const nomeCatExist = async(nome?: string): Promise<boolean> => {
  // buscando a existencia de nome.
  const exist = !!(await categoriaMongo.exists({nome}));

  // se caso existe
  if(exist) { throw new Error('Nome da categoria já existe')}
  // caso não exista
  return false;
}

export default nomeCatExist;