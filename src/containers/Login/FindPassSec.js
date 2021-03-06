import React, {Component, PropTypes} from 'react';
import { Button, InputItem, List, Toast, NavBar } from 'antd-mobile';
import { createForm } from 'rc-form';
import {connect} from 'react-redux';
import * as LoginAct from 'redux/modules/Login/LoginAct';
import config from '../../constants/config';
require('./Login.css');
const LeftImg = require('img/return@2x.png');

const Item = List.Item;
@connect(
  ({loginRed}) => loginRed, LoginAct
)
class FindPassSec extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  showMessage(text) {
    Toast.fail(text, 3);
  }

  handleSucc() {
    this.context.router.push('/login');
  }

  handleFail(err) {
    this.showMessage(err);
  }

  // 修改密码
  passSubmit = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        const { password, comfirmPassword } = this.props.form.getFieldsValue();
        if (password.match(/^\d{6}$/) === null) {
          this.showMessage('密码输入有误');
        } else if (password !== comfirmPassword ) {
          this.showMessage('两次密码输入不一致');
        } else {
          const token = this.props.setPassToken;
          const obj = { password, token };
          const succ = this.handleSucc.bind(this);
          const fail = this.handleFail.bind(this);
          Toast.info('正在修改密码', 1);
          this.props.setPassword(obj, succ, fail);
        }
      } else {
        const { password, comfirmPassword } = this.props.form.getFieldsValue();
        if (password === undefined || comfirmPassword === undefined) {
          this.showMessage('选项不能为空');
        }
      }
    });
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className='myActiveBack'>
        <NavBar leftContent={<img style={{width: '0.42rem', marginTop: '-0.1rem'}}
          src={LeftImg}/>} mode="light"
          onLeftClick={() => this.context.router.goBack()}>
          找回密码
        </NavBar>
        <form className='activeList'>
          <List>
            <InputItem
              {...getFieldProps('password', {
                rules: [ { required: true }]
              })}
              clear
              type='password'
              pattern='[0-9]*'
              maxLength={6}
              placeholder="请输入6位数字的密码">
              新密码
            </InputItem>
            <InputItem
              {...getFieldProps('comfirmPassword', {
                rules: [ { required: true} ]
              })}
              clear
              type='password'
              pattern='[0-9]*'
              maxLength={6}
              placeholder="请再次输入新密码">
              确认密码
            </InputItem>
          </List>
          <Item className='activeNow'>
            <Button type='primary' size='large'
              onClick={this.passSubmit.bind(this)}>
              确定
            </Button>
          </Item>
        </form>
      </div>
    );
  }
}
export default createForm()(FindPassSec);
