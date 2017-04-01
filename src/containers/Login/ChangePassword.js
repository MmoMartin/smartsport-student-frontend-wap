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
      Toast.fail('两次密码不一致', 3);
      // callback(new Error('两次密码不一致'));
    }
  }
  // 检查新密码
  validateNewPwd(value, callback) {
    const map = /^\d{6}$/;
    if (!map.test(value)) {
      Toast.fail('请输入6位数字！', 3);
      // callback(new Error('请输入6位数字！'));
    }
  }
  // 取消返回上一级
  cancelHandler() {
    this.context.router.push('/logout');
  }

  changePassSucc() {
    Toast.success('密码修改成功', 1);
    this.context.router.push('/login');
  }

  changePassFail(err) {
    Toast.fail(err, 3);
  }

  // 点击确认，修改密码
  handleChangePwd(event) {
    event.preventDefault();
    // this.validateConfirmPwd.bind(this);
    form.validateFields((err, values) => {
      if (!err) {
        Toast.info('修改中', 1);
        if (values.oldPwd === values.newPwd) {
          Toast.fail('新密码不能与旧密码一致', 3);
          return;
        } else if (!(/^\d{6}$/).test(values.newPwd)) {
          Toast.fail('请输入6位数字！', 3);
        }
        else if (values.confirmPwd !== values.newPwd) {
          Toast.fail('两次新密码不一致', 3);
        } else {
          this.props.changePwd({
            body: {
              oldPassword: values.oldPwd,
              password: values.newPwd
            },
            succ: this.changePassSucc.bind(this),
            fail: this.changePassFail.bind(this)
          });
        }
      } else {
        Toast.fail('输入有误！', 3);
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
            pattern='[0-9]*'
            maxLength="6"
            minLength="6"
          >旧密码</InputItem>
          <InputItem
            {...getFieldProps('newPwd', {
              rules: [
                { required: true },
              ],
            })}
            clear
            error={!!getFieldError('newPwd')}
            onErrorClick={() => {
              Toast.fail(getFieldError('newPwd'), 3);
            }}
            placeholder='请输入新密码'
            type="password"
            pattern='[0-9]*'
            maxLength="6"
            minLength="6"
          >新密码</InputItem>
          <InputItem
            {...getFieldProps('confirmPwd', {
              rules: [
                { required: true },
              ],
            })}
            clear
            error={!!getFieldError('confirmPwd')}
            onErrorClick={() => {
              Toast.fail(getFieldError('confirmPwd'), 3);
            }}
            type="password"
            pattern='[0-9]*'
            placeholder='请再次输入新密码'
            maxLength="6"
            minLength="6"
          >确认密码</InputItem>
          <Button style={{height: "90px", margin: '60px 25px'}} className="btn" type="primary"
            activeStyle={false}
            onClick={this.handleChangePwd.bind(this)}
          >确定</Button>
        </form>
      </div>
    );
  }
}
export default createForm()(ChangePassword);
