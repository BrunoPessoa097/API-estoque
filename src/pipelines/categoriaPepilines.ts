import { compose } from './_compose';
import { categoriaExist, categoriaValidar, categoriaPadronizar } from '../middlewares/categoriaMiddleware';
import {loginAuthorValido, permissaoRota } from '../middlewares/authorMiddleware';
import { categoriaAdd, categoriaAll, categoriaUnico, categoriaUpdate, categoriaDelete } from '../controllers/categoriaControllers';
import { nivel2, nivel3 } from '../enum/niveis';

// adicionar categoria 
export const catPipAdd = compose(
  loginAuthorValido, 
  permissaoRota(...nivel2),
  categoriaExist,
  categoriaValidar,
  categoriaPadronizar,
  categoriaAdd
);

// listar categoria 
export const catPipList = compose(
  loginAuthorValido, 
  permissaoRota(...nivel3),
  categoriaAll
);

// mostrar categoria selecionada
export const catPipId = compose(
  loginAuthorValido, 
  permissaoRota(...nivel2),
  categoriaUnico
);

// atualizar categoria 
export const catPipUpdate = compose(
  loginAuthorValido, 
  permissaoRota(...nivel2),
  categoriaExist,
  categoriaValidar,
  categoriaPadronizar,
  categoriaUpdate
);

// deletar categoria 
export const catPipDelete = compose(
  loginAuthorValido, 
  permissaoRota(...nivel2),
  categoriaDelete
);