import produtoInput, { produtoDocument } from '../interfaces/produtoInterface';
import produtoMongo from '../schemas/mongoose/produtoSchema';

/** 
 * @description Verificar se existe nome já registrado
 * @async
 * @function exitNomeProdu
 * @returns {Promise<boolean> } Retorna uma Promise de verdadeiro ou falso.
 * @author Bruno Pessoa
 */
export const exitNomeProdu = async(nome: string ): Promise<boolean> => {
  // buscando nome
  const exist: boolean = !!(await produtoMongo.exists({nome}));

  // se nome já existe ou não
  if(exist) { throw new Error('Nome do produto já existe')}
  return true;
} 

/** 
 * @description Adicionar produto
 * @async
 * @function exitNomeProdu
 * @returns {Promise<produtoDocument> } Retorna uma Promise de produtos
 * @author Bruno Pessoa
 */
export const addProdu = async(dados: produtoInput): Promise<produtoDocument> => {
  // criando um objeto produto
  const saida: produtoDocument = new produtoMongo({
    ...dados
  });

  // salvando produto;
  const salvo: produtoDocument = await saida.save();

  // retornando produto salvo
  return salvo
}