import React, {Component, PropTypes} from 'react';
import { Button, Flex, WingBlank, Icon, TextareaItem, InputItem, List, Toast } from 'antd-mobile';
import {notIdCard} from 'xunyijia-components/src/utils/validation';
import { createForm } from 'rc-form';
import {connect} from 'react-redux';
import * as LoginAct from 'redux/modules/Login/LoginAct';
import config from '../../constants/config';
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
    this.context.router.push('/login');
  }

  handleLogout() {
    LoginAct.logout({succ: this.gotoLogout.bind(this)});
  }

  // 修改密码
  gotoChangePass() {
    this.context.router.push('/changePassword');
  }

  render() {
    return (
      <div>
        <div className='myHeight'></div>
        <List className="my-list">
          <Item arrow="horizontal" onClick={this.gotoChangePass.bind(this)}>修改密码</Item>
          <Item arrow="horizontal" onClick={() => {}}>更换手机号码</Item>
        </List>
        <div className='myHeight'></div>
        <List className="my-list">
          <Item arrow="horizontal" onClick={() => {}}>搜索设备</Item>
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