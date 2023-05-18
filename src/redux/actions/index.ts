import * as userActions from './user';
import * as adminActions from './admin';
import * as postsAction from './post';

const actions = {
  ...userActions,
  ...adminActions,
  ...postsAction,
};
export default actions;