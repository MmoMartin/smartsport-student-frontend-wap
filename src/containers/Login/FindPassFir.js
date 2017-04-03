import React, {Component, PropTypes} from 'react';
import { Button, Flex, WingBlank, Icon, TextareaItem, InputItem, List, Toast, NavBar } from 'antd-mobile';
import { createForm } from 'rc-form';
import {connect} from 'react-redux';
import {MOBILE} from 'xunyijia-components/src/utils/validation';
import * as LoginAct from 'redux/modules/Login/LoginAct';
import {handleText} from './publicFun';
require('./Login.css');

const Item = List.Item;
@connect(
  ({loginRed}) => loginRed, LoginAct
)
class FindPassFir extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: '获取验证码',
    };
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

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  showMessage(text) {
    Toast.fail(text, 3);
  }

  handleSucc() {
    this.context.router.push('/findPassSec');
  }

  handleFail(err) {
    this.showMessage(err);
  }

  // 找回密码
  passSubmit = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        const { tel, code } = this.props.form.getFieldsValue();
        if (tel.match(MOBILE) === null) {
          this.showMessage('手机号输入有误');
        } else if (code.match(/^\d{6}$/) === null) {
          this.showMessage('验证码输入有误');
        } else {
          const obj = {
            tel, code
          };
          const succ = this.handleSucc.bind(this);
          const fail = this.handleFail.bind(this);
          this.props.validateMessCode(obj, succ, fail);
        }
      } else {
        const { tel, code } = this.props.form.getFieldsValue();
        if (tel === undefined || code === undefined) {
          this.showMessage('选项不能为空');
        }
      }
    });
  }

  // 获取验证码
  getCode = () => {
    const {count} = this.state;
    if (count !== '获取验证码') {
      return;
    }
    const {tel} = this.props.form.getFieldsValue();
    if (tel === undefined || (tel && tel.match(MOBILE) === null)) {
      this.showMessage('手机号码错误');
    } else {
      this.props.getCode({tel}, this.sendSucc.bind(this));
    }
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    const {count} = this.state;
    return (
      <div className='myActiveBack'>
        <NavBar leftContent="" mode="light" onLeftClick={() => this.context.router.goBack()}>
          找回密码
        </NavBar>
        <form className='activeList'>
          <List>
            <InputItem
              {...getFieldProps('tel', {
                rules: [ { required: true }]
              })}
              clear
              type='number'
              pattern='[0-9]*'
              onInput={handleText.bind(this, '11')}
              placeholder="请输入手机号码">
              手机号码
            </InputItem>
            <InputItem
              {...getFieldProps('code', {
                rules: [ { required: true} ]
              })}
              clear
              type='number'
              pattern='[0-9]*'
              onInput={handleText.bind(this, '6')}
              placeholder="请输入验证码"
              extra={count}
              onExtraClick={this.getCode}
              className='myCode'>
              手机验证码
            </InputItem>
          </List>
          <Item className='activeNow'>
            <Button type='primary' size='large'
            onClick={this.passSubmit.bind(this)}>
            下一步
          </Button>
          </Item>
        </form>

      </div>
    );
  }
}
export default createForm()(FindPassFir);
