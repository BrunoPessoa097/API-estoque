import { Request, Response, NextFunction} from 'express';
import { ObjectSchema } from 'joi';
// Import local.
import Categoria from '../interfaces/categoriaInterfaces';
import categoriaJoi from '../schemas/joi/categoriaJoi';
import palavraMauiscula from './configMiddlewares';

/**
 * @description Validar as entradas de categoria com Joi.
 * @param req
 * @param res
 * @param next
 * @returns Em caso de categoria estiver validos e aprovado, senão retorna erro.
 * @author Bruno Pessoa
 */
export const categoriaValidar = (req: Request<{}, {}, Categoria>, res: Response, next: NextFunction) => {
  try {
    // Desustruturação do req.
    const { nome, descricao }: Categoria = req.body;

    // Remoção de espaços vazios.
    req.body = {nome: nome.trim(), descricao: descricao.trim()}

    // Validando as entradas com o Categoria Joi.
    const { error, value } = categoriaJoi.validate(req.body,{abortEarly: false});

    // Caso de erro.
    if(error) {
      res.status(400).json({
        message: 'Formato ou arquivo inválido',
        error: error.details.map((err)=>err.message) // Saída dos erros.
      });
    }
    else{
      // Recebendo os valores válidos.
      req.body = value;
      next();
    }
  }catch(error){
    // Erro do servidor.
    res.status(500).json({
      message: 'Server Error',
      error
    });
  }
};

/**
 * @description Padroniza as entradas.
 * @param req
 * @param res
 * @param next
 * @author Bruno Pessoa
 */
export const categoriaPadronizar = async(req: Request<{},{}, Categoria>, res: Response, next: NextFunction) => {
  try{
    // Desustrutura o req.
    const { nome, descricao }: Categoria = req.body;

    // Padronização das entradas de categoria.
    req.body = {
      nome: await palavraMauiscula(nome),
      descricao: await palavraMauiscula(descricao)
    }

    // next();
    
  }catch(error){
    res.status(500).json({
      message: 'Servidor error',
      error
    })
  }
}