import { compose } from './_compose';
import { categoriaExist, categoriaValidar, categoriaPadronizar } from '../middlewares/categoriaMiddleware';
import { categoriaAdd, categoriaAll, categoriaUnico, categoriaUpdate, categoriaDelete } from '../controllers/categoriaControllers';

// adicionar categoria 
export const catPipAdd = compose(
  categoriaExist,
  categoriaValidar,
  categoriaPadronizar,
  categoriaAdd
);

// listar categoria 
export const catPipList = compose(
  categoriaAll
);

// mostrar categoria selecionada
export const catPipId = compose(
  categoriaUnico
);

// atualizar categoria 
export const catPipUpdate = compose(
  categoriaExist,
  categoriaValidar,
  categoriaPadronizar,
  categoriaUpdate
);

// deletar categoria 
export const catPipDelete = compose(
  categoriaDelete
);