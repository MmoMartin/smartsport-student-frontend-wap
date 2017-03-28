import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { Button, Flex, WingBlank, NavBar, Icon, Grid, InputItem, List, WhiteSpace, Toast} from 'antd-mobile';
import { createForm } from 'rc-form';
import * as actions from 'redux/modules/Login/LoginAct';
import { PASSWORD, PASSWORD_TIP, MOBILE, MOBILE_TIP} from 'utils/validation';
import {changeState2Begin, changeState2Fail, changeState2Succ} from 'utils/tool';
require('./ChangePassword.css');
let form = [];

@connect(()=>({}), actions)

class ChangePassword extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  // 验证俩次输入新密码是否一致
  validateConfirmPwd(rule, value, callback) {
    if (value && form.getFieldValue('newPwd') && value !== form.getFieldValue('newPwd')) {
      callback(new Error('两次密码不一致'));
    } else {
      callback();
    }
  }
  // 检查新密码
  validateNewPwd(rule, value, callback) {
    const map = /^\d{6}$/;
    if (!map.test(value)) {
      callback(new Error('请输入6位数字！'));
    } else {
      callback();
    }
  }
  // 取消返回上一级
  cancelHandler() {
    this.context.router.push({pathname: '/changeMobile'});
  }

  changePassSucc() {
    Toast.info('密码修改成功', 1);
    this.context.router.push('/login');
  }

  changePassFail(err) {
    Toast.info(err, 1);
  }
 
  // 点击确认，修改密码
  handleChangePwd(event) {
    event.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        changeState2Begin.call(this, '修改中');
        this.props.changePwd({
          body: {
            oldPassword: values.oldPwd,
            password: values.newPwd
          },
          succ: this.changePassSucc.bind(this),
          fail: this.changePassFail.bind(this)
        });
      } else {
        Toast.info('输入有误！', 1);
      }
    });
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    form = this.props.form;
    return (
      <div style={{ backgroundColor: "#f2f2f2"}}>
        <NavBar mode='light'
          onLeftClick={this.cancelHandler.bind(this)}
        >修改密码</NavBar>
        <form style={{marginTop: '20px'}}>
          <InputItem
            {...getFieldProps('oldPwd', {
              rules: [
                { required: true }
              ],
            })}
            placeholder='请输入旧密码'
            type="password"
            maxLength="6"
            minLength="6"
          >旧密码</InputItem>
          <InputItem
            {...getFieldProps('newPwd', {
              rules: [
                { required: true },
                { validator: this.validateNewPwd },
              ],
            })}
            clear
            error={!!getFieldError('newPwd')}
            onErrorClick={() => {
              Toast.info(getFieldError('newPwd'), 1);
            }}
            placeholder='请输入新密码'
            type="password"
            maxLength="6"
            minLength="6"
          >新密码</InputItem>
          <InputItem
            {...getFieldProps('confirmPwd', {
              rules: [
                { required: true },
                { validator: this.validateConfirmPwd },
              ],
            })}
            clear
            error={!!getFieldError('confirmPwd')}
            onErrorClick={() => {
              Toast.info(getFieldError('confirmPwd'), 1);
            }}
            type="password"
            placeholder='请再次输入新密码'
            maxLength="6"
            minLength="6"
          >确认密码</InputItem>
          <Button style={{height: "90px"}} className="btn" type="primary"
            activeStyle={false}
            onClick={this.handleChangePwd.bind(this)}
          >确定</Button>
        </form>
      </div>
    );
  }
}
export default createForm()(ChangePassword);
