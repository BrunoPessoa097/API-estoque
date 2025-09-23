import { compose }from './_compose';
import { produtoVerificar, produtoPadronizar} from '../middlewares/produtoMiddlewares';
import { produtoAdd, produtoList } from '../controllers/produtoControllers';

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
