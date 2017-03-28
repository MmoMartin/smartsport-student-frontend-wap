import React, {Component, PropTypes} from 'react';
import { Button, Flex, WingBlank, Icon, TextareaItem, InputItem, List, Modal, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-connect';
import * as CalculateAct from 'redux/modules/Calculate/CalculateAct';
require('./calculate.css');

const Item = List.Item;
const operation = Modal.operation;
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

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  showMessage(text) {
    Toast.info(text, 2);
  }

  selectProject(value) {
    this.setState({
      project: value,
    });
  }

  showModal = (e) => {
    // 现象：如果弹出的弹框上的 x 按钮的位置、和手指点击 button 时所在的位置「重叠」起来，
    // 会触发 x 按钮的点击事件而导致关闭弹框 (注：弹框上的取消/确定等按钮遇到同样情况也会如此)
    e.preventDefault(); // 修复 Android 上点击穿透
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

  handleCalculSucc() {
    if (this.props.score === undefined) {
      this.showMessage('没有这个项目');
    }
  }

  // 计算得分
  calculSubmit = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        const {unit} = this.props.form.getFieldsValue();
        if (unit.match(/^\d+.\d{1,2}$/) === null) {
          this.showMessage('请输入数字');
        } else {
          const subject = this.state.project;
          const filters = {subject, report: unit};
          const succ = this.handleCalculSucc.bind(this);
          const fail = this.handleCalculFail.bind(this);

          this.props.getScore(filters, succ, fail);
        }
      }
    });
  }

  handleCalculFail(err) {
    this.showMessage(err);
  }

  handleChange(event) {
    this.setState({
      performance: event
    });
  }

  render() {
    const { testSubjectsList, score } = this.props;

    const { getFieldProps } = this.props.form;
    const bulbIcon = require('img/bulb.png');
    const buttonGroup = testSubjectsList.map( item => {return <Button size='large' key={item._id} 
      onClick={this.onClose.bind(this, item)}>{item.name}</Button>});
    return (
      <div className='myBackCal'>
        <form style={{padding: '60px 0 30px 0'}}>
          <div>
            <div style={{ padding: '15px 28px', fontSize: '32px'}}>
              <span>项目：</span>
              <div style={{display: 'inline-block', width: '80%'}}>
                <Button onClick={this.showModal} inline='true' style={{width: '100%'}} icon='down' className='selectProject'>
                  {this.state.project}
                </Button>
              </div>
            </div>
            <InputItem
              {...getFieldProps('unit', {
                rules: [{ required: true }]
              })}
              extra={this.state.units}
              style={{width: '94%'}}
              >
              成绩：
            </InputItem>            
            <Button onClick={this.calculSubmit} 
              type='primary' 
              size='large'  
              className='calculButton'>
              计算
            </Button> 
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
        <div style={{padding: '0px 30px'}}>
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