import { Document } from 'mongoose';

// entrada do usuario para nivel
interface nivelInput {
  sigla: string;
  descricao: string;
}

// nivel document
export interface nivelDocument extends nivelInput, Document {
  criado_em?: Date;
  atualizado_em?: Date;
}

// export
export default nivelInput;