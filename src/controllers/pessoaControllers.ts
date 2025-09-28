import { Request, Response } from 'express';
// imports locais
import pessoaServiceAdd from '../services/pessoaServices';
import pessoaInput from '../interfaces/pessoaInterface';

const pessoaAdd = async(req: Request<{}, {}, pessoaInput>, res:Response) => {
  try{
    const dados = await pessoaServiceAdd(req.body);

    res.status(200).json({
      dados
    });
  }
  // erro do servidor
  catch(error: any){
    res.status(500).json({
      error: error.message
    })
  }
}

export default pessoaAdd;