// 公共的配置文件

require('babel-polyfill');

const config = {
  isLogger: true, // 是否控制台打印action
  isVirtual: false, // 是否使用后台虚拟数据
  pageSize: 10, // 默认列表显示条数
  tokenKey: 'smartsport/student/token', // 保存当前登陆用户的token，获得通过localStorage.getItem(config.tokenKey)
  userInfoKey: 'smartsport/student/user', // 保存当前登陆用户的用户信息，获得通过localStorage.getItem(config.userInfoKey)
  headPortrait: 'smartsport/student/headPortrait', // 保存当前登陆用户的用户头像
};
// 环境
const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  // process.env给服务端调用的，客户端这个为空，所以要个默认值
  host: process.env.HOST || 'localhost', // 客户端主机
  port: process.env.PORT || 3000, // 客户端端口, 开发是3000， 生产改为8080
  // host: process.env.HOST || '120.77.48.80', // 客户端主机
  // port: process.env.PORT || 8080, // 客户端端口, 开发是3000， 生产改为8080
  apiHost: process.env.APIHOST || '120.77.48.80', // 转发的主机
  apiPort: process.env.APIPORT || 3000, // 转发的端口
  app: { // 用于设置html的head
    title: 'sport',
    description: 'description',
    head: {
      titleTemplate: '智慧体育-%s',
      meta: [
        {name: 'description', content: ''}, // eg:All the modern best practices in one example.
        {charset: 'utf-8'},
        {property: 'og:site_name', content: ''}, // og标签用于优化搜索，eg: React Redux Example
        {property: 'og:image', content: ''}, // eg: https://react-redux.herokuapp.com/logo.jpg
        {property: 'og:locale', content: ''}, // eg: en_US
        {property: 'og:title', content: ''}, // eg: React Redux Example
        {property: 'og:description', content: ''}, // eg: All the modern best practices in one example.
        {property: 'og:card', content: ''}, // eg: summary
        {property: 'og:site', content: ''}, // eg: @erikras
        {property: 'og:creator', content: ''}, // eg: @erikras
        {property: 'og:image:width', content: ''}, // eg: 200
        {property: 'og:image:height', content: ''} // eg: 200
      ]
    }
  },

}, environment, config);
