import { compose } from './_compose';
import { pessoaValidar, pessoaPadronizar } from '../middlewares/pessoaMiddleware';
import pessoaAdd from  '../controllers/pessoaControllers';

// adicionar pessoa
const pessoaPipAdd = compose(
  pessoaValidar,
  pessoaPadronizar,
  pessoaAdd,
);

// exportar
export default pessoaPipAdd;