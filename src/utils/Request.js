import 'isomorphic-fetch';
import lodash from 'lodash';
import { browserHistory } from 'react-router';
import config from '../constants/config';

const isRepeatRequest = false; // 防重复提交
const lastRequestParam = [];
export default class Request {
  constructor(req) {}
  get(url) {
    return this.request({url, method: 'get'});
  }
  post(url, obj = {}) {
    const body = obj.body || obj.data;
    const headers = obj.headers;
    return this.request({url, body, method: 'post'});
  }
  request(obj) {
    // obj: url, method, body, headers
    if (lastRequestParam.find((item) => lodash.isEqual(obj, item))) {
      return new Promise(() => {});
    }
    lastRequestParam.push(obj);
    const Authorization = localStorage.getItem(config.tokenKey) || '';
    const headers = {
      'Content-Type': 'application/json',
      Authorization
    };
    const silent = obj.silent;
    let timeOut;
    let url = obj.url;
    const method = obj.method || 'get';
    let body = obj.body;
    if (typeof body === 'object') {
      body = JSON.stringify(body);
    }
    Object.assign(headers, obj.headers);
    let isOk;
    return new Promise((resolve, reject) => {
      if (!silent) {
        ~lastRequestParam.indexOf(obj) && lastRequestParam.splice(lastRequestParam.indexOf(obj), 1);
        timeOut = setTimeout(() => {
          reject('请求超时');
        }, 15000);
      }
      fetch(url, {method, headers, body})
        .then((response) => {
          ~lastRequestParam.indexOf(obj) && lastRequestParam.splice(lastRequestParam.indexOf(obj), 1);
          if (!silent) {
            clearTimeout(timeOut);
          }
          if (response.status === 401) {
            browserHistory.replace('/login');
            return null; // 鉴权失败，跳转到登陆页
          }
          if (response.status === 403) {
            browserHistory.replace('/not-author');
            return null; // 没有权限，跳转到提示页面
          }
          if (response.status === 404) {
            const msg = '请求不存在！';
            throw msg;
          }
          if (response.ok) {
            isOk = true;
          } else {
            isOk = false;
          }
          return response.json();
        }).then((responseData) => {
          if (isOk) {
            if (responseData && responseData.status && responseData.status.code === 0) {
              resolve(responseData.data || '');
            } else if (responseData && responseData.status && responseData.status.msg) {
              throw responseData.status.msg;
            }
          } else {
            throw responseData;
          }
        })
        .catch((error) => {
          ~lastRequestParam.indexOf(obj) && lastRequestParam.splice(lastRequestParam.indexOf(obj), 1);
          const reg = /[\u2E80-\u9FFF]+/;
          error = String(error);
          if (!reg.test(error)) {
            error = '操作失败！';
          }
          reject(error);
        });
    });
  }
  empty() {}
}