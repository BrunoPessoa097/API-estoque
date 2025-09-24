import { Request, Response } from 'express';
// imports locais
import produtoInput,{produtoDocument} from '../interfaces/produtoInterface';
import marcaDocument from '../interfaces/marcaInterface';
import CategoriaDocument from '../interfaces/categoriaInterfaces';
import produtoMongo from '../schemas/mongoose/produtoSchema';
import marcaMongo from '../schemas/mongoose/marcaSchema';
import categoriaMongo from '../schemas/mongoose/categoriaSchema';

export const produtoAdd = async(req: Request, res: Response) => {
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
/**
 * @description Listar as categorias
 * @author Bruno Pessoa
 */
export const produtoList = async(req: Request, res: Response) => {
  try{
    // buscando no banco
    const lista: object[] | null= await produtoMongo.find().populate('id_marca','nome').populate('id_categoria','nome').lean();

    // padronizando as informações.
    const dados: object[] | null = lista.map((p: any)=>({
      _id: p._id,
      nome: p.nome,
      quantidade: p.quantidade,
      preco: p.preco,
      marca: p.id_marca?.nome || null,
      categoria: p.id_categoria?.nome || null
    }));
    
    //retorno da resposta.
    res.status(lista? 200: 404).json({
      dados: lista? dados: 'Nao existe dados a serem mostrados'
    });
  }
  // Server Error
  catch(error){
    res.status(500).json({
      message: 'Server Error',
      error
    });
  }
}

/**
 * @description Buscar único 
 * @author Bruno Pessoa
 */
export const produtoId = async(req: Request, res: Response<{dado?: any  | null, message?: string, error?:any}>) => {
  try{
    // recendo o Id do produto 
    const id: string = req.params.id;

    const dados: produtoDocument | null = await produtoMongo.findById(id).populate('id_marca','nome').populate('id_categoria','nome');

    // padronizando a saida
    const dado: object = {
      id: dados?._id,
      nome: dados?.nome || null,
      quantidade: dados?.quantidade || null,
      marca: (dados?.id_marca as any)?.nome || null,
      categoria: (dados?.id_categoria as any)?.nome || null
    }

    // resposta saida
    res.status(dados? 200: 404).json({
      dado: dados? dado: 'Informação nao encontrada'
    });
  }
  // erro do servidor
  catch(error){
    res.status(500).json({
      message: 'Server Error',
      error
    })
  }
}

/**
 * @description Atualizar preço
 * @author Bruno Pessoa
 */
export const produtoUpdatePreco = async(req: Request, res: Response) => {
  try{
    res.status(200).json({message:'ok'});
  }catch(erro){
    res.status(500).json({
      message: 'Server Erro',
      erro
    })
  }
}