import { Request, Response } from 'express';
// imports locais
import produtoInput,{produtoDocument} from '../interfaces/produtoInterface';
import marcaDocument from '../interfaces/marcaInterface';
import CategoriaDocument from '../interfaces/categoriaInterfaces';
import produtoMongo from '../schemas/mongoose/produtoSchema';
import marcaMongo from '../schemas/mongoose/marcaSchema';
import categoriaMongo from '../schemas/mongoose/categoriaSchema';
import { addProdu, listProdu, unicoProduto, updtProdu, delProdu } from '../services/produtoServices';

/**
 * @description Adicionanr produto
 * @function produtoAdd
 * @author Bruno Pessoa
 */
export const produtoAdd = async(req: Request<{}, {},produtoInput>, res: Response) => {
  try{
    // criando objeto para ser salvo
    const dados: produtoInput = {
      ...req.body
    }

    // salvando 
    const dado: produtoDocument = await addProdu(dados);

    // resposta
    res.status(200).json({
      dado: dado? 'Produto adicionado': 'Erro ao adicionar'
    });
  }
  // server error
  catch(error) {
    res.status(500).json({
      error
    });
  }
}
  
/**
 * @description Listar as categorias
 * @function produtoList
 * @author Bruno Pessoa
 */
export const produtoList = async(req: Request, res: Response) => {
  try{
    // buscando no banco
    const dadosProd: produtoDocument[] = await listProdu();

    // padronizando as informações.
    const dados: object[] | null  = dadosProd.map((p: any)=>({
      _id: p._id,
      nome: p.nome,
      quantidade: p.quantidade,
      preco: p.preco,
      marca: p.id_marca?.nome || null,
      categoria: p.id_categoria?.nome || null,
      criado_em: p.criado_em,
      atualizado_em: p.atualizado_em
    }));
    
    // retorno da resposta.
    res.status(200).json({
      dados
    });
  }
  // Server Error
  catch(error: any){
    res.status(500).json({
      error
    });
  }
}

/** 
 * @description Buscar único
 * @function produtoId
 * @author Bruno Pessoa
 */
export const produtoId = async(req: Request, res: Response) => {
  try{
    // recendo o Id do produto 
    const id: string = req.params.id;

    // buscando produto
    const dados: produtoDocument | null = await unicoProduto(id);

    // padronizando
    const dado: object | null = {
      _id: dados?._id,
      nome: dados?.nome,
      quantidade: dados?.quantidade,
      preco: dados?.preco,
      marca: (dados?.id_marca as any)?.nome,
      categoria: (dados?.id_categoria as any)?.nome,
      criado_em: dados?.criado_em,
      atualizado_em: dados?.atualizado_em
    }

    // resposta saida
    res.status(dados? 200: 404).json({
      dado: dado? dado: 'não há informações'
    });
  }
  // erro do servidor
  catch(error: any){
    res.status(500).json({
      error: error.message
    });
  }
}

/**
 * @description Atualizar a quantidade
 * @function produtoUpdate
 * @author Bruno Pessoa
 */
export const produtoUpdate = async(req: Request, res: Response) => {
  try{
    // recebendo o id para atualizar o produto.
    const id: string = req.params.id;

    // objeto com as informações a serem atualizadas
    const dadosUpdt: Partial<produtoDocument> = {
      ...req.body
    }

    // atualizando
    const dado: produtoDocument | null = await updtProdu(id,dadosUpdt);

    // resposta
    res.status(200).json({
      dado: 'Atualizado'
    });
  }
  // error
  catch(error: any){
    res.status(500).json({
      error: error.message
    });
  }
}

/**
 * @description Excluir produto
 * @author Bruno Pessoa
 */
export const produtoDelete = async(req: Request, res: Response) => {
  try{
    // id do produto a ser excluído 
    const id: string = req.params.id;

    // exluido o produto
    const dados: produtoDocument | null = await delProdu(id);

    // saída do usuário 
    res.status(dados? 203:404).json({
      message:dados? 'Excluido': 'Erro ao excluir produto'
    });
  }
  // server error
  catch(error: any){
    res.status(404).json({
      error: error.message
    });
  }
}