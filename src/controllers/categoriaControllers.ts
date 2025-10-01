import {Request, Response } from 'express';
// Imports locais.
import Categoria, { CategoriaDocument } from '../interfaces/categoriaInterfaces';
import produtoDocument from '../interfaces/produtoInterface';
import { addCat, listCat, unicoCat, updtCat, delCat }  from '../services/categoriaServices';
import logger from '../config/winston/logger';

/**
 * @description Adicionar ao banco de dados.
 * @function categoriaAdd
 * @author Bruno Pessoa
 */
export const categoriaAdd = async (req: Request, res: Response) => {
  try{
    // adicionando categoria
    const dados: CategoriaDocument = await addCat(req.body);

    // saida do usuario
    res.status(dados? 201: 404).json({
      message: dados? 'Adicionado': 'Erro ao adicionar'
    });
  }
  // Erro interno.
  catch(error: any){
    logger.error(error.message);
    res.status(500).json({
      error: error.message
    });
  }
}
/**
 * @description Lista todas as categorias.
 * @function categoriaAll
 * @author Bruno Pessoa
 */
export const categoriaAll = async(req: Request, res: Response) => {
  try{
    // Lista todas as categorias.
    const dados: CategoriaDocument[] = await listCat();

    // Listando todas as categorias.
    res.status(200).json({ 
      dados
    });
  }
  // Erro do servidor.
  catch(error: any){
    logger.error(error.message);
    res.status(500).json({
      error: error.message
    });
  }
}

/** 
 * @description Buscar uma única categoria.
 * @function categoriaUnico
 * @author Bruno Pessoa 
 */
export const categoriaUnico = async(req: Request, res: Response) => {
  try {
    // Receber o id.
    const id: string = req.params.id; 

    // recebendo a categoria
    const dado: CategoriaDocument | null = await unicoCat(id);

    // saida
    res.status(200).json({
      dado
    });
  }
  catch(error: any){
    logger.error(error.message);
    // Erro mensagem
    res.status(404).json({
      error: error.message
    });
  }
}

/**
 * @description Atualizar os valores de categoria.
 * @author Bruno Pessoa
 */
export const categoriaUpdate = async(req: Request,res: Response) => {
  try{
    // Recebendo o ID para atualizar.
    const id: string = req.params.id;

    // criando objeto para ser atualizado
    const uptCat: Partial<Categoria> = {
      ...req.body
    }

    // atualizando as informações
    const dado: CategoriaDocument | null = await updtCat(id, uptCat);

    res.status(dado? 203: 404).json({
      inf: dado? 'Atualizado' : 'Erro ao atualizar'
    });
  }
  // Erro
  catch(error: any){
    logger.error(error.message);
    res.status(500).json({
      error: error.message
    });
  }
}

/**
 * @description Excluir categoria.
 * @author Bruno Pessoa
 */
export const categoriaDelete = async(req: Request, res: Response) => {
  try{
    // Recebendo o id
    const id: string = req.params.id;

    // excluindo categoria
    const dado: CategoriaDocument | null = await delCat(id);

    // saida do resultado
    res.status(dado? 203: 404).json({
      inf: dado? 'Deletado com sucesso': 'Erro ao deletar'
    });
  }
  // Error
  catch(error: any){
    logger.error(error.message);
    res.status(409).json({
      error: error.message
    });
  }
}