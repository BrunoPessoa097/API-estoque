import { Request, Response } from 'express';

const pessoaAdd = (req: Request, res:Response) => {
  try{
    res.status(200).json({message: 'pessoa'})
  }
  // erro do servidor
  catch(error){
    res.status(500).json({
      message: 'Servidor erro',
      error
    })
  }
}

export default pessoaAdd;