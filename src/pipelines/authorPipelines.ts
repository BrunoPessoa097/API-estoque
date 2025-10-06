import { compose } from './_compose';
import { authorLogin, loginAuthorValido } from '../middlewares/authorMiddleware';

// login criar credencial
export const loginPip = compose(
  authorLogin
);

// login com credencial
export const logadoPip = compose(
  loginAuthorValido
);