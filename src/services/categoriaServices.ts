import Categoria, { CategoriaDocument } from '../interfaces/categoriaInterfaces';
import categoriaMongo from '../schemas/mongoose/categoriaSchema';

const nomeCatExist = async(nome?: string): Promise<boolean> => {
  const exist = !!(await categoriaMongo.exists({nome}));

  if(exist) { throw new Error('Nome da categoria já existe')}
  return false;
}

export default nomeCatExist;