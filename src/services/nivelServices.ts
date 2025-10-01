import nivelInput, { nivelDocument } from '../interfaces/nivelInterface';
import nivelMongo from '../schemas/mongoose/nivelSchema';

/** 
 * @description Verificar se existe nome já registrado
 * @async
 * @function existSigla
 * @returns {Promise<boolean> } Retorna uma Promise de verdadeiro ou falso.
 * @author Bruno Pessoa
 */
export const existSigla = async(sigla: string): Promise<boolean> => {
  // verificar se existe
  const exist: boolean = !!(await nivelMongo.exists({sigla}));
  
  // se existe
  if(exist){ throw new Error('Sigla já existe')}
  // caso não existe
  return false;
}

/** 
 * @description adicionar nivel
 * @async
 * @function addNivel
 * @returns {Promise<nivelDocument> } Retorna uma Promise de nivel documento
 * @author Bruno Pessoa
 */
export const addNivel = async(dado: nivelInput): Promise<nivelDocument> => {
  // estruturando dados com padrão do mongo
  const dadoNivel: nivelDocument = new nivelMongo({
    ...dado
  });

  // adicionando no banco
  const saida: nivelDocument = await dadoNivel.save();

  // returno
  return saida;
}

/** 
 * @description listar nivel
 * @async
 * @function listNivel
 * @returns {Promise<nivelDocument[]> } Retorna uma Promise de lista nivel
 * @author Bruno Pessoa
 */
export const listNivel = async(): Promise<nivelDocument[]> => {
  // buscar todos 
  const dados: nivelDocument[] = await nivelMongo.find();

  // saida caso não há resultados
  if(dados.length < 1) { throw new Error('Sem informações')}
  // retorno dos dados
  return dados;
}