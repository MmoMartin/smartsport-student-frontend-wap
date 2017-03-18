import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-connect';

import loginRed from './Login/LoginRed';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  loginRed,
});
