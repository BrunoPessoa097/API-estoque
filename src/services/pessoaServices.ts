import pessoaInput,{ pessoaDocument } from '../interfaces/pessoaInterface';
import pessoaMongo from '../schemas/mongoose/pessoaSchema';

/** 
 * @description Verificar se existe nome já registrado em pessoa
 * @async
 * @function pessoaServiceExistNome
 * @param {nome} - string - nome para verificar
 * @returns {Promise<boolean> } Retorna uma Promise de verdadeiro ou falso.
 * @author Bruno Pessoa
 */
export const pessoaServiceExistNome = async(nome: string): Promise<boolean> => {
  // buscando nome
  const nomeExist: boolean = !!(await pessoaMongo.exists({nome}));

  // se existe
  if(nomeExist) {throw new Error('Nome já existe')}
  // senão existe
  return false;
}

/** 
 * @description Verificar se existe email registrado
 * @async
 * @function pessoaServiceExistEmail
 * @param {email} - string - e-mail para verificar
 * @returns {Promise<boolean> } Retorna uma Promise de verdadeiro ou falso.
 * @author Bruno Pessoa
 */
export const pessoaServiceExistEmail = async(email: string): Promise<boolean> => {
  // buscando a existencia de email
  const emailExist: boolean = !!(await pessoaMongo.exists({email}));

  // se e-mail existe
  if(emailExist) {throw new Error('Email já existe')}

  // caso nao existe
  return false
}

/** 
 * @description Verificar se existe email registrado
 * @async
 * @function pessoaServiceExistEmail
 * @param {email} - string - e-mail para verificar
 * @returns {Promise<boolean> } Retorna uma Promise de verdadeiro ou falso.
 * @author Bruno Pessoa
 */
export const pessoaServiceAdd = async(dados: pessoaInput): Promise<pessoaDocument> => {
  // criando um objeto a ser salvo
  const dado: pessoaDocument = new pessoaMongo({
    ...dados
  });

  // salvando no bando de dados.
  const pessoa: pessoaDocument = await dado.save();

  // returno salvo
  return pessoa;
}

/** 
 * @description listando pessoas
 * @async
 * @function pessoaServiceList
 * @returns {Promise<pessoaDocument[]> } Retorna uma Promise de lista de pessoa
 * @author Bruno Pessoa
 */
export const pessoaServiceList = async(): Promise<pessoaDocument[]> => {
  // buscando todas as pessoas
  const dados: pessoaDocument[] = await pessoaMongo.find().select('-senha -nivel -bloqueado -login');

  // caso não exista dados
  if(!dados){throw new Error('Sem dados para mostrar')}
  // caso haja dados
  return dados;
}

/** 
 * @description buscando unica pessoa
 * @async
 * @function pessoaServiceList
 * @returns {Promise<pessoaDocument | null> } Retorna uma Promise de pessoa ou nulo
 * @author Bruno Pessoa
 */
export const pessoaServiceId = async(id: string): Promise<pessoaDocument | null> => {
  // buscando pessoa
  const dado: pessoaDocument | null = await pessoaMongo.findById(id);

  // caso não exista pessoa
  if(!dado) { throw new Error('Não existe informação buscada')}
  // retorno caso exista
  return dado;
}

/** 
 * @description atualizando pessoa
 * @async
 * @function pessoaServiceUpdate
 * @returns {Promise<pessoaDocument | null> } Retorna uma Promise de pessoa atualizado ou nulo
 * @author Bruno Pessoa
 */
export const pessoaServiceUpdate = async(id: string, dados: Partial<pessoaDocument>): Promise<pessoaDocument | null> => {
  // atualizando informações de pessoa
  const saida: pessoaDocument | null = await pessoaMongo.findByIdAndUpdate(id,dados);

  // caso de erro ao atualizar
  if(!saida){throw new Error('Error ao atualizar')}
  // retorno saida
  return saida;
}

/** 
 * @description deletando pessoa
 * @async
 * @function pessoaServiceDelete
 * @returns {Promise<pessoaDocument | null> } Retorna uma Promise de pessoa atualizado ou nulo
 * @author Bruno Pessoa
 */
export const pessoaServiceDelete = async(id: string): Promise<pessoaDocument | null> => {
  // deletando pessoa
  const dado: pessoaDocument | null = await pessoaMongo.findByIdAndDelete(id);

  // caso de erro ao deletar
  if(!dado){throw new Error('Erro ao excluir')}
  // retorno em sucesso
  return dado;
}


/** 
 * @description validando se existe
 * @function pessoaServiceLogin
 * @returns {Promise<pessoaDocument | null> } Retorna uma Promise de pessoa atualizado ou nulo
 * @author Bruno Pessoa
 */
export const pessoaServiceLogin = async(email?: string)  => {
  // verificando o email se o estado
  const conta: Partial<pessoaDocument> = await pessoaMongo.findOne({email}).select('id email bloqueado');

  // caso conta não existe
  if(!conta){throw new Error('Conta não existe')}
  // caso conta for bloqueada
  if(conta.bloqueado){throw new Error('Conta bloqueada')}

  // caso tudo conta exista e não estaja bloqueado
  return conta;
}