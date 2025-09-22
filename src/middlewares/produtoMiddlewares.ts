import { Request, Response } from 'express';
// imports locais 
import produtoInput from '../interfaces/produtoInterface';

const produtoVerificar = (req: Request<{}, {}, produtoInput>, res: Response) => {
  try{
    const { nome, quantidade, preco, id_marca, id_categoria }: produtoInput = req.body;

    req.body = {
      nome: nome.trim(),
      quantidade,
      preco,
      id_marca: id_marca.trim(),
      id_categoria: id_categoria.trim()
    }

    
    res.status(200).json({
      message: 'ok',
      dados: req.body
    });
  }
  catch(error){
    res.status(500).json({
      message: 'Server error',
      error
    });
  }
}

export default produtoVerificar;