import { Document, Types } from 'mongoose';

// pessoa entrada do usuário
interface pessoaInput {
  nome: string;
  email: string;
  senha: string;
  endereco: string;
  dt_nasc: Data;
  nivel: string | Types.objectId;
}

// document do mongoose
export interface pessoaDocument extends pessoaInput, Document {
  criado_em: Date;
  atualizado_em: Date;
}

// export
export default pessoaInput