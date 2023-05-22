import * as userActions from './user';
import * as noteActions from './note';

const actions = {
  ...userActions,
  ...noteActions,
};
export default actions;