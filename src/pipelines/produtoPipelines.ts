import { compose }from './_compose';
import { produtoExistEntra, produtoVerificar, produtoPadronizar } from '../middlewares/produtoMiddlewares';
import { loginAuthorValido, permissaoRota } from '../middlewares/authorMiddleware';
import { produtoAdd, produtoList, produtoId, produtoUpdate, produtoDelete } from '../controllers/produtoControllers';
import {nivel2,nivel3} from '../enum/niveis';

// adicionanr produto.
export const prodPipAdd = compose(
  loginAuthorValido,
  permissaoRota(...nivel2),
  produtoExistEntra,
  produtoVerificar,
  produtoPadronizar,
  produtoAdd
);

// listar produto
export const prodPipList = compose(
  loginAuthorValido,
  permissaoRota(...nivel3),
  produtoList
);

// selecionar produto
export const prodPipId = compose(
  loginAuthorValido,
  permissaoRota(...nivel3),
  produtoId
);

// atualizar os campos de produto
export const prodPipUpdate = compose(
  loginAuthorValido,
  permissaoRota(...nivel2),
  produtoExistEntra,
  produtoVerificar,
  produtoPadronizar,
  produtoUpdate
);

// excluir produto
export const prodPipDelete = compose(
  loginAuthorValido,
  permissaoRota(...nivel2),
  produtoDelete
);