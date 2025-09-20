import {Request, Response} from 'express';
// import locais
import nivelInput,{nivelDocument} from '../interfaces/nivelInterface';
import nivelMongo from '../schemas/mongoose/nivelSchema';

// adiconar niveis
export const nivelAdd = async(req: Request<{},{}, nivelInput>, res: Response<{message: nivelDocument | string | null} | {message?:string,error?:any}>) => {
  try{
    // desistruturar o body
    const {sigla, descricao}:nivelInput = req.body;

    // verificação se existe.
    const exist: nivelDocument | null = await nivelMongo.findOne({sigla});

    // senão existe insira
    if(!exist){
      // criando um objeto.
      const nivelNovo: nivelDocument = new nivelMongo({
        ...req.body
      });
      
      // adicionando no banco de dados
      const dados: nivelDocument | null = await nivelNovo.save();

      // saida das informações
      res.status(dados? 201: 404).json({
        message: dados? "Adicionando" : "Erro ao adicionar"
      });
      
    }
    // caso ja exista
    else{
      // saida caso exista
      res.status(409).json({
        message: 'Dados já existe'
      });
    }
  }
  // error no servidor
  catch(error) {
    res.status(500).json({
      message: 'Servidor Erro',
      error
    });
  }
}

/**
 * @description Listar niveis
 * @author Bruno Pessoa
 */
export const nivelList = async(req: Request, res: Response<{dados: nivelDocument[] | string | null}|{message?:string, error?:any}>) =>{
  try{
    // buscando todos os dados de níveis 
    const dados: nivelDocument[] | null = await nivelMongo.find();

    // saida de niveis
    res.status(dados? 200: 404).json({
      dados: dados? dados: 'Não existem informações'
    });
  }
  // erro do servidor 
  catch(error){
    res.status(500).json({
      message: 'Server error',
      error
    });
  }
}

/**
 * @description buscar nivel por Id
 * @author Bruno Pessoa
 */
export const nivelId = async(req: Request<{id: string}>, res: Response<{dados?:nivelDocument|null|string}|{message?:string, error?:any}>) => {
  try{
    // recenbendo id
    const id: string = req.params.id;

    // buscando dados requisitados
    const dados: nivelDocument | null = await nivelMongo.findById(id);

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
export const nivelUpdate = async(req: Request<{id:string}>, res: Response<{dados?:nivelDocument | string | null} | {message?:string, error?:any}>) => {
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
export const nivelDelete = async(req: Request<{id: string}>, res: Response<{message: nivelDocument | string | null} | {message?: string, error?:any}>) => {
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