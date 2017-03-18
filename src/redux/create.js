import { createStore as _createStore, applyMiddleware } from 'redux';
import createMiddleware from './middleware/clientMiddleware';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import config from 'constants/config';

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true
});

export default function createStore(history, client, data) {
  // 同步发送路由操作到历史记录
  const reduxRouterMiddleware = routerMiddleware(history);
  
  let middleware = null;
  if (config.isLogger) {
    middleware = [createMiddleware(client), reduxRouterMiddleware, thunk, loggerMiddleware];// 控制台打印action
  } else {
    middleware = [createMiddleware(client), reduxRouterMiddleware, thunk]; // 控制台不打印action
  }

  let finalCreateStore;
  finalCreateStore = applyMiddleware(...middleware)(_createStore);

  const reducer = require('./modules/reducer');
  const store = finalCreateStore(reducer, data);


  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer'));
    });
  }

  return store;
}
