import { compose }from './_compose';
import produtoVerificar from '../middlewares/produtoMiddlewares';

const prodPipAdd = compose(
  produtoVerificar
);

export default prodPipAdd;