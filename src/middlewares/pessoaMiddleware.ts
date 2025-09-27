import { Request, Response } from 'express';
// imports locais
import pessoaInput from '../interfaces/pessoaInterface';

/**
 * @description Padronizar entradas de pessoas
 */
const pessoaPadronizar = (req: Request, res: Response) => {
  try{
    res.status(200).json({
      message: 'pessoa'
    })
  }
  // server error
  catch(error){
    res.status(500).json({
      message: 'Server error',
      error
    });
  }
}

export default pessoaPadronizar;