import {Request, Response} from 'express';
// import locais
import nivelInput,{nivelDocument} from '../interfaces/nivelInterface';
import {addNivel, listNivel, unicoNivel, updtNivel, delNivel} from '../services/nivelServices';
import logger from '../config/winston/logger';

/**
 * @description Adicionar produto
 * @function produtoAdd
 * @author Bruno Pessoa
 */
export const nivelAdd = async(req: Request<{},{}, nivelInput>, res: Response) => {
  try{
    // criando objeto com as entradas
    const dado: nivelInput = {
      ...req.body
    }

    // salvando no banco
    const saida: nivelInput = await addNivel(dado);

    // saida para usuarios
    res.status(saida? 201: 404).json({
      message: saida? 'Adicionado nivel' : 'Error'
    });
  }
  // error no servidor
  catch(error: any) {
    logger.error(error.message);
    res.status(404).json({
      error
    });
  }
}

/**
 * @description Listar niveis
 * @function nivelList
 * @author Bruno Pessoa
 */
export const nivelList = async(req: Request, res: Response) =>{
  try{
    // buscando todos os dados de níveis 
    const dados: nivelDocument[] = await listNivel();

    // saida de niveis
    res.status(200).json({
      dados
    });
  }
  // error
  catch(error: any){
    logger.error(error.message);
    res.status(500).json({
      error: error.message
    });
  }
}

/**
 * @description buscar nivel por Id
 * @function nivelId
 * @author Bruno Pessoa
 */
export const nivelId = async(req: Request, res: Response) => {
  try{
    // recenbendo id 
    const id: string = req.params.id;

    // buscando dados requisitados
    const dados: nivelDocument | null = await unicoNivel(id);

    // retorno dos dados.
    res.status(dados? 200:404).json({
      dados: dados? dados: 'Informação não existe'
    });
  }
  // erro do servidor
  catch(error: any){
    logger.error(error.message);
    res.status(500).json({
      error: error.message
    });
  }
}

/**
 * @description Atualizar item
 * @function nivelUpdate
 * @author Bruno Pessoa
 */
export const nivelUpdate = async(req: Request, res: Response) => {
  try{
    // recebendo o id.
    const id: string = req.params.id;

    // fazendo um objeto com dados para atualizar
    const dado: nivelDocument = {
      ...req.body
    }

    // atualizando as informações
    const dados: nivelDocument | null = await updtNivel(id, dado);

    // saidas
    res.status(201).json({
      dados: dados? 'Atualizado': 'Não atualizado'
    });
    
  }
  // error
  catch(error: any) {
    logger.error(error.message);
    res.status(404).json({
      error: error.message
    });
  }
}
/** 
 * @descriotion Deletar nivel
 * @function nivelDelete
 * @author Bruno Pessoa
 */
export const nivelDelete = async(req: Request, res: Response) => {
  try{
    // recebendo id
    const id: string = req.params.id;

    // excluindo o nivel.
    const dados: nivelDocument | null = await delNivel(id);

    // resposta da exclusão.
    res.status(203).json({
      message:'excluido'
    });
  }
  // server error
  catch(error: any) {
    logger.error(error.message);
    res.status(404).json({
      error: error.message
    });
  }
}