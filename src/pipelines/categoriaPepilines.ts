import { compose } from './_compose';
import { categoriaValidar, categoriaPadronizar } from '../middlewares/categoriaMiddleware';
import { categoriaAdd, categoriaAll, categoriaUnico, categoriaUpdate, categoriaDelete } from '../controllers/categoriaControllers';

// adicionar categoria 
export const catPipAdd = compose(
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
  categoriaValidar,
  categoriaPadronizar,
  categoriaUpdate
);

// deletar categoria 
export const catPipDelete = compose(
  categoriaDelete
);