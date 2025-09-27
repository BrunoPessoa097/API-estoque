import { Request, Response } from 'express';
// Import locais.
import marcaMongo from '../schemas/mongoose/marcaSchema';
import produtoMongo from '../schemas/mongoose/produtoSchema';
import produtoInput, { produtoDocument } from '../interfaces/produtoInterface';
import marcaInput,{ marcaDocument } from '../interfaces/marcaInterface';

/**
 * @description Adicionar marca.
 * @author Bruno Pessoa
 */
export const marcaAdd = async(req: Request<{},{}, marcaInput>, res: Response<{dados?:string}|{message?:string,error?:any}>) => {
  try{
    // Criando objeto com às informações enviadas para marca
    
    const marcaNova:marcaDocument = new marcaMongo({
      ...req.body
    });

    // Buscando se informações existem.
    const existNome: boolean = !!(await marcaMongo.exists({nome: req.body.nome}));
    const existCnpj: boolean = !!(await marcaMongo.exists({cnpj: req.body.cnpj}));

    if(!existNome && !existCnpj){
      // Salvando dados.
      const dados: marcaDocument =  await marcaNova.save();

      res.status(dados?201: 404).json({
        dados: dados? "Marca adicionada": "Error ao adicionar"
      })
        
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
export const marcaAll = async(req: Request, res: Response<{dados: marcaDocument[] | null| string}|{message?:string, error?:any}>) =>{
  try{
    // Buscando todos os dados.
    const dados: marcaDocument[] | null = await marcaMongo.find();

    // Saida dos dados.
    res.status(dados? 200: 404).json({
      dados: dados? dados: "Sem informação"
    });
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
export const marcaId = async(req: Request, res: Response<{dados: marcaDocument | null | string}|{message?:string,error?:any}>) => {
  try{
    // Recebendo Id
    const id: string = req.params.id;

    // Buscando id
    const dados: marcaDocument | null = await marcaMongo.findById(id);

    res.status(200).json({
      dados: dados? dados: "Informação não encontrada"
    });
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
export const marcaUpdate = async(req: Request, res: Response) => {
  try{
    // Recebendo Id.
    const id: string = req.params.id;
    const nome: string = req.body.nome;

    //const exist: any = marcaMongo.exists({nome});
    const exist: boolean = !!(await marcaMongo.exists({ nome }));

    // se nome ja existe não atualizar
    if(exist){
      res.status(409).json({
        message: 'Nome do produto já existe'
      });
    }
    //atualize  
    else{
      // Adicionando informações para ser atualizada.
      const marcaAtual: Partial<marcaInput> = {
        ...req.body
      };
  
      // dados atualizados
      const dados: marcaDocument | null = await marcaMongo.findByIdAndUpdate(id,marcaAtual);
  
      // saida para o usuário
      res.status(dados? 203: 404).json({
        message: dados? 'Atualizado': 'Erro ao atualizar'
      });
    }
  }
  // Erro no servidor.
  catch(error){
    res.status(500).json({
      message: 'Server Error',
      error
    });
  }
}

/**
 * @description Excluir marca.
 * @author Bruno Pessoa
 */
export const marcaDelete = async(req: Request, res: Response<{dado?:string} | {message?: string, error?:any}>) => {
  try {
    // recebendo id para ser excluido
    const id: string = req.params.id;

    // verificando se existe produto vinculado a marca
    const exitProdu: boolean = !!(await produtoMongo.exists({id_marca: id}));

    // se existe produto vinculado a marca, não e permitido a exclusão 
    if(exitProdu){
      res.status(404).json({
        message: 'Marca não pode ser excluida pois existe produtos relacionados'
      });
    }
    // senão existe produto vinculado à marca
    else{
      const exclui: marcaDocument | null = await marcaMongo.findByIdAndDelete(id);
      res.status(exclui?203: 404).json({
        dado: exclui? "Excluido": "Nao existe o ID para ser excluido"
      })
    }
  }
  // Error no servirdor.
  catch(error){
    res.status(500).json({
      message: 'Server Error',
      error
    });
  }
}