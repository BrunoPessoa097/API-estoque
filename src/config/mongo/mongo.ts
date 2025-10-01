import dotenv from 'dotenv';
import mongoose from 'mongoose';
import logger from '../winston/logger';

// Configurando o dotenv.
dotenv.config();
/**
 * @description Conexão com o banco de dados
 * @author Bruno Pessoa
 */
const mongoConn = async() => {
  try{
    // Recendo a URL do banco.
    const url: string = `${process.env.MONGO_BD_URI}/${process.env.MONGO_DB_DATABASE}`;

    // Verificando a existência do endereço.
    if(!url){
      process.exit(1);
      logger.error('Erro na variavel ambiente');
    }

    // conectando com o banco
    await mongoose.connect(url);
    logger.info('Banco conectado');
  }
  // caso de erro de conectar
  catch(error: any){
    logger.error(error);
    process.exit(1);
  }
}

// export
export default mongoConn;