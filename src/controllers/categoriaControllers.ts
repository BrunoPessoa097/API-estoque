import {Request, Response } from 'express';
// Imports locais.
import Categoria, { CategoriaDocument } from '../interfaces/categoriaInterfaces';
import produtoDocument from '../interfaces/produtoInterface';
import categoriaMongo from '../schemas/mongoose/categoriaSchema';
import produtoMongo from '../schemas/mongoose/produtoSchema';
import { addCat, listCat, unicoCat, updtCat }  from '../services/categoriaServices';

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
    res.status(500).json({
      message: 'Servidor Erro',
      error
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
    res.status(500).json({
      error
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

    res.status(203).json({
      inf: 'Atualizado'
    });
  }
  // Erro do servidor.
  catch(error: any){
    res.status(500).json({
      error: error.message
    });
  }
}

/**
 * @description Excluir categoria.
 * @author Bruno Pessoa
 */
export const categoriaDelete = async(req: Request, res: Response<{dados?:CategoriaDocument | string | null }|{message?:string, error?: any}>) => {
  try{
    // Recebendo o id
    const id: string = req.params.id;

    // verificando se existe categoria vinculado ao produto
    const existP: boolean = !!(await produtoMongo.exists({id_categoria: id}));

    // se existe não pode excluir
    if(existP){
      res.status(404).json({
        message: "Não pode excluir Categoria que está vinculada ao produto"
      });
    }
    // excluir senão tiver categoria vinculada ao produto
    else{
      // excluindo
      const dados: CategoriaDocument | null = await categoriaMongo.findByIdAndDelete(id);

      // saida do usuario
      res.status(dados? 203: 404).json({
        message: dados? 'Excluído com sucesso': 'Erro ao excluir'
      });
    }
  }
  // Erro no servidor.
  catch(error){
    res.status(500).json({
      error
    });
  }
}