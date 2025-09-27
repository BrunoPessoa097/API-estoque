import { compose } from './_compose';
import pessoaPadronizar from '../middlewares/pessoaMiddleware';

// adicionar pessoa
const pessoaPipAdd = compose(
  pessoaPadronizar
);

// exportar
export default pessoaPipAdd;