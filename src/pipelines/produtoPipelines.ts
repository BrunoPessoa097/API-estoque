import { compose }from './_compose';
import { produtoVerificar, produtoPadronizar, produtoPrecoValidar } from '../middlewares/produtoMiddlewares';
import { produtoAdd, produtoList, produtoId, produtoUpdatePreco, produtoUpdate } from '../controllers/produtoControllers';

// adicionanr produto.
export const prodPipAdd = compose(
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

// atualizar preco.
export const prodPipUpPre = compose(
  produtoPrecoValidar,
  produtoUpdatePreco
);

// atualizar os campos de produto
export const prodPipUpdate = compose(
  produtoVerificar,
  produtoPadronizar,
  produtoUpdate
);