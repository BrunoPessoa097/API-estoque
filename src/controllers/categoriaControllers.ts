import {Request, Response } from 'express';
// Imports locais.
import Categoria, { CategoriaDocument } from '../interfaces/categoriaInterfaces';
import categoriaMongo from '../schemas/mongoose/categoriaSchema';
/**
 * @description Adicionar ao banco de dados.
 * @author Bruno Pessoa
 */
const categoriaAdd = async (req: Request<{}, {}, Categoria>, res: Response) => {
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

export default categoriaAdd;