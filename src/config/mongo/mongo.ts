import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Configurando o dotenv.
dotenv.config();
/**
 * @description Conexão com o banco de dados
 * @author Bruno Pessoa
 */
const mongoConn = async() => {
  // Recendo a URL do banco.
  const url: string = `${process.env.MONGO_BD_URI}/${process.env.MONGO_DB_DATABASE}`;

  // Verificando a existência do endereço.
  if(!url){
    process.exit(1);
  }

  // Fazendo a conexão com o banco de dados
  await mongoose.connect(url)
    .then(() => {
      console.log('Banco conectado!');
    }).catch((erro) => {
      console.log('Problemas ao se conectar ao banco');
      console.error(erro.errorResponse);
      process.exit(1);
    });
}

export default mongoConn;