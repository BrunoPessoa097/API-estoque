import { Request, Response } from 'express';
// imports locais
import { pessoaServiceAdd, pessoaServiceList } from '../services/pessoaServices';
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

export const pessoaId = async(req: Request, res: Response) => {
  try{
    
  }
  catch(error: any){
    
  }
}