import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-connect';

import loginRed from './Login/LoginRed';
import calculateRed from './Calculate/CalculateRed';
import movementPlanRed from './MovementPlan/MovementPlanRed';
import searchDevicesRed from './Devices/SearchDevicesRed';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  loginRed,
  calculateRed,
  movementPlanRed,
  searchDevicesRed,
});
