import { Request, Response } from 'express';

const produtoVerificar = (req: Request, res: Response) => {
  try{
    res.status(200).json({
      message: 'ok'
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