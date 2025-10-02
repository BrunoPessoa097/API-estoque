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
 * @description Verificar se existe o nivel
 * @async
 * @function existIdSigla
 * @returns {Promise<boolean> } Retorna uma Promise de verdadeiro ou falso.
 * @author Bruno Pessoa
 */
export const existIdSigla = async(id: string): Promise<boolean> => {
  // verificar se existe
  const exist: boolean = !!(await nivelMongo.exists({_id:id}));

  // se existe
  if(!exist){ throw new Error('Nível não existe')}
  // caso não existe
  return true;
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

/** 
 * @description unico nivel
 * @async
 * @function unicoNivel
 * @returns {Promise<nivelDocument | null > } Retorna uma Promise de nivel ou falso
 * @author Bruno Pessoa
 */
export const unicoNivel = async(id: string): Promise<nivelDocument | null> => {
  // buscando o nivel
  const dado: nivelDocument | null = await nivelMongo.findById(id);

  // caso não existe
  if(!dado){ throw new Error('Não existe nivel informado')}
  // caso existe
  return dado;
}

/** 
 * @description atualizar nivel
 * @async
 * @function updtNivel
 * @returns {Promise<nivelDocument | null > } Retorna uma Promise de nivel ou falso
 * @author Bruno Pessoa
 */
export const updtNivel = async(id: string, dado: nivelInput): Promise<nivelDocument | null> => {
  // atualizando as informações repassadas
  const dados: nivelDocument | null = await nivelMongo.findByIdAndUpdate(id, dado);

  // senão atualizar retorna erro
  if(!dados){ throw new Error('Não ha nivel para atualizar')}
  // atualizado
  return dados;
}

/** 
 * @description deletar nivel
 * @async
 * @function delNivel
 * @returns {Promise<nivelDocument | null > } Retorna uma Promise de nivel ou falso
 * @author Bruno Pessoa
 */
export const delNivel = async(id: string): Promise<nivelDocument | null> => {
  // removendo nivel
  const dado: nivelDocument | null = await nivelMongo.findByIdAndDelete(id);

  // caso não existe
  if(!dado){throw new Error('Error ao deletar')}

  // retorno da exclusão
  return dado;
}