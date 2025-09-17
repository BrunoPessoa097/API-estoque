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
    // Buscando todos os dados.
    const dados: marcaDocument[] | null = await marcaMongo.find();

    // Saida dos dados.
    res.status(200).json({dados});
  }
  // Erro no servidor
  catch(error){
    res.status(500).json({
      message: 'Servidor Erro',
      error
    });
  }
}

/**
 * @description Buscar marca
 * @author Bruno Pessoa
 */
export const marcaId = async(req: Request<{id:string}>, res: Response<{dados: marcaDocument | null}|{message?:string,error?:any}>) => {
  try{
    // Recebendo Id
    const id : string = req.params.id;

    // Buscando id
    const dados: marcaDocument | null = await marcaMongo.findById(id);

    res.status(200).json({dados});
  }
  // Erro do servidor
  catch(error) {
    res.status(500).json({
      message: 'Servidor Error',
      error
    });
  }
}

/**
 * @description Atualizar Marca
 * @author Bruno Pessoa
 */
export const marcaUpdate = async(req: Request<{id: string}>, res: Response) => {
  try{
    // Recebendo Id.
    const id: string = req.params.id;
    // Adicionando informações para ser atualizada.
    const marcaAtual: marcaInput = {
      ...req.body
    };

    const verificar = await marcaMongo.find({nome: req.body.nome});

    if(!verificar){
      const dados: marcaDocument | null = await marcaMongo.findByIdAndUpdate(id,marcaAtual);

      res.status(dados?200:404).json({
        dados: dados? marcaAtual: "Informacao nao existe"
      });
    }
    else {
      res.status(409).json({
        message: 'Nao pode existir empresas com mesmo nome'
      });
    }
  }
  catch(error){
    res.status(500).json({
      message: 'Server Error',
      error
    });
  }
}