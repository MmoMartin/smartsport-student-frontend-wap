// URL地址公共配置，所有用到的url都是放在这里
// import config from './config';

// const PROTOCOL = 'http://';
// const HOST = config.host;
// const PORT = config.port;
// const PROXY = '/proxy';
// const DOMAIN = `${PROTOCOL}${HOST}:${PORT}${PROXY}`;
const DOMAIN = '/proxy';
const DOMAIN3000 = '/proxy3000';
const DOMAIN3001 = '/proxy3001';
const DOMAIN3002 = '/proxy3002';
const DOMAIN3003 = '/proxy3003';
const DOMAIN3004 = '/proxy3004';

// export {DOMAIN};
// 行政区域三级接口

// 登陆，登出，修改密码
export const LOGIN = `${DOMAIN}/api/student_user/login`;
export const ACTIVE = `${DOMAIN}/api/student_user/active`; // 激活账号
export const VERIFY_CODE = `${DOMAIN}/api/student_user/verify_code`; // 获取验证码
export const VERIFY = `${DOMAIN}/api/student_user/verify`; // 校验短信验证码
export const SET_PASSWORD = `${DOMAIN}/api/student_user/set_password`; // 重置密码
export const CHANGE_PASSWORD = `${DOMAIN}/api/auth/student_user/change_password`; // 修改密码
export const CHANGE_TELNUM = `${DOMAIN}/api/auth/student_user/change_telNum`; // 修改手机号

// 计算器
export const TEST_SUBJECT = `${DOMAIN}/api/test_subject`; // 获取测试项目
export const CALCULATOR = `${DOMAIN}/api/auth/score/calculator`; // 计算测试项目的得分
