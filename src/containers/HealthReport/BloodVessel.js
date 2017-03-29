// 血管机能评估报告
import React, {Component, PropTypes} from 'react';
import { NavBar, Icon, Accordion, List } from 'antd-mobile';
import { formatDate } from 'xunyijia-components/src/utils/tool';
const LeftImg = require('img/return@2x.png');
const BaogImg = require('img/baogao@2X.png');
const styles = require('./HealthReport.scss');

export default class BloodVessel extends Component {
  render() {
    const { BloodVesselData } = this.props;
    return (
      <div className={styles.report}>
        <div className='clearfix'
             style={{
               lineHeight: '0.6rem',
               color: '#6b6b6b',
               padding: '0 0.3rem',
               fontSize: '0.28rem'
             }}>
          <div className='fl'>测评时间：{formatDate(new Date(BloodVesselData.time), 'yyyy-mm-dd')}</div>
          <div className='fr'>测评次数：{BloodVesselData.count}次</div>
        </div>
        <Accordion className='normal'>
          <Accordion.Panel header={
            <div className='clearfix'>
              <div className={styles.reportNameLeft}>血管机能评估报告</div>
              <div className='reportNameRight'>
                <span className='scor'>综合得分</span>{BloodVesselData.data.rightArmBloodPressure}
              </div>
            </div>
          }>
            <div style={{fontSize: '0.28rem'}}>
              <ul className={styles.reporData}>
                <li className='clearfix'>
                  <div className={styles.listLeft}>
                    <img src={BaogImg} />
                  </div>
                  <div className={styles.listRight}>
                    <div>心率</div>
                    <div className={styles.record}>
                      {BloodVesselData.data.heartRate}
                    </div>
                  </div>
                </li>
                <li className='clearfix'>
                  <div className={styles.listLeft}>
                    <img src={BaogImg} />
                  </div>
                  <div className={styles.listRight}>
                    <div>右臂血压</div>
                    <div className={styles.record}>
                      {BloodVesselData.data.rightArmBloodPressure}
                    </div>
                  </div>
                </li>
                <li className='clearfix'>
                  <div className={styles.listLeft}>
                    <img src={BaogImg} />
                  </div>
                  <div className={styles.listRight}>
                    <div>左臂血压</div>
                    <div className={styles.record}>
                      {BloodVesselData.data.leftArmBloodPressure}
                    </div>
                  </div>
                </li>
                <li className='clearfix'>
                  <div className={styles.listLeft}>
                    <img src={BaogImg} />
                  </div>
                  <div className={styles.listRight}>
                    <div>左踝血管弹性程度</div>
                    <div className={styles.record}>
                      {BloodVesselData.data.leftAnklePWV}
                    </div>
                  </div>
                </li>
                <li className='clearfix'>
                  <div className={styles.listLeft}>
                    <img src={BaogImg} />
                  </div>
                  <div className={styles.listRight}>
                    <div>右踝血管弹性程度</div>
                    <div className={styles.record}>
                      {BloodVesselData.data.rightAnklePWV}
                    </div>
                  </div>
                </li>
                <li className='clearfix'>
                  <div className={styles.listLeft}>
                    <img src={BaogImg} />
                  </div>
                  <div className={styles.listRight}>
                    <div>左踝血管阻塞程度</div>
                    <div className={styles.record}>
                      {BloodVesselData.data.leftAnkleABI}
                    </div>
                  </div>
                </li>
                <li className='clearfix'>
                  <div className={styles.listLeft}>
                    <img src={BaogImg} />
                  </div>
                  <div className={styles.listRight}>
                    <div>右踝血管阻塞程度</div>
                    <div className={styles.record}>
                      {BloodVesselData.data.rightAnkleABI}
                    </div>
                  </div>
                </li>
                <li className='clearfix'>
                  <div className={styles.listLeft}>
                    <img src={BaogImg} />
                  </div>
                  <div className={styles.listRight}>
                    <div>参考建议</div>
                    <div className={styles.record}>
                      <div>{BloodVesselData.data.veinSuggestion.PWV}</div>
                      <div>{BloodVesselData.data.veinSuggestion.ABI}</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </Accordion.Panel>
        </Accordion>
      </div>
    );
  }
}
