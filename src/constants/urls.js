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

// 运动计划
export const MOVEMENTPLAN_LIST = `${DOMAIN}/api/auth/my_plan`; // 运动计划列表
export const MOVEMENTPLAN_PROGRESS = `${DOMAIN}/api/auth/my_plan/status`; // 运动计划总体完成度

// 推荐计划
export const RECOMMENDED_PLAN = `${DOMAIN}/api/auth/recommended_plan`; // 查看推荐计划
export const EXECUTE_PLAN = `${DOMAIN}/api/auth/my_plan`; // 执行计划

// 健康报告（返回最新5种体质报告）
export const HEALTH_REPORT = `${DOMAIN}/api/auth/health_report`;
export const SOFTWARE_VERSION = `${DOMAIN}/api/app_version`; // 获取软件版本
export const STUDENT_SELF_INFO = `${DOMAIN}/api/auth/me`; // 获取学生信息

// 手环设备
export const CHECK_AVAILABLE_DEVICES = `${DOMAIN}/api/auth/device/check`; // 搜索绑定的设备``
export const MY_DEVICES_LIST = `${DOMAIN}/api/auth/device/own`; // 搜索绑定的设备``
export const BIND_DEVICE = `${DOMAIN}/api/auth/device/bind`; // 绑定设备
export const UNBIND_DEVICE = `${DOMAIN}/api/auth/device/unbind`; // 解绑设备
export const SYNC_RUN_DATA = `${DOMAIN}/api/auth/run_walk/import`; // 同步步数数据
export const SYNC_HRM_DATA = `${DOMAIN}/api/auth/heart/import`; // 同步步数数据
export const SYNC_BLOOD_DATA = `${DOMAIN}/api/auth/blood/import`; // 同步步数数据
export const STUDENT_LICENCE_POLICY = `${DOMAIN}/api/auth/policy/icon`; // 获取阿里 policy
export const CHENGE_HEAD_PORTRAIT = `${DOMAIN}/api/auth/student_user`;// 更换头像

