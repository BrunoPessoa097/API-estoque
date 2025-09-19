import { Document } from 'mongoose';

// entrada do usuario para nivel
interface nivelInput {
  sigla: string;
  descricao: string;
}

// nivel document
export interface nivelDocument extends nivelInput, Document {
  createdAt?: Date;
  updatedAt?: Date;
}

// export
export default nivelInput;