import {Request, Response } from 'express';
// Imports locais.
import Categoria, { CategoriaDocument } from '../interfaces/categoriaInterfaces';
import categoriaMongo from '../schemas/mongoose/categoriaSchema';
/**
 * @description Adicionar ao banco de dados.
 * @author Bruno Pessoa
 */
export const categoriaAdd = async (req: Request<{}, {}, Categoria>, res: Response<{dados: string}|{message?:string, error?:any}>) => {
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
      const dados: CategoriaDocument | null = await categoriaNova.save();

      res.status(dados? 200: 404).json({
        dados: dados? "Marca Adicionanda": "Error ao adicionar"
      })
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
export const categoriaAll = async(req: Request, res: Response<{dados: CategoriaDocument[] | null | string} | {message?: string, error:any}>) => {
  try{
    // Lista todas as categorias.
    const dados: CategoriaDocument[] | null = await categoriaMongo.find();

    // Listando todas as categorias.
    res.status(dados?200:404).json({ 
      dados: dados? dados: "Sem Informação"
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
export const categoriaUnico = async(req: Request, res: Response<{dados: CategoriaDocument| null | string}|{message?: string, error?:any}>) => {
  try {
    // Receber o id.
    const id:string = req.params.id; 

    // Buscando categoria prlo id.
    const dados: CategoriaDocument | null = await categoriaMongo.findById(id);

    res.status(dados? 200: 404).json({
      dados: dados? dados: "Informação não encontrada"
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

/**
 * @description Atualizar os valores de categoria.
 * @author Bruno Pessoa
 */
export const categoriaUpdate = async(req: Request,res: Response<{dados?:string}|{message?:string,error?:any}>) => {
  try{
    // Recebendo o ID para atualizar.
    const id: string = req.params.id;

    // Recebendo os valores para atualizar.
    const categoriaUpdt: CategoriaDocument= {
      ...req.body
    }
    
    // Verificando a existência.
    const exist: CategoriaDocument | null = await categoriaMongo.findById(id);

    if(exist){
      // Atualizando os valores.
      const dados: CategoriaDocument| null = await categoriaMongo.findByIdAndUpdate(id, categoriaUpdt);

      res.status(dados? 200: 404).json({
        dados: dados? "Dados atualizados": "Error ao atualizar"
      })
    }
    // Caso a informação não exista.
    else{
      res.status(404).json({
        message: "nao existe"
      });
    }
  }
  // Erro do servidor.
  catch(error){
    res.status(500).json({
      message: 'Server Error',
      error
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

    // Verificando se a informação existe.
    const exist: CategoriaDocument | null = await categoriaMongo.findById(id);

    if(exist){
      // Excluindo do banco de dados.
      const dados: CategoriaDocument | null = await categoriaMongo.findByIdAndDelete(id);

      res.status(dados? 203:404).json({
        dados: dados? "Removido": "Error ao remover"
      })
    }
    // Caso nao existe a informação.
    else{
      res.status(404).json({
        message: 'Id inexistente ou inválido'
      })
    }
  }
  // Erro no servidor.
  catch(error){
    res.status(500).json({
      error
    });
  }
}