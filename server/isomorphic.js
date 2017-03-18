require('../server.babel'); // 注册babel，node运行时提供js转换
var path = require('path');
var rootDir = path.resolve(__dirname, '..');

/**
  同构设置
 */
 // 设置开发环境，create.js热部署，server.js不缓存webpack
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';
if (__DEVELOPMENT__) {
  if (!require('piping')({hook: true, ignore: /(\/\.|~$|\.json|\.scss$)/i})) {
    return;
  }
}
// 用于加载assets样式图片等资源文件
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools'))
  .server(rootDir, function() {
    require('./server');
  }
);