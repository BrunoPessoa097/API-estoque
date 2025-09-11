import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const mongoConn = async() => {
  const url: string = `${process.env.MONGO_BD_URI}`;

  if(!url){
    process.exit(1);
  }

  await mongoose.connect(url)
    .then(() => {
      console.log('Banco conctado!');
    }).catch((erro) => {
      console.log('Problemas ao se conectar ao banco');
      console.log(erro);
    });
}

export default mongoConn;