import { Request, Response } from 'express';
// imports locais
import { pessoaServiceAdd, pessoaServiceList, pessoaServiceId, pessoaServiceUpdate, pessoaServiceDelete } from '../services/pessoaServices';
import pessoaInput, { pessoaDocument } from '../interfaces/pessoaInterface';
import logger from '../config/winston/logger';

/** 
 * @description adicionar Pessoa
 * @async
 * @function pessoa add
 * @author Bruno Pessoa
 */
export const pessoaAdd = async(req: Request<{}, {}, pessoaInput>, res:Response) => {
  try{
    // desistruturando dados para serem salvo
    req.body.bloqueado = false;
    req.body.login = new Date();
    const pessoa: pessoaInput = {
      ...req.body
    } 

    // salvando no banco de dados
    const dados = await pessoaServiceAdd(pessoa);

    // saida de sucesso
    res.status(200).json({
      dados: dados? 'Adicionado': 'Error'
    });
  }
  // erro
  catch(error: any){
    logger.error(error.message);
    res.status(500).json({
      error: error.message
    });
  }
}

/** 
 * @description lista pessoa
 * @async
 * @function pessoa add
 * @author Bruno Pessoa
 */
export const pessoaList = async(req: Request, res: Response) => {
  try{
    // buscando todas as pessoa
    const pessoas: pessoaDocument[] = await pessoaServiceList();

    // saida de pessoas
    res.status(200).json({
      inf: pessoas
    })
  }
  catch(error: any){
    // error
    logger.error(error.message);
    res.status(404).json({
      error: error.message
    });
  }
}

/** 
 * @description buscando pessoa
 * @async
 * @function pessoaId
 * @author Bruno Pessoa
 */
export const pessoaId = async(req: Request, res: Response) => {
  try{
    // buscando pessoa pelo id
    const id: string = req.params.id;

    // recebendo dado de pessoa
    const dado: pessoaDocument | null = await pessoaServiceId(id);

    // retorno dos resultados
    res.status(200).json({
      dado
    });
  }
  catch(error: any){
    // retorno dos resultados
    logger.error(error.message);
    res.status(404).json({
      error: error.message
    });
  }
}

/** 
 * @description buscando pessoa
 * @async
 * @function pessoaUpdate
 * @author Bruno Pessoa
 */
export const pessoaUpdate = async(req: Request, res: Response) => {
  try{
    // recebendo o id para atualizar
    const id: string = req.params.id;
    // criando as informações para atualizar
    const dados: Partial<pessoaDocument> = {
      ...req.body,
      login: new Date()
    };

    // dados informaçoes
    const dado = await pessoaServiceUpdate(id, dados);

    // retorno em caso de sucesso
    res.status(dado? 201: 404).json({
      dado: dado? 'Atualizado': 'Error'
    });
  }
  catch(error: any){
    // error
    logger.error(error.message);
    res.status(404).json({
      error: error.message
    });
  }
}

/** 
 * @description buscando pessoa
 * @async
 * @function pessoaUpdate
 * @author Bruno Pessoa
 */
export const pessoaDelete = async(req: Request, res: Response) => {
  try{
    // recebendo id a ser excluido
    const id: string = req.params.id;

    // excluido 
    const dado: pessoaDocument | null = await pessoaServiceDelete(id);

    // saida
    res.status(203).json({
      inf: 'Excluido' 
    });
  }
  catch(error: any){
    // erros
    logger.error(error.menssage);
    res.status(404).json({
      error: error.message
    });
  }
}