import { compose } from './_compose';
import { marcaAproRepro, marcaVerificar, marcaPadronizar} from '../middlewares/marcaMiddleware';
import {loginAuthorValido, permissaoRota } from '../middlewares/authorMiddleware';
import { marcaAdd, marcaAll, marcaId, marcaUpdate, marcaDelete} from '../controllers/marcaControllers';
import { nivel2, nivel3 } from '../enum/niveis';

// marca adicionar
export const marcaPipAdd = compose(
  loginAuthorValido, 
  permissaoRota(...nivel2),
  marcaAproRepro,
  marcaVerificar,
  marcaPadronizar,
  marcaAdd
);

// marca atualização 
export const marcaPipList = compose(
  loginAuthorValido, 
  permissaoRota(...nivel3),
  marcaAll
);

// marca buscar por único 
export const marcaPipId = compose(
  loginAuthorValido, 
  permissaoRota(...nivel2),
  marcaId
);

// marca atualização 
export const marcaPipUpdate = compose(
  loginAuthorValido, 
  permissaoRota(...nivel2),
  marcaVerificar,
  marcaPadronizar,
  marcaUpdate
);

// marca deletar
export const marcaPipDelete = compose(
  loginAuthorValido, 
  permissaoRota(...nivel2),
  marcaDelete
);