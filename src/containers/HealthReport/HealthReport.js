import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {asyncConnect} from 'redux-connect';
import { NavBar, Icon, Accordion, List } from 'antd-mobile';
import { fetchHealthReport } from 'redux/modules/HealthReport/HealthReportAct';
import BoneDensity from './BoneDensity';
import BloodVessel from './BloodVessel';
import BodyComposition from './BodyComposition';
import Spine from './Spine';
import Cardiopulmonary from './Cardiopulmonary';
const LeftImg = require('img/return@2x.png');
const styles = require('./HealthReport.scss');
require('../main.css');

@connect(
  ({ HealthReportRed }) => HealthReportRed,
  { fetchHealthReport }
)

@asyncConnect([
  {
    promise: ({ store: { dispatch }}) =>{
      const promises = [];
      promises.push(dispatch(fetchHealthReport()));  //
      return Promise.all(promises);
    }
  }
])

export default class HealthReport extends Component {
  render() {
    const { data } = this.props;
    let sex = '';
    if (data.personal && data.personal.sex) {
      switch (data.personal.sex) {
        case 1:
          sex = '男';
          break;
        case 2:
          sex = '女';
          break;
        default:
          break;
      }
    }
    let SpineData; // 脊柱功能
    let BloodVesselData; // 血管机能
    let BoneDensityData; // 骨密度
    let CardiopulmonaryData; // 心肺功能
    let BodyCompositionData; // 体成份
    const report = data.report || [];
    report.map(function(item) {
      switch (item.type) {
        case `骨密度`:
          BoneDensityData = {
            data: item.data,
            count: item.count,
            time: item.time
          };
          break;
        case `心肺功能`:
          CardiopulmonaryData = {
            data: item.data,
            count: item.count,
            time: item.time
          };
          break;
        case `脊柱功能`:
          SpineData = {
            data: item.data,
            count: item.count,
            time: item.time
          };
          break;
        case `体成份`:
          BodyCompositionData = {
            data: item.data,
            count: item.count,
            time: item.time
          };
          break;
        case `血管机能`:
          BloodVesselData = {
            data: item.data,
            count: item.count,
            time: item.time
          };
          break;
        default:
          break;
      }
    });

    return (
      <div style={{ marginBottom: '1.28rem', marginTop: -5 }} className='DropDown'>
        <NavBar iconName="false" mode="light"
          onLeftClick={() => console.log('onLeftClick')}
          leftContent={<img src={LeftImg} style={{marginLeft: '-0.5rem'}}/>}
          style={{position: 'fixed', width: '100%', borderBottom: '1px solid #ccc', zIndex: 99}}
          >
          健康报告
        </NavBar>
        <div className={styles.info}>
          <span style={{color: '#ecb25f'}}>基本个人信息:</span>
        <div className='clearfix' style={{marginTop: '0.3rem'}}>
            <div className={styles.infoName}>{ data.personal && data.personal.name}</div>
            <div className={styles.infoDetails}>
              <span>性别：{data.personal && data.personal.sex === 1 ? '男' : '女' }</span>|
              <span>年龄：{data.personal && data.personal.age}</span>|
              <span>身高：{data.personal && data.personal.height}cm</span>
              <span>体重：{data.personal && data.personal.weight}kg</span>|
              <span>学号：{data.personal && data.personal.num}</span>
            </div>
          </div>
        </div>
        <div style={{margin: '0.2rem'}}>
          {BoneDensityData ? <BoneDensity BoneDensityData={BoneDensityData}/> : '' }
          {BodyCompositionData ? <BodyComposition BodyCompositionData={BodyCompositionData}/> : ''}
          {BloodVesselData ? <BloodVessel BloodVesselData={BloodVesselData}/> : ''}
          {SpineData ? <Spine SpineData={SpineData}/> : ''}
          {CardiopulmonaryData ? <Cardiopulmonary CardiopulmonaryData={CardiopulmonaryData}/> : ''}
        </div>
      </div>
    );
  }
}
