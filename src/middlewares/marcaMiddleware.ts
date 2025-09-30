import {Request, Response, NextFunction} from 'express';
import { ObjectSchema } from 'joi';
// Imports locais.
import marcaInput  from '../interfaces/marcaInterface';
import marcaJoi from '../schemas/joi/marcaJoi';
import palavraMaiuscula from './_configMiddlewares';
import { existNomeCnpj } from '../services/marcaServices';

/**
 * @description Verificando se nome e e/ou cnpj já existem.
 * @function marcaAproRepro
 * @author Bruno Pessoa
 */
export const marcaAproRepro = async(req: Request, res: Response, next: NextFunction) => {
  try{
    // nome e cnpj para ser validados
    let { nome, cnpj }: Partial<marcaInput> = req.body;

    // se nome existem deixar em maiusculo.
    if(nome) nome = palavraMaiuscula(nome.trim());

    // validando se existe nome e cnpj
    const aprov = !!(await existNomeCnpj(nome,cnpj));

    // senão existir nome, cnpj ou outro paramentro que não necessita de busca
    if(!aprov){
      next();
    }
    
  }
  catch(error: any){
    res.status(409).json({
      error: error.message
    });
  }
}

/**
 * @description Verificando se às entradas de marca atende aos requisitos.
 * @function marcaVerificar
 * @author Bruno Pessoa
 */
export const marcaVerificar = (req: Request, res: Response, next: NextFunction) => {
  try{ 
    // Desustruturando entradas
    const {nome, nomeSocial, cnpj}:any = req.body;

    // Removendo os espacos em branco das entradas.
    req.body = {
      ...(nome && {nome: nome.trim()}),
      ...(nomeSocial && {nomeSocial: nomeSocial.trim()}),
      ...(cnpj && {cnpj: cnpj.trim()})
    }

    // Validando se as entradas atenden os requisitos senão mostra os erros.
    const { error, value } = marcaJoi.validate(req.body,{abortEarly: false});

    // em caso de erro, saida do(s) erro(s).
    if(error){
      res.status(404).json({
        message:'Error',
        error: error.details.map((err)=>err.message)
      });
    }
    // Senão haver nenhum erro
    else{
      req.body = value;
      next()
    }
  }
  // Erro do servidor.
  catch(error){
    res.status(500).json({
      message: 'Server Error',
      error
    });
  }
}
/**
 * @description Padronizar entrada da marca
 */
export const marcaPadronizar = (req: Request, res: Response, next: NextFunction) => {
  try{
    // Desustruturar o req.
    const { nome, nomeSocial, cnpj }: marcaInput = req.body;

    // Adicionando as palavras adicionadas
    req.body = {
      ...(nome && {nome: palavraMaiuscula(nome)}),
      ...(nomeSocial && {nomeSocial: palavraMaiuscula(nomeSocial)}),
      ...(cnpj && {cnpj})
      // nome: palavraMaiuscula(nome),
      // nomeSocial: palavraMaiuscula(nomeSocial),
      // cnpj
    }

    next();
  }
  catch(error){
    res.status(500).json({
      message: 'Server Erro',
      error
    });
  }
}