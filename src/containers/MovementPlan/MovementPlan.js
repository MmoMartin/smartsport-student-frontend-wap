import React, {Component, PropTypes} from 'react';
import { Accordion, List, Icon, ActivityIndicator, DatePicker, Form, Toast, Modal } from 'antd-mobile';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-connect';
import * as movementPlanAct from '../../redux/modules/MovementPlan/MovementPlanAct';
import { formatDate } from 'xunyijia-components/src/utils/tool';
import { createForm } from 'rc-form';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import Stage from './Stage';
import RecommendedPlan from './RecommendedPlan';
import moment from 'moment';
import 'moment/locale/zh-cn';
const Eject = Modal.alert;
const styles = require('./MovementPlan.scss');
const myPlanImg = require('img/my@2x.png');
const planImg = require('img/recommend.png');
require('../main.css');
require('echarts');
require('echarts-liquidfill');
// 日期组件
// const zhNow = moment().locale('zh-cn').utcOffset(8);
const zhNow = moment().locale('zh-cn');
const minDate = moment('2015-08-06 +0800', 'YYYY-MM-DD Z');

@connect(
  ({ movementPlanRed }) => (movementPlanRed),
  movementPlanAct
)

@asyncConnect([
  {
    promise: ({
      store: {
        dispatch,
        getState
      }
    }) => {
      const promises = [];
      promises.push(dispatch(movementPlanAct.movementPlanProgress()));
      promises.push(dispatch(movementPlanAct.getMovementPlanList()));
      promises.push(dispatch(movementPlanAct.fetchRecommendedPlan()));
      return Promise.all(promises);
    }
  }
])

class MovementPlan extends Component {
  state = {
    date: zhNow,
  }
  componentWillMount() {
    const { changeNavBar, changeHeadHandler } = this.props;
    changeNavBar({
      middleContent: '运动计划',
    });
  }
  ExecutionTips() {
    Toast.info("已存在进行的计划", 3);
  }
  onChange = (date) => {
    this.setState({
      date,
    });
  }
  // 开始执行
  handleSucc() {
    Toast.info("执行成功", 3);
  }

  handleFail(err) {
    Toast.info("执行失败", 3);
  }

  onBegin(id, status) {
    const { date } = this.state;
    const {_d} = date || {};
    let receivedValues = {
      category: 1,
      id: id,
      startTime: formatDate(new Date(_d), 'yyyy-mm-dd'),
    };
    let obj = {
      body: receivedValues
    };
    const succ = this.handleSucc.bind(this);
    const fail = this.handleFail.bind(this);
    this.props.executePlan(obj, succ, fail);
    this.props.movementPlanProgress();
    this.props.getMovementPlanList();
    this.props.fetchRecommendedPlan();
  }

  showTaskProcess(progressRate) {
    const rem = document.documentElement.style.fontSize.replace('px', '');
    const echartsFontSize = rem * 0.25;
    const option = {
      backgroundColor: '#7dc78d',
      series: [{
        type: 'liquidFill',
        radius: '50%',
        data: [{
          name: '总任务完成度',
          value: (progressRate * 100) + '%'
        }, progressRate],
        outline: {
          borderDistance: 0,
          itemStyle: {
            borderWidth: 10,
            borderColor: '#ddf5e6',
          }
        },
        backgroundStyle: {
          color: '#7dc78d',
        },
        label: {
          normal: {
            formatter: '{c}\n{b}',
            textStyle: {
              name: 'hha',
              color: '#3e7846',
              insideColor: '#306637',
              fontSize: echartsFontSize
            }
          }
        },
        itemStyle: {
          normal: {
            shadowBlur: 0,
            color: '#addcb9',
          }
        }
      }]
    };
    return option;
  }

  componentDidMount() {
    const { progressRate } = this.props;
    this.taskProcess = echarts.init(document.getElementById('main'));
    this.taskProcess.setOption(this.showTaskProcess(progressRate), true);
  }

  componentWillReceiveProps(nextProps) {
    const {progressRate} = this.props;
    const {progressRate: nextProgressRate} = nextProps;
    if (progressRate !== nextProgressRate) {
      this.taskProcess.setOption(this.showTaskProcess(nextProgressRate), true);
    }
  }

