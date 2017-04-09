// 骨密度评估报告
import React, {Component, PropTypes} from 'react';
import { NavBar, Icon, Accordion, List } from 'antd-mobile';
import { formatDate } from 'xunyijia-components/src/utils/tool';
const LeftImg = require('img/return@2x.png');
const BaogImg = require('img/baogao@2X.png');
const styles = require('./HealthReport.scss');

export default class BoneDensity extends Component {
  render() {
    const { BoneDensityData } = this.props;
    let proposal = '';  // 存储骨密度建议
    switch (BoneDensityData.data.situation) {
      case '骨质正常':
        proposal = '保持良好的生活方式与饮食习惯';
        break;
      case '骨质少孔':
        proposal = '多吃含钙高的食物，并适量运动.';
        break;
      case '骨质酥松':
        proposal = '到医院做进一步的检查和治疗。';
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
               fontSize: '0.22rem'
             }}>
          <div className='fl'>测评时间：{formatDate(new Date(BoneDensityData.time), 'yyyy-mm-dd')}</div>
          <div className='fr'>测评次数：{BoneDensityData.count}次</div>
        </div>
        <Accordion className={'normal'}>
          <Accordion.Panel header={
            <div className='clearfix'>
              <div className={styles.reportNameLeft}>骨密度评估报告</div>
              <div className='reportNameRight'>{BoneDensityData.data.situation}</div>
            </div>
          }>
            <div style={{fontSize: '0.22rem'}}>
              <div style={{paddingLeft: '0.3rem', color: '#999'}}>
                测试部位：{BoneDensityData.data.part}
              </div>
              <ul className={styles.reporData}>
                <li className='clearfix'>
                  <div className={styles.listLeft}>
                    <img src={BaogImg} />
                  </div>
                  <div className={styles.listRight}>
                    <div>骨折风险是同年龄人的倍数</div>
                    <div className={styles.record}>
                      {BoneDensityData.data.fractureRiskMultiple}倍
                    </div>
                  </div>
                </li>
                <li className='clearfix'>
                  <div className={styles.listLeft}>
                    <img src={BaogImg} />
                  </div>
                  <div className={styles.listRight}>
                    <div>骨质情况</div>
                    <div className={styles.record}>
                      {BoneDensityData.data.situation}
                    </div>
                  </div>
                </li>
                <li className='clearfix'>
                  <div className={styles.listLeft}>
                    <img src={BaogImg} />
                  </div>
                  <div className={styles.listRight}>
                    <div>建议</div>
                    <div className={styles.record}>
                      {proposal}
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
