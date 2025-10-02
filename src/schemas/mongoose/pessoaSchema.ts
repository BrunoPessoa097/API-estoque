import { Schema, model } from 'mongoose';
import pessoaDocument from '../../interfaces/pessoaInterface';

// pessoa schema
const pessoaSchemas: Schemas = new Schema<pessoaDocument>({
  nome: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  senha: {type: String, required: true},
  endereco: {type: String, required: true},
  dt_nasc: {type: Date, required: true},
  nivel: {type: Schema.Types.ObjectId, ref: 'Nivel'}
},{
  timestamps: {
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em'
  }
});

// criando o model
const pessoaMongo = model<produtoDocument>('Pessoa', pessoaSchema);

// export 
export default pessoaMongo;