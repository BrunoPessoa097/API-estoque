import { Document } from 'mongoose';

export default interface Categoria {
  nome: string,
  descricao: string
}

export interface CategoriaDocument extends Categoria, Document{
  createdAt?: Date,
  updatedAt?: Date
}