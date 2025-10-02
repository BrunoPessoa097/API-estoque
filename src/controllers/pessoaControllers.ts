import { Request, Response } from 'express';
// imports locais
import { pessoaServiceAdd } from '../services/pessoaServices';
import pessoaInput from '../interfaces/pessoaInterface';
import logger from '../config/winston/logger';

/** 
 * @description adicionar Pessia
 * @async
 * @function pessoa add
 * @author Bruno Pessoa
 */
const pessoaAdd = async(req: Request<{}, {}, pessoaInput>, res:Response) => {
  try{
    // desistruturando dados para serem salvo
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
    })
  }
}

export default pessoaAdd;