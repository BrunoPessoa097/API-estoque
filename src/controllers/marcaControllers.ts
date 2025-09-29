import { Request, Response } from 'express';
// Import locais.
import marcaMongo from '../schemas/mongoose/marcaSchema';
import produtoMongo from '../schemas/mongoose/produtoSchema';
import produtoInput, { produtoDocument } from '../interfaces/produtoInterface';
import marcaInput,{ marcaDocument } from '../interfaces/marcaInterface';

import { listMarca, idMarca, updateMarca, deleteMarca } from '../services/marcaServices';

/**
 * @description Adicionar marca.
 * @function marcaAdd
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
 * @function marcaAll
 * @author Bruno Pessoa
 */
export const marcaAll = async(req: Request, res: Response) =>{
  try{
    // listar todas as marcas
    const dados = await listMarca();

    // retorno dos dados
    res.status(200).json({
      dados
    });
  }
  // saida dos erros
  catch(error: any){
    res.status(404).json({
      error: error.message 
    });
  }
}

/**
 * @description Buscar marca
 * @function marcaId
 * @author Bruno Pessoa
 */
export const marcaId = async(req: Request, res: Response) => {
  try{
    // // Recebendo Id
    const id: string = req.params.id;

    // recebendo a informação da marca
    const dado = await idMarca(id);

    // saida das informações
    res.status(200).json({
      dado
    });
  }
  // erros
  catch(error:any) {
    res.status(404).json({
      error: error.message
    });
  }
}

/**
 * @description Atualizar Marca
 * @function marcaUpdate
 * @author Bruno Pessoa
 */
export const marcaUpdate = async(req: Request, res: Response) => {
  try{
    // Recebendo Id.
    const id: string = req.params.id;

    // construindo o objeto com as informações pedidas
    const dados: Partial<marcaDocument> = {
      ...req.body
    }

    // resultado da saida
    const up = await updateMarca(id,dados);

    res.status(up? 200: 404).json({
      message: up? 'Atualizado' : 'Problemas ao atualizar'
    });
  }
  // Erros.
  catch(error: any){
    res.status(500).json({
      error: error.message
    });
  }
}

/**
 * @description Excluir marca.
 * @function marcaDelete
 * @author Bruno Pessoa
 */
export const marcaDelete = async(req: Request, res: Response) => {
  try {
    // recebendo id para ser excluido
    const id: string = req.params.id;

    // deletando a marca
    const marcaDel = await deleteMarca(id);
  
    res.status(203).json({
      marcaDel:'Excluido'
    });
  }
  // Erros.
  catch(error: any){
    res.status(404).json({
      error: error.message
    });
  }
}