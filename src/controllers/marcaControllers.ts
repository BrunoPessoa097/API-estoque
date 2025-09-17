import { Request, Response } from 'express';
// Import locais.
import marcaMongo from '../schemas/mongoose/marcaSchema';
import marcaInput,{ marcaDocument } from '../interfaces/marcaInterface';

const marcaAdd = async(req: Request<{},{}, marcaInput>, res: Response<{message?:string}|{message?:string,error?:any}>) => {
  try{
    const marcaNova:marcaDocument = new marcaMongo({
      ...req.body
    });

    const existNome = await marcaMongo.findOne({nome: req.body.nome});
    const existCnpj = await marcaMongo.findOne({cnpj: req.body.cnpj});

    if(!existNome && !existCnpj){
      await marcaNova.save().then(()=>{
        res.status(201).json({message: 'Marca Adicionada'});
      }).catch((error)=>{
        res.status(404).json({
          message: 'Error ao cadastrar à marca',
          error
        })
      })
    }else{
      res.status(409).json({
        message: `O ${existNome && existCnpj? 'Nome e CNPJ': existNome? 'Nome': existCnpj? 'CNPJ': 'outro campo'} já existe(m)`
      })
    }
  }catch(error) {
    res.status(500).json({
      message: 'Server Erro',
      error
    });
  }
}

export default marcaAdd;