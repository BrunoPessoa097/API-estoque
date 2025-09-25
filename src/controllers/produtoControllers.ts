import { Request, Response } from 'express';
// imports locais
import produtoInput,{produtoDocument} from '../interfaces/produtoInterface';
import marcaDocument from '../interfaces/marcaInterface';
import CategoriaDocument from '../interfaces/categoriaInterfaces';
import produtoMongo from '../schemas/mongoose/produtoSchema';
import marcaMongo from '../schemas/mongoose/marcaSchema';
import categoriaMongo from '../schemas/mongoose/categoriaSchema';

/**
 * @description Adicionanr produto
 * @author Bruno Pessoa
 */
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
      preco: dados?.preco || null,
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