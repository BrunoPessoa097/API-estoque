import { Schema, model } from 'mongoose';
import pessoaDocument from '../../interfaces/pessoaInterface';

// pessoa schema
const pessoaSchemas: Schema = new Schema<pessoaDocument>({
  nome: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  senha: {type: String, required: true},
  endereco: {type: String, required: true},
  dt_nasc: {type: Date, required: true},
  nivel: {type: Schema.Types.ObjectId, ref: 'Nivel'},
  bloqueado: {type: Boolean, required: true},
  login: {type: Date}
},{
  timestamps: {
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em'
  }
});

// criando o model
const pessoaMongo = model<pessoaDocument>('Pessoa', pessoaSchemas);

// export 
export default pessoaMongo;