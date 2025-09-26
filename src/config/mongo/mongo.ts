import dotenv from 'dotenv';
import mongoose from 'mongoose';

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
    }

    // conectando com o banco
    await mongoose.connect(url);
    console.log('Banco conectado');
  }
  // caso de erro de conectar
  catch(error){
    console.log('Falha ao conectar ao banco');
    console.log(error);
    process.exit(1);
  }
}

// export
export default mongoConn;