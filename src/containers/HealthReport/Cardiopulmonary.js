// 心肺功能评估报告
import React, {Component, PropTypes} from 'react';
import { NavBar, Icon, Accordion, List } from 'antd-mobile';
import { formatDate } from 'xunyijia-components/src/utils/tool';
const LeftImg = require('img/return@2x.png');
const BaogImg = require('img/baogao@2X.png');
const styles = require('./HealthReport.scss');

export default class BoneDensity extends Component {
  render() {
    const { CardiopulmonaryData } = this.props;
    let heartLung = ''; // 保存心肺功能建议的
    switch (CardiopulmonaryData.data.cardioStandard) {
      case '差':
        heartLung = '心肺功能和恢复能力差，请注意工作时间和强度，休息状态下可能会出现心力衰竭，体力活动后会加重。';
        break;
      case '稍差':
        heartLung = '心肺功能和恢复能力稍差，从事体力活动会轻度限制，从事高强度的工作和学习，可能出现心悸、呼吸困难。';
        break;
      case '中等':
        heartLung = '心肺功能和恢复能力中等，能够适应短时间高强度工作，请注意保持充足睡觉与休息。';
        break;
      case '良好':
        heartLung = '心肺功能和恢复能力良好，能够适应长时间工作；需要保持一定强度的运动提高心肺承受能力';
        break;
      case '优秀':
        heartLung = '心肺功能和恢复能力很好，能很好耐受长时间工作，并能保持身体在相对疲劳状态下持续工作的能力，请注意保持';
        break;
      default:
        break;
    }
    return (
      <div className={styles.report}>
        <div className='clearfix'
             style={{
               lineHeight: '0.6rem',
               color: '#6b6b6b',
               padding: '0 0.3rem',
               fontSize: '0.28rem',
               marginBottom: 5,
             }}>
          <div className='fl'>测评时间：{formatDate(new Date(CardiopulmonaryData.time), 'yyyy-mm-dd')}</div>
          <div className='fr'>测评次数：{CardiopulmonaryData.count}次</div>
        </div>
        <Accordion className='normal'>
          <Accordion.Panel header={
              <div className='clearfix'>
                <div className={styles.reportNameLeft}>心肺功能评估报告</div>
                <div className='reportNameRight'>
                  <span className='scor'>综合得分</span>{CardiopulmonaryData.data.cardioStandard}
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
                    <div>摄氧量绝对值</div>
                    <div className={styles.record}>
                      {CardiopulmonaryData.data.maxAbsoluteOxygenUptake}倍
                    </div>
                  </div>
                </li>
                <li className='clearfix'>
                  <div className={styles.listLeft}>
                    <img src={BaogImg} />
                  </div>
                  <div className={styles.listRight}>
                    <div>心肺功能标准</div>
                    <div className={styles.record}>
                      {CardiopulmonaryData.data.cardioStandard}
                    </div>
                  </div>
                </li>
                <li className='clearfix'>
                  <div className={styles.listLeft}>
                    <img src={BaogImg} />
                  </div>
                  <div className={styles.listRight}>
                    <div>心肺功能评价</div>
                    <div className={styles.record}>
                      {CardiopulmonaryData.data.cardioComment}
                    </div>
                  </div>
                </li>
                <li className='clearfix'>
                  <div className={styles.listLeft}>
                    <img src={BaogImg} />
                  </div>
                  <div className={styles.listRight}>
                    <div>测试结果说明</div>
                    <div className={styles.record}>
                      {heartLung}
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
