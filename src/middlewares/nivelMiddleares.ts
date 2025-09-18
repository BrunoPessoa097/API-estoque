import {Request, Response, NextFunction} from 'express';
import {ObjectSchema} from 'joi';
// Import local
import nivelInput from '../interfaces/nivelInterface';
import nivelJoi from '../schemas/joi/nivelJoi';
import palavraMaiuscula,{palavraUpper} from './_configMiddlewares';

/**
 * @description Verifica as entradas.
 * @author Bruno Pessoa
 */
export const nivelVerificar = (req: Request<{},{}, nivelInput>, res: Response<{dados: nivelInput}|{message?: string,error?: any}>, next: NextFunction) => {
  try{
    // Desistruturação das entradas. 
    const {sigla, descricao}: nivelInput = req.body;

    // Removendo os espaços em branco.
    req.body = {
      sigla: sigla.trim(),
      descricao: descricao.trim()
    }

    // Validação das entradas
    const { error, value } = nivelJoi.validate(req.body,{abortEarly: false});

    // Em caso de erro
    if(error){
      res.status(404).json({
        error: error.details.map((error)=>error.message)
      });
    }
    // Sem erro
    else{
      req.body = value;
      next()
    }
  }
  // Erro do servidor
  catch(error){
    res.status(500).json({
      message: 'Server Error',
      error
    });
  }
}

/**
 * @description Padronizar as entradas de nivel
 * @author Bruno Pessoa
 */
export const nivelPadronizar = (req: Request<{},{},nivelInput>, res:Response<{dados: nivelInput}|{message?: string, error?:any}>) => {
  try{
    // Desistruturar.
    const {sigla, descricao} = req.body;

    // Padronizando
    req.body = {
      sigla: palavraUpper(sigla),
      descricao: palavraMaiuscula(descricao)
    }

    // saida padronizada
    res.status(200).json({
      dados: req.body
    });
    
  }
  // error do servidor.
  catch(error){
    res.status(500).json({
      message: 'Server Error',
      error
    });
  }
}