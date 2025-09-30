import { Document } from 'mongoose';
// Interface marca para a entrada dos usuários.
export default interface marcaInput {
  nome: string;
  nomeSocial: string;
  cnpj: string
}
// Interface marca documento.
export interface marcaDocument extends marcaInput, Document {
  criado_em?: Date;
  atualizado_em?: Date;
}