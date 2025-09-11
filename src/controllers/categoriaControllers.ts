import {Request, Response } from 'express';
/**
 * @description Adicionar ao banco de dados.
 */
const categoriaAdd = (req: Request, res: Response) => {
  try{
    res.status(200).json({
      message: 'Categoria Adicionar'
    });
  }catch(error){
    res.status(500).json({
      message: 'Servidor Erro',
      error
    });
  }
}

export default categoriaAdd;