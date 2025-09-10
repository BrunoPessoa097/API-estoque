import { Request, Response, NextFunction} from 'express';
import { ObjectSchema } from 'joi';
// Import local.
import Categoria from '../interfaces/categoriaInterfaces';
import categoriaJoi from '../schemas/joi/categoriaJoi';

export const categoriaValidar = (req: Request<{}, {}, Categoria>, res: Response, next: NextFunction) => {
  try {
    const { nome, descricao }: Categoria = req.body;
    
    req.body = {
      nome: nome.trim(),
      descricao: descricao.trim()
    }
    
    const { error, value } = categoriaJoi.validate(req.body,{abortEarly: false});

    if(error) {
      res.status(400).json({
        message: 'Formato ou arquivo inválido',
        error: error.details.map((err)=>err.message)
      });
    }
    req.body = value;
    next();
  }catch(error){
    res.status(500).json({
      message: 'Server Error',
      error
    });
  }
};

export const categoriaPadronizar = (req: Request<{},{}, Categoria>, res: Response) => {
  res.status(200).json({
    message: "Padronizar"
  })
}