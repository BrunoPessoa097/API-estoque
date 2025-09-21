import {compose }from './compose';
import {nivelVerificar, nivelPadronizar } from '../middlewares/nivelMiddlewares';
import {nivelList, nivelAdd, nivelUpdate,nivelId,nivelDelete} from '../controllers/nivelControllers';
  
export const nivelPipList = compose(
  nivelList
);

export const nivelPipAdd = compose(
  nivelVerificar,
  nivelPadronizar,
  nivelAdd
);

export const nivelPipId = compose(
  nivelId
)

export const nivelPipUpdate = compose(
  nivelVerificar,
  nivelPadronizar,
  nivelUpdate
);

export const nivelPipDelete = compose(
  nivelDelete
);