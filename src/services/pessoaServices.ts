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
  const dados: pessoaDocument[] = await pessoaMongo.find();

  // caso não exista dados
  if(!dados){throw new Error('Sem dados para mostrar')}
  // caso haja dados
  return dados;
}