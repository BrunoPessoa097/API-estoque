import Categoria, { CategoriaDocument } from '../interfaces/categoriaInterfaces';
import categoriaMongo from '../schemas/mongoose/categoriaSchema';

/** 
 * @description Verificar se ja existe Nome
 * @async
 * @function nomeCatExist
 * @returns {Promise<boolean> } Retorna uma Promise de verdadeiro ou falso.
 * @author Bruno Pessoa
 */
export const nomeCatExist = async(nome?: string): Promise<boolean> => {
  // buscando a existencia de nome.
  const exist = !!(await categoriaMongo.exists({nome}));

  // se caso existe
  if(exist) { throw new Error('Nome da categoria já existe')}
  // caso não exista
  return false;
}

/** 
 * @description Verificar se ja existe Nome
 * @async
 * @function addCat
 * @returns {Promise<CategoriaDocument> } Retorna uma Promise de categoria.
 * @author Bruno Pessoa
 */
export const addCat = async(dado: Categoria): Promise<CategoriaDocument> => {
  // preparando para adicionar categoria
  const catAdd: CategoriaDocument = new categoriaMongo({
    ...dado
  });

  // salvando categoria
  const saida = catAdd.save();

  // retorno
  return saida;
}

/** 
 * @description Listar todas as categorias
 * @async
 * @function listCat
 * @returns {Promise<CategoriaDocument> } Retorna uma Promise uma lista de categoria.
 * @author Bruno Pessoa
 */
export const listCat = async(): Promise<CategoriaDocument[]> => {
  // buscando todas as informações
  const dados: CategoriaDocument[] = await categoriaMongo.find();

  // caso não haja registro
  if(dados.length < 1) { throw new Error('Não há informações')}
  return dados;
}

/** 
 * @description Pegar unica categoria
 * @async
 * @function unicoCat
 * @returns {Promise<CategoriaDocument> } Retorna uma Promise de uma categoria.
 * @author Bruno Pessoa
 */
export const unicoCat = async(id: string): Promise<CategoriaDocument | null> => {
  // buscando unica categoria
  const dado: CategoriaDocument | null = await categoriaMongo.findById(id);
  
  // retorno
  if(!dado) { throw new Error('Não existe o produto informado')}
  return dado;
}

/** 
 * @description atualizar categoria
 * @async
 * @function updtCat
 * @returns {Promise<CategoriaDocument> } Retorna uma Promise de uma categoria.
 * @author Bruno Pessoa
 */
export const updtCat = async(id: string, dado: Partial<CategoriaDocument>): Promise<CategoriaDocument | null> => {
  // atualizando as informações
  const dados: CategoriaDocument | null = await categoriaMongo.findByIdAndUpdate(id, dado);

  // saida de erro e de sucesso.
  if(!dados) {throw new Error('Problemas ao atualizar')}
  return dados;
}