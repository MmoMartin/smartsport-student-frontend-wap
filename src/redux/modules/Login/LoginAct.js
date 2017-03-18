import {LOGIN, LOGOUT, CHANGE_PWD} from 'constants/urls';
import {post} from '../../publicAct';
import config from '../../../constants/config';
// 登陆
export function login({body = {}, succ = (()=>{}), fail = (()=>{})} = {}) {
  body.realm = 'management-user';
  return post({
    path: LOGIN,
    body,
    succ,
    fail,
  });
}

// 登出
export function logout({succ = (()=>{})} = {}) {
  localStorage.removeItem(config.tokenKey);
  localStorage.removeItem(config.userInfoKey);
  succ();
}
// 修改密码
export function changePwd({body = {}, succ = (()=>{}), fail = (()=>{})} = {}) {
  return post({
    path: CHANGE_PWD,
    body,
    succ,
    fail,
  });
}