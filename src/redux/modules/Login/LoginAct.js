import { LOGIN, ACTIVE, VERIFY_CODE, VERIFY, SET_PASSWORD, CHANGE_PASSWORD, CHANGE_TELNUM } from 'constants/urls';
import {fetchList, post, get, put} from 'xunyijia-components/src/redux/publicAct';
import config from '../../../constants/config';

// 登录
export function login( body = {}, succ = {}, fail = {} ) {
  body.realm = 'student-user';
  return post({
    path: LOGIN,
    body,
    succ,
    fail
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
  return put({
    path: CHANGE_PASSWORD,
    body,
    succ,
    fail,
  });
}

// 学生激活账号
export function activeUser(obj = {}, succ = {}, fail = {}) {
  return post({
    path: ACTIVE,
    body: obj,
    succ,
    fail,
  });
}

// 获取手机验证码
export function getCode( body = {}, succ = ()=>{}, fail = {} ) {
  setTimeout(() => {
    succ();
  }, 1000);
  return post({
    path: VERIFY_CODE,
    body,
  });
}

// 校验手机验证码
export function validateMessCode( body = {}, succ = {}, fail = {}) {
  return post({
    path: VERIFY,
    body,
    succ,
    fail,
  });
}

// 重置密码
export function setPassword(body = {}, succ = {}, fail = {}) {
  return post({
    path: SET_PASSWORD,
    body,
    succ,
    fail,
  });
}

// 修改手机号
export function changeMobile(body = {}, succ = {}, fail = {}) {
  return put({
    path: CHANGE_TELNUM,
    body,
    succ,
    fail,
  });
}
