import { Request, Response, NextFunction } from 'express';
// import locais
import pessoaInput from '../interfaces/pessoaInterface';
import logger from '../config/winston/logger';
import { pessoaServiceLogin } from '../services/pessoaServices';
import { hashCompareSenha } from './_configMiddlewares';

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
    let cont: number = 0;

    // caso e-mail e senha não forem enviados
    if(!email || !senha){throw new Error('Nome e senha são obrigatorios')}
    
    //validando se existe email
    const pessoa = await pessoaServiceLogin(email);

    // validação de senha
    const exist = await hashCompareSenha(email,senha);

    // caso senha for incoreta
    if(!exist){throw new Error('Senha incorreta')}

    //next();
  }
  catch(error: any){
    // erros
    logger.error(error.message);
    res.status(404).json({
      error: error.message
    });
  }
}

export default authorLogin;