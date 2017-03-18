import {LOGIN, LOGOUT, CHANGE_PWD} from 'constants/urls';
import config from '../../../constants/config';
const initialState = {};
export default function reducer(state = initialState, {type, data, err = '', ...rest}) {
  switch (type) {
    case `${LOGIN}_POST_SUCC`:
      localStorage.setItem(config.tokenKey, `Bearer ${data.token}`);
      localStorage.setItem(config.userInfoKey, JSON.stringify(data.user));
      return state;
    default:
      return state;
  }
}