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

/** 
 * @description listar produto
 * @async
 * @function listProdu
 * @returns {Promise<produtoDocument> } Retorna uma Promise de produtos
 * @author Bruno Pessoa
 */
export const listProdu = async(): Promise<produtoDocument[]> => {
  // buscando produtos
  const dados: produtoDocument[] = await produtoMongo.find().populate('id_marca','nome').populate('id_categoria','nome');
  // retorno
  return dados;
}

/** 
 * @description pegar produto
 * @async
 * @function unicoProduto
 * @returns {Promise<produtoDocument | null> } Retorna uma Promise de produto ou nulo
 * @author Bruno Pessoa
 */
export const unicoProduto = async(id: string): Promise<any |null> => {
  // buscando produto
  const dado: any | null = await produtoMongo.findById(id).populate('id_marca','nome').populate('id_categoria','nome');

  //produto não existe
  if(!dado) { throw new Error('Produto não encontrado')}
  // saida se existe
  return dado;
}