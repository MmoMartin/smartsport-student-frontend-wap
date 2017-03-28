import React, {Component, PropTypes} from 'react';
import { Button, Flex, WingBlank, Icon, TextareaItem, List, InputItem, Toast } from 'antd-mobile';
import {notIdCard} from 'xunyijia-components/src/utils/validation';
import { createForm } from 'rc-form';
import {connect} from 'react-redux';
import * as LoginAct from 'redux/modules/Login/LoginAct';
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
    Toast.info(text, 2);
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
        if (name === null || password === null) {
          this.showMessage('账号或密码不能为空');
        } else if ((name.length !== 11 
          && name.length !== 18)
          || password.length !== 6 
          || password.match(/^\d{6}$/ === null)
          ) {
          this.showMessage('账号或密码不正确');
        } else if (name.length === 11 &&
          (name.match(/^\d{11}$/) === null || 
          name.charAt(0) === '0' || name.charAt(1) === '1' || name.charAt(1) === '2')) {
          this.showMessage('账号或密码不正确');
        } else if (name.length === 18 && notIdCard(name) !== false) {
          this.showMessage('账号或密码不正确');
        } else {
          const succ = this.gotoLogin.bind(this);
          const fail = this.handleErr.bind(this);
          this.props.login({name, password}, succ, fail);
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
          <form>
            <div>
              <InputItem
                {...getFieldProps('name', {
                  rules: [ { required: true }]
                })}
                placeholder="请输入手机号码/身份证号"
                maxLength={18}
                labelNumber='8'
                error={!!getFieldError('name')}>
                <img src={userIcon} className='marginRt30'/>
              </InputItem>
              <InputItem
                {...getFieldProps('password', {
                  rules: [ { required: true }]
                })}
                labelNumber='8'
                type='password'
                placeholder="请输入密码">
                <img src={passIcon} className='marginRt30'/>
              </InputItem>
              
            </div>
            <Item>
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