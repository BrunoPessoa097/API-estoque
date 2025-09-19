import {Request, Response} from 'express';
// import locais
import nivelInput,{nivelDocument} from '../interfaces/nivelInterface';
import nivelMongo from '../schemas/mongoose/nivelSchema';

// adiconar niveis
const nivelAdd = async(req: Request<{},{}, nivelInput>, res: Response) => {
  try{
    // desistruturar o body
    const {sigla, descricao}:nivelInput = req.body;

    // criando um objeto.
    const nivelNovo: nivelDocument = new nivelMongo({
      ...req.body
    });

    // verificação se existe.
    const exist: nivelDocument | null = await nivelMongo.findOne({sigla});

    // senão existe insira
    if(!exist){
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

export default nivelAdd;