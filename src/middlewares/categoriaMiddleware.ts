import { Request, Response} from 'express';
import { ObjectSchema } from 'joi';
// Import local.
import Categoria from '../interfaces/categoriaInterfaces';
import categoriaJoi from '../schemas/joi/categoriaJoi';

const categoriaValidar = (req: Request<{}, {}, Categoria>, res: Response) => {
  try {
    const {nome, descricao}: Categoria = req.body;

    const { error, value } = categoriaJoi.validate(req.body,{abortEarly: false});

    if(error) {
      res.status(400).json({
        message: 'Formato ou arquivo inválido',
        error: error.details.map((err)=>err.message)
      });
    }else{
      res.status(200).json({
        message: "Validos",
        value
      })
    }
    
    
  }catch(error){
    res.status(500).json({
      message: 'Server Error',
      error
    });
  }
};

export default categoriaValidar;