import {Request, Response} from 'express';
// import locais
import nivelInput,{nivelDocument} from '../interfaces/nivelInterface';
import nivelMongo from '../schemas/mongoose/nivelSchema';
import {addNivel, listNivel, unicoNivel} from '../services/nivelServices';

/**
 * @description Adicionar produto
 * @function produtoAdd
 * @author Bruno Pessoa
 */
export const nivelAdd = async(req: Request<{},{}, nivelInput>, res: Response) => {
  try{
    // criando objeto com as entradas
    const dado: nivelInput = {
      ...req.body
    }

    // salvando no banco
    const saida: nivelInput = await addNivel(dado);

    // saida para usuarios
    res.status(saida? 201: 404).json({
      message: saida? 'Adicionado nivel' : 'Error'
    });
  }
  // error no servidor
  catch(error: any) {
    res.status(404).json({
      error
    });
  }
}

/**
 * @description Listar niveis
 * @function nivelList
 * @author Bruno Pessoa
 */
export const nivelList = async(req: Request, res: Response) =>{
  try{
    // buscando todos os dados de níveis 
    const dados: nivelDocument[] = await listNivel();

    // saida de niveis
    res.status(200).json({
      dados
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
 * @description buscar nivel por Id
 * @function nivelId
 * @author Bruno Pessoa
 */
export const nivelId = async(req: Request, res: Response) => {
  try{
    // recenbendo id 
    const id: string = req.params.id;

    // buscando dados requisitados
    const dados: nivelDocument | null = await unicoNivel(id);

    // retorno dos dados.
    res.status(dados? 200:404).json({
      dados: dados? dados: 'Informação não existe'
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
 * @description Atualizar item
 * @author Bruno Pessoa
 */
export const nivelUpdate = async(req: Request, res: Response) => {
  try{
    // recebendo o id.
    const id: string = req.params.id;
    // desestruturação.
    const { sigla, descricao }: nivelInput = req.body;

    // verificando se à sigla ja existe.
    const exist: nivelDocument | null = await nivelMongo.findOne({sigla});

    // se nao existe
    if(!exist) {
      // recebendo os valores a ser atualizado.
      const novaInfo: nivelInput = { sigla, descricao };
      // atualizando às informações.
      const dados: nivelDocument | null = await nivelMongo.findByIdAndUpdate(id,novaInfo);

      // saída do usuário.
      res.status(dados? 203:404).json({
        message: dados? "Atualizado": "Error ao atualizar"
      });
      
    }
    // caso exista ja a sigla
    else{
      res.status(409).json({
        message: 'Não podd atualizar pois a sigla já existe'
      });
    }
  }
  // Server error
  catch(error) {
    res.status(500).json({
      message: 'Server error',
      error
    });
  }
}
/** 
 * @descriotion Deletar nivel
 * @author Bruno Pessoa
 */
export const nivelDelete = async(req: Request, res: Response<{message: nivelDocument | string | null} | {message?: string, error?:any}>) => {
  try{
    // recebendo id
    const id: string = req.params.id;

    // excluindo o nivel.
    const dados: nivelDocument | null = await nivelMongo.findByIdAndDelete(id);

    // resposta da exclusão.
    res.status(dados? 203: 404).json({
      message: dados? "Excluido": "Erro ao excluir"
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