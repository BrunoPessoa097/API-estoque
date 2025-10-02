import { compose } from './_compose';
import { pessoaExistencia, pessoaValidar, pessoaPadronizar } from '../middlewares/pessoaMiddleware';
import pessoaAdd from  '../controllers/pessoaControllers';

// adicionar pessoa
const pessoaPipAdd = compose(
  pessoaExistencia,
  pessoaValidar,
  pessoaPadronizar,
  pessoaAdd
);

// exportar
export default pessoaPipAdd;