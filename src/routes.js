import React from 'react';
import {IndexRoute, Route, IndexRedirect} from 'react-router';
import {
  Home,
  NotFound,
  NotAuthor,
  Login,
  Logout,
  ActiveUser,
  FindPassFir,
  FindPassSec,
  Calcul,
  Settings,
  ChangePassword,
  ChangeMobile,
  MovementPlan,
  SearchDevice,
  HealthReport,
  Mine,
  SoftwareVersion,
  ActivityManagement,
  KnowledgeBase,
  ScoreRanking,
  Contact,
  Point,
} from 'containers';
import config from './constants/config';

export default (store) => {
  // 页面刷新时候，进行判断是否已经登陆，没登陆跳转到登陆页
  // const requireLogin = (nextState, replace, next) => {
  //   const token = window.localStorage.getItem(config.tokenKey);
  //   if (!token) {
  //     replace('/login');
  //   }
  //   next();
  // };
  // const onChange = ()=>{
  //   // 路由跳转的时候滚动到页面顶部
  //   document.body.scrollTop = 0;
  // };
  const isWidth = () => {
    const isSize = typeof window !== 'undefined' && window.innerHeight && window.innerWidth;
    const isViewport = typeof document !== 'undefined' && document.getElementsByTagName('meta')[0] && document.getElementsByTagName('meta')[0].content;
       if (isSize && isViewport) {
           return true;
       } else {
           return false;
       }
   };
   const gotoNext = (next) => {
       if (isWidth()) {
           next();
       } else {
           setTimeout(() => {
               gotoNext(next);
           }, 100);
       }
   };
   const enterPage = (nextState, replace, next) => {
       gotoNext(next);
   };

  return (
    <Route onEnter={enterPage}>
      {/* <Route onEnter={requireLogin} onChange={onChange} path='/' name='home' breadcrumbName='首页' component={Main}>
        <IndexRoute name='home' group='homeGroup' component={Home}/>
        <Route path='home1' name='home1' group='homeGroup1' breadcrumbName='测试' component={Home} />
      </Route> */}
      <Route path='/' component={Home}>
        
        <IndexRoute component={MovementPlan}/>
        <Route path='calcul' component={Calcul}/>
        <Route path='healthReport' component={HealthReport}/>
        <Route path='settings' component={Settings}/>
        <Route path='/logout' component={Logout}/>
        <Route path='/activeUser' component={ActiveUser}/>
        <Route path='/findPassFir' component={FindPassFir}/>
        <Route path='/findPassSec' component={FindPassSec}/>
        <Route path='changePassword' component={ChangePassword}/>
        <Route path='changeMobile' component={ChangeMobile}/>
        // <Route path='/healthReport' component={HealthReport}/>
        // <Route path='/move' component={MovementPlan}/>
        <Route path='/device' component={SearchDevice}/>
        <Route path='/mine' component={Mine}/>
        <Route path='/softwareVersion' component={SoftwareVersion}/>
        <Route path='/activityManagement' component={ActivityManagement}/>
        <Route path='/knowledgeBase' component={KnowledgeBase}/>
        <Route path='/scoreRanking' component={ScoreRanking}/>
        <Route path='/contact' component={Contact}/>
        <Route path='/point' component={Point}/>
      </Route>
      <Route path='/login' component={Login}/>
      
      <Route path='/not-author' component={NotAuthor}/>
      <Route path='*' component={NotFound} status={404} />
    </Route>
  );
};
