import {Request, Response, NextFunction} from 'express';
import { ObjectSchema } from 'joi';
// Imports locais.
import marcaInput  from '../interfaces/marcaInterface';
import marcaJoi from '../schemas/joi/marcaJoi';

/**
 * @description Verificando se às entradas de marca atende aos requisitos.
 */
const marcaVerificar = (req: Request<{}, {}, marcaInput>, res: Response, nex: NextFunction) => {
  try{ 
    // Desustruturando entradas
    const {nome, nomeSocial, cnpj}: marcaInput = req.body;

    // Removendo os espacos em branco das entradas.
    req.body = {
      nome: nome.trim(),
      nomeSocial: nomeSocial.trim(),
      cnpj: cnpj.trim()
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
      res.status(200).json({
        dados: value
      });
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

export default marcaVerificar;