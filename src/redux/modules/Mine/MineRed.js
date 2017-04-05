import { STUDENT_SELF_INFO, HEAD_PORTRAIT, CHENGE_HEAD_PORTRAIT } from 'constants/urls';
import config from '../../../constants/config';
const initialState = {
  userInfo: {},  // 用户信息
  headPortrait: '', // 用户头像
};
export default function reducer(state = initialState, {type, data, err = '', ...rest}) {
  switch (type) {
    case `${STUDENT_SELF_INFO}_GET_SUCC`:
      // localStorage.setItem(config.headPortrait, data.icon);
      return {
        ...state,
        userInfo: data,
      };
    case HEAD_PORTRAIT:
      return {
        ...state,
        headPortrait: data,
      };
    case `${CHENGE_HEAD_PORTRAIT}_GET_SUCC`:
      return {
        ...state,
        headUrl: data,
      };
    default:
      return state;
  }
}