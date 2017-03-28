import React, {Component, PropTypes} from 'react';
import { Accordion, List, Icon, ActivityIndicator } from 'antd-mobile';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-connect';
import * as movementPlanAct from '../../redux/modules/MovementPlan/MovementPlanAct';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import Stage from './Stage';
const styles = require('./MovementPlan.scss');
const myPlanImg = require('img/my@2x.png');
require('../main.css');
require('echarts-liquidfill/dist/echarts-liquidfill.js');

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
      return Promise.all(promises);
    }
  }
])

export default class MovementPlan extends Component {

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
    const { movementPlanList } = this.props;
    return (
      <div style={{ marginBottom: 100 }}>
          <div id='main' style={{width: '100%', height: '400px'}}>
          </div>
          <div className={styles.planTitleDiv}>
            <span className={styles.recomendPlanTitle}>推荐计划</span>
          </div>
          <Accordion>
            <Accordion.Panel header="短跑">
            </Accordion.Panel>
            <Accordion.Panel header="短跑">
            </Accordion.Panel>
          </Accordion>
          <div className={styles.planTitleDiv}>
            <img src={myPlanImg} style={{width: '44px', height: '44px', marginLeft: '25px', marginTop: '-10px'}}></img>
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
