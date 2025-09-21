import {compose }from './compose';
import {nivelVerificar, nivelPadronizar } from '../middlewares/nivelMiddlewares';
import {nivelList, nivelAdd, nivelUpdate,nivelId,nivelDelete} from '../controllers/nivelControllers';

// listar os níveis 
export const nivelPipList = compose(
  nivelList
);

// adicionar nivel
export const nivelPipAdd = compose(
  nivelVerificar,
  nivelPadronizar,
  nivelAdd
);

// mostrar único nivel
export const nivelPipId = compose(
  nivelId
)

export const nivelPipUpdate = compose(
  nivelVerificar,
  nivelPadronizar,
  nivelUpdate
);

// deletar nível 
export const nivelPipDelete = compose(
  nivelDelete
);