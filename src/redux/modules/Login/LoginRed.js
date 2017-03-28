import {ACTIVE, VERIFY_CODE, LOGIN, SET_PASSWORD, TEST_SUBJECT, VERIFY, CHANGE_PASSWORD} from 'constants/urls';
import config from '../../../constants/config';
const initialState = {
  activeFlag: '',  // 激活状态
  testSubjectsList: [], // 测试项目列表
  setPassToken: '',   // 重置密码的token
};
export default function reducer(state = initialState, {type, data, err = '', ...rest}) {
  switch (type) {
    case `${LOGIN}_POST_SUCC`:
      localStorage.setItem(config.tokenKey, `Bearer ${data.token}`);
      localStorage.setItem(config.userInfoKey, JSON.stringify(data.user));
      return state;
    case `${ACTIVE}_POST_SUCC`:
      return {
        ...state,
        activeFlag: data.success,
      };
    case `${VERIFY_CODE}_POST_SUCC`:
      console.log(data);
      return {
        ...state
      };
    case `${TEST_SUBJECT}_POST_SUCC`:
      console.log(data);
      return {
        ...state,
        testSubjectsList: data
      };
    case `${VERIFY}_POST_SUCC`:
      return {
        ...state,
        setPassToken: data.token,
      };
    default:
      return state;
  }
}