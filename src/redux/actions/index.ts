import * as userActions from './user';
import * as noteActions from './note';
import * as clientsActions from './oauth-client';

const actions = {
  ...userActions,
  ...noteActions,
  ...clientsActions,
};
export default actions;