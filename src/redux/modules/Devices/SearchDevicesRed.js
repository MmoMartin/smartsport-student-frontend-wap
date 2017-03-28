import {
  CHECK_AVAILABLE_DEVICES,
  BIND_DEVICE
} from 'constants/urls';
import config from '../../../constants/config';
const initialState = {
  filterDevices: [],
  bindStatus: 0,
};
export default function reducer(state = initialState, {type, data, err = '', ...rest}) {
  switch (type) {
    case `${CHECK_AVAILABLE_DEVICES}_POST_SUCC`:
      return {
        ...state,
        filterDevices: data,
      };
    case `${BIND_DEVICE}_POST_SUCC`:
      return {
        ...state,
        bindStatus: !state.bindStatus
      };
    default:
      return state;
  }
}
