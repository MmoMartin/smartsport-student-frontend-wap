import React, {Component, PropTypes} from 'react';
import { Accordion, List, Icon, ActivityIndicator, DatePicker, Form, Toast } from 'antd-mobile';
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
const styles = require('./MovementPlan.scss');
const myPlanImg = require('img/my@2x.png');
const planImg = require('img/recommend.png');
require('../main.css');
require('echarts-liquidfill/dist/echarts-liquidfill.js');
// 日期组件
// const zhNow = moment().locale('zh-cn').utcOffset(8);
const zhNow = moment().locale('zh-cn');
const maxDate = moment('2018-12-03 +0800', 'YYYY-MM-DD Z');
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
  onChange = (date) => {
    this.setState({
      date,
    });
  }
  handleSucc() {
    Toast.info("执行成功", 3);
  }
  handleFail(err) {
    Toast.info("执行失败", 3);
  }
  // 开始执行
  onBegin(id, status) {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let receivedValues = {
          category: 1,
          id: id,
          startTime: formatDate(new Date(values.date1._d), 'yyyy-mm-dd'),
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
    });
  }
  showTaskProcess(progressRate) {
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
              color: '#addcb9',
              insideColor: '#306637',
              fontSize: 25,
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
      <div style={{ marginBottom: '1rem' }} className='DropDown'>
          <div id='main' style={{width: '100%', height: '4rem'}}>
          </div>
          <div className={styles.planTitleDiv} style={{marginTop: '0.3rem'}}>
            <img src={planImg}
              style={{width: '0.44rem', height: '0.44rem', marginLeft: '0.2rem', marginTop: '-0.1rem'}}>
            </img>
            <span className={styles.recommend}>推荐计划</span>
          </div>
          <Accordion className='planRecommend'>
            {
              RecommendData && RecommendData.map((item) =>{
                let competitiveAbility = [];
                return (
                  <Accordion.Panel key={item._id} header={
                    <div className='clearfix'>
                      <div style={{float: 'left', width: '72%'}}>
                        <div style={{lineHeight: '68px'}}>{item.name}</div>
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
                        <div className={styles.Conduct} style={{float: 'left', width: '25%', marginLeft: 10}}>
                          正在进行
                        </div> : ''
                      }
                    </div>
                  }>
                    <div className='planList'>
                      <div className='clearfix' style={{padding: '20px 40px 0', backgroundColor: '#f5fff7'}}>
                        <List style={{float: 'left', width: '40%', marginLeft: 36}}>
                          <DatePicker
                            mode="date"
                            title="选择日期"
                            {...getFieldProps('date1', {
                              initialValue: zhNow,
                            })}
                            minDate={minDate}
                            maxDate={maxDate}
                          >
                            <List.Item arrow="horizontal"></List.Item>
                          </DatePicker>
                        </List>
                        {
                          item.status === 1 ?
                          <button className={styles.planBtnDisabled} type="button" disabled>
                            正在进行
                          </button> :
                          <button className={styles.planBtn}
                                  onClick={this.onBegin.bind(this, item._id, item.status)}
                                  type="button">
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
              style={{width: '0.44rem', height: '0.44rem', marginLeft: '0.25rem', marginTop: '-0.1rem'}}>
            </img>
            <span className={styles.myPlanTitle}>我的计划</span>
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
