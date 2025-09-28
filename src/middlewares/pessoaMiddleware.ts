import { Request, Response } from 'express';
import { ObjectSchema } from 'joi';
// imports locais
import pessoaInput from '../interfaces/pessoaInterface';
import pessoaJoi from '../schemas/joi/pessoaJoi';

/**
 * @description Padronizar entradas de pessoas
 */
const pessoaPadronizar = (req: Request, res: Response) => {
  try{
    // desistruturando 
    const { nome, endereco, dt_nasc, nivel, senha }: pessoaInput = req.body;

    // recriando so com os pametros enviados
    req.body = {
      ...(nome && {nome: nome.trim()}),
      ...(endereco && {endereco: endereco.trim()}),
      ...(dt_nasc && {dt_nasc}),
      ...(nivel && {nivel: nivel.trim()}),
      ...(senha && {senha: senha.trim()})
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

export default pessoaPadronizar;