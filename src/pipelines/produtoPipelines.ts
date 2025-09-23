import { compose }from './_compose';
import { produtoVerificar, produtoPadronizar} from '../middlewares/produtoMiddlewares';
import produtoAdd from '../controllers/produtoControllers';

const prodPipAdd = compose(
  produtoVerificar,
  produtoPadronizar,
  produtoAdd
);

export default prodPipAdd;