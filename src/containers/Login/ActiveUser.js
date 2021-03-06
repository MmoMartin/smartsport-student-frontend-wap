import React, {Component, PropTypes} from 'react';
import { Button, Flex, WingBlank, Icon, TextareaItem, InputItem, List, Toast, NavBar } from 'antd-mobile';
import {notIdCard, MOBILE} from 'xunyijia-components/src/utils/validation';
import { createForm } from 'rc-form';
import {connect} from 'react-redux';
import * as LoginAct from 'redux/modules/Login/LoginAct';
import {handleText} from './publicFun';
require('./Login.css');
const LeftImg = require('img/return@2x.png');

const Item = List.Item;
@connect(
  ({loginRed}) => loginRed, LoginAct
)
class ActiveUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      count: '获取验证码',
    };
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
  }

  sendSucc() {
    const {count} = this.state;

    let second = 60;
    this.setState({count: `${second} 秒`});
    this.interval = setInterval(()=>{
      --second;
      if (second < 1) {
        this.setState({count: '获取验证码'});
        clearInterval(this.interval);
      } else {
        this.setState({count: `${second} 秒`});
      }
    }, 1000);
  }

  // 获取验证码
  getCode = () => {
    const {count} = this.state;
    if (count !== '获取验证码') {
      return;
    }
    const {tel} = this.props.form.getFieldsValue();
    if (tel === undefined || (tel && tel.match(MOBILE) === null)) {
      this.showMessage('请输入正确的手机号码');
    } else {
      this.props.getCode({tel}, this.sendSucc.bind(this));
    }
  }

  showMessage(text) {
    Toast.fail(text, 3);
  }

  // 激活成功
  handleSucc() {
    this.context.router.push('/login');
  }

  // 激活失败
  handleFail(err) {
    this.showMessage(err);
    if (err === '重复激活无效') {
      this.context.router.push('/login');
    }
  }

  // 立即激活
  activeSubmit = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        const { name, identification, password, comfirmPassword, tel, code } = this.props.form.getFieldsValue();
        if (notIdCard(identification) !== false) {
          this.showMessage('身份证输入有误');
        } else if (password.match(/^\d{6}$/) === null) {
          this.showMessage('密码输入有误，密码必须由6位纯数字组成');
        } else if (password !== comfirmPassword) {
          this.showMessage('两次密码输入不一致');
        } else if (tel.match(MOBILE) === null) {
          this.showMessage('手机号输入错误');
        } else if (code.match(/^\d{6}$/) === null) {
          this.showMessage('验证码输入错误');
        } else {
          const obj = {
            name, identification, password, tel, code,
          };
          const succ = this.handleSucc.bind(this);
          const fail = this.handleFail.bind(this);
          Toast.info('正在激活', 1);
          this.props.activeUser(obj, succ, fail);
        }
      } else {
        const { name, identification, password, comfirmPassword, tel, code } = this.props.form.getFieldsValue();
        if (name === undefined || identification === undefined
          || password === undefined || comfirmPassword === undefined
          || tel === undefined || code === undefined) {
          this.showMessage('选项不能为空');
        }
      }
    });
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    const {count} = this.state;
    return (
      <div className='myActiveBack'>
        <NavBar leftContent={<img style={{width: '0.42rem', marginTop: '-0.1rem'}}
          src={LeftImg}/>} mode="light"
          onLeftClick={() => this.context.router.goBack()}>
          激活账号
        </NavBar>
        <form className='activeList'>
          <List>
            <InputItem
              {...getFieldProps('name', {
                rules: [ { required: true }]
              })}
              clear
              type='text'
              placeholder="请输入姓名">
              姓名
            </InputItem>
            <InputItem
              {...getFieldProps('identification', {
                rules: [ { required: true }]
              })}
              onInput={handleText.bind(this, '18')}
              clear
              type='number'
              placeholder="请输入身份证号">
              身份证号
            </InputItem>
            <InputItem
              {...getFieldProps('password', {
                rules: [ { required: true }]
              })}
              clear
              type='password'
              pattern='[0-9]{6}'
              maxLength={6}
              placeholder="请输入6位数字的密码">
              密码
            </InputItem>
            <InputItem
              {...getFieldProps('comfirmPassword', {
                rules: [ { required: true }]
              })}
              type='password'
              pattern='[0-9]{6}'
              maxLength={6}
              placeholder="请再次输入新密码">
              确认密码
            </InputItem>
            <InputItem
              {...getFieldProps('tel', {
                rules: [ { required: true }]
              })}
              clear
              type='number'
              pattern='[0-9]{11}'
              onInput={handleText.bind(this, '11')}
              placeholder="请输入手机号码">
              手机号码
            </InputItem>
            <InputItem
              {...getFieldProps('code', {
                rules: [ { required: true }]
              })}
              clear
              type='number'
              pattern='[0-9]{6}'
              onInput={handleText.bind(this, '6')}
              placeholder="请输入验证码"
              extra={count}
              onExtraClick={this.getCode}
              className='myCode'>
              手机验证码
            </InputItem>
          </List>
          <Item className='activeNow'>
            <Button onClick={this.activeSubmit}
              type='primary'
              size='large'
              >
              立即激活
            </Button>
          </Item>
        </form>
      </div>
    );
  }
}
export default createForm()(ActiveUser);
