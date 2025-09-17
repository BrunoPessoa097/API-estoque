import { Schema, model } from 'mongoose';
// Import local.
import marcaDocument from '../../interfaces/marcaInterface';

// Criando o schema do mongoose.
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

// Criando o modelo
const marcaMongo = model<marcaDocument>('Marca', marcaSchema);

// Export
export default marcaMongo;