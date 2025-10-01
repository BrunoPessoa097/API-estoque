import { compose }from './_compose';
import { produtoExistEntra, produtoVerificar, produtoPadronizar } from '../middlewares/produtoMiddlewares';
import { produtoAdd, produtoList, produtoId, produtoUpdate, produtoDelete } from '../controllers/produtoControllers';

// adicionanr produto.
export const prodPipAdd = compose(
  produtoExistEntra,
  produtoVerificar,
  produtoPadronizar,
  produtoAdd
);

// listar produto
export const prodPipList = compose(
  produtoList
);

// selecionar produto
export const prodPipId = compose(
  produtoId
);

// atualizar os campos de produto
export const prodPipUpdate = compose(
  produtoExistEntra,
  produtoVerificar,
  produtoPadronizar,
  produtoUpdate
);

// excluir produto
export const prodPipDelete = compose(
  produtoDelete
);