import { compose }from './_compose';
import {existNivel, nivelVerificar, nivelPadronizar } from '../middlewares/nivelMiddlewares';
import { loginAuthorValido, permissaoRota } from '../middlewares/authorMiddleware';
import {nivelList, nivelAdd, nivelUpdate, nivelId, nivelDelete} from '../controllers/nivelControllers';
import {nivel1,nivel2} from '../enum/niveis';

// listar os níveis 
export const nivelPipList = compose(
  loginAuthorValido,
  permissaoRota(...nivel2),
  nivelList
);

// adicionar nivel
export const nivelPipAdd = compose(
  loginAuthorValido,
  permissaoRota(...nivel1),
  existNivel,
  nivelVerificar,
  nivelPadronizar,
  nivelAdd
);

// mostrar único nivel
export const nivelPipId = compose(
  loginAuthorValido,
  permissaoRota(...nivel1),
  nivelId
);

// atualizar nivel
export const nivelPipUpdate = compose(
  loginAuthorValido,
  permissaoRota(...nivel1),
  existNivel,
  nivelVerificar,
  nivelPadronizar,
  nivelUpdate
);

// deletar nível 
export const nivelPipDelete = compose(
  loginAuthorValido,
  permissaoRota(...nivel1),
  nivelDelete
);