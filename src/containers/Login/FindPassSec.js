import React, {Component, PropTypes} from 'react';
import { Button, Flex, WingBlank, Icon, TextareaItem, InputItem, List, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import {connect} from 'react-redux';
import * as LoginAct from 'redux/modules/Login/LoginAct';
import config from '../../constants/config';
require('./Login.css');

const Item = List.Item;
@connect(
  ({loginRed}) => loginRed, LoginAct
)
class FindPassSec1 extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  showMessage(text) {
    Toast.info(text, 2);
  }

  handleSucc() {
    this.context.router.push('/login');
  }

  handleFail(err) {
    this.showMessage(err);
  }

  passSubmit = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        const { password, comfirmPassword } = this.props.form.getFieldsValue();
        if ( password.match(/^1[1-2]\d{9}$/) !== null || password !== comfirmPassword ) {
          this.showMessage('输入错误');
        } else {
          const token = this.props.setPassToken;
          console.log(token);
          const obj = { password, token };
          const succ = this.handleSucc.bind(this);
          const fail = this.handleFail.bind(this);
          this.props.setPassword(obj, succ, fail);
        }
      }
    });
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className='myActiveBack'>
        <form className='activeList'>  
          <List>
            <InputItem
              {...getFieldProps('password', {
                initialValue: '123456',
                rules: [ { required: true }]
              })}
              placeholder="请输入6位数字的密码">
              新密码
            </InputItem>
            <InputItem
              {...getFieldProps('comfirmPassword', {
                initialValue: '123456',
                rules: [ { required: true} ]
              })}
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
const FindPassSec = createForm()(FindPassSec1);
export default FindPassSec;