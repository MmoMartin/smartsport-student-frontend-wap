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
  MyDevices,
} from 'containers';
import config from './constants/config';

export default (store) => {
  const isWidth = () => {
    const isSize = typeof window !== 'undefined' && window.innerHeight && window.innerWidth;
    const isViewport = typeof document !== 'undefined' && document.getElementsByTagName('meta')[0] &&
    document.getElementsByTagName('meta')[0].content;
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
  const requireLogin = (nextState, replace, next) => {
    const token = window.localStorage.getItem(config.tokenKey);
    if (!token) {
      replace('/login');
    }
    next();
  };
  return (
    <Route onEnter={enterPage}>
      <Route path='/' component={Home} onEnter={requireLogin}>
        <IndexRoute component={MovementPlan}/>
        <Route path='calcul' component={Calcul}/>
        <Route path='settings' component={Settings}/>
        <Route path='logout' component={Logout}/>
        <Route path='changePassword' component={ChangePassword}/>
        <Route path='changeMobile' component={ChangeMobile}/>
        <Route path='healthReport' component={HealthReport}/>
        <Route path='myDevices' component={MyDevices}/>
        <Route path='searchDevices' component={SearchDevice}/>
        <Route path='mine' component={Mine}/>
        <Route path='softwareVersion' component={SoftwareVersion}/>
        <Route path='activityManagement' component={ActivityManagement}/>
        <Route path='knowledgeBase' component={KnowledgeBase}/>
        <Route path='scoreRanking' component={ScoreRanking}/>
        <Route path='contact' component={Contact}/>
        <Route path='point' component={Point}/>
      </Route>
      <Route path='/login' component={Login}/>
      <Route path='/activeUser' component={ActiveUser}/>
      <Route path='/findPassFir' component={FindPassFir}/>
      <Route path='/findPassSec' component={FindPassSec}/>
      <Route path='/not-author' component={NotAuthor}/>
      <Route path='*' component={NotFound} status={404} />
    </Route>
  );
};
