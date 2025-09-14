import {Request, Response } from 'express';
// Imports locais.
import Categoria, { CategoriaDocument } from '../interfaces/categoriaInterfaces';
import categoriaMongo from '../schemas/mongoose/categoriaSchema';
/**
 * @description Adicionar ao banco de dados.
 * @author Bruno Pessoa
 */
export const categoriaAdd = async (req: Request<{}, {}, Categoria>, res: Response) => {
  try{
    // Criando um objeto com as entradas dos usuários.
    const categoriaNova: CategoriaDocument = new categoriaMongo({
      ...req.body
    });

    // Verificando se existe à categoria.
    const busca = await categoriaMongo.findOne({nome: req.body.nome});

    // Caso não exista.
    if(!busca){
      // Cadastra a nova categoria.
      await categoriaNova.save().then((categoriaNova)=>{
        res.status(201).json({
          message: "Cadastrado",
          data: categoriaNova
        });
      }).catch((error)=>{
        res.status(500).json({
          error
        })
      });
    }
    // Retorna categoria existente.
    else{
      res.status(409).json({
        message: 'A categoria já existe'
      });
    }
  }
  // Erro interno.
  catch(error){
    res.status(500).json({
      message: 'Servidor Erro',
      error
    });
  }
}
/**
 * @description Lista todas as categorias.
 * @author Bruno Pessoa
 */
export const categoriaAll = async(req: Request, res: Response<{message:string, dados: CategoriaDocument[] | null} | {message?: string, error:any}>) => {
  try{
    // Lista todas as categorias.
    const categoria: CategoriaDocument[] = await categoriaMongo.find();

    // Listando todas as categorias.
    res.status(200).json({
      message: "Todas as categorias",
      dados: categoria
    });
  }
  // Erro do servidor.
  catch(error){
    res.status(500).json({
      message: 'Error no servidor',
      error
    });
  }
}

/**
 * @description Buscar uma única categoria.
 * @author Bruno Pessoa
 */
export const categoriaUnico = async(req: Request<{id: string}>, res: Response<{dados: CategoriaDocument| null}|{message?: string, error?:any}>) => {
  try {
    // Receber o id.
    const id:string = req.params.id; 

    // Buscando categoria prlo id.
    await categoriaMongo.findById(id)
      .then((dados)=>{
        // Retornando a categoria.
        res.status(200).json({
          dados
        });
      }).catch((error)=>{
        // Caso categoria não exista.
        res.status(400).json({
          message: 'Nao existe o ID desejado.'
        });
      })
  }
  catch(error){
    // Erro servidor.
    res.status(500).json({
      message: 'Server Error',
      error
    });
  }
}