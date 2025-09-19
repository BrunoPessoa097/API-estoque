import { Document } from 'mongoose';

interface nivelInput {
  sigla: string;
  descricao: string
}

export interface nivelDocument extends nivelInput, Document {
  createdAt?: Date;
  updatedAt?: Date;
}

export default nivelInput;