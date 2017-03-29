import React, {Component, PropTypes} from 'react';
import { Button, WingBlank, List, Toast } from 'antd-mobile';
import {connect} from 'react-redux';
import * as LoginAct from 'redux/modules/Login/LoginAct';
require('./Login.css');

const Item = List.Item;
@connect(
  ({loginRed}) => loginRed, LoginAct
)
class Logout extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  gotoLogout() {
    Toast.success('退出成功', 1);
    this.context.router.push('/login');
  }

  handleLogout() {
    LoginAct.logout({succ: this.gotoLogout.bind(this)});
  }

  // 修改密码
  gotoChangePass() {
    this.context.router.push('/changePassword');
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
          <Item arrow="horizontal" onClick={this.gotoChangePass.bind(this)}>修改密码</Item>
          <Item arrow="horizontal" onClick={this.gotoChangeMobile.bind(this)}>更换手机号码</Item>
        </List>
        <div className='myHeight'></div>
        <List className="my-list">
          <Item arrow="horizontal" onClick={() => {}}>我的设备</Item>
        </List>
        <div className='myHeight'></div>
        <List className="my-list">
          <Item arrow="horizontal" onClick={() => {}}>软件版本</Item>
        </List>
        <WingBlank className='margin-format-big'>
          <Button type='primary' onClick={this.handleLogout.bind(this)}>退出登录</Button>
        </WingBlank>
      </div>
    );
  }
}
export default Logout;