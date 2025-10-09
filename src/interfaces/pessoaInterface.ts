import { Document, Types } from 'mongoose';

// pessoa entrada do usuário
interface pessoaInput {
  nome: string;
  email: string;
  senha: string;
  endereco: string;
  dt_nasc: Date;
  nivel: string | Types.objectId;
  bloqueado?: boolean;
  login?: Date;
}

// document do mongoose
export interface pessoaDocument extends pessoaInput, Document {
  criado_em?: Date;
  atualizado_em?: Date;
}

// export
export default pessoaInput