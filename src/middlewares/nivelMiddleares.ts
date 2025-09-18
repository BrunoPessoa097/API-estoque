import {Request, Response, NextFunction} from 'express';
import {ObjectSchema} from 'joi';
// Import local
import nivelInput from '../interfaces/nivelInterface';
import nivelJoi from '../schemas/joi/nivelJoi';

/**
 * @description Verifica as entradas.
 * @author Bruno Pessoa
 */
const nivelVerificar = (req: Request<{},{}, nivelInput>, res: Response<{dados: nivelInput}|{error?:any, message?: string}>) => {
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
      res.status(200).json({
        dados: req.body
      });
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
export default nivelVerificar;