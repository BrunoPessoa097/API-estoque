import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
// imports locais 
import produtoInput from '../interfaces/produtoInterface';
import produtoJoi from '../schemas/joi/produtoJoi';
import palavraMaiuscula, { numDecimal } from './_configMiddlewares';

/**
 * @description verificar se as entradas de produtos foram preenchidos corretamente
 * @author Bruno Pessoa
 */
export const produtoVerificar = (req: Request<{}, {}, produtoInput>, res: Response<{message?: string, error?:any}>, next: NextFunction) => {
  try{
    // destruturação das informações.
    const { nome, quantidade, preco, id_marca, id_categoria }: produtoInput = req.body;

    // removendo espaços em branco.
    req.body = {
      nome: nome.trim(),
      quantidade,
      preco,
      id_marca: id_marca.trim(),
      id_categoria: id_categoria.trim()
    }

    // verificando as entradas com joi
    const { error, value } = produtoJoi.validate(req.body,{abortEarly: false});

    // senão tiver error
    if(!error){
      req.body = value;
      next();
    }
    // em caso de erro
    else{
      res.status(404).json({
        message: "Dados com erros",
        error: error.details.map(e=>e.message)
      });
    }
  }
  // servidor error
  catch(error){
    res.status(500).json({
      message: 'Server error',
      error
    });
  }
}

/**
 * @description Padronizar entrada de produtos
 */
export const produtoPadronizar = (req: Request<{}, {}, produtoInput>, res: Response) => {
  try{
    // desestruturando as entreadas dos clientes 
    const { nome, quantidade, preco, id_marca, id_categoria }: produtoInput = req.body;

    // padronização 
    req.body = {
      nome: palavraMaiuscula(nome),
      quantidade,
      preco: numDecimal(preco),
      id_marca,
      id_categoria
    }
    // resposta
    res.status(200).json({
      dados: req.body
    });
  }
  // servidor erro
  catch(error){
    res.status(500).json({
      message: 'Sever error',
      error
    });
  }
}
