import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Button, Flex, WingBlank, NavBar, Icon, Grid,
         InputItem, List, WhiteSpace, Toast, Modal} from 'antd-mobile';
import { createForm } from 'rc-form';
import { PASSWORD, PASSWORD_TIP, MOBILE, MOBILE_TIP} from 'utils/validation';
import {changeState2Begin, changeState2Fail, changeState2Succ} from 'utils/tool';
import * as actions from 'redux/modules/Login/LoginAct';

require('./ChangePassword.css');
let form = [];
@connect(()=>({}), actions)

class ChangeMobile extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      saveState: '',
      codeTips: '获取验证码'
    };
  }
  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
  }
  // 取消更换手机，返回上一级
  cancelHandler() {
    this.context.router.push({ pathname: '/changePassword'});
  }
  // 获取验证码
  getCode() {
    const {codeTips} = this.state;
    if (codeTips !== '获取验证码') {
      return;
    }
    this.props.form.validateFields(['tel'], (err, values) => {
      console.log("values", values);
      if (values && !err) {
        this.props.getCode({
            tel: values.tel,
          }, this.sendSucc.bind(this), changeState2Fail.bind(this)
        );
      } else {
        Toast.info('请正确的手机！', 1);
      }
    });
  }
  // 验证码发送成功
  sendSucc() {
    let secend = 60;
    this.setState({codeTips: `${secend} 秒`});
    this.interval = setInterval(() => {
      this.setState({codeTips: `${--secend} 秒`});
      if (secend === 0) {
        this.setState({codeTips: '获取验证码'});
        clearInterval(this.interval);
      }
    }, 1000);
  }
  // 点击确定按钮，发送数据
  handleChangeMobile(event) {
    event.preventDefault();
    console.log("form.getFieldsValue", form.getFieldsValue());
    form.validateFields((err, values) => {
      if (!err) {
        changeState2Begin.call(this, '修改中');
        console.log("this.props", this.props);
        this.props.changeMobile({
            tel: values.tel,
            code: values.code
          },
          this.showModel.bind(this),
          changeState2Fail.bind(this),
        );
      } else {
        Toast.info('输入有误！', 1);
      }
    });
  }
  // 验证手机号
  validateMobile(rule, value, callback) {
    const mobile = /^((1705|1709|1700)\d{7})|(13\d|15[0-35-9]|14[57]|17[6-8]|18\d)\d{8}$/;
    if (value) {
      value = value.replace(/\s+/g, '');
      if (mobile.test(value)) {
        callback();
      } else {
        callback(new Error('请输入正确的手机号！'));
      }
    } else {
      callback(new Error('手机号不能为空！'));
    }
  }
  // Modal对话框
  showModel(event) {
    Toast.info('修改成功', 1);
    this.context.router.push('/login');
    // event.preventDefault();
    // this.setState({
    //   visible: true,
    // });
  }
  // 关闭对话框提示
  onClose() {
    this.setState({
      visible: false,
    });
    this.context.router.push({
      pathname: '/login',
    });
  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    form = this.props.form;
    return (
      <div>
        <NavBar leftContent='' mode='light'
          onLeftClick={this.cancelHandler.bind(this)}>手机绑定</NavBar>
        <form style={{marginTop: '20px'}}>
          <InputItem
            {...getFieldProps('password', {
              rules: [
                { required: true },
              ],
            })}
            placeholder='请输入密码'
            type="password"
            maxLength="6"
            minLength="6"
          >密码</InputItem>
          <InputItem
            {...getFieldProps('tel', {
              rules: [
                { validator: this.validateMobile }
              ]
            })}
            clear
            error={!!getFieldError('tel')}
            onErrorClick={() => {
              Toast.info(getFieldError('tel'), 1);
            }}
            placeholder='请输入手机号码'
          >+86</InputItem>
          <InputItem style={{ position: "relative"}}
            {...getFieldProps('code', {
              rules: [
                { required: true},
              ]
            })}
            placeholder='请输入验证码'
          >验证码
            <Button
              style={{ position: "absolute",
                       right: "0", top: "0px",
                       margin: "0 25px", color: "#00cd66", fontSize: "30px"}}
              activeStyle={false} onClick={this.getCode.bind(this)}>获取验证码</Button>
          </InputItem>
          <p style={{fontSize: "25px", margin: "10px 25px", color: "#999"}}>更换手机号码后，下次登录可使用新手机号码登录</p>
          <Button style={{height: "90px"}} className="btn"
            type="primary"
            activeStyle={false}
            onClick={this.handleChangeMobile.bind(this)}>确定</Button>
        </form>
        <Modal
          title='更换成功'
          transparent
          maskClosable={false}
          visible={this.state.visible}
          onClose={this.onClose}
          footer={[{ text: '知道了',
            onPress: () => {
              console.log('ok');
              this.onClose(); }}]}
        >
          本次退出账号后，此手机号码将无法登录，下次登录请使用新手机号码登录
        </Modal>
      </div>
    );
  }
}
export default createForm()(ChangeMobile);
