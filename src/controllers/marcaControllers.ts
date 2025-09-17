import { Request, Response } from 'express';
// Import locais.
import marcaMongo from '../schemas/mongoose/marcaSchema';
import marcaInput,{ marcaDocument } from '../interfaces/marcaInterface';

/**
 * @description Adicionar marca.
 * @author Bruno Pessoa
 */
export const marcaAdd = async(req: Request<{},{}, marcaInput>, res: Response<{message?:string}|{message?:string,error?:any}>) => {
  try{
    // Criando objeto com às informações enviadas para marca
    
    const marcaNova:marcaDocument = new marcaMongo({
      ...req.body
    });

    // Buscando se informações existem.
    const existNome = await marcaMongo.findOne({nome: req.body.nome});
    const existCnpj = await marcaMongo.findOne({cnpj: req.body.cnpj});

    if(!existNome && !existCnpj){
      // Salvando dados.
      await marcaNova.save().then(()=>{
        res.status(201).json({message: 'Marca Adicionada'});
      }).catch((error)=>{
        res.status(404).json({
          message: 'Error ao cadastrar à marca',
          error
        });
      });
    }
    // Informações existente.
    else{
      res.status(409).json({
        message: `O ${existNome && existCnpj? 'Nome e CNPJ': existNome? 'Nome': existCnpj? 'CNPJ': 'outro campo'} já existe(m)`
      });
    }
  }
  // Erro no servidor.
  catch(error) {
    res.status(500).json({
      message: 'Server Erro',
      error
    });
  }
}

/**
 * @description Listar marcas
 * @author Bruno Pessoa
 */
export const marcaAll = async(req: Request, res: Response<{dados: marcaDocument[] | null}|{message?:string, error?:any}>) =>{
  try{
    const dados: marcaDocument[] | null = await marcaMongo.find();

    res.status(200).json({dados});
  }
  // Erro no servidor
  catch(error){
    res.status(500).json({
      message: 'Servidor Erro',
      error
    })
  }
}