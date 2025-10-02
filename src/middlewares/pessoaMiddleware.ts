import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
// imports locais
import pessoaInput from '../interfaces/pessoaInterface';
import pessoaJoi from '../schemas/joi/pessoaJoi';
import palavraMaiuscula from './_configMiddlewares';



/**
 * @description Validar entradas de pessoas
 * @author Bruno Pessoa
 */
export const pessoaValidar = (req: Request<{},{},pessoaInput>, res: Response, next: NextFunction) => {
  try{
    // desistruturando 
    const { nome, email, senha, endereco, dt_nasc, nivel }: pessoaInput = req.body;

    // recriando so com os pametros enviados
    req.body = {
      ...(nome && {nome: nome.trim()}),
      ...(email && {email: email.trim()}),
      ...(senha && {senha: senha.trim()})
      ...(endereco && {endereco: endereco.trim()}),
      ...(dt_nasc && {dt_nasc}),
      ...(nivel && {nivel: nivel.trim()})
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
 * @author Bruno Pessoa
 */
export const pessoaPadronizar = (req: Request<{}, {}, pessoaInput>, res: Response, next: NextFunction) => {
  try{
    // desistruturando 
    const { nome, endereco, dt_nasc, nivel, senha }: pessoaInput = req.body;

    // recriando so com os pametros enviados
    req.body = {
      ...(nome && {nome: palavraMaiuscula(nome)}),
      ...(endereco && {endereco: palavraMaiuscula(endereco)}),
      ...(dt_nasc && {dt_nasc}),
      ...(nivel && {nivel: palavraMaiuscula(nivel)}),
      ...(senha && {senha: senha})
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