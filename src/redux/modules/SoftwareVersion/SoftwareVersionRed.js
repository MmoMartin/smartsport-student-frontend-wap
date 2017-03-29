import {
  SOFTWARE_VERSION, STUDENT_SELF_INFO
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
    case `${STUDENT_SELF_INFO}_GET_SUCC`:
      return {
        ...state,
        studentInfo: action.data,
      };
    default:
      return state;
  }
}