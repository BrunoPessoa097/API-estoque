import {Schema, model} from 'mongoose';
// Import local
import nivelDocument from '../../interfaces/nivelInterface';

// schema de nivel
const nivelSchema: Schema = new Schema<nivelDocument>({
  sigla: {type: String, required: true},
  descricao: {type:String, required: true}
},{
  timestamps:{
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em'
  }
});

// criando modelo
const nivelMongo = model<nivelDocument>('Nivel', nivelSchema);

// export
export default nivelMongo;