import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
// imports locais 
import produtoInput from '../interfaces/produtoInterface';
import produtoJoi from '../schemas/joi/produtoJoi';
import palavraMaiuscula, { numDecimal } from './_configMiddlewares';
import { exitNomeProdu } from '../services/produtoServices';
import { marcaExist } from '../services/marcaServices';
import { existCat } from '../services/categoriaServices';
import logger from '../config/winston/logger';

export const produtoExistEntra = async(req: Request<{} ,{}, produtoInput>, res: Response, next: NextFunction) => {
  try{
    let { nome, id_marca, id_categoria }: Partial<produtoInput> = req.body;

    if(nome){
      nome = nome.trim();
      nome = palavraMaiuscula(nome);
      await exitNomeProdu(nome);
    }
    if(id_marca){
      await marcaExist(id_marca as string);
    }
    if(id_categoria){
      await existCat(id_categoria as string);
    }

    // proximo
    next();
  }
  catch(error: any){
    logger.error(error.message);
    res.status(409).json({
      error: error.message
    });
  }
}

/**
 * @description verificar se as entradas de produtos foram preenchidos corretamente
 * @function produtoVerificar
 * @author Bruno Pessoa
 */
export const produtoVerificar = (req: Request<{}, {}, produtoInput>, res: Response, next: NextFunction) => {
  try{
    // destruturação das informações.
    const { nome, quantidade, preco, id_marca, id_categoria }: produtoInput = req.body;

    // removendo espaços em branco.
    req.body = {
      ...(nome && {nome: nome.trim()}),
      ...(quantidade && {quantidade}),
      ...(preco && {preco}),
      ...(id_marca && {id_marca}),
      ...(id_categoria && {id_categoria})
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
      logger.error(error.details.map(e=>e.message));
      res.status(404).json({
        error: error.details.map(e=>e.message)
      });
    }
  }
  // servidor error
  catch(error: any){
    logger.error(error.mensage);
    res.status(500).json({
      error: error.mensage
    });
  }
}

/**
 * @description Padronizar entrada de produtos
 * @function produtoPadronizar
 * @author Bruno Pessoa
 */
export const produtoPadronizar = (req: Request<{}, {}, produtoInput>, res: Response, next: NextFunction) => {
  try{
    // desestruturando as entreadas dos clientes 
    const { nome, quantidade, preco, id_marca, id_categoria }: produtoInput = req.body;

    // padronização 
    req.body = {
      ...(nome && {nome: palavraMaiuscula(nome)}),
      ...(quantidade && {quantidade}),
      ...(preco && {preco: numDecimal(preco)}),
      ...(id_marca && {id_marca}),
      ...(id_categoria && {id_categoria})
    }
    // resposta
    next();
  }
  // servidor erro
  catch(error: any){
    logger.error(error.mensage);
    res.status(500).json({
      error: error.mensage
    });
  }
}