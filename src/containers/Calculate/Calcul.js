import React, {Component, PropTypes} from 'react';
import { Button, InputItem, Modal, Toast, List } from 'antd-mobile';
import { createForm } from 'rc-form';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-connect';
import * as CalculateAct from 'redux/modules/Calculate/CalculateAct';
require('./calculate.css');

const Item = List.Item;
@connect(
  ({calculateRed}) => calculateRed, CalculateAct
)
@asyncConnect([
  {
    promise: ({
      store: {
        dispatch
      }
    }) => {
      const promises = [];
      promises.push( dispatch( CalculateAct.getTestSubjects() ) );
      return Promise.all(promises);
    }
  }
])
class Calcul extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: '请选择项目',
      visible: false,
      unit: '',       // 单位
      performance: '' // 成绩
    };
  }
  componentWillMount() {
    const { changeNavBar, changeHeadHandler } = this.props;
    changeNavBar({
      middleContent: '计算器',
    });
  }
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  showMessage(text) {
    Toast.fail(text, 3);
  }

  selectProject(value) {
    this.setState({
      project: value,
    });
  }

  showModal = (event) => {
    // 现象：如果弹出的弹框上的 x 按钮的位置、和手指点击 button 时所在的位置「重叠」起来，
    // 会触发 x 按钮的点击事件而导致关闭弹框 (注：弹框上的取消/确定等按钮遇到同样情况也会如此)
    event.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      visible: true,
      units: '',
      performance: ''
    });

    this.props.clearScore();
  }

  onClose = (item) => {
    this.setState({
      visible: false,
      project: item.name,
      units: item.unit,
      performance: ''
    });
  }

  handleCalculSucc(msg) {
    if (this.props.score === undefined) {
      this.showMessage('你所处的年级不用考核该项目喔');
    }
  }

  // 计算得分
  calculSubmit = () => {
    const subject = this.state.project;
    if ( this.state.project === '请选择项目') {
      this.showMessage('请选择项目');
      return;
    }
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        const {unit} = this.props.form.getFieldsValue();
        const myReg = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/; // 正浮点数
        if (myReg.test(unit) === false) {
          this.showMessage('请输入正确的数字(数字为正浮点数)');
        } else {
          const filters = {subject, report: unit};
          const succ = this.handleCalculSucc.bind(this);
          const fail = this.handleCalculFail.bind(this);

          this.props.getScore(filters, succ, fail);
        }
      } else {
        const {unit} = this.props.form.getFieldsValue();
        if (unit === undefined || unit === null || unit === '') {
          this.showMessage('选项不能为空');
        }
      }
    });
  }

  handleCalculFail(err) {
    this.showMessage(err);
    // this.showMessage(code);
  }

  handleChange(event) {
    this.setState({
      performance: event
    });
  }

  gotoTest() {
    this.context.router.push('/settings');
  }

  render() {
    const { testSubjectsList, score } = this.props;

    const { getFieldProps } = this.props.form;
    const bulbIcon = require('img/bulb.png');
    const buttonGroup = testSubjectsList.map( item => {return (<Button size='large' key={item._id}
      onClick={this.onClose.bind(this, item)}>{item.name}</Button>)});
    return (
      <div className='myBackCal'>
        <form className='calculForm'>
          <div>
            <div className='calculFormItem'>
              <span>项目：</span>
              <div style={{display: 'inline-block', width: '80%'}}>
                <Button onClick={this.showModal} inline='true' style={{width: '100%'}} icon='down'
                  className='selectProject'>
                  {this.state.project}
                </Button>
              </div>
            </div>
            <div className='myHeightWhite80'></div>
            <InputItem
              {...getFieldProps('unit', {
                rules: [{ required: true }]
              })}
              clear
              extra={this.state.units}
              style={{width: '94%'}}
              className='myRecords'
              >
              成绩：
            </InputItem>
            <div className='calculButton' >
              <Button onClick={this.calculSubmit}
                type='primary'
                size='large'
                className='decoBtn'>
                计算
              </Button>
            </div>
            <div className='myScore'>
              <InputItem
                {...getFieldProps('score')}
                extra='分'
                className=''
                style={{width: '94%'}}
                value={score}>
                得分：
              </InputItem>
            </div>
          </div>
        </form>
        <div className='decorateHeight'></div>
        <div style={{padding: '0 0.3rem'}}>
          <div className='tipTitle'>
            <img src={bulbIcon} alt="bulbIcon" className='bulbIcon' />
            锻炼小诀窍：
          </div>
          <ol className='padding50'>
            <li>每天更新一些锻炼的小技巧或者是根据测试的项目及所得的成绩给用户一些建议。</li>
            <li>每天更新一些锻炼的小技巧或者是根据测试的项目及所得的成绩给用户一些建议。</li>
          </ol>
        </div>
        <Modal
          className='modalHeight'
          transparent
          maskClosable={false}
          visible={this.state.visible}
          onClose={this.onClose}>
          {buttonGroup}
        </Modal>
      </div>
    );
  }
}
export default createForm()(Calcul);