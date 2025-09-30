import { Document } from 'mongoose';

export default interface Categoria {
  nome: string;
  descricao: string
}

export interface CategoriaDocument extends Categoria, Document{
  criado_em?: Date;
  atualizado_em?: Date;
}