//import nivelInput, { nivelDocument } from '../interface/nivelInterface';
import nivelMongo from '../schemas/mongoose/nivelSchema';

const existSigla = async(sigla: string): Promise<boolean> => {
  const exist: boolean = !!(await nivelMongo.exists({sigla}));
  if(exist){ throw new Error('Sigla já existe')}
  return false;
}

export default existSigla;