import { Schema, model } from 'mongoose';
import marcaDocument from '../../interfaces/marcaInterface';

const marcaSchema:Schema = new Schema<marcaDocument> ({
  nome: {type: String, required: true},
  nomeSocial: {type: String, required: true},
  cnpj: {type: String, required: true}
},{
  timestamps: {
    createdAt: "criado_em",
    updatedAt: "atualizado_em"
  }
});

const marcaMongo = model<marcaDocument>('Marca', marcaSchema);

export default marcaMongo;