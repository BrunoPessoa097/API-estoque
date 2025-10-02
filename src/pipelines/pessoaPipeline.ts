import { compose } from './_compose';
import { pessoaExistencia, pessoaValidar, pessoaPadronizar } from '../middlewares/pessoaMiddleware';
import { pessoaAdd, pessoaList } from  '../controllers/pessoaControllers';

// adicionar pessoa
export const pessoaPipAdd = compose(
  pessoaExistencia,
  pessoaValidar,
  pessoaPadronizar,
  pessoaAdd
);

// listar pessoas
export const pessoaPipList = compose(
  pessoaList
);