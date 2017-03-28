import React, {Component, PropTypes} from 'react';
import { Button, TabBar, WingBlank, Toast, Icon, Grid } from 'antd-mobile';
import MovementPlan from '../MovementPlan/MovementPlan';
import SearchDevice from '../Profile/SearchDevice';
import MyDevices from '../Profile/MyDevices';

class Home extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'blueTab',
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
  renderContent(index) {
    switch (index) {
      case 0: {
        return (
          <h1>运动计划</h1>
        );
      }
      case 1: {
        return (
          <h1>计算器</h1>
        );
      }
      case 2: {
        return (
          <h1>我的</h1>
        );
      }
      default:
        break;
    }
  }

  render() {
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
      >
        <TabBar.Item
          title="运动计划"
          key="life"
          icon={<div style={{
            width: '0.44rem',
            height: '0.44rem',
            background: 'url() center center /  0.42rem 0.42rem no-repeat' }}
          />
          }
          selectedIcon={<div style={{
            width: '0.44rem',
            height: '0.44rem',
            background: 'url() center center /  0.42rem 0.42rem no-repeat' }}
          />
          }
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}
          data-seed="logId"
        >
          {this.renderContent(0)}
        </TabBar.Item>

        <TabBar.Item
          icon={
            <div style={{
              width: '0.44rem',
              height: '0.44rem',
              background: 'url() center center /  0.42rem 0.42rem no-repeat' }}
            />
          }
          selectedIcon={
            <div style={{
              width: '0.44rem',
              height: '0.44rem',
              background: 'url() center center /  0.42rem 0.42rem no-repeat' }}
            />
          }
          title="计算器"
          key="calculator"
          dot
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'greenTab',
            });
          }}
        >
          {this.renderContent(1)}
        </TabBar.Item>
        <TabBar.Item
          icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
          selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
          title="我的"
          key="mine"
          selected={this.state.selectedTab === 'yellowTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'yellowTab',
            });
          }}
        >
          {this.renderContent(2)}
        </TabBar.Item>
      </TabBar>
    );
  }
}
export default Home;
