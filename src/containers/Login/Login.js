import React, {Component, PropTypes} from 'react';
import { Button, Flex, WingBlank, List, InputItem, Toast } from 'antd-mobile';
import {notIdCard, MOBILE} from 'xunyijia-components/src/utils/validation';
import { createForm } from 'rc-form';
import {connect} from 'react-redux';
import * as LoginAct from 'redux/modules/Login/LoginAct';
import {handleText} from './publicFun';
require('./Login.css');

const Item = List.Item;
@connect(
  ({loginRed}) => loginRed, LoginAct
)
class Login extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  showMessage(text) {
    Toast.fail(text, 3);
  }

  gotoLogin() {
    this.context.router.push('/');
  }

  handleErr(err) {
    this.showMessage(err);
  }

  // 验证登录
  loginSubmit = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        const { name, password } = this.props.form.getFieldsValue();
        if ((name.length !== 11 && name.length !== 18)
          || (name.length === 11 && name.match(MOBILE) === null)
          || (name.length === 18 && notIdCard(name) !== false) ) {
          this.showMessage('账号输入有误，账号必须是手机号或者身份证号');
        } else if (password.length !== 6 || password.match(/^\d{6}$/) === null) {
          this.showMessage('密码输入有误，密码必须由6位纯数字组成');
        } else {
          const succ = this.gotoLogin.bind(this);
          const fail = this.handleErr.bind(this);
          Toast.info('正在登录', 1);
          this.props.login({name, password}, succ, fail);
        }
      } else {
        const { name, password } = this.props.form.getFieldsValue();
        if (name === undefined || password === undefined || name === '' || password === '') {
          this.showMessage('选项不能为空');
        }
      }
    });
  }

  // 激活账号
  gotoActiveUser() {
    this.context.router.push('/activeUser');
  }

  // 忘记密码
  gotoHandlePass() {
    this.context.router.push('/findPassFir');
  }

  render() {
    const logoImg = require('img/logo.png');
    const userIcon = require('img/user.png');
    const passIcon = require('img/password.png');
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div className='myBack'>
        <WingBlank>
  	    	<div className='loginLogo'>
              <img src={logoImg}/>
  	    	</div>
          <form className='loginForm'>
            <div>
              <InputItem
                {...getFieldProps('name', {
                  rules: [ { required: true }]
                })}
                type='number'
                placeholder="请输入手机号码/身份证号"
                onInput={handleText.bind(this, '18')}
                labelNumber='8'
                className='userItem'
                >
                <img src={userIcon} className='marginRt30'/>
              </InputItem>
              <InputItem
                {...getFieldProps('password', {
                  rules: [ { required: true }]
                })}
                clear
                labelNumber='8'
                type='password'
                pattern='[0-9]*'
                maxLength={6}
                className='userItem'
                placeholder="请输入密码">
                <img src={passIcon} className='marginRt30'/>
              </InputItem>

            </div>
            <Item className='myFormItem'>
                <Button onClick={this.loginSubmit}
                  type='primary'
                  size='large'
                  className='margin-format'>
                  登录
                </Button>
              </Item>
          </form>

  	    	<Flex>
            <Flex.Item className='toActive' onClick={this.gotoActiveUser.bind(this)}>激活账号</Flex.Item>
            <Flex.Item className='forgetPass' onClick={this.gotoHandlePass.bind(this)}>忘记密码?</Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    );
  }
}
export default createForm()(Login);
