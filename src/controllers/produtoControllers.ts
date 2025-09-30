import { Request, Response } from 'express';
// imports locais
import produtoInput,{produtoDocument} from '../interfaces/produtoInterface';
import marcaDocument from '../interfaces/marcaInterface';
import CategoriaDocument from '../interfaces/categoriaInterfaces';
import produtoMongo from '../schemas/mongoose/produtoSchema';
import marcaMongo from '../schemas/mongoose/marcaSchema';
import categoriaMongo from '../schemas/mongoose/categoriaSchema';
import { addProdu, listProdu, unicoProduto } from '../services/produtoServices';

/**
 * @description Adicionanr produto
 * @author Bruno Pessoa
 */
export const produtoAdd = async(req: Request<{}, {},produtoInput>, res: Response) => {
  try{
    const dados: produtoInput = {
      ...req.body
    }

    const dado: produtoDocument = await addProdu(dados);

    res.status(200).json({
      dado: dado? 'Produto adicionado': 'Erro ao adicionar'
    });
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
 * @author Bruno Pessoa
 */
export const produtoUpdate = async(req: Request, res: Response<{message?: string, error?:any}>) => {
  try{
    // recebendo o id para atualizar o produto.
    const id : string = req.params.id;

    // desustruturando campos que iram ser verificados
    const { nome, id_marca, id_categoria }: Partial<produtoInput> = req.body;

    // verificando a existência do nome.
    const nomeExist: any = await produtoMongo.findOne({nome});

    // conflito caso exista.
    if(nomeExist){
      res.status(409).json({
        message: 'Nome do produto já existe'
      });
    }
    // se nome nao existir
    else{
      // caso marca for enviado.
      if(id_marca){
        // busca se o id e valiso senão mantem o atual.
        const dadoMarca: any = await marcaMongo.exists({_id: id_marca});
        const dadoM = dadoMarca? dadoMarca?.id : await produtoMongo.findById(id).select('id_marca');

        // recebendo o id da marca válido 
        req.body.id_marca = dadoM.id_marca;
      }

      // caso categoria for enviada
      if(id_categoria){
        // verificar se a categoria enviada e valida, senao mantém categoria atual
        const dadoCat: any = await categoriaMongo.exists({_id: id_categoria});
        const dadoC = dadoCat? dadoCat?.id : await produtoMongo.findById(id).select('id_categoria');

        // recebdo um id de categoria valido
        req.body.id_categoria = dadoC.id_categoria;
      }

      // construindo um objeto com os valores recebidos
      const dado: Partial<produtoInput> = {
        ...req.body
      }
      
      // atualizando
      const dados: produtoDocument | null = await produtoMongo.findByIdAndUpdate(id, dado);

      res.status(dados? 200: 404).json({
        message: dados? 'Atualizado': 'Erro ao atualizar'
      });
    }
  }
  // Server error
  catch(error: any){
    res.status(500).json({
      message: 'Server Erro',
      error
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
    const dados: produtoDocument | null = await produtoMongo.findByIdAndDelete(id);

    // saída do usuário 
    res.status(dados? 203: 440).json({
      message: dados? 'Excluido' : 'Error ao deletar'
    });
  }
  // server error
  catch(error){
    res.status(500).json({
      message: 'Server error',
      error
    });
  }
}