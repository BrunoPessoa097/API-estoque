import { Document } from 'mongoose';
// Interface marca para a entrada dos usuários.
export default interface marcaInput {
  nome: string;
  nomeSocial: string;
  cnpj: string
}

export interface marcaDocument extends marcaInput, Document {
  createdAt?: Date;
  updatedAt?: Date
}