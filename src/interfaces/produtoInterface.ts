import { Document, Types } from 'mongoose';

// produto entrada do usuários
interface produtoInput {
  nome: string;
  quantidade: integer;
  preco: float;
  id_marca: string | Types.ObjectId;
  id_categoria: string | Types.ObjectId;
}

// produto mongoose
export interface produtoDocument extends produtoInput, Document {
  criado_em?: Date;
  atualizado_em?: Date;
}

// export
export default produtoInput;