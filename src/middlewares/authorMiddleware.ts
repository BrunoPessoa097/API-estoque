import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
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
export const authorLogin = async(req: Request, res: Response, next: NextFunction) => {
  try{
    // dessustruturando
    const { email, senha }: Partial<pessoaInput> = req.body;
    let chave: string = `${process.env.CHAVE}`;

    // caso e-mail e senha não forem enviados
    if(!email || !senha){throw new Error('Nome e senha são obrigatorios')}
    
    //validando se existe email
    const pessoa = await pessoaServiceLogin(email);

    // validação de senha
    const exist = await hashCompareSenha(email,senha);

    // caso senha for incoreta
    if(!exist){throw new Error('Senha incorreta')}
    if(!!pessoa.bloqueado) throw new Error('Conta está bloqueada');

    // criando o token
    const token = jwt.sign(
        { id: pessoa?._id, email: pessoa?.email },
        chave,
        { expiresIn: "1h" }
      );
    // monstando o token
    res.status(200).json({token});
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

// typando globalmente
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

/** 
 * @description Validar os tokens
 * @async
 * @function authorLogin
 * @author Bruno Pessoa
 */
export const loginAuthorValido = async(req: Request, res: Response, next: NextFunction) => {
  try{
    // chave secreta
    const chave: string = `${process.env.CHAVE}`;
    // pegando a autorização
    const authorHeader = req.headers['authorization'];

    // caso não exista o token
    if (!authorHeader) return res.status(401).json({ error: "Token inexistente" });

    // recebendo o token
    const token = authorHeader.split(' ')[1];

    // caso token não existe
    if (!token) return res.status(401).json({ error: "Token não existe" });

    // validando os tokens
    const valido = jwt.verify(token,chave);
    // recebendo os payloads
    req.user = valido;
    // next
    next();
  }catch(error: any){
    // error
    logger.error(error.message);
    res.status(504).json({
      error: error.message
    });
  }
} 
