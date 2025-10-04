import { compose } from './_compose';
import authorLogin from '../middlewares/authorMiddleware';

// login 
const loginPip = compose(
  authorLogin
);

// exports
export default loginPip;