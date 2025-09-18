import {Request, Response, NextFunction} from 'express';

/**
 * @description Verifica as entradas.
 * @author Bruno Pessoa
 */
const nivelVerificar = (req: Request, res: Response) => {
  try{
    res.status(200).json({message: "oie"});
  }catch(error){
    res.status(500).json({
      message: 'Server Error',
      error
    })
  }
}
export default nivelVerificar;