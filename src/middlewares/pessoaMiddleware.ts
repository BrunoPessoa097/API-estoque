import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
// imports locais
import pessoaInput from '../interfaces/pessoaInterface';
import pessoaJoi from '../schemas/joi/pessoaJoi';
import palavraMaiuscula, { hashSenha } from './_configMiddlewares';
import { pessoaServiceExistNome, pessoaServiceExistEmail } from '../services/pessoaServices';
import { existIdSigla } from '../services/nivelServices';
import { nivel2 } from '../enum/niveis';
import logger from '../config/winston/logger';


/**
 * @description Validar entradas de pessoas existem ou não
 * @function pessoaExistencia
 * @author Bruno Pessoa
 */
export const pessoaExistencia = async(req: Request<{}, {}, pessoaInput>, res: Response, next: NextFunction) => {
  try{
    // desistruturando entradas a serem validadas
    let { nome, email, nivel, senha }: Partial<pessoaInput> = req.body;

    // trecho que verifica a existencia e valida
    if(nome){
      // verificando nome
      nome = palavraMaiuscula(nome.trim());
      await pessoaServiceExistNome(nome);
    }
    if(email){
      // verificando e-email
      await pessoaServiceExistEmail(email);
    }
    if(nivel){
      // verificando nivel
      await existIdSigla(nivel.toString());
    }
    // fim do trecho

    next();
  }
  catch(error: any){
    // saida de error
    logger.error(error.message);
    res.status(409).json({
      error: error.message
    });
  }
}

/**
 * @description Validar entradas de pessoas
 * @function pessoaValidar
 * @author Bruno Pessoa
 */
export const pessoaValidar = (req: Request<{},{},pessoaInput>, res: Response, next: NextFunction) => {
  try{
    // desistruturando 
    const { nome, email, senha, endereco, dt_nasc, nivel }: Partial<pessoaInput> = req.body;

    // recriando so com os pametros enviados
    req.body = {
      ...(nome && {nome: nome.trim()}),
      ...(email && {email: email.trim()}),
      ...(senha && {senha: senha.trim()}),
      ...(endereco && {endereco: endereco.trim()}),
      ...(dt_nasc && {dt_nasc}),
      ...(typeof nivel == 'string' && {nivel: nivel.trim()})
    }

    // validando as entradas
    const { error , value } = pessoaJoi.validate(req.body,{abortEarly: false});

    // saidas dos erros
    if(error) {
      res.status(404).json({
        message: error.details.map(e=>e.message)
      });
    }
    // senão houver erros
    else{
      req.body = value;
      next();
    }
  }
  // server error
  catch(error){
    res.status(500).json({
      message: 'Server error',
      error
    });
  }
}

/**
 * @description Padronizar as entradas de pessoa
 * @function pessoaPadronizar
 * @author Bruno Pessoa
 */
export const pessoaPadronizar = async(req: Request<{}, {}, pessoaInput>, res: Response, next: NextFunction) => {
  try{
    // desistruturando 
    const { nome, email, senha, endereco, dt_nasc, nivel }: Partial<pessoaInput> = req.body;
    
    // recriando so com os pametros enviados
    req.body = {
      ...(nome && {nome: await palavraMaiuscula(nome)}),
      ...(email && {email: email}),
      ...(senha && {senha: await hashSenha(senha)}),
      ...(endereco && {endereco: await palavraMaiuscula(endereco)}),
      ...(dt_nasc && {dt_nasc}),
      ...(nivel && {nivel: nivel})
    }

    next();    
  }
  // erro do servidor
  catch(error){
    res.status(500).json({
      message: 'Server error',
      error
    });
  }
}

/**
 * @description verificar nivel ou pessoa pode ter acessoa a determinada informação
 * @function pessoaPublic
 * @author Bruno Pessoa
 */
export const pessoaPublic = async(req: Request, res: Response, next: NextFunction) => {
  try{
    // id requisitado
    const id: string = req.params.id;
    // o nivel de acesso do usuario
    const role: string = req.user.role;
    // pegando id do usuário logado
    const idUser: string = req.user.id;

    // se nivel ou id for igual aprovado
    if(nivel2.includes(role)|| idUser === id) next();
    // error 
    else throw new Error('Acesso Negado');
    
  }catch(error: any){
    // erro
    logger.error(error.message);
    res.status(401).json({
      error: error.message
    });
  }
}