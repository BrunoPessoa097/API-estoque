import { compose } from './_compose';
import { pessoaExistencia, pessoaValidar, pessoaPadronizar,pessoaPublic } from '../middlewares/pessoaMiddleware';
import { loginAuthorValido, permissaoRota } from '../middlewares/authorMiddleware';
import { pessoaAdd, pessoaList, pessoaId, pessoaUpdate, pessoaDelete } from  '../controllers/pessoaControllers';
import {nivel2,nivel3} from '../enum/niveis';

// adicionar pessoa
export const pessoaPipAdd = compose(
  pessoaExistencia,
  pessoaValidar,
  pessoaPadronizar,
  pessoaAdd
);

// listar pessoas
export const pessoaPipList = compose(
  loginAuthorValido,
  permissaoRota(...nivel2),
  pessoaList
);

// pegar usuario
export const pessoaPipId = compose(
  loginAuthorValido,
  permissaoRota(...nivel3),
  pessoaPublic,
  pessoaId
);

// atualizando os usuários
export const pessoaPipUpdate = compose(
  loginAuthorValido,
  permissaoRota(...nivel3),
  pessoaPublic,
  pessoaExistencia,
  pessoaValidar,
  pessoaPadronizar,
  pessoaUpdate
);

// excluir pessoa
export const pessoaPipDelete = compose(
  loginAuthorValido,
  permissaoRota(...nivel2),
  pessoaDelete
);