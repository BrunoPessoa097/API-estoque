import { compose } from './_compose';
import { marcaVerificar, marcaPadronizar} from '../middlewares/marcaMiddleware';
import { marcaAdd, marcaAll, marcaId, marcaUpdate, marcaDelete} from '../controllers/marcaControllers';

// marca adicionar
export const marcaPipAdd = compose(
  marcaVerificar,
  marcaPadronizar,
  marcaAdd
);

// marca atualização 
export const marcaPipList = compose(
  marcaAll
);

// marca buscar por único 
export const marcaPipId = compose(
  marcaId
);

// marca atualização 
export const marcaPipUpdate = compose(
  marcaVerificar,
  marcaPadronizar,
  marcaUpdate
);

// marca deletar
export const marcaPipDelete = compose(
  marcaDelete
);