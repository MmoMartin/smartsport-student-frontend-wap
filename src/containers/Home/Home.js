import React, {Component, PropTypes} from 'react';
import { Button, TabBar, WingBlank, Toast, Icon, Grid } from 'antd-mobile';
import Head from './Head';
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
      selectedTab: 'movementPlan',
      leftContent: null,
      leftHandler: () => {},
      middleContent: '',
      middleHandler: () => {},
      rightContent: '',
      rightHandler: () => {},
      hasBorder: 1, // 是否有底边框，默认是1有边界，2是没有边界
      headDisplay: 'block', // 显示隐藏头部导航
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
    const { selectedTab, leftContent, middleContent, rightContent, leftHandler,
      middleHandler, rightHandler, hasBorder, headDisplay } = obj;
    const hasBorders = (hasBorder === undefined ? 1 : 2);
    this.setState({
      selectedTab: selectedTab || this.state.selectedTab,
      leftContent: leftContent || '',
      leftHandler: leftHandler || (()=>{}),
      middleContent: middleContent || '',
      middleHandler: middleHandler || (()=>{}),
      rightContent: rightContent || '',
      rightHandler: rightHandler || (()=>{}),
      hasBorder: hasBorders,
      headDisplay: headDisplay || 'block',
    });
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
    switch (selectedTab) {
      case '0':
        this.changeNavBar({
          middleContent: '运动计划',
          selectedTab: 'movementPlan',
          headDisplay: 'none'
        });
        this.context.router.push('/');
        break;
      case '1':
        this.changeNavBar({
          middleContent: '计算器',
          selectedTab: 'calcul',
        });
        this.context.router.push('/calcul');
        break;
      case '2':
        this.changeNavBar({
          selectedTab: 'mine',
          headDisplay: 'none',
        });
        this.context.router.push('/mine');
        break;
      default:
        this.context.router.push('/');
        break;
    }
  }
  // 计算高度
  calcHeight(headDisplay, display) {
    let finalHeight;
    if (headDisplay === 'block' && display === 'block') {
      finalHeight = 'calc(100% - 1.88rem)';
    } else if (headDisplay === 'none' && display === 'block') {
      finalHeight = 'calc(100% - 1rem)';
    } else if (headDisplay === 'block' && display === 'none') {
      finalHeight = 'calc(100%-0.88rem)';
    }
    return finalHeight;
  }

  render() {
    const { leftContent, leftHandler, middleContent, hasBorder, headDisplay } = this.state;
    let display = 'block';
    const pathUrl = this.props.location.pathname;
    if (!(pathUrl === '/' || pathUrl === '/calcul' || pathUrl === '/mine')) {
      display = 'none';
    }
    const finalHeight = this.calcHeight(headDisplay, display);
    const contentStyle = {
      top: headDisplay === 'block' ? '0.88rem' : '0',
      height: finalHeight,
    };
    return (
      <div style={{height: '100%', width: '100%'}}>
        <Head
         leftContent={leftContent}
         leftHandler={leftHandler}
         middleContent={middleContent}
         hasBorder={hasBorder}
         headDisplay={headDisplay}
        />
          <div style={contentStyle} className='childrenContent'>
            <this.props.children.type
              changeNavBar={this.changeNavBar.bind(this)}
              changeHeadHandler={this.changeHeadHandler.bind(this)}
            />
          </div>
         <div className='footTabBar' style={{display}}>
            <div className='tabBarItem' onClick={this.changeRoute.bind(this, '0')}>
              <div className='tabBarImg'>
                <div className={this.state.selectedTab ===
                  'movementPlan' ? 'tabBarMovementPlanActive' : 'tabBarMovementPlan'}/>
              </div>
              <span className={this.state.selectedTab ===
                'movementPlan' ? 'tabBarMovementPlanText tabBarText' : 'tabBarText'}>运动计划</span>
            </div>
            <div className='tabBarItem' onClick={this.changeRoute.bind(this, '1')}>
              <div className='tabBarImg'>
                <div className={this.state.selectedTab === 'calcul' ? 'tabBarCalculActive' : 'tabBarCalcul'}/>
              </div>
              <span className={this.state.selectedTab === 'calcul' ?
                'tabcalculText tabBarText' : 'tabBarText'}>计算器</span>
            </div>
            <div className='tabBarItem' onClick={this.changeRoute.bind(this, '2')}>
              <div className='tabBarImg'>
                <div className={this.state.selectedTab === 'mine' ? 'tabBarMineActive' : 'tabBarMine'}/>
              </div>
              <span className={this.state.selectedTab === 'mine' ? 'tabmineText tabBarText' : 'tabBarText'}>我的</span>
            </div>
         </div>
      </div>
    );
  }
}
export default Home;
