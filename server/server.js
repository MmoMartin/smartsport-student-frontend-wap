import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
// import favicon from 'serve-favicon';
import compression from 'compression';
import path from 'path';
import http from 'http';
import request from 'request';
import {syncHistoryWithStore} from 'react-router-redux';
import createHistory from 'react-router/lib/createMemoryHistory';
import config from '../src/constants/config';
import createStore from '../src/redux/create';
import Request from '../src/utils/Request';
import Html from '../src/IndexHtml';
import analogData from './analogData';
const app = new Express(); // app
const server = new http.Server(app); // 服务器
app.use(compression()); // 压缩响应体
// 加载静态资源
// app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));
app.use(Express.static(path.join(__dirname, '..', 'static')));
// 需要转发过去的服务器地址
// 代理转发，解决跨域问题
app.use('/proxy', (req, res) => {
  let targetUrl = 'http://s.student.qsntzjk.com';
  pipe(req, res, targetUrl);
});
app.use('/proxy3000', (req, res) => {
  let targetUrl = 'http://s.admin.qsntzjk.com';
  pipe(req, res, targetUrl);
});
app.use('/proxy3001', (req, res) => {
  let targetUrl = 'http://s.expert.qsntzjk.com';
  pipe(req, res, targetUrl);
});
app.use('/proxy3002', (req, res) => {
  let targetUrl = 'http://s.school.qsntzjk.com';
  pipe(req, res, targetUrl);
});
app.use('/proxy3003', (req, res) => {
  let targetUrl = 'http://s.gov.qsntzjk.com';
  pipe(req, res, targetUrl);
});
app.use('/proxy3004', (req, res) => {
  let targetUrl = 'http://s.student.qsntzjk.com';
  pipe(req, res, targetUrl);
});
app.use('/proxy3006', (req, res) => {
  let targetUrl = 'http://s.wristband.qsntzjk.com';
  pipe(req, res, targetUrl);
});
const pipe = (req, res, targetUrl) => {
  if ( config.isVirtual && analogData(req, res)) {
    return;
  }
  const url = targetUrl + req.url;
  req.pipe(request(url)).pipe(res);
};
// 同构
app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // 开发环境不缓存webpack的状态
    webpackIsomorphicTools.refresh();
  }
  const client = new Request(req);
  const memoryHistory = createHistory(req.originalUrl);
  const store = createStore(memoryHistory, client);
  const history = syncHistoryWithStore(memoryHistory, store);
  res.send('<!doctype html>\n'
    + ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
});
// 提供端口，及打印错误信息
if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
