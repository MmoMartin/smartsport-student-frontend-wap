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

// export {DOMAIN};
// 行政区域三级接口

// 登陆，登出，修改密码
export const LOGIN = `${DOMAIN}/api/user/login`;
