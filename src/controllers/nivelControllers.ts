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