  render() {
    const { movementPlanList, RecommendData } = this.props;
    const { getFieldProps } = this.props.form;
    const { date } = this.state;
    return (
      <div className='DropDown'>
          <div id='main' style={{width: '100%', height: '4rem'}}>
          </div>
          <div className={styles.planTitleDiv}>
            <img src={planImg}
              style={{width: '0.27rem', height: '0.27rem', marginLeft: '0.3rem'}}>
            </img>
            <span className={styles.myPlanTitle}>推荐计划</span>
          </div>
          <Accordion className='planRecommend'>
            {
              RecommendData && RecommendData.map((item) =>{
                let competitiveAbility = [];
                return (
                  <Accordion.Panel key={item._id} header={
                    <div className='clearfix'>
                      <div style={{float: 'left', width: '72%'}}>
                        <div
                          style={{lineHeight: '0.5rem', fontSize: '0.28rem', color: "#333333"}}>
                          {item.name}
                        </div>
                        <div className={styles.planStyle}>
                          {
                            item.competitiveAbility.map((ability) => {
                              if (ability.level === 1) {
                                competitiveAbility[0] = ability.name;
                              } else {
                                competitiveAbility[1] = ability.name;
                              }
                            })
                          }
                          { `${competitiveAbility[0]}/${competitiveAbility[1]}`}
                        </div>
                      </div>
                      {
                        item.status === 1 ?
                        <div className={styles.Conduct}>
                          正在进行
                        </div> : ''
                      }
                    </div>
                  }>
                    <div className='planList'>
                      <div className='clearfix' style={{padding: '0.3rem 0.5rem', backgroundColor: '#f5fff8'}}>
                        <List style={{float: 'left', width: '60%', marginLeft: '0.2rem'}}>
                          <DatePicker
                            mode="date"
                            title="选择日期"
                            value={date}
                            minDate={minDate}
                            onChange={this.onChange.bind(this)}
                          >
                            <List.Item arrow="horizontal"></List.Item>
                          </DatePicker>
                        </List>
                        {
                          item.status === 1 ?
                          <button className={styles.planBtnDisabled} type="button" disabled>
                            正在进行
                          </button> :
                          <button
                            className={styles.planBtn}
                            type="button"
                            onClick={
                              movementPlanList.length > 0 ?
                              this.ExecutionTips.bind(this) :
                              this.onBegin.bind(this, item._id, item.status)}
                          >
                            开始
                          </button>
                        }
                      </div>
                    </div>
                    <RecommendedPlan RecommendedPlanItems={item.phases}/>
                  </Accordion.Panel>
                );
              })
            }
          </Accordion>
          <div className={styles.planTitleDiv}>
            <img src={myPlanImg}
              style={{width: '0.27rem', height: '0.27rem', marginLeft: '0.3rem'}}>
            </img>
            <span className={styles.myPlanTitle} style={{color: '#ebae55'}}>我的计划</span>
          </div>
          {
            <Accordion className='dropDownIcon'>
              {
                movementPlanList && movementPlanList.map((item) => {
                  let competitiveAbility = [];
                  return (
                    <Accordion.Panel key={item._id} header={
                      <div>
                        <div className={styles.planNameDiv}>
                          <div className={styles.planName}>{item.name}</div>
                          <div className={styles.planStatus}>{item.status === 1 ? '进行中' : '已完成'}</div>
                        </div>
                        <div className={styles.planTypeDiv}>
                          <div className={styles.planType}>{
                            item.competitiveAbility.map((ability) => {
                              if (ability.level === 1) {
                                competitiveAbility[0] = ability.name;
                              } else {
                                competitiveAbility[1] = ability.name;
                              }
                            })

                          }
                          { `${competitiveAbility[0]}${competitiveAbility[1]}`}
                          </div>
                          <div className={styles.planPercent}>{item.rate}</div>
                        </div>
                      </div>
                    }>
                      <Stage stageItems={item.phases} />
                    </Accordion.Panel>
                  );
                })
              }
            </Accordion>
          }
      </div>
    );
  }
}
export default createForm()(MovementPlan);
