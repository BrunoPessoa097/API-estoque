import { compose } from './_compose';
import { pessoaValidar, pessoaPadronizar } from '../middlewares/pessoaMiddleware';

// adicionar pessoa
const pessoaPipAdd = compose(
  pessoaValidar,
  pessoaPadronizar
);

// exportar
export default pessoaPipAdd;