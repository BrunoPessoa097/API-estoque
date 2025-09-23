import { compose }from './_compose';
import { produtoVerificar, produtoPadronizar} from '../middlewares/produtoMiddlewares';

const prodPipAdd = compose(
  produtoVerificar,
  produtoPadronizar
);

export default prodPipAdd;