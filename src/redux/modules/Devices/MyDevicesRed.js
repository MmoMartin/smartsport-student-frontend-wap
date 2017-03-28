import { MY_DEVICES_LIST, UNBIND_DEVICE } from 'constants/urls';
import config from '../../../constants/config';
const initialState = {
  unbindStatus: 0,
  ownDevices: [],
  connectStatus: 0,
  connectName: '未连接',
  connectColor: '',
};
export default function reducer(state = initialState, {type, data, err = '', ...rest}) {
  switch (type) {
    case `${UNBIND_DEVICE}_POST_SUCC`:
      return {
        ...state,
        unbindStatus: !state.unbindStatus,
        ownDevices: [],
        connectStatus: 0,
        connectName: '未连接',
        connectColor: '',
      };
    case `${MY_DEVICES_LIST}_GET_SUCC`:
      return {
        ...state,
        ownDevices: data,
      };
    case 'CHANGE_CONNECT_STATUS':
      return {
        ...state,
        connectStatus: rest.status.connectStatus,
        connectName: rest.status.connectName,
        connectColor: rest.status.connectColor,
      };
    default:
      return state;
  }
}
