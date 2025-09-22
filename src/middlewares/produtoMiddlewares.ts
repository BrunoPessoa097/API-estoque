import { Request, Response } from 'express';
import { ObjectSchema } from 'joi';
// imports locais 
import produtoInput from '../interfaces/produtoInterface';
import produtoJoi from '../schemas/joi/produtoJoi';

/**
 * @description verificar se as entradas de produtos foram preenchidos corretamente
 * @author Bruno Pessoa
 */
const produtoVerificar = (req: Request<{}, {}, produtoInput>, res: Response) => {
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
      res.status(200).json({
        message: req.body
      });
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

export default produtoVerificar;