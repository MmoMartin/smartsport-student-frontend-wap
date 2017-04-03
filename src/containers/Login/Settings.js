import React, {Component, PropTypes} from 'react';
import { Button, WingBlank, List, Toast, Icon } from 'antd-mobile';
import {connect} from 'react-redux';
import * as LoginAct from 'redux/modules/Login/LoginAct';
require('./Login.css');

const Item = List.Item;
@connect(
  ({loginRed}) => loginRed, LoginAct
)
class Settings extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  componentWillMount() {
    const { changeNavBar, changeHeadHandler } = this.props;
    changeNavBar({
      leftContent: <Icon type='left' color='#00CC66'/>,
      leftHandler: changeHeadHandler,
      middleContent: '设置',
    });
  }

  gotoLogout() {
    Toast.success('退出成功', 1);
    this.context.router.push('/login');
  }

  handleLogout() {
    LoginAct.logout({succ: this.gotoLogout.bind(this)});
  }

  // 修改密码
  gotoChangePages(page) {
    this.context.router.push(page);
  }

  // 修改手机号
  gotoChangeMobile() {
    this.context.router.push('/changeMobile');
  }

  render() {
    return (
      <div>
        <div className='myHeight'></div>
        <List className="my-list">
          <Item arrow="horizontal" onClick={this.gotoChangePages.bind(this, '/changePassword')}>修改密码</Item>
          <Item arrow="horizontal" onClick={this.gotoChangePages.bind(this, '/changeMobile')}>更换手机号码</Item>
        </List>
        <div className='myHeight'></div>
        <List className="my-list">
          <Item arrow="horizontal" onClick={this.gotoChangePages.bind(this, '/device')}>我的设备</Item>
        </List>
        <div className='myHeight'></div>
        <List className="my-list">
          <Item arrow="horizontal"  onClick={this.gotoChangePages.bind(this, '/softwareVersion')}>软件版本</Item>
        </List>
        <WingBlank className='margin-format-big'>
          <Button type='primary' onClick={this.handleLogout.bind(this)}>退出登录</Button>
        </WingBlank>
      </div>
    );
  }
}
export default Settings;