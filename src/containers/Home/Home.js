import React, {Component, PropTypes} from 'react';
import { Button, TabBar, WingBlank, Toast, Icon, Grid } from 'antd-mobile';
import Head  from './Head';
import MovementPlan from '../MovementPlan/MovementPlan';
import SearchDevice from '../Profile/SearchDevice';
import MyDevices from '../Profile/MyDevices';
require('./Home.css');

class Home extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      leftContent: '',
      leftHandler: () => {},
      middleContent: '运动计划',
      middleHandler: () => {},
      rightContent: '',
      rightHandler: () => {},
    };
  }

  failHandler(info) {
    Toast.hide();
    Toast.fail('加载失败！');
  }

  submitHandler(event) {
    event.preventDefault();
    Toast.hide();
    Toast.loading('加载中...');
  }

  // 改变头部导航状态
  changeNavBar(obj) {
    const { leftContent, middleContent, rightContent, leftHandler, middleHandler, rightHandler } = obj;
    this.setState({
      leftContent: leftContent || '',
      leftHandler: leftHandler || (()=>{}),
      middleContent: middleContent || '运动计划',
      middleHandler: middleHandler || (()=>{}),
      rightContent: rightContent || '',
      rightHandler: rightHandler || (()=>{}),
    })
  }

  // 改变子页面退回路由
  changeHeadHandler() {
    const myPath = this.props.location.pathname;
    if (!(myPath === '/calcul' || myPath === '/' || myPath === '/mine')) {
      this.context.router.goBack();
    }
  }

  // 切换tabNavBar路由
  changeRoute(selectedTab) {
    switch(selectedTab) {
    case '0':
      this.changeNavBar({
        middleContent: '运动计划',
      });
      this.context.router.push('/');
      break;
    case '1':
      this.changeNavBar({
        middleContent: '计算器',
      });
      this.context.router.push('/calcul');
      break;
    case '2':
      this.changeNavBar({
        middleContent: '我的',
      });
      this.context.router.push('/mine');
      break;
    default:
      this.context.router.push('/');
      break;
    }
  }

  render() {
    const userIcon = require('img/user.png');
    const { leftContent, leftHandler, middleContent } = this.state;
    let display;
    if(!(leftContent === null || leftContent === '')){
      display = 'none';
    } 
    return (
      <div>
        <Head
         leftContent={leftContent}
         leftHandler={leftHandler}
         middleContent={middleContent}
        />
         <this.props.children.type 
           changeNavBar={this.changeNavBar.bind(this)}
           changeHeadHandler={this.changeHeadHandler.bind(this)}
         />
         <div className='footTabBar' style={{display}}>
            <div className='tabBarItem' onClick={this.changeRoute.bind(this, '0')}>
              <div className='tabBarImg'><img src={userIcon} className='tabBarIcon'/></div>
              <span className='tabBarText'>运动计划</span>
            </div>
            <div className='tabBarItem' onClick={this.changeRoute.bind(this, '1')}>
              <div className='tabBarImg'><img src={userIcon} className='tabBarIcon'/></div>
              <span className='tabBarText'>计算器</span>
            </div>
            <div className='tabBarItem' onClick={this.changeRoute.bind(this, '2')}>
              <div className='tabBarImg'><img src={userIcon} className='tabBarIcon'/></div>
              <span className='tabBarText'>我的</span>
            </div>
         </div>
      </div>
    );
  }
}
export default Home;
