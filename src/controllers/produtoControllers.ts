import { Request, Response } from 'express';
// imports locais
import produtoInput,{produtoDocument} from '../interfaces/produtoInterface';
import marcaDocument from '../interfaces/marcaInterface';
import CategoriaDocument from '../interfaces/categoriaInterfaces';
import produtoMongo from '../schemas/mongoose/produtoSchema';
import marcaMongo from '../schemas/mongoose/marcaSchema';
import categoriaMongo from '../schemas/mongoose/categoriaSchema';

const produtoAdd = async(req: Request, res: Response) => {
  try{
    // desestruturando.
    const {nome, id_marca, id_categoria } = req.body;

    // verificando a existência.
    const existMarca: marcaDocument | null = await marcaMongo.findById(id_marca);
    const existCateg: CategoriaDocument | null = await categoriaMongo.findById(id_categoria);
    const exist: produtoDocument | null = await produtoMongo.findOne({nome});

    // caso os ID da marca e categoria exitirem e nao tiver produto cadastrado
    if(existMarca && existCateg && !exist) {
      // criando novo produto.
      const produtoNovo: produtoDocument = new produtoMongo({
        ...req.body
      });

      // salvando no banco de dados
      const dados: produtoDocument | null = await produtoNovo.save();

      // saida para usuário.
      res.status(dados? 201: 404).json({
        message: dados? 'Adicionado': 'Erro ao adicionar'
      });
    }
    // caso produto já exista, ou ID da marca e/ou categoria não exista(m)
    else{
      res.status(exist? 409: 404).json({
        message: exist? 'Não pode catastrar prpdutos já existentes': !existMarca && !existCateg? "Categoria e marca não existem": !existMarca? "Marca não existe": "Categoria não existe"
      });
    }
  }
  // server error
  catch(error) {
    res.status(500).json({
      message: 'Server error',
      error
    });
  }
}

export default produtoAdd;