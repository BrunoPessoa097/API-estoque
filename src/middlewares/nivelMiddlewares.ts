import {Request, Response, NextFunction} from 'express';
import {ObjectSchema} from 'joi';
// Import local
import nivelInput from '../interfaces/nivelInterface';
import nivelJoi from '../schemas/joi/nivelJoi';
import palavraMaiuscula,{palavraUpper} from './_configMiddlewares';
import existSigla from '../services/nivelServices';

/**
 * @description Verifica existência da sigla
 * @function existNivel
 * @author Bruno Pessoa
 */
export const  = async(req: Request<{}, {}, nivelInput>, res: Response, next: NextFunction) => {
  try{
    // pegando a sigla
    let { sigla }: Partial<nivelInput> = req.body;

    // se sigla existe fazer a verificação se exist
    if(sigla){
      sigla = palavraUpper(sigla.trim());
      await existSigla(sigla);
    }

    //proximo
    next();
  }
  // saida de erros
  catch(error: any){
    res.status(409).json({
      error: error.message
    });
  }
}

/**
 * @description Verifica as entradas.
 * @function nivelVerificar
 * @author Bruno Pessoa
 */
export const nivelVerificar = (req: Request<{},{}, nivelInput>, res: Response, next: NextFunction) => {
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
 * @function nivelPadronizar
 * @author Bruno Pessoa
 */
export const nivelPadronizar = (req: Request<{},{},nivelInput>, res:Response, next: NextFunction) => {
  try{
    // Desistruturar.
    const {sigla, descricao} = req.body;

    // Padronizando
    req.body = {
      sigla: palavraUpper(sigla),
      descricao: palavraMaiuscula(descricao)
    }

    // saida padronizada
    next();
  }
  // error do servidor.
  catch(error){
    res.status(500).json({
      message: 'Server Error',
      error
    });
  }
}