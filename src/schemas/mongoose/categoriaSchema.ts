import {Schema, model } from 'mongoose';
import CategoriaDocument from '../../interfaces/categoriaInterfaces';

const CategoriaSchema: Schema = new Schema<CategoriaDocument>({
  nome: {type: String, required: true},
  descricao: {type: String, required: true},
},
{
  timestamps: {
    createdAt: "criado_em",
    updatedAt: "atualizado_em"
  }
});

const categoriaMongo = model<CategoriaDocument>('Categoria', CategoriaSchema);
export default categoriaMongo;