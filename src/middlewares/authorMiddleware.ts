import { Request, Response, NextFunction } from 'express';
// import locais
import pessoaInput from '../interfaces/pessoaInterface';
import logger from '../config/winston/logger';

/** 
 * @description Validar as entradas
 * @async
 * @function authorLogin
 * @author Bruno Pessoa
 */
const authorLogin = async(req: Request, res: Response, next: NextFunction) => {
  try{
    // dessustruturando
    const { email, senha }: Partial<pessoaInput> = req.body;
    
    res.status(200).json({message:email})
  }
  catch(error: any){
    logger.error(error.message);
    res.status(404).json({
      error: error.message
    });
  }
}

export default authorLogin;