import { Request, Response, NextFunction} from 'express';
import { ObjectSchema } from 'joi';
// Import local.
import Categoria from '../interfaces/categoriaInterfaces';
import categoriaJoi from '../schemas/joi/categoriaJoi';
import palavraMaiuscula from './_configMiddlewares';
import nomeCatExist from '../services/categoriaServices';

/** 
 * @description Verificar se ja existe Nome
 * @async
 * @function categoriaExist
 * @returns {Promise<boolean> } Retorna uma Promise de verdadeiro ou falso.
 * @author Bruno Pessoa
 */
export const categoriaExist = async(req: Request, res: Response, next: NextFunction) => {
  try{
    // recebendo o nome
    let { nome }: Partial<Categoria> = req.body;

    // Se nome enviado verifica sua existência
    if(nome) {
      nome = palavraMaiuscula(nome.trim());
      await nomeCatExist(nome);
    }
    
    next()
  }
  // saida de erros
  catch(error: any){
    res.status(500).json({
      error: error.message
    })
  }
}

/**
 * @description Validar as entradas de categoria com Joi.
 * @function categoriaValidar
 * @returns Em caso de categoria estiver validos e aprovado, senão retorna erro.
 * @author Bruno Pessoa
 */
export const categoriaValidar = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Desustruturação do req.
    const { nome, descricao }: Partial<Categoria> = req.body;

    // Remoção de espaços vazios.
    req.body = {
      ...(nome && {nome: nome.trim()}),
      ...(descricao && {descricao: descricao.trim()})
    }

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
  }catch(error: any){
    // Erro do servidor.
    res.status(500).json({
      message: 'Server Error',
      error
    });
  }
};

/**
 * @description Padroniza as entradas.
 * @function categoriaPadronizar
 * @author Bruno Pessoa 
 */
export const categoriaPadronizar = async(req: Request, res: Response, next: NextFunction) => {
  try{
    // Desustrutura o req.
    const { nome, descricao }: Partial<Categoria> = req.body;

    // Padronização das entradas de categoria.
    req.body = {
      ...(nome && {nome: palavraMaiuscula(nome)}),
      ...(descricao && {descricao: palavraMaiuscula(descricao)})
    }

    next();
    
  }catch(error: any){
    // Error de servidor.
    res.status(500).json({
      message: 'Servidor error',
      error
    })
  }
}