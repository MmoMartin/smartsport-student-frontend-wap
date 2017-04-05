import {
  SOFTWARE_VERSION
} from 'constants/urls';
const initialState = {
  appVersion: {},
};
export default function appVersionRed(state = initialState, action = {}) {
  switch (action.type) {
    case `${SOFTWARE_VERSION}_GET_SUCC`:
      return {
        ...state,
        appVersion: action.data,
      };
    default:
      return state;
  }
}