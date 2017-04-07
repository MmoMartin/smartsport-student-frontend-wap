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
  componentWillMount() {
    const { changeNavBar, changeHeadHandler } = this.props;
    changeNavBar({
      leftContent: <Icon type='left' color='#00CC66'/>,
      leftHandler: changeHeadHandler,
      middleContent: '修改密码',
    });
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
    form.validateFields((err, values) => {
      if (!err) {
        Toast.info('修改中', 1);
        if (values.oldPwd === values.newPwd) {
          Toast.fail('新密码不能与旧密码一致', 3);
          return;
        } else if (!(/^\d{6}$/).test(values.newPwd)) {
          Toast.fail('新密码请输入6位数字！', 3);
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
        Toast.fail('输入框不能为空', 3);
      }
    });
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    form = this.props.form;
    return (
      <div style={{ backgroundColor: "#f2f2f2"}}>
        <form style={{marginTop: '0.2rem'}}>
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
            type="password"
            pattern='[0-9]*'
            placeholder='请再次输入新密码'
            maxLength="6"
            minLength="6"
          >确认密码</InputItem>
          <Button style={{height: "0.9rem", margin: '0.60rem 0.3rem', lineHeight: '0.9rem', borderRadius: '0.1rem'}} className="btn" type="primary"
            activeStyle={false}
            onClick={this.handleChangePwd.bind(this)}
          >确定</Button>
        </form>
      </div>
    );
  }
}
export default createForm()(ChangePassword);
