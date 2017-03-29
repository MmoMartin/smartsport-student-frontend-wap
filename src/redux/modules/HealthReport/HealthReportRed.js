import { HEALTH_REPORT } from 'constants/urls';
import config from 'constants/config';

const initialState = {
  path: '',
  data: {},
};

export default function(state = initialState, {type, data, ...msg}) {
  switch (type) {
    case `${HEALTH_REPORT}_GET_SUCC`:
      return {
        ...state,
        data,
      };
    default:
      return state;
  }
}
