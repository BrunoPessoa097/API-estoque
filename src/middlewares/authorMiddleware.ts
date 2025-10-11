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
    // recebendo chave secreta
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

    // criando payload
    const payload = {
      id: pessoa?._id, 
      email: pessoa?.email,
      role: (pessoa?.nivel as any)?.sigla
    }

    // criando o token
    const token = jwt.sign(
        payload,
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

/** 
 * @description Permissao das rotas
 * @async
 * @function permissaoRota
 * @params 
 * @return o acesso
 * @author Bruno Pessoa
 */
export const permissaoRota = (...niveisPermitidos: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try{
      // recebendo o nivel do usuario
      const { role } = req.user;

      // verificando se e permitido a entrada
      if(niveisPermitidos.includes(role)) next();
      // acesso negado  
      else throw new Error('Acesso negado');
    }catch(error: any) {
      // erros
      logger.error(error.message);
      res.status(401).json({
        error: error.message
      });
    }
  }
}
